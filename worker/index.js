/**
 * Contact form endpoint.
 *
 * Replaces EmailJS, which put the service/template/public keys in the client
 * bundle, capped out at 200 messages a month, and — the reason it stopped
 * working — depended on a Gmail OAuth grant that Google eventually revokes
 * ("412 Gmail_API: Invalid grant"). Here the browser only ever talks to this
 * site's own origin, the API key lives in a Worker secret, and validation and
 * abuse controls run somewhere a visitor can't edit them.
 *
 * Bindings (see wrangler.jsonc):
 *   RESEND_API_KEY      secret — `npx wrangler secret put RESEND_API_KEY`
 *   CONTACT_TO_EMAIL    var    — inbox that receives the messages
 *   CONTACT_FROM_EMAIL  var    — verified sender
 *   CONTACT_RATE_LIMIT  binding (optional) — per-IP limiter
 *   ASSETS              binding — the static site, for anything not /api/*
 */

const JSON_HEADERS = { 'content-type': 'application/json; charset=utf-8' };

const json = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });

// Mirrors the client-side check in Contact.jsx. Deliberately loose: the only
// address that matters is one a human can reply to, and stricter patterns
// reject valid addresses more often than they catch bad ones.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Same caps as the form's maxLength attributes. Enforced again here because
// anything client-side is a suggestion, not a limit.
const FIELD_LIMITS = { name: 100, email: 254, message: 2000 };

// The largest legitimate submission is ~2.4 kB of field content; 16 kB leaves
// generous headroom while keeping a hostile body from being parsed at all.
const MAX_BODY_BYTES = 16 * 1024;

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[char]));

const readBody = async (request) => {
  const declared = Number(request.headers.get('content-length') ?? 0);
  if (declared > MAX_BODY_BYTES) return { tooLarge: true };

  const raw = await request.text();
  // content-length is a claim, not a guarantee — check what actually arrived.
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) return { tooLarge: true };

  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return { invalid: true };
    }
    return { body: parsed };
  } catch {
    return { invalid: true };
  }
};

const asField = (value) => (typeof value === 'string' ? value.trim() : '');

const handleContact = async (request, env) => {
  if (request.method !== 'POST') {
    return json(405, { error: 'Method not allowed.' });
  }

  const { body, tooLarge, invalid } = await readBody(request);
  if (tooLarge) return json(413, { error: 'Message too large.' });
  if (invalid) return json(400, { error: 'Malformed request.' });

  // Honeypot. A real visitor never sees this field, so any value means a bot
  // filled every input it could find. Answer 200 rather than an error: a bot
  // that learns it was caught just tries again differently.
  if (asField(body.contact_hp)) {
    return json(200, { ok: true });
  }

  const name = asField(body.name);
  const email = asField(body.email);
  const message = asField(body.message);

  if (!name || !email || !message) {
    return json(400, { error: 'Please fill in every field.' });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return json(400, { error: 'That email address does not look right.' });
  }
  if (
    name.length > FIELD_LIMITS.name ||
    email.length > FIELD_LIMITS.email ||
    message.length > FIELD_LIMITS.message
  ) {
    return json(400, { error: 'One of those fields is too long.' });
  }

  // Per-IP limiter, when the binding is configured. Keyed on CF-Connecting-IP,
  // which Cloudflare sets at the edge and a client cannot forge.
  if (env.CONTACT_RATE_LIMIT) {
    const ip = request.headers.get('cf-connecting-ip') ?? 'unknown';
    const { success } = await env.CONTACT_RATE_LIMIT.limit({ key: ip });
    if (!success) {
      return json(429, { error: 'Too many messages. Please try again shortly.' });
    }
  }

  if (!env.RESEND_API_KEY) {
    console.error('[contact] RESEND_API_KEY is not set — cannot send.');
    return json(500, { error: 'Something went wrong. Please try again.' });
  }

  const subject = `Portfolio contact — ${name}`;
  const text = `${message}\n\n—\nFrom: ${name} <${email}>`;
  const html =
    `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>` +
    `<hr><p>From: ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>`;

  let resendResponse;
  try {
    resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${env.RESEND_API_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL,
        to: [env.CONTACT_TO_EMAIL],
        // So replying in the mail client answers the sender, not the Worker.
        reply_to: email,
        subject,
        text,
        html,
      }),
    });
  } catch (error) {
    console.error('[contact] Resend request failed:', error);
    return json(502, { error: 'Something went wrong. Please try again.' });
  }

  if (!resendResponse.ok) {
    // Logged, never returned: the upstream body can name the sending domain
    // and the key's permissions, which is not the visitor's business.
    console.error(
      '[contact] Resend rejected the send:',
      resendResponse.status,
      await resendResponse.text()
    );
    return json(502, { error: 'Something went wrong. Please try again.' });
  }

  return json(200, { ok: true });
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/contact') {
      return handleContact(request, env);
    }

    // wrangler.jsonc routes only /api/* here, so this is a safety net rather
    // than the normal path for page requests.
    return env.ASSETS.fetch(request);
  },
};
