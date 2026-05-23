import { css, type Handle, type RemixNode } from "remix/ui";

import { routes } from "../routes.ts";

export type DocumentProps = {
  children?: RemixNode;
  head?: RemixNode;
  title?: string;
  themeName: "light" | "dark";
};

const DEFAULT_TITLE = readAppDisplayName("morit958");

export function Document(handle: Handle<DocumentProps>) {
  return () => (
    <html lang="ja" data-theme={handle.props.themeName}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="stylesheet" href="/styles/global.css" />
        <script src="/scripts/theme-bootstrap.js"></script>
        <title>{handle.props.title ?? DEFAULT_TITLE}</title>
        {handle.props.head}
      </head>
      <body mix={bodyStyle}>
        {handle.props.children}
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
