import { createController } from "remix/router";

import { assetServer } from "../assets.ts";
import { routes } from "../routes.ts";
import { HomePage } from "../ui/home-page.tsx";
import type {
  HomeProfile,
  RecentActivity,
  RecentPost,
} from "../ui/home-types.ts";
import { PostPage } from "../ui/post-page.tsx";

const PROFILE: HomeProfile = {
  user: "Morita Kohei",
  handle: "moriT958",
  role: "Student SWE · 鹿児島",
  bio: "TypeScript と Rust と Neovim と PlemolJP が好物。最近は Cloudflare 上で全部済ませようとしている小市民。",
  links: [
    {
      label: "GitHub",
      url: "github.com/moriT958",
      href: "https://github.com/moriT958",
    },
    { label: "X", url: "@kohei.bsky.social", href: "#" },
    { label: "Email", url: "kohei@ratatoskr.dev", href: "#" },
    { label: "RSS", url: "/feed.xml", href: "#" },
  ],
};

const POSTS: RecentPost[] = [
  {
    slug: "nvim-lazy-migration",
    date: "2026-05-20",
    title: "Neovim を lazy.nvim 構成へ移行した話",
    excerpt:
      "起動時間 410ms → 90ms まで削減した構成と、移行時のハマりどころをまとめました。",
  },
  {
    slug: "tailwind-v4-oklch",
    date: "2026-05-11",
    title: "Tailwind v4 で oklch を使い倒す",
    excerpt:
      "CSS-first 設定と color-mix を使った、軽量なテーマ設計の実例メモです。",
  },
  {
    slug: "bun-workspaces",
    date: "2026-05-02",
    title: "Bun の Workspace で Monorepo を組む",
    excerpt:
      "2週間運用した際の依存管理・CI・ローカル体験の差分を比較しました。",
  },
];

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
      const url = new URL(context.request.url);
      const expanded = url.searchParams.get("more") === "1";
      const themeName = readThemeName(context.request.headers.get("cookie"));

      return context.render(
        <HomePage
          profile={PROFILE}
          activities={ACTIVITIES}
          visibleCount={expanded ? ACTIVITIES.length : DEFAULT_VISIBLE_COUNT}
          showMore={expanded ? null : "?more=1"}
          themeName={themeName}
        />,
      );
    },
    post(context) {
      const post = POSTS.find((entry) => entry.slug === context.params.slug);
      const themeName = readThemeName(context.request.headers.get("cookie"));
      if (!post) {
        return new Response("Not Found", { status: 404 });
      }

      return context.render(<PostPage post={post} themeName={themeName} />);
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
