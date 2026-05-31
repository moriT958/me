import { css, type Handle, type RemixNode } from "remix/ui";
import { light as L, dark as D } from "ayu";

import { entryHref, preloadHrefs } from "../assets.ts";

type AyuColor = { hex(): string; alpha(v: number): AyuColor };
const h = (c: AyuColor) => c.hex();
const a = (c: AyuColor, v: number) => c.alpha(v).hex();

type DocumentProps = {
  children?: RemixNode;
  head?: RemixNode;
  title?: string;
  description?: string;
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
@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
`;

export function Document(handle: Handle<DocumentProps>) {
  return () => (
    <html lang="ja" data-theme="light" mix={htmlStyle}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {handle.props.description && <meta name="description" content={handle.props.description} />}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link
          rel="preload"
          as="font"
          href="/fonts/plemol-jp.woff2"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <style>{GLOBAL_STYLES}</style>
        {preloadHrefs.map((href) => (
          <link key={href} rel="modulepreload" href={href} />
        ))}
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
  // ayu light — values from ayu package
  "--bg": h(L.ui.bg),
  "--panel": h(L.ui.panel.bg),
  "--panel2": h(L.ui.bg.darken(0.05)),
  "--border": h(L.ui.line),
  "--border-strong": a(L.ui.line, 0.28),
  "--fg": h(L.editor.fg),
  "--text": h(L.editor.fg),
  "--muted": h(L.ui.fg),
  "--dim": h(L.syntax.comment),
  "--accent": h(L.common.accent.tint),
  "--accent-soft": a(L.common.accent.tint, 0.1),
  "--accent-border": a(L.common.accent.tint, 0.35),
  "--hover-bg": a(L.ui.line, 0.06),
  "--code-string": h(L.syntax.string),
  "--code-func": h(L.syntax.func),
  "--code-keyword": h(L.syntax.keyword),
  "--blue": h(L.syntax.entity),
  "--teal": h(L.syntax.regexp),
  "--purple": h(L.syntax.constant),
  "--red": h(L.syntax.markup),
  "--hero-shell-bg": a(L.common.accent.tint, 0.15),
  "--hero-ring-gradient": `conic-gradient(from 0deg, transparent 30%, ${a(L.common.accent.tint, 0.6)} 48%, #ffffff 50%, ${a(L.common.accent.tint, 0.6)} 52%, transparent 70%)`,
  "--hero-inner-bg": "var(--bg)",
  "--hero-pill-border": a(L.ui.line, 0.12),
  "--hero-pill-bg": a(L.ui.panel.bg, 0.55),
  "--search-overlay-bg": "rgba(0, 0, 0, 0.25)",
  "--search-panel-bg": a(L.ui.panel.bg, 0.97),
  "&[data-theme='dark']": {
    // ayu dark — values from ayu package
    "--bg": h(D.ui.bg),
    "--panel": h(D.ui.panel.bg),
    "--panel2": h(D.editor.bg),
    "--border": h(D.ui.line),
    "--border-strong": h(D.ui.line.brighten(0.3)),
    "--fg": h(D.editor.fg),
    "--text": h(D.editor.fg),
    "--muted": h(D.ui.fg),
    "--dim": h(D.syntax.comment),
    "--accent": h(D.common.accent.tint),
    "--accent-soft": a(D.common.accent.tint, 0.14),
    "--accent-border": a(D.common.accent.tint, 0.42),
    "--hover-bg": a(D.editor.fg, 0.05),
    "--code-string": h(D.syntax.string),
    "--code-func": h(D.syntax.func),
    "--code-keyword": h(D.syntax.keyword),
    "--blue": h(D.syntax.entity),
    "--teal": h(D.syntax.regexp),
    "--purple": h(D.syntax.constant),
    "--red": h(D.syntax.markup),
    "--hero-shell-bg": a(D.common.accent.tint, 0.12),
    "--hero-ring-gradient": `conic-gradient(from 0deg, transparent 30%, ${a(D.common.accent.tint, 0.8)} 48%, rgba(255,255,255,0.33) 50%, ${a(D.common.accent.tint, 0.8)} 52%, transparent 70%)`,
    "--hero-inner-bg": "var(--bg)",
    "--hero-pill-border": a(D.editor.fg, 0.1),
    "--hero-pill-bg": a(D.editor.fg, 0.06),
    "--search-overlay-bg": "rgba(0, 0, 0, 0.6)",
    "--search-panel-bg": a(D.ui.panel.bg, 0.96),
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
