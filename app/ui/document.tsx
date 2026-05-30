import { css, type Handle, type RemixNode } from "remix/ui";

import { entryHref } from "../assets.ts";

export type DocumentProps = {
  children?: RemixNode;
  head?: RemixNode;
  title?: string;
};

const DEFAULT_TITLE = readAppDisplayName("morit958");

const THEME_BOOTSTRAP_SCRIPT = `(function(){var cookies=document.cookie.split(";");for(var i=0;i<cookies.length;i++){var parts=cookies[i].trim().split("=");if(parts[0]==="var-card-theme"){if(parts[1]==="dark"||parts[1]==="light"){document.documentElement.setAttribute("data-theme",parts[1]);}break;}}})();`;

const GLOBAL_STYLES = `
@font-face {
  font-family: "PlemolJP Console NF";
  src: url("/fonts/plemol-jp.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
* { box-sizing: border-box; }
@keyframes border-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes blob-drift-1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  40% { transform: translate(28px, -22px) scale(1.07); }
  70% { transform: translate(-18px, 16px) scale(0.93); }
}
@keyframes blob-drift-2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  35% { transform: translate(-22px, 18px) scale(0.95); }
  65% { transform: translate(24px, -14px) scale(1.05); }
}
@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
@keyframes posts-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
`;

export function Document(handle: Handle<DocumentProps>) {
  return () => (
    <html lang="ja" data-theme="light" mix={htmlStyle}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link
          rel="preload"
          as="font"
          href="/fonts/plemol-jp.woff2"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <style>{GLOBAL_STYLES}</style>
        <script innerHTML={THEME_BOOTSTRAP_SCRIPT}></script>
        <title>{handle.props.title ?? DEFAULT_TITLE}</title>
        {handle.props.head}
      </head>
      <body mix={bodyStyle}>
        {handle.props.children}
        <script type="module" src={entryHref}></script>
      </body>
    </html>
  );
}

const htmlStyle = css({
  "--bg": "#ffffff",
  "--panel": "#fafaf7",
  "--panel2": "#f4f3ec",
  "--border": "#e8e6df",
  "--border-strong": "#d6d3ca",
  "--fg": "#08060d",
  "--text": "#3d3946",
  "--muted": "#6b6375",
  "--dim": "#9c97a4",
  "--accent": "#aa3bff",
  "--accent-soft": "rgba(170, 59, 255, 0.1)",
  "--accent-border": "rgba(170, 59, 255, 0.35)",
  "--hover-bg": "rgba(0, 0, 0, 0.04)",
  "--code-string": "#52a447",
  "--hero-blob-secondary": "#ff7eb3",
  "--hero-blob-secondary-opacity": "0.18",
  "--hero-shell-bg": "rgba(240, 238, 255, 0.52)",
  "--hero-ring-gradient":
    "conic-gradient(from 0deg, transparent 30%, rgba(170, 59, 255, 0.6) 48%, #ffffff 50%, rgba(170, 59, 255, 0.6) 52%, transparent 70%)",
  "--hero-inner-bg": "rgba(248, 246, 255, 0.68)",
  "--hero-mouse-glow": "rgba(170, 59, 255, 0.22)",
  "--hero-avatar-gradient": "linear-gradient(135deg, var(--accent), #ff8a3b)",
  "--hero-pill-border": "rgba(0, 0, 0, 0.07)",
  "--hero-pill-bg": "rgba(255, 255, 255, 0.55)",
  "--search-overlay-bg": "rgba(0, 0, 0, 0.25)",
  "--search-panel-bg": "rgba(255, 255, 255, 0.97)",
  "&[data-theme='dark']": {
    "--bg": "#15161d",
    "--panel": "#1c1d26",
    "--panel2": "#23242f",
    "--border": "#2e303a",
    "--border-strong": "#3a3c48",
    "--fg": "#f3f4f6",
    "--text": "#cdd0d9",
    "--muted": "#9ca3af",
    "--dim": "#6c707a",
    "--accent": "#c084fc",
    "--accent-soft": "rgba(192, 132, 252, 0.14)",
    "--accent-border": "rgba(192, 132, 252, 0.42)",
    "--hover-bg": "rgba(255, 255, 255, 0.05)",
    "--code-string": "#9ece6a",
    "--hero-blob-secondary": "#5b8aff",
    "--hero-blob-secondary-opacity": "0.22",
    "--hero-shell-bg": "rgba(12, 12, 22, 0.52)",
    "--hero-ring-gradient":
      "conic-gradient(from 0deg, transparent 30%, rgba(192, 132, 252, 0.8) 48%, rgba(255, 255, 255, 0.33) 50%, rgba(192, 132, 252, 0.8) 52%, transparent 70%)",
    "--hero-inner-bg": "rgba(12, 12, 22, 0.68)",
    "--hero-mouse-glow": "rgba(192, 132, 252, 0.22)",
    "--hero-avatar-gradient": "linear-gradient(135deg, var(--accent), #5b8aff)",
    "--hero-pill-border": "rgba(255, 255, 255, 0.1)",
    "--hero-pill-bg": "rgba(255, 255, 255, 0.06)",
    "--search-overlay-bg": "rgba(0, 0, 0, 0.6)",
    "--search-panel-bg": "rgba(22, 22, 34, 0.96)",
  },
});

const bodyStyle = css({
  margin: 0,
  padding: 0,
  fontFamily: '"PlemolJP Console NF", ui-monospace, Consolas, monospace',
  fontVariantLigatures: "contextual",
  background: "var(--bg)",
  color: "var(--text)",
});

function readAppDisplayName(value: string): string {
  return value.startsWith("%%") ? "Remix App" : decodeURIComponent(value);
}
