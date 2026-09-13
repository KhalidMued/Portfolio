// Shared accent palette so the "two sides" of the site (and the shared
// infra/AI ground between them) read consistently everywhere they show up —
// badges, tabs, card borders, icon tints.
export const CATEGORY = {
  dev: {
    label: "Developer",
    short: "Dev",
    color: "#915eff",
  },
  security: {
    label: "Network & Security",
    short: "Security",
    color: "#00cea8",
  },
  infra: {
    label: "Infrastructure",
    short: "Infra",
    color: "#f5a623",
  },
  ai: {
    label: "AI & Automation",
    short: "AI",
    color: "#ec4899",
  },
};

export const categoryChipClass = (key) => {
  const c = CATEGORY[key]?.color ?? "#915eff";
  return {
    "--chip-color": c,
  };
};
