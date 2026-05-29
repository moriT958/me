import { readdir, readFile } from "node:fs/promises";
import { join, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import { matter } from "vfile-matter";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

export type Post = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  tags: string[];
  external?: boolean;
  url?: string;
  body: string;
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

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter, ["yaml"])
  .use(() => (_, file) => {
    matter(file);
  })
  .use(remarkRehype)
  .use(rehypeHighlight)
  .use(rehypeStringify);

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
      let vfile;
      try {
        vfile = await processor.process(raw);
      } catch {
        return null;
      }
      const fm = vfile.data.matter as Frontmatter;
      if (fm.draft && process.env.NODE_ENV !== "development") return null;
      if (!fm.title || !fm.date || !fm.excerpt) return null;
      return {
        slug,
        date: String(fm.date),
        title: fm.title,
        excerpt: fm.excerpt,
        tags: fm.tags ?? [],
        external: fm.external,
        url: fm.url,
        body: String(vfile),
      };
    }),
  );

  return (results.filter((p) => p !== null) as Post[]).sort((a, b) => b.date.localeCompare(a.date));
}

export const posts: Post[] = await loadPosts();
