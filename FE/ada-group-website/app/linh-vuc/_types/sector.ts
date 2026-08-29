import type { SectorStatIcon } from "@/app/linh-vuc/_lib/stat-icons";

export type SectorStat = {
  icon: SectorStatIcon;
  value: string;
  label: string;
};

export type SectorWhyChoose = {
  quoteBefore: string;
  quoteHighlight: string;
  quoteAfter: string;
  paragraph: string;
  stats: SectorStat[];
};

export type SectorApproachBlock = {
  imageUrl: string;
  paragraph: string;
  checklist: string[];
};

export type SectorApproach = {
  heading: string;
  blocks: SectorApproachBlock[];
};

export type Sector = {
  slug: string;
  eyebrow: string;
  title: string;
  code: string;
  description: string;
  content: string;
  imageUrl: string;
  whyChoose?: SectorWhyChoose;
  approach?: SectorApproach;
};
