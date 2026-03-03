import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type ContentType = "blog" | "case-studies";

export type ContentItem = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readingTime?: string;
  featured?: boolean;
  client?: string;
  industry?: string;
  outcomes?: string[];
  body: string;
};

const root = process.cwd();

export function listContent(type: ContentType) {
  const dir = path.join(root, "content", type);
  const files = fs.readdirSync(dir).filter((f: string) => f.endsWith(".md"));

  const items = files.map((file: string) => {
    const slug = file.replace(/\.md$/, "");
    const fullPath = path.join(dir, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(raw);
    // guard against data providing its own slug property
    const { slug: _fromData, ...rest } = data as Partial<ContentItem>;
    return {
      slug,
      ...(rest as Omit<ContentItem, 'slug'>)
    };
  });

  // newest first
  return items.sort((a: any, b: any) => (a.date < b.date ? 1 : -1));
}

export async function getContent(type: ContentType, slug: string): Promise<ContentItem> {
  const file = path.join(root, "content", type, `${slug}.md`);
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);

  const processed = await remark().use(html).process(content);
  const body = processed.toString();

  // strip slug from frontmatter if present to avoid duplication
  const { slug: _slugFromData, ...rest } = data as Partial<ContentItem>;
  return {
    slug,
    body,
    ...(rest as any)
  } as ContentItem;
}