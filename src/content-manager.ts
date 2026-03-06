import type { AstroComponentFactory } from "astro/runtime/server/index.js";

type ContentFrontmatter = {
  editor: boolean;
  code?: string;
  expectedOutput?: string;
  testCode?: string;
};

type ContentHeading = {
  depth: number;
  slug: string;
  text: string;
};

type ContentMeta = {
  id: number;
  slug: string;
  title: string;
  major: number;
  minor: number;
};

interface RawContent {
  frontmatter: ContentFrontmatter;
  Content: AstroComponentFactory;
  getHeadings: () => ContentHeading[];
}

export type Content = Omit<RawContent, "frontmatter"> & {
  data: ContentFrontmatter;
  meta: ContentMeta;
};

function parseId(id: string): number {
  const parts = id.split("-").map(Number);
  return parts[0] * 1000 + (parts[1] ?? 0);
}

function extractMetadata(filepath: string) {
  const filename =
    filepath
      .split("/")
      .pop()
      ?.replace(/\.mdx?$/, "") ?? "";
  const [, id, slug] = filename.match(/^([\d-]+)\.(.+)$/) ?? [];
  const title =
    slug?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) ?? "";
  const parts = (id ?? "0").split("-").map(Number);

  return {
    id: parseId(id ?? "0"),
    slug,
    title,
    major: parts[0] ?? 0,
    minor: parts[1] ?? 0,
  };
}

export const supportedLangs = ["es", "en"] as const;
export type SupportedLang = (typeof supportedLangs)[number];

const allFiles = import.meta.glob<RawContent>(
  "./content/fundamentos-de-rust/*/*.{md,mdx}",
  { eager: true },
);

export function getLessonsByLang(lang: string): Content[] {
  const prefix = `./content/fundamentos-de-rust/${lang}/`;
  return Object.entries(allFiles)
    .filter(([filepath]) => filepath.startsWith(prefix))
    .map(([filepath, { Content, getHeadings, frontmatter }]) => ({
      Content,
      getHeadings,
      data: frontmatter,
      meta: extractMetadata(filepath),
    }))
    .sort((a, b) => a.meta.id - b.meta.id);
}
