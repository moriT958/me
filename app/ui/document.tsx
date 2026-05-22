import { css, type RemixNode } from 'remix/ui'

import { routes } from '../routes.ts'

export type DocumentProps = {
  children?: RemixNode
  head?: RemixNode
  title?: string
}

const DEFAULT_TITLE = readAppDisplayName('Me')

export function Document() {
  return ({ children, head, title = DEFAULT_TITLE }: DocumentProps) => (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="stylesheet" href="/styles/global.css" />
        <title>{title}</title>
        {head}
      </head>
      <body mix={bodyStyle}>
        {children}
        <script type="module" src={routes.assets.href({ path: 'app/assets/entry.ts' })}></script>
      </body>
    </html>
  )
}

const bodyStyle = css({ margin: 0 })

function readAppDisplayName(value: string): string {
  return value.startsWith('%%') ? 'Remix App' : decodeURIComponent(value)
}
