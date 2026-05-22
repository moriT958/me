import { css, type RemixNode } from "remix/ui";

import { routes } from "../routes.ts";

export type DocumentProps = {
  children?: RemixNode;
  head?: RemixNode;
  title?: string;
  themeName: "light" | "dark";
};

const DEFAULT_TITLE = readAppDisplayName("Me");

export function Document() {
  return ({
    children,
    head,
    title = DEFAULT_TITLE,
    themeName,
  }: DocumentProps) => (
    <html lang="ja" data-theme={themeName}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="stylesheet" href="/styles/global.css" />
        <script src="/scripts/theme-bootstrap.js"></script>
        <title>{title}</title>
        {head}
      </head>
      <body mix={bodyStyle}>
        {children}
        <script
          type="module"
          src={routes.assets.href({ path: "app/assets/entry.ts" })}
        ></script>
      </body>
    </html>
  );
}

const bodyStyle = css({ margin: 0 });

function readAppDisplayName(value: string): string {
  return value.startsWith("%%") ? "Remix App" : decodeURIComponent(value);
}
