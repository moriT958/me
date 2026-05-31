import { readdir, readFile } from "node:fs/promises";
import { join, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import { matter } from "vfile-matter";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import { visit } from "unist-util-visit";
import { toText } from "hast-util-to-text";
import { VFile } from "vfile";
import type { Root, Element } from "hast";

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type Post = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  tags: string[];
  external?: boolean;
  url?: string;
  body: Root;
  toc: TocItem[];
};

type Frontmatter = {
  title: string;
  date: string;
  tags?: string[];
  excerpt: string;
  external?: boolean;
  url?: string;
  draft?: boolean;
};

const CONTENT_DIR = join(fileURLToPath(new URL(".", import.meta.url)), "../content");

function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w぀-ヿ一-鿿-]/g, "");
}

function withHeadingIds() {
  return (tree: Root, file: VFile) => {
    const toc: TocItem[] = [];
    const seen = new Map<string, number>();

    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "h2" && node.tagName !== "h3") return;
      const level = parseInt(node.tagName[1]!, 10) as 2 | 3;
      const text = toText(node).trim();
      const base = slugify(text) || "heading";
      const n = seen.get(base) ?? 0;
      seen.set(base, n + 1);
      const id = n === 0 ? base : `${base}-${n}`;
      toc.push({ id, text, level });
      node.properties = { ...node.properties, id };
    });

    (file.data as Record<string, unknown>).toc = toc;
  };
}

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter, ["yaml"])
  .use(() => (_, file) => {
    matter(file);
  })
  .use(remarkRehype)
  .use(rehypeHighlight)
  .use(withHeadingIds);

async function loadPosts(): Promise<Post[]> {
  let files: string[];
  try {
    files = (await readdir(CONTENT_DIR)).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }

  const results = await Promise.all(
    files.map(async (file): Promise<Post | null> => {
      const slug = basename(file, ".md");
      let raw: string;
      try {
        raw = await readFile(join(CONTENT_DIR, file), "utf-8");
      } catch {
        return null;
      }

      let hast: Root;
      let fileObj: VFile;
      try {
        fileObj = new VFile({ value: raw });
        const mdast = processor.parse(fileObj);
        hast = (await processor.run(mdast, fileObj)) as Root;
      } catch {
        return null;
      }

      const fm = fileObj.data.matter as Frontmatter;
      if (fm.draft && process.env.NODE_ENV !== "development") return null;
      if (!fm.title || !fm.date || !fm.excerpt) return null;

      const toc = ((fileObj.data as Record<string, unknown>).toc as TocItem[]) ?? [];

      return {
        slug,
        date: String(fm.date),
        title: fm.title,
        excerpt: fm.excerpt,
        tags: fm.tags ?? [],
        external: fm.external,
        url: fm.url,
        body: hast,
        toc,
      };
    }),
  );

  return (results.filter((p) => p !== null) as Post[]).sort((a, b) => b.date.localeCompare(a.date));
}

export const posts: Post[] = await loadPosts();
