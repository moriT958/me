import { createController } from "remix/router";

import { assetServer } from "../assets.ts";
import { buildRSSFeed } from "../feed.ts";
import { routes } from "../routes.ts";
import { posts as POSTS } from "../content.ts";
import {
  HomePage,
  type HomeProfile,
  type RecentActivity,
} from "../ui/home-page.tsx";
import { ArchivesPage } from "../ui/archives-page.tsx";
import { PostPage } from "../ui/post-page.tsx";
import { PostsPage } from "../ui/posts-page.tsx";
import { TagsPage } from "../ui/tags-page.tsx";

const PROFILE: HomeProfile = {
  user: "Morita Kohei",
  handle: "moriT958",
  role: "Student SWE · 鹿児島",
  bio: "鹿児島大学の M2 大学院生です。Web 技術に興味があります。好きな言語は Go です。",
  links: [
    {
      label: "GitHub",
      url: "github.com/moriT958",
      href: "https://github.com/moriT958",
    },
    { label: "X", url: "@morita_kagshm", href: "https://x.com/morita_kagshm" },
    { label: "RSS", url: "/rss.xml", href: "/rss.xml" },
  ],
};


const ACTIVITIES: RecentActivity[] = [
  {
    date: "2026-05-20",
    title: "Neovim を lazy.nvim 構成へ移行した話",
    href: routes.post.href({ slug: "nvim-lazy-migration" }),
  },
  { date: "2026-05-18", title: "kohei/zk-bridge.nvim", href: "#" },
  {
    date: "2026-05-15",
    title: "「個人ブログを Workers で運用する」",
    href: "#",
  },
  {
    date: "2026-05-11",
    title: "Tailwind v4 で oklch を使い倒す",
    href: routes.post.href({ slug: "tailwind-v4-oklch" }),
  },
  { date: "2026-05-07", title: "『プログラマのための CPU 入門』", href: "#" },
  {
    date: "2026-05-02",
    title: "Bun の Workspace で Monorepo を組む",
    href: routes.post.href({ slug: "bun-workspaces" }),
  },
];

const DEFAULT_VISIBLE_COUNT = 4;
const POSTS_PER_PAGE = 4;
const THEME_COOKIE = "var-card-theme";

export default createController(routes, {
  actions: {
    async assets(context) {
      return (
        (await assetServer.fetch(context.request)) ??
        new Response("Not Found", { status: 404 })
      );
    },
    home(context) {
      const themeName = readThemeName(context.request.headers.get("cookie"));
      const validSlugs = new Set(POSTS.map((p) => p.slug));
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      const activities = ACTIVITIES.filter((a) => {
        if (a.href === "#") return false;
        const match = a.href.match(/^\/posts\/(.+)$/);
        if (match && !validSlugs.has(match[1])) return false;
        return new Date(a.date) >= oneMonthAgo;
      });

      return context.render(
        <HomePage
          profile={PROFILE}
          activities={activities}
          initialCount={DEFAULT_VISIBLE_COUNT}
          themeName={themeName}
          posts={POSTS}
        />,
      );
    },
    posts(context) {
      const url = new URL(context.request.url);
      const page = Math.max(
        0,
        Math.min(
          parseInt(url.searchParams.get("page") ?? "0", 10) || 0,
          Math.ceil(POSTS.length / POSTS_PER_PAGE) - 1,
        ),
      );
      const themeName = readThemeName(context.request.headers.get("cookie"));
      const pagePosts = POSTS.slice(
        page * POSTS_PER_PAGE,
        (page + 1) * POSTS_PER_PAGE,
      );

      return context.render(
        <PostsPage
          posts={pagePosts}
          allPosts={POSTS}
          page={page}
          totalPages={Math.ceil(POSTS.length / POSTS_PER_PAGE)}
          totalCount={POSTS.length}
          themeName={themeName}
        />,
      );
    },
    archives(context) {
      const themeName = readThemeName(context.request.headers.get("cookie"));
      return context.render(
        <ArchivesPage posts={POSTS} themeName={themeName} />,
      );
    },
    post(context) {
      const idx = POSTS.findIndex(
        (entry) => entry.slug === context.params.slug,
      );
      if (idx === -1) {
        return new Response("Not Found", { status: 404 });
      }
      const post = POSTS[idx]!;
      if (post.external && post.url) {
        return Response.redirect(post.url, 302);
      }
      const prevPost = POSTS[idx + 1];
      const nextPost = idx > 0 ? POSTS[idx - 1] : undefined;
      const themeName = readThemeName(context.request.headers.get("cookie"));

      return context.render(
        <PostPage
          post={post}
          prevPost={prevPost}
          nextPost={nextPost}
          themeName={themeName}
          posts={POSTS}
        />,
      );
    },
    rss() {
      const feed = buildRSSFeed(POSTS);
      return new Response(feed.rss2(), {
        headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
      });
    },
    tags(context) {
      const tag = context.params.name;
      const filtered = POSTS.filter((p) => p.tags.includes(tag));
      const themeName = readThemeName(context.request.headers.get("cookie"));

      return context.render(
        <TagsPage
          tag={tag}
          posts={filtered}
          allPosts={POSTS}
          themeName={themeName}
        />,
      );
    },
  },
});

function readThemeName(cookieHeader: string | null): "light" | "dark" {
  if (!cookieHeader) return "light";
  const cookies = cookieHeader.split(";");
  for (const item of cookies) {
    const [rawKey, rawValue] = item.split("=");
    if (!rawKey || !rawValue) continue;
    if (rawKey.trim() !== THEME_COOKIE) continue;
    return rawValue.trim() === "dark" ? "dark" : "light";
  }
  return "light";
}
