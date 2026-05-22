import { css } from "remix/ui";

import { routes } from "../routes.ts";
import { Document } from "./document.tsx";
import { type PostPageProps } from "./home-types.ts";
import { Footer } from "./footer.tsx";
import { Header } from "./header.tsx";
import { T } from "./theme.ts";

export function PostPage() {
  return ({ post }: PostPageProps) => (
    <Document title={`Me | ${post.title}`}>
      <main mix={pageStyle}>
        <Header />
        <div mix={contentFillStyle}>
          <article mix={articleStyle}>
            <a rmx-document href={routes.home.href()} mix={backLinkStyle}>
              ← Home
            </a>
            <p mix={metaStyle}>{post.date}</p>
            <h1 mix={titleStyle}>{post.title}</h1>
            <p mix={excerptStyle}>{post.excerpt}</p>
          </article>
        </div>
        <Footer />
      </main>
    </Document>
  );
}

const pageStyle = css({
  minHeight: "100vh",
  background: T.bg,
  color: T.text,
  display: "flex",
  flexDirection: "column",
});

const contentFillStyle = css({
  flex: 1,
  minHeight: 0,
});

const articleStyle = css({
  maxWidth: "820px",
  margin: "0 auto",
  padding: "36px 36px 48px",
});

const backLinkStyle = css({
  color: T.muted,
  textDecoration: "none",
  fontSize: "12px",
});

const metaStyle = css({
  margin: "20px 0 4px",
  color: T.muted,
  fontSize: "12px",
});

const titleStyle = css({
  margin: 0,
  color: T.fg,
  fontSize: "28px",
  letterSpacing: "-0.4px",
});

const excerptStyle = css({
  marginTop: "12px",
  fontSize: "15px",
  lineHeight: 1.8,
});
