// shared.jsx (v2) — friendlier UI: light/dark only + content + small hooks

// ─── Themes (2) ───────────────────────────────────────────────────────────
const THEMES = {
  light: {
    label: "light",
    bg: "#ffffff",
    panel: "#fafaf7",       // soft warm white panels
    panel2: "#f4f3ec",      // code bg / second surface
    border: "#e8e6df",
    borderStrong: "#d6d3ca",
    fg: "#08060d",
    text: "#3d3946",
    muted: "#6b6375",
    dim: "#9c97a4",
    accent: "#aa3bff",
    accentSoft: "rgba(170,59,255,0.10)",
    accentBorder: "rgba(170,59,255,0.35)",
    cardShadow: "0 1px 2px rgba(0,0,0,0.03), 0 4px 16px -8px rgba(40,30,60,0.10)",
    hoverBg: "rgba(0,0,0,0.04)",
    isDark: false,
  },
  dark: {
    label: "dark",
    bg: "#15161d",
    panel: "#1c1d26",
    panel2: "#23242f",
    border: "#2e303a",
    borderStrong: "#3a3c48",
    fg: "#f3f4f6",
    text: "#cdd0d9",
    muted: "#9ca3af",
    dim: "#6c707a",
    accent: "#c084fc",
    accentSoft: "rgba(192,132,252,0.14)",
    accentBorder: "rgba(192,132,252,0.42)",
    cardShadow: "0 1px 2px rgba(0,0,0,0.25), 0 8px 24px -10px rgba(0,0,0,0.45)",
    hoverBg: "rgba(255,255,255,0.05)",
    isDark: true,
  },
};

// ─── Content ──────────────────────────────────────────────────────────────
const POSTS = [
  { slug: "nvim-lazy-migration", date: "2026-05-19", title: "Neovim を lazy.nvim 構成へ移行した話",
    tags: ["nvim", "dotfiles"], read: "8 min",
    excerpt: "packer.nvim から lazy.nvim へ移行するときに踏んだ罠と、起動時間を 410ms → 90ms まで削った経緯について書きます。" },
  { slug: "tailwind-v4-oklch", date: "2026-05-11", title: "Tailwind v4 で oklch を使い倒す",
    tags: ["css", "frontend"], read: "6 min",
    excerpt: "v4 から CSS-first の設定になり、color-mix と oklch でテーマシステムを書くと驚くほど短くなる。実例をいくつか。" },
  { slug: "bun-workspaces", date: "2026-05-02", title: "Bun の Workspace で Monorepo を組む",
    tags: ["bun", "monorepo"], read: "10 min",
    excerpt: "Bun 1.2 の workspaces は pnpm を置き換えられるか? 実プロジェクトで2週間運用したログ。" },
  { slug: "rust-tmux-statusbar", date: "2026-04-24", title: "Rust で自作 tmux ステータスバーを書く",
    tags: ["rust", "tmux"], read: "12 min",
    excerpt: "シェルスクリプトの限界を感じたので Rust に書き換え。tokio + watch チャネルで省電力な常駐型に。" },
  { slug: "ts-strict-indexed-access", date: "2026-04-15", title: "tsconfig: noUncheckedIndexedAccess を有効化した",
    tags: ["typescript"], read: "5 min",
    excerpt: "後から有効化するときの差分の規模、Record<string, T> のリファクタ指針、配列アクセスの書き換えパターン。" },
  { slug: "plemoljp-macos-setup", date: "2026-04-03", title: "PlemolJP を macOS で快適に使う設定",
    tags: ["font", "setup"], read: "4 min",
    excerpt: "Console NF を kitty / Ghostty / VS Code で揃える。Nerd Font グリフが効くフォールバック順の指定方法。" },
  { slug: "cf-workers-blog", date: "2026-03-22", title: "Cloudflare Workers で個人ブログを配信する",
    tags: ["cloudflare", "infra"], read: "9 min", external: true,
    excerpt: "静的サイトをただ置くだけでなく、Workers KV で view counter と OGP 動的生成までやる。" },
  { slug: "react-useactionstate", date: "2026-03-08", title: "React 19 の useActionState を試した",
    tags: ["react"], read: "7 min", external: true,
    excerpt: "useFormState がリネーム+拡張された。Server Action と組むときの楽さと、まだ辛い部分について。" },
];

const TAGS = (() => {
  const map = {};
  POSTS.forEach(p => p.tags.forEach(t => { map[t] = (map[t] || 0) + 1; }));
  return Object.entries(map).map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
})();

const WHOAMI = {
  user: "kohei",
  handle: "@kohei",
  role: "Software Engineer · 京都",
  bio: "TypeScript と Rust と Neovim と PlemolJP が好物。最近は Cloudflare 上で全部済ませようとしている小市民。",
  links: [
    { icon: "", label: "GitHub",   url: "github.com/kohei",        href: "#" },
    { icon: "", label: "Bluesky",  url: "@kohei.bsky.social",      href: "#" },
    { icon: "", label: "Email",    url: "kohei@ratatoskr.dev",     href: "#" },
    { icon: "", label: "RSS",      url: "/feed.xml",               href: "#" },
  ],
};

// "Recent activities" – short timeline that decorates the home page
const ACTIVITIES = [
  { date: "2026-05-20", icon: "", kind: "post",    title: "Neovim を lazy.nvim 構成へ移行した話", note: "起動時間 410ms → 90ms", slug: "nvim-lazy-migration" },
  { date: "2026-05-18", icon: "", kind: "git",     title: "kohei/zk-bridge.nvim",                   note: "v0.3.0 をタグ付け · 7 commits", },
  { date: "2026-05-15", icon: "", kind: "talk",    title: "「個人ブログを Workers で運用する」", note: "京都 Web Meetup #12 で発表" },
  { date: "2026-05-11", icon: "", kind: "post",    title: "Tailwind v4 で oklch を使い倒す",        note: "実例 3 本収録", slug: "tailwind-v4-oklch" },
  { date: "2026-05-07", icon: "", kind: "book",    title: "『プログラマのための CPU 入門』",          note: "第 3 章まで読了" },
  { date: "2026-05-02", icon: "", kind: "post",    title: "Bun の Workspace で Monorepo を組む",    note: "pnpm との比較メモ", slug: "bun-workspaces" },
];

const KIND_COLORS = (t) => ({
  post: t.accent,
  git:  t.isDark ? "#9ece6a" : "#52a447",
  talk: t.isDark ? "#7dcfff" : "#1f8ad6",
  book: t.isDark ? "#e0af68" : "#c87b14",
});

// ─── Hooks ────────────────────────────────────────────────────────────────
function useTyping(text, { speed = 28, start = 0, enabled = true } = {}) {
  const [n, setN] = React.useState(enabled ? 0 : text.length);
  const ivRef = React.useRef(null);
  React.useEffect(() => {
    if (!enabled) { setN(text.length); return; }
    setN(0);
    let i = 0;
    const t0 = setTimeout(() => {
      ivRef.current = setInterval(() => {
        i++;
        setN(i);
        if (i >= text.length && ivRef.current) clearInterval(ivRef.current);
      }, speed);
    }, start);
    return () => { clearTimeout(t0); if (ivRef.current) clearInterval(ivRef.current); };
  }, [text, speed, start, enabled]);
  return text.slice(0, n);
}

function usePersistentTheme(key, fallback = "light") {
  const [name, setName] = React.useState(() => {
    try {
      const v = localStorage.getItem(key);
      if (v && THEMES[v]) return v;
    } catch (e) {}
    return fallback;
  });
  React.useEffect(() => {
    try { localStorage.setItem(key, name); } catch (e) {}
  }, [key, name]);
  return [name, setName, THEMES[name]];
}

// ─── Small reusable bits ─────────────────────────────────────────────────
function Avatar({ size = 56, t }) {
  // Friendly placeholder avatar: gradient disc with the user initial
  const initial = WHOAMI.user[0].toUpperCase();
  const fontSize = Math.round(size * 0.46);
  const bg1 = t.accent;
  const bg2 = t.isDark ? "#5b8aff" : "#ff8a3b";
  return (
    <div style={{
      width: size, height: size, borderRadius: size,
      background: `linear-gradient(135deg, ${bg1}, ${bg2})`,
      color: "#fff",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 600, fontSize,
      boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.15)",
      flex: "0 0 auto",
      letterSpacing: -1,
    }}>
      {initial}
    </div>
  );
}

function ThemeToggle({ value, onChange, t }) {
  const next = value === "light" ? "dark" : "light";
  return (
    <button
      onClick={() => onChange(next)}
      aria-label="theme"
      style={{
        background: "transparent",
        border: `1px solid ${t.border}`,
        color: t.muted,
        borderRadius: 999,
        padding: "5px 12px",
        fontFamily: "inherit",
        fontSize: 12,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        transition: "color .15s, border-color .15s",
      }}
      onMouseEnter={e => { e.currentTarget.style.color = t.fg; e.currentTarget.style.borderColor = t.borderStrong; }}
      onMouseLeave={e => { e.currentTarget.style.color = t.muted; e.currentTarget.style.borderColor = t.border; }}
    >
      <span style={{ color: t.accent }}>{value === "light" ? "" : ""}</span>
      {value}
    </button>
  );
}

function TagPill({ name, t, onClick, small = false }) {
  const style = {
    display: "inline-flex", alignItems: "baseline", gap: 2,
    padding: small ? "1px 8px" : "3px 10px",
    borderRadius: 999,
    fontSize: small ? 11 : 12,
    color: t.accent,
    background: t.accentSoft,
    border: `1px solid ${t.accentBorder}`,
    textDecoration: "none",
    lineHeight: small ? 1.5 : 1.7,
  };
  if (onClick) {
    return (
      <a href="#" onClick={e => { e.preventDefault(); e.stopPropagation(); onClick(name); }} style={style}>
        <span style={{ opacity: 0.7 }}>#</span>{name}
      </a>
    );
  }
  return (
    <span style={style}>
      <span style={{ opacity: 0.7 }}>#</span>{name}
    </span>
  );
}

function NavLink({ label, active, onClick, t, icon }) {
  return (
    <button onClick={onClick} style={{
      background: "transparent",
      border: "none",
      color: active ? t.fg : t.muted,
      fontFamily: "inherit",
      fontSize: 13,
      cursor: "pointer",
      padding: "6px 4px",
      borderBottom: active ? `2px solid ${t.accent}` : "2px solid transparent",
      display: "inline-flex", alignItems: "center", gap: 6,
      transition: "color .15s",
    }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.color = t.fg; }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.color = t.muted; }}
    >
      {icon && <span style={{ color: active ? t.accent : t.dim }}>{icon}</span>}
      {label}
    </button>
  );
}

Object.assign(window, {
  THEMES, POSTS, TAGS, WHOAMI, ACTIVITIES, KIND_COLORS,
  useTyping, usePersistentTheme,
  Avatar, ThemeToggle, TagPill, NavLink,
});
