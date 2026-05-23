import { createController, RequestContext } from "remix/router";

import { assetServer } from "../assets.ts";
import { routes } from "../routes.ts";
import {
  HomePage,
  type HomeProfile,
  type RecentActivity,
} from "../ui/home-page.tsx";
import { ArchivesPage } from "../ui/archives-page.tsx";
import { PostPage, type RecentPost } from "../ui/post-page.tsx";
import { PostsPage } from "../ui/posts-page.tsx";

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
    { label: "RSS", url: "/feed.xml", href: "#" }, // TODO: Add feed.xml
  ],
};

const POSTS: RecentPost[] = [
  {
    slug: "nvim-lazy-migration",
    date: "2026-05-19",
    title: "Neovim を lazy.nvim 構成へ移行した話",
    tags: ["nvim", "dotfiles"],
    read: "8 min",
    excerpt:
      "packer.nvim から lazy.nvim へ移行するときに踏んだ罠と、起動時間を 410ms → 90ms まで削った経緯について書きます。",
  },
  {
    slug: "tailwind-v4-oklch",
    date: "2026-05-11",
    title: "Tailwind v4 で oklch を使い倒す",
    tags: ["css", "frontend"],
    read: "6 min",
    excerpt:
      "v4 から CSS-first の設定になり、color-mix と oklch でテーマシステムを書くと驚くほど短くなる。実例をいくつか。",
  },
  {
    slug: "bun-workspaces",
    date: "2026-05-02",
    title: "Bun の Workspace で Monorepo を組む",
    tags: ["bun", "monorepo"],
    read: "10 min",
    excerpt:
      "Bun 1.2 の workspaces は pnpm を置き換えられるか? 実プロジェクトで2週間運用したログ。",
  },
  {
    slug: "rust-tmux-statusbar",
    date: "2026-04-24",
    title: "Rust で自作 tmux ステータスバーを書く",
    tags: ["rust", "tmux"],
    read: "12 min",
    excerpt:
      "シェルスクリプトの限界を感じたので Rust に書き換え。tokio + watch チャネルで省電力な常駐型に。",
  },
  {
    slug: "ts-strict-indexed-access",
    date: "2026-04-15",
    title: "tsconfig: noUncheckedIndexedAccess を有効化した",
    tags: ["typescript"],
    read: "5 min",
    excerpt:
      "後から有効化するときの差分の規模、Record<string, T> のリファクタ指針、配列アクセスの書き換えパターン。",
  },
  {
    slug: "plemoljp-macos-setup",
    date: "2026-04-03",
    title: "PlemolJP を macOS で快適に使う設定",
    tags: ["font", "setup"],
    read: "4 min",
    excerpt:
      "Console NF を kitty / Ghostty / VS Code で揃える。Nerd Font グリフが効くフォールバック順の指定方法。",
  },
  {
    slug: "cf-workers-blog",
    date: "2026-03-22",
    title: "Cloudflare Workers で個人ブログを配信する",
    tags: ["cloudflare", "infra"],
    read: "9 min",
    external: true,
    excerpt:
      "静的サイトをただ置くだけでなく、Workers KV で view counter と OGP 動的生成までやる。",
  },
  {
    slug: "react-useactionstate",
    date: "2026-03-08",
    title: "React 19 の useActionState を試した",
    tags: ["react"],
    read: "7 min",
    external: true,
    excerpt:
      "useFormState がリネーム+拡張された。Server Action と組むときの楽さと、まだ辛い部分について。",
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
