import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiVite,
  SiThreedotjs,
  SiGit,
  SiC,
  SiCisco,
  SiGraylog,
  SiPfsense,
  SiOpenvpn,
  SiLinux,
  SiProxmox,
  SiDocker,
  SiPortainer,
  SiNginx,
  SiCloudflare,
  SiAuthentik,
  SiTailscale,
  SiPostgresql,
  SiRedis,
  SiClaude,
  SiAnthropic,
  SiN8N,
} from "react-icons/si";
import {
  FaJava,
  FaAws,
  FaShieldHalved,
  FaUserShield,
  FaLayerGroup,
  FaRoute,
  FaTowerBroadcast,
  FaFireFlameCurved,
  FaEye,
  FaMagnifyingGlass,
  FaBug,
  FaGlobe,
  FaCubes,
  FaLock,
  FaBoxArchive,
  FaRobot,
  FaGears,
  FaFileLines,
  FaPlug,
  FaCertificate,
  FaMobileScreenButton,
  FaCode,
  FaNetworkWired,
  FaCloud,
} from "react-icons/fa6";

export const navLinks = [
  { id: "about", title: "About" },
  { id: "experience", title: "Experience" },
  { id: "skills", title: "Skills" },
  { id: "work", title: "Work" },
  { id: "contact", title: "Contact" },
];

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
export const heroContent = {
  name: "Khalid Mudathir",
  roles: ["Developer.", "Network & Security Engineer."],
  tagline: "I build the apps people use — and the infrastructure they depend on.",
  rotating: [
    "Building apps. Securing networks.",
    "Breaking things in the lab so they don't break in production.",
    "From the button on the screen to the packet leaving the server.",
  ],
};

// ---------------------------------------------------------------------------
// About
// ---------------------------------------------------------------------------
export const aboutParagraphs = [
  "I'm Khalid, a Developer and Network & Cybersecurity Engineer based in Riyadh.",
  "My work sits somewhere between software engineering, infrastructure, and security. I enjoy building user-facing applications, experimenting with AI-assisted development, deploying services to the cloud, designing networks, troubleshooting infrastructure, and figuring out what is happening when something refuses to work.",
  "My background in Network & Cybersecurity Engineering gives me a different perspective when I develop software. I don't only think about the interface or the code — I think about where the application runs, how it communicates, how it is secured, how it is monitored, and what happens when something fails.",
  "Outside production environments, I maintain my own homelab where I continuously experiment with virtualization, networking, firewalls, containers, identity, remote access, monitoring, automation, AI agents, and new infrastructure technologies.",
];

export const aboutHighlight = {
  eyebrow: "Two sides, one engineer",
  dev: {
    title: "Developer",
    points: ["Web & mobile apps", "React / TypeScript / Node.js", "Cloud-deployed production systems"],
  },
  security: {
    title: "Network & Security",
    points: ["Cisco networking & firewalls", "Incident response & monitoring", "Virtualization & infrastructure"],
  },
};

const services = [
  {
    title: "Web & Application Development",
    subtitle: "React · TypeScript · Modern UI",
    description:
      "Building responsive web applications and interfaces with a focus on usability, clean architecture, and real-world deployment.",
    icon: FaCode,
    category: "dev",
  },
  {
    title: "Mobile Development",
    subtitle: "React Native · Mobile Products",
    description:
      "Building mobile-first products and experiences, from interface development to APIs, payments, deployment, and production releases.",
    icon: FaMobileScreenButton,
    category: "dev",
  },
  {
    title: "Network Engineering",
    subtitle: "Cisco · VLANs · Routing · SD-WAN",
    description:
      "Designing, configuring, troubleshooting, and testing networks across physical, virtual, enterprise, and lab environments.",
    icon: FaNetworkWired,
    category: "security",
  },
  {
    title: "Cybersecurity",
    subtitle: "Firewalls · Monitoring · Incident Response",
    description:
      "Investigating security events, working with firewalls and endpoint security platforms, analyzing logs, and improving infrastructure visibility.",
    icon: FaShieldHalved,
    category: "security",
  },
  {
    title: "Cloud & Infrastructure",
    subtitle: "AWS · Linux · Docker · Virtualization",
    description:
      "Deploying and operating services across cloud and virtualized infrastructure with monitoring, backups, networking, and secure access in mind.",
    icon: FaCloud,
    category: "infra",
  },
  {
    title: "Automation & AI",
    subtitle: "AI Agents · Workflows · Intelligent Operations",
    description:
      "Using automation and modern AI-assisted engineering workflows to build faster, investigate problems, improve operations, and reduce repetitive work.",
    icon: FaRobot,
    category: "ai",
  },
];

// ---------------------------------------------------------------------------
// Tech / Skills — grouped so a visitor can switch between the two sides
// instead of scanning one giant undifferentiated row of icons.
// ---------------------------------------------------------------------------
const technologyGroups = [
  {
    key: "development",
    label: "Development",
    category: "dev",
    items: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "React Native", icon: SiReact, color: "#61DAFB" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: SiCss, color: "#663399" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
      { name: "Vite", icon: SiVite, color: "#646CFF" },
      { name: "Three.js", icon: SiThreedotjs, color: "#915eff" },
      { name: "Java", icon: FaJava, color: "#ED8B00" },
      { name: "C", icon: SiC, color: "#A8B9CC" },
      { name: "Git / GitHub", icon: SiGit, color: "#F05032" },
      { name: "REST APIs", icon: FaPlug, color: "#915eff" },
    ],
  },
  {
    key: "network-security",
    label: "Network & Security",
    category: "security",
    items: [
      { name: "Cisco Switching", icon: SiCisco, color: "#1BA0D7" },
      { name: "VLANs & Segmentation", icon: FaLayerGroup, color: "#00cea8" },
      { name: "Routing", icon: FaRoute, color: "#00cea8" },
      { name: "SD-WAN", icon: FaTowerBroadcast, color: "#00cea8" },
      { name: "Sophos Firewall / Central", icon: FaShieldHalved, color: "#67C400" },
      { name: "Graylog", icon: SiGraylog, color: "#FF3633" },
      { name: "pfSense", icon: SiPfsense, color: "#212121" },
      { name: "Barracuda SecureEdge / ZTNA", icon: FaUserShield, color: "#00cea8" },
      { name: "Firewall Policy & Troubleshooting", icon: FaFireFlameCurved, color: "#FF6B4A" },
      { name: "VPN / Remote Access", icon: SiOpenvpn, color: "#EA7E20" },
      { name: "Security Monitoring", icon: FaEye, color: "#00cea8" },
      { name: "Log Analysis", icon: FaMagnifyingGlass, color: "#00cea8" },
      { name: "Incident Response", icon: FaBug, color: "#E5484D" },
      { name: "DNS & Network Services", icon: FaGlobe, color: "#00cea8" },
    ],
  },
  {
    key: "infrastructure",
    label: "Infrastructure & Systems",
    category: "infra",
    items: [
      { name: "Linux — Ubuntu / RHEL / Kali", icon: SiLinux, color: "#FCC624" },
      { name: "Proxmox VE", icon: SiProxmox, color: "#E57000" },
      { name: "VMs & Containers (LXC)", icon: FaCubes, color: "#f5a623" },
      { name: "Docker / Compose", icon: SiDocker, color: "#2496ED" },
      { name: "Portainer", icon: SiPortainer, color: "#13BEF9" },
      { name: "AWS EC2", icon: FaAws, color: "#FF9900" },
      { name: "Nginx", icon: SiNginx, color: "#009639" },
      { name: "Cloudflare", icon: SiCloudflare, color: "#F38020" },
      { name: "Traefik", icon: FaRoute, color: "#f5a623" },
      { name: "Authentik", icon: SiAuthentik, color: "#FD4B2D" },
      { name: "Tailscale", icon: SiTailscale, color: "#f5a623" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "Redis", icon: SiRedis, color: "#DC382D" },
      { name: "TLS / SSL", icon: FaLock, color: "#f5a623" },
      { name: "Backups & Snapshots", icon: FaBoxArchive, color: "#f5a623" },
    ],
  },
  {
    key: "ai-engineering",
    label: "AI & Engineering Tools",
    category: "ai",
    items: [
      { name: "AI-Assisted Development", icon: FaRobot, color: "#ec4899" },
      { name: "Coding Agents (Codex, Claude Code)", icon: SiClaude, color: "#D97757" },
      { name: "Anthropic / LLM Ecosystem", icon: SiAnthropic, color: "#D97757" },
      { name: "Automation (n8n)", icon: SiN8N, color: "#EA4B71" },
      { name: "Workflows & Scripting", icon: FaGears, color: "#ec4899" },
      { name: "Technical Documentation", icon: FaFileLines, color: "#ec4899" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Experience — one career, visible progression: IT Support -> Networking ->
// Security -> Infrastructure/Automation.
// ---------------------------------------------------------------------------
const experiences = [
  {
    title: "SecOps",
    company_name: "Zaid Al-Hussain & Brothers Group",
    location: "Riyadh, Saudi Arabia",
    date: "Dec 2025 — Present",
    category: "security",
    icon: FaShieldHalved,
    points: [
      "Analyze security alerts, system logs, and network events to investigate potential incidents and operational issues.",
      "Troubleshoot firewalls, switches, wireless infrastructure, remote access, and connectivity across enterprise environments.",
      "Manage and troubleshoot virtual infrastructure, including VM resources, snapshots, backups, and performance.",
      "Build and test infrastructure solutions in lab environments before supporting their implementation in production.",
      "Improve monitoring, documentation, troubleshooting, and operational workflows through automation and intelligent analysis.",
    ],
  },
  {
    title: "Network Security Junior",
    company_name: "Zaid Al-Hussain & Brothers Group",
    location: "Riyadh, Saudi Arabia",
    date: "Jun 2025 — Dec 2025",
    category: "security",
    icon: FaNetworkWired,
    points: [
      "Monitored enterprise network security using firewall infrastructure, Sophos Central, and Graylog.",
      "Configured and supported Cisco switches, VLANs, wireless access points, and network connectivity.",
      "Participated in SD-WAN deployment and gained hands-on exposure to enterprise network/security operations.",
    ],
  },
  {
    title: "IT Technician — Part Time",
    company_name: "Zaid Al-Hussain & Brothers Group",
    location: "Riyadh, Saudi Arabia",
    date: "Apr 2019 — Jun 2025",
    category: "infra",
    icon: FaGears,
    points: [
      "Provided day-to-day technical support, system installation, troubleshooting, and end-user assistance.",
      "Diagnosed hardware, software, network, and connectivity issues across business environments.",
      "Built the practical troubleshooting foundation that later developed into network, infrastructure, and cybersecurity responsibilities.",
    ],
  },
];

// ---------------------------------------------------------------------------
// Credentials strip
// ---------------------------------------------------------------------------
const credentials = [
  {
    title: "B.Sc. Network & Cybersecurity Engineering",
    issuer: "Al Yamamah University",
    meta: "First-Class Honors · GPA 3.91",
    icon: FaCertificate,
    category: "security",
  },
  {
    title: "Java Foundations",
    issuer: "Oracle",
    meta: "2023",
    icon: FaCertificate,
    category: "dev",
  },
  {
    title: "Artificial Intelligence Fundamentals",
    issuer: "IBM",
    meta: "2024",
    icon: FaCertificate,
    category: "ai",
  },
];

// ---------------------------------------------------------------------------
// Works / Projects — split by side, HASM is the featured flagship.
// ---------------------------------------------------------------------------
const devProjects = [
  {
    name: "HASM — Descending-Price Marketplace",
    description:
      "A production marketplace built around descending-price auctions, where products become cheaper as the auction progresses. HASM includes mobile applications, supplier management, buyer notifications, payments, order processing, and a cloud-hosted backend composed of multiple application services. I worked across the product and technical side of the platform, including application releases, infrastructure, backend services, cloud deployment, integrations, payment systems, DNS, SSL, and production troubleshooting.",
    tags: [
      { name: "mobile", color: "blue-text-gradient" },
      { name: "react-native", color: "green-text-gradient" },
      { name: "aws", color: "pink-text-gradient" },
      { name: "docker", color: "blue-text-gradient" },
    ],
    cover: "dashboard",
    featured: true,
    category: "dev",
  },
  {
    name: "Homelab Control Center",
    description:
      "A custom control center I'm building for my homelab to bring infrastructure, monitoring, Docker services, virtual machines, network information, and administrative operations into one interface. Combines a React/TypeScript frontend with backend APIs and permission-aware infrastructure operations, using AI-assisted engineering workflows for development, testing, documentation, and review.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "typescript", color: "green-text-gradient" },
      { name: "dotnet", color: "pink-text-gradient" },
    ],
    cover: "architecture",
    category: "dev",
  },
  {
    name: "Rasheeg AI Assistant",
    description:
      "An experimental self-hosted AI assistant environment built around messaging, automation, identity isolation, persistent context, and controlled access to infrastructure capabilities. Explores how AI agents can interact safely with real systems while maintaining user isolation, permissions, testing, and operational controls.",
    tags: [
      { name: "ai-agents", color: "blue-text-gradient" },
      { name: "docker", color: "green-text-gradient" },
      { name: "whatsapp", color: "pink-text-gradient" },
    ],
    cover: "architecture",
    category: "ai",
  },
];

const securityProjects = [
  {
    name: "Enterprise Network & Data Center Build",
    description:
      "Designed and implemented infrastructure for an approximately 150-user environment, including networking, systems preparation, connectivity, and deployment. Required coordinating multiple infrastructure components while maintaining availability and completing the rollout within a limited implementation window.",
    tags: [
      { name: "cisco", color: "green-text-gradient" },
      { name: "networking", color: "blue-text-gradient" },
      { name: "infrastructure", color: "pink-text-gradient" },
    ],
    cover: "topology",
    category: "security",
  },
  {
    name: "Large-Scale Endpoint Incident Recovery",
    description:
      "Participated in the recovery of approximately 200 workstations following a widespread malware/virus incident, restoring the environment within roughly two days. Required fast diagnosis, coordinated remediation, system recovery, validation, and prioritization to return users to operation as quickly as possible.",
    tags: [
      { name: "incident-response", color: "pink-text-gradient" },
      { name: "endpoint-security", color: "green-text-gradient" },
      { name: "troubleshooting", color: "blue-text-gradient" },
    ],
    cover: "incident",
    stats: [
      { value: "~200", label: "Endpoints" },
      { value: "~2 days", label: "Recovery" },
      { value: "0", label: "Data loss" },
    ],
    category: "security",
  },
  {
    name: "Security & Infrastructure Homelab",
    description:
      "My homelab is where I test technologies before trusting them. Includes Proxmox virtualization, pfSense networking and firewalling, Docker infrastructure, reverse proxies, identity and authentication services, Tailscale remote access, network segmentation, DNS filtering, monitoring, Linux servers, Windows environments, and dedicated security test systems.",
    tags: [
      { name: "proxmox", color: "blue-text-gradient" },
      { name: "pfsense", color: "green-text-gradient" },
      { name: "docker", color: "pink-text-gradient" },
    ],
    cover: "lab",
    category: "infra",
  },
  {
    name: "ZTNA / Secure Remote Access Lab",
    description:
      "Built a test environment around Barracuda SecureEdge to explore Zero Trust Network Access, remote application access, routing, firewall interaction, and endpoint connectivity. Tested access to internal RDP and SSH resources while troubleshooting routing, source networks, firewall policies, and connectivity between SecureEdge and internal infrastructure.",
    tags: [
      { name: "ztna", color: "pink-text-gradient" },
      { name: "barracuda", color: "blue-text-gradient" },
      { name: "sophos", color: "green-text-gradient" },
    ],
    cover: "ztna",
    category: "security",
  },
];

// ---------------------------------------------------------------------------
// By the numbers — replaces placeholder testimonials until real ones exist.
// ---------------------------------------------------------------------------
const stats = [
  { value: "150+", label: "Users supported by infrastructure projects", category: "infra" },
  { value: "~200", label: "Endpoints recovered during a major incident", category: "security" },
  { value: "3.91", label: "University GPA — First-Class Honors", category: "dev" },
  { value: "Production", label: "Mobile + web marketplace deployed", category: "dev" },
  { value: "24/7", label: "Homelab available for testing, learning & breaking things", category: "ai" },
];

const testimonials = [];

export {
  services,
  technologyGroups,
  experiences,
  credentials,
  devProjects,
  securityProjects,
  stats,
  testimonials,
};
