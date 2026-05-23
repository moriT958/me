import { css, type Handle } from "remix/ui";

import { routes } from "../routes.ts";
import { Document } from "./document.tsx";
import { Footer } from "./footer.tsx";
import { Header } from "./header.tsx";
import { T } from "./theme.ts";

export type RecentPost = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  tags: string[];
  read: string;
  external?: boolean;
};

export type PostPageProps = {
  post: RecentPost;
  prevPost?: RecentPost;
  nextPost?: RecentPost;
  themeName: "light" | "dark";
};

export function PostPage(handle: Handle<PostPageProps>) {
  return () => {
    const { post, prevPost, nextPost } = handle.props;
    return (
      <Document title={`Me | ${post.title}`} themeName={handle.props.themeName}>
        <main mix={pageStyle}>
          <Header themeName={handle.props.themeName} activePage="posts" />
          <div mix={contentFillStyle}>
            <article mix={articleStyle}>
              {/* ← Posts back link */}
              <a rmx-document href={routes.posts.href()} mix={backLinkStyle}>
                ← Posts
              </a>

              {/* date · read */}
              <div mix={metaStyle}>
                {post.date} · {post.read}
              </div>

              {/* title */}
              <h1 mix={titleStyle}>
                {post.title}
                {post.external ? <span mix={externalMarkStyle}>↗</span> : null}
              </h1>

              {/* tags */}
              <div mix={tagRowStyle}>
                {post.tags.map((tag) => (
                  <span key={tag} mix={tagStyle}>
                    <span mix={tagHashStyle}>#</span>
                    {tag}
                  </span>
                ))}
              </div>

              {/* body */}
              <div mix={bodyStyle}>
                <p mix={bodyFirstParaStyle}>{post.excerpt}</p>
                <p mix={bodyParaStyle}>
                  この記事はダミーの本文です。実運用では Markdown を SSG
                  でレンダリングする想定です。 PlemolJP Console NF
                  は等幅でありながら和文が読みやすく、コードブロックでも違和感がありません。
                </p>
                <pre mix={codeBlockStyle}>
                  <span mix={codeCommentStyle}>{"// example.ts"}</span>
                  {"\n"}
                  <span mix={codeKeywordStyle}>{"export const"}</span>
                  {" greet = (name: "}
                  <span mix={codeKeywordStyle}>{"string"}</span>
                  {") => {\n  console.log("}
                  <span mix={codeStringStyle}>{"`hello, ${name}`"}</span>
                  {");\n}"}
                </pre>
                <p mix={bodyParaStyle}>
                  見出しや本文には等幅の和文を使うことで、独特のリズムが生まれます。
                  コードと本文のフォントサイズの差を小さくできるので、コードを含む技術記事との相性が良いです。
                </p>
              </div>

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
          </div>
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
  display: "flex",
  flexDirection: "column",
});

const contentFillStyle = css({ flex: 1, minHeight: 0 });

const articleStyle = css({
  padding: "28px 36px 60px",
  maxWidth: "720px",
  margin: "0 auto",
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
});

const tagHashStyle = css({ opacity: 0.7 });

const bodyStyle = css({
  marginTop: "22px",
  color: T.text,
  fontSize: "15px",
  lineHeight: 1.85,
});

const bodyFirstParaStyle = css({ margin: 0 });

const bodyParaStyle = css({ marginTop: "18px" });

const codeBlockStyle = css({
  background: T.panel2,
  border: `1px solid ${T.border}`,
  borderRadius: "8px",
  padding: "14px 18px",
  fontSize: "13px",
  color: T.fg,
  overflow: "auto",
  marginTop: "18px",
  lineHeight: 1.65,
});

const codeCommentStyle = css({ color: T.muted });
const codeKeywordStyle = css({ color: T.accent });
const codeStringStyle = css({ color: "var(--code-string)" });

const prevNextWrapStyle = css({
  marginTop: "36px",
  paddingTop: "18px",
  borderTop: `1px solid ${T.border}`,
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "12px",
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
