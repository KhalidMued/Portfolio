// Lightweight inline-SVG "cover art" for project cards. There are no real
// screenshots for these projects yet, so rather than reuse unrelated stock
// images, each project gets an abstract diagram matching what it actually is
// (a dashboard, a topology, an architecture, an incident stat, a lab, a ZTNA
// chain) — rendered with currentColor so it tracks the light/dark theme, tinted
// with the project's own accent color.

const Frame = ({ children }) => (
  <svg viewBox="0 0 400 230" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    {children}
  </svg>
);

export const DashboardCover = ({ accent = "#915eff" }) => (
  <Frame>
    <rect width="400" height="230" className="fill-tertiary" />
    <rect x="20" y="20" width="150" height="70" rx="10" fill={accent} opacity="0.18" />
    <rect x="20" y="20" width="150" height="70" rx="10" fill="none" stroke={accent} strokeWidth="1.5" />
    <rect x="184" y="20" width="196" height="34" rx="8" fill={accent} opacity="0.12" />
    <rect x="184" y="62" width="196" height="28" rx="8" fill={accent} opacity="0.08" />
    <rect x="20" y="106" width="360" height="104" rx="10" className="fill-black-100" />
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <rect
        key={i}
        x={40 + i * 48}
        y={190 - (24 + (i % 4) * 16)}
        width="26"
        height={24 + (i % 4) * 16}
        rx="4"
        fill={accent}
        opacity={0.35 + (i % 3) * 0.2}
      />
    ))}
  </Frame>
);

export const ArchitectureCover = ({ accent = "#915eff" }) => (
  <Frame>
    <rect width="400" height="230" className="fill-tertiary" />
    {[
      [30, 95, "UI"],
      [170, 40, "API"],
      [170, 150, "Agent"],
      [300, 95, "Data"],
    ].map(([x, y, label]) => (
      <g key={label}>
        <rect x={x} y={y} width="90" height="46" rx="10" fill={accent} opacity="0.15" />
        <rect x={x} y={y} width="90" height="46" rx="10" fill="none" stroke={accent} strokeWidth="1.5" />
        <text x={x + 45} y={y + 28} textAnchor="middle" fontSize="13" className="fill-heading" fontFamily="Poppins, sans-serif">
          {label}
        </text>
      </g>
    ))}
    <path d="M120 118 L170 63" stroke={accent} strokeWidth="1.5" opacity="0.6" fill="none" />
    <path d="M120 118 L170 173" stroke={accent} strokeWidth="1.5" opacity="0.6" fill="none" />
    <path d="M260 63 L300 110" stroke={accent} strokeWidth="1.5" opacity="0.6" fill="none" />
    <path d="M260 173 L300 128" stroke={accent} strokeWidth="1.5" opacity="0.6" fill="none" />
  </Frame>
);

export const TopologyCover = ({ accent = "#00cea8" }) => (
  <Frame>
    <rect width="400" height="230" className="fill-tertiary" />
    <circle cx="200" cy="50" r="18" fill={accent} opacity="0.2" stroke={accent} strokeWidth="1.5" />
    {[70, 145, 255, 330].map((x, i) => (
      <g key={x}>
        <line x1="200" y1="50" x2={x} y2="120" stroke={accent} strokeWidth="1.5" opacity="0.5" />
        <circle cx={x} cy="120" r="13" fill={accent} opacity="0.18" stroke={accent} strokeWidth="1.5" />
        <line x1={x} y1="120" x2={x - 15 + i * 4} y2="190" stroke={accent} strokeWidth="1.2" opacity="0.4" />
        <circle cx={x - 15 + i * 4} cy="190" r="8" fill={accent} opacity="0.4" />
      </g>
    ))}
  </Frame>
);

export const IncidentCover = ({ accent = "#e5484d" }) => (
  <Frame>
    <rect width="400" height="230" className="fill-tertiary" />
    <circle cx="70" cy="115" r="46" fill={accent} opacity="0.12" />
    <path
      d="M70 78 L104 138 H36 Z"
      fill="none"
      stroke={accent}
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <line x1="70" y1="98" x2="70" y2="118" stroke={accent} strokeWidth="3" strokeLinecap="round" />
    <circle cx="70" cy="128" r="2.4" fill={accent} />
    <text x="150" y="105" fontSize="30" fontWeight="700" className="fill-heading" fontFamily="Poppins, sans-serif">
      ~200 endpoints
    </text>
    <text x="150" y="135" fontSize="16" className="fill-secondary" fontFamily="Poppins, sans-serif">
      recovered in ~2 days
    </text>
  </Frame>
);

export const LabCover = ({ accent = "#f5a623" }) => (
  <Frame>
    <rect width="400" height="230" className="fill-tertiary" />
    <rect x="130" y="30" width="140" height="170" rx="10" className="fill-black-100" />
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={i}>
        <rect x="144" y={44 + i * 32} width="112" height="22" rx="4" fill={accent} opacity={i % 2 === 0 ? 0.3 : 0.15} />
        <circle cx="154" cy={55 + i * 32} r="3" fill={accent} />
        <circle cx="164" cy={55 + i * 32} r="3" fill={accent} opacity="0.5" />
      </g>
    ))}
  </Frame>
);

export const ZtnaCover = ({ accent = "#00cea8" }) => (
  <Frame>
    <rect width="400" height="230" className="fill-tertiary" />
    {[
      [40, "User"],
      [175, "SecureEdge"],
      [310, "Internal"],
    ].map(([x, label], i) => (
      <g key={label}>
        <rect x={x - 30} y="95" width="60" height="40" rx="10" fill={accent} opacity="0.15" stroke={accent} strokeWidth="1.5" />
        <text x={x} y="120" textAnchor="middle" fontSize="11" className="fill-heading" fontFamily="Poppins, sans-serif">
          {label}
        </text>
        {i < 2 && (
          <path d={`M${x + 30} 115 L${x + 105} 115`} stroke={accent} strokeWidth="1.5" strokeDasharray="4 4" />
        )}
      </g>
    ))}
    <rect x="145" y="60" width="60" height="20" rx="6" fill={accent} opacity="0.25" />
    <text x="175" y="74" textAnchor="middle" fontSize="9" className="fill-heading" fontFamily="Poppins, sans-serif">
      Zero Trust
    </text>
  </Frame>
);

export const covers = {
  dashboard: DashboardCover,
  architecture: ArchitectureCover,
  topology: TopologyCover,
  incident: IncidentCover,
  lab: LabCover,
  ztna: ZtnaCover,
};
