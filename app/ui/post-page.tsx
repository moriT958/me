import { css, type Handle } from "remix/ui";

import { routes } from "../routes.ts";
import { ArticleBody } from "../assets/article-body.tsx";
import { Document } from "./document.tsx";
import { Footer } from "./footer.tsx";
import { Header } from "./header.tsx";
import { T } from "../assets/theme.ts";
import type { SearchPost } from "../assets/search-modal.tsx";
import type { Post } from "../content.ts";

export type PostPageProps = {
  post: Post;
  prevPost?: Post;
  nextPost?: Post;
  themeName: "light" | "dark";
  posts: SearchPost[];
};

export function PostPage(handle: Handle<PostPageProps>) {
  return () => {
    const { post, prevPost, nextPost } = handle.props;
    return (
      <Document
        title={`morit958 | ${post.title}`}
        themeName={handle.props.themeName}
      >
        <main mix={pageStyle}>
          <Header
            themeName={handle.props.themeName}
            activePage="posts"
            posts={handle.props.posts}
          />
          <article mix={articleStyle}>
            {/* ← Posts back link */}
            <a rmx-document href={routes.posts.href()} mix={backLinkStyle}>
              ← Posts
            </a>

            <div mix={metaStyle}>{post.date}</div>

            {/* title */}
            <h1 mix={titleStyle}>
              {post.title}
              {post.external && post.url ? (
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  mix={externalMarkStyle}
                >
                  ↗
                </a>
              ) : post.external ? (
                <span mix={externalMarkStyle}>↗</span>
              ) : null}
            </h1>

            {/* tags */}
            <div mix={tagRowStyle}>
              {post.tags.map((tag) => (
                <a
                  key={tag}
                  rmx-document
                  href={routes.tags.href({ name: tag })}
                  mix={tagStyle}
                >
                  <span mix={tagHashStyle}>#</span>
                  {tag}
                </a>
              ))}
            </div>

            {/* body */}
            {post.external ? null : <ArticleBody body={post.body} />}

            {/* prev / next */}
            <div mix={prevNextWrapStyle}>
              {prevPost ? (
                <a
                  rmx-document
                  href={routes.post.href({ slug: prevPost.slug })}
                  mix={prevCardStyle}
                >
                  <div mix={prevNextLabelStyle}>← 前の記事</div>
                  <div mix={prevNextTitleStyle}>{prevPost.title}</div>
                </a>
              ) : (
                <div />
              )}
              {nextPost ? (
                <a
                  rmx-document
                  href={routes.post.href({ slug: nextPost.slug })}
                  mix={nextCardStyle}
                >
                  <div mix={prevNextLabelStyle}>次の記事 →</div>
                  <div mix={prevNextTitleStyle}>{nextPost.title}</div>
                </a>
              ) : (
                <div />
              )}
            </div>
          </article>
          <Footer />
        </main>
      </Document>
    );
  };
}

const pageStyle = css({
  minHeight: "100vh",
  background: T.bg,
  color: T.text,
  display: "grid",
  gridTemplateRows: "auto 1fr auto",
  overflowX: "clip",
});

const articleStyle = css({
  padding: "28px 36px 60px",
  maxWidth: "720px",
  width: "100%",
  margin: "0 auto",
  minWidth: 0,
  overflowX: "clip",
  boxSizing: "border-box",
  "@media (max-width: 640px)": {
    padding: "20px 16px 48px",
  },
});

const backLinkStyle = css({
  color: T.muted,
  fontSize: "12px",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  transition: "color .12s",
  "&:hover": { color: T.fg },
});

const metaStyle = css({
  color: T.muted,
  fontSize: "12px",
  marginTop: "24px",
});

const titleStyle = css({
  margin: "6px 0 10px",
  color: T.fg,
  fontSize: "28px",
  lineHeight: 1.35,
  letterSpacing: "-0.4px",
  fontWeight: 700,
});

const externalMarkStyle = css({
  color: T.muted,
  marginLeft: "5px",
  fontSize: "18px",
});

const tagRowStyle = css({
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
});

const tagStyle = css({
  color: T.accent,
  fontSize: "12px",
  borderBottom: `1px dashed ${T.accent}`,
  paddingBottom: "1px",
  textDecoration: "none",
});

const tagHashStyle = css({ opacity: 0.7 });

const prevNextWrapStyle = css({
  marginTop: "36px",
  paddingTop: "18px",
  borderTop: `1px solid ${T.border}`,
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "12px",
  "@media (max-width: 640px)": {
    gridTemplateColumns: "1fr",
  },
});

const prevCardStyle = css({
  padding: "14px",
  background: T.panel,
  borderRadius: "8px",
  border: `1px solid ${T.border}`,
  color: T.fg,
  textDecoration: "none",
  transition: "border-color .12s",
  "&:hover": { borderColor: T.borderStrong },
});

const nextCardStyle = css({
  padding: "14px",
  background: T.panel,
  borderRadius: "8px",
  border: `1px solid ${T.border}`,
  color: T.fg,
  textDecoration: "none",
  textAlign: "right",
  transition: "border-color .12s",
  "&:hover": { borderColor: T.borderStrong },
});

const prevNextLabelStyle = css({
  color: T.muted,
  fontSize: "11px",
});

const prevNextTitleStyle = css({
  fontSize: "13px",
  marginTop: "3px",
});
