import { css, type Handle } from "remix/ui";

import { routes } from "../routes.ts";
import { Document } from "./document.tsx";
import { Footer } from "./footer.tsx";
import { Header } from "./header.tsx";
import { T } from "../assets/theme.ts";
import type { SearchPost } from "../assets/search-modal.tsx";
import type { Post } from "../content.ts";

export type TagsPageProps = {
  tag: string;
  posts: Post[];
  allPosts: SearchPost[];
  themeName: "light" | "dark";
};

export function TagsPage(handle: Handle<TagsPageProps>) {
  return () => {
    const { tag, posts } = handle.props;
    return (
      <Document title={`morit958 | #${tag}`} themeName={handle.props.themeName}>
        <main mix={pageStyle}>
          <Header
            themeName={handle.props.themeName}
            activePage="posts"
            posts={handle.props.allPosts}
          />
          <div mix={contentWrapStyle}>
            <div mix={headingWrapStyle}>
              <div mix={headingStyle}>
                <span mix={promptStyle}>$</span> <span mix={headingMutedStyle}>grep -rl </span>
                <span mix={flagStyle}>"#{tag}"</span>
                <span mix={headingMutedStyle}> posts/</span>
              </div>
              <div mix={subheadStyle}>
                <span>
                  {posts.length} posts tagged <span mix={tagAccentStyle}>#{tag}</span>
                </span>
                <span>·</span>
                <a rmx-document href={routes.posts.href()} mix={backLinkStyle}>
                  ← all posts
                </a>
              </div>
            </div>

            <div mix={listStyle}>
              {posts.map((p) => (
                <div key={p.slug} mix={postItemStyle}>
                  <a
                    rmx-document
                    href={routes.post.href({ slug: p.slug })}
                    mix={cardOverlayStyle}
                  />
                  <div mix={postMetaStyle}>
                    <span>{p.date}</span>
                  </div>
                  <h3 mix={postTitleStyle}>
                    {p.title}
                    {p.external ? <span mix={externalMarkStyle}>↗</span> : null}
                  </h3>
                  <p mix={postExcerptStyle}>{p.excerpt}</p>
                  <div mix={tagRowStyle}>
                    {p.tags.map((tg) => (
                      <a key={tg} rmx-document href={routes.tags.href({ name: tg })} mix={tagStyle}>
                        <span mix={tagHashStyle}>#</span>
                        {tg}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
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
  display: "grid",
  gridTemplateRows: "auto 1fr auto",
});

const contentWrapStyle = css({
  padding: "32px 36px 48px",
  maxWidth: "820px",
  margin: "0 auto",
  "@media (max-width: 640px)": {
    padding: "20px 16px 40px",
  },
});

const headingWrapStyle = css({
  borderBottom: `1px solid ${T.border}`,
  paddingBottom: "14px",
  marginBottom: "4px",
});

const headingStyle = css({
  fontSize: "22px",
  fontWeight: 700,
  color: T.fg,
  letterSpacing: "-0.3px",
});

const promptStyle = css({ color: T.accent });

const headingMutedStyle = css({ color: T.muted });

const flagStyle = css({ color: T.accent });

const subheadStyle = css({
  color: T.muted,
  fontSize: "12px",
  marginTop: "4px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
});

const tagAccentStyle = css({ color: T.accent });

const backLinkStyle = css({
  color: T.muted,
  textDecoration: "none",
  fontSize: "12px",
  transition: "color .12s",
  "&:hover": { color: T.fg },
});

const listStyle = css({
  display: "flex",
  flexDirection: "column",
});

const postItemStyle = css({
  position: "relative",
  padding: "18px 8px",
  borderBottom: `1px solid ${T.border}`,
  borderRadius: "6px",
  transition: "background .12s",
  "&:hover": { background: T.hoverBg },
});

const cardOverlayStyle = css({
  position: "absolute",
  inset: 0,
});

const postMetaStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  color: T.muted,
  fontSize: "12px",
});

const postTitleStyle = css({
  margin: "6px 0",
  color: T.fg,
  fontSize: "17px",
  fontWeight: 600,
  letterSpacing: "-0.2px",
});

const externalMarkStyle = css({
  color: T.muted,
  marginLeft: "5px",
  fontSize: "13px",
});

const postExcerptStyle = css({
  margin: 0,
  color: T.text,
  fontSize: "13px",
  lineHeight: 1.7,
});

const tagRowStyle = css({
  marginTop: "10px",
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
});

const tagStyle = css({
  position: "relative",
  color: T.accent,
  fontSize: "12px",
  borderBottom: `1px dashed ${T.accent}`,
  paddingBottom: "1px",
  textDecoration: "none",
});

const tagHashStyle = css({ opacity: 0.7 });
