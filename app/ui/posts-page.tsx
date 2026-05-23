import { css, type Handle } from "remix/ui";

import { PostsHeading } from "../assets/posts-heading.tsx";
import { routes } from "../routes.ts";
import { Document } from "./document.tsx";
import { Footer } from "./footer.tsx";
import { Header } from "./header.tsx";
import { T } from "./theme.ts";
import type { RecentPost } from "./post-page.tsx";
import type { SearchPost } from "../assets/search-modal.tsx";

export type PostsPageProps = {
  posts: RecentPost[];
  allPosts: SearchPost[];
  page: number;
  totalPages: number;
  totalCount: number;
  themeName: "light" | "dark";
};

export function PostsPage(handle: Handle<PostsPageProps>) {
  return () => (
    <Document title="kohei.dev | Posts" themeName={handle.props.themeName}>
      <main mix={pageStyle}>
        <Header
          themeName={handle.props.themeName}
          activePage="posts"
          posts={handle.props.allPosts}
        />
        <div mix={contentFillStyle}>
          <div mix={contentWrapStyle}>
            <PostsHeading count={handle.props.totalCount} />
            <div mix={listStyle}>
              {handle.props.posts.map((p) => (
                <PostItem key={p.slug} post={p} />
              ))}
            </div>
            <Pager
              page={handle.props.page}
              totalPages={handle.props.totalPages}
            />
          </div>
        </div>
        <Footer />
      </main>
    </Document>
  );
}

type PostItemProps = {
  post: RecentPost;
};

function PostItem(handle: Handle<PostItemProps>) {
  return () => (
    <a
      rmx-document
      href={routes.post.href({ slug: handle.props.post.slug })}
      mix={postItemStyle}
    >
      <div mix={postMetaStyle}>
        <span>{handle.props.post.date}</span>
        <span>·</span>
        <span>{handle.props.post.read}</span>
      </div>
      <h3 mix={postTitleStyle}>
        {handle.props.post.title}
        {handle.props.post.external ? (
          <span mix={externalMarkStyle}>↗</span>
        ) : null}
      </h3>
      <p mix={postExcerptStyle}>{handle.props.post.excerpt}</p>
      <div mix={tagRowStyle}>
        {handle.props.post.tags.map((tag) => (
          <span key={tag} mix={tagStyle}>
            <span mix={tagHashStyle}>#</span>
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}

type PagerProps = {
  page: number;
  totalPages: number;
};

function Pager(handle: Handle<PagerProps>) {
  return () => {
    if (handle.props.totalPages <= 1) return null;
    return (
      <div mix={pagerWrapStyle}>
        {handle.props.page > 0 ? (
          <a
            rmx-document
            href={`${routes.posts.href()}?page=${handle.props.page - 1}`}
            mix={pagerBtnStyle}
          >
            ←
          </a>
        ) : (
          <span mix={pagerBtnDisabledStyle}>←</span>
        )}
        {Array.from({ length: handle.props.totalPages }, (_, i) =>
          i === handle.props.page ? (
            <span key={i} mix={pagerBtnActiveStyle}>
              {i + 1}
            </span>
          ) : (
            <a
              rmx-document
              key={i}
              href={`${routes.posts.href()}?page=${i}`}
              mix={pagerBtnStyle}
            >
              {i + 1}
            </a>
          ),
        )}
        {handle.props.page < handle.props.totalPages - 1 ? (
          <a
            rmx-document
            href={`${routes.posts.href()}?page=${handle.props.page + 1}`}
            mix={pagerBtnStyle}
          >
            →
          </a>
        ) : (
          <span mix={pagerBtnDisabledStyle}>→</span>
        )}
      </div>
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

const contentWrapStyle = css({
  padding: "32px 36px 48px",
  maxWidth: "820px",
  margin: "0 auto",
});

const listStyle = css({
  display: "flex",
  flexDirection: "column",
});

const postItemStyle = css({
  display: "block",
  padding: "18px 8px",
  borderBottom: `1px solid ${T.border}`,
  textDecoration: "none",
  color: T.fg,
  borderRadius: "6px",
  transition: "background .12s",
  "&:hover": { background: T.hoverBg },
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
  color: T.accent,
  fontSize: "12px",
  borderBottom: `1px dashed ${T.accent}`,
  paddingBottom: "1px",
});

const tagHashStyle = css({ opacity: 0.7 });

const pagerWrapStyle = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "6px",
  marginTop: "28px",
  paddingTop: "16px",
});

const pagerBtnStyle = css({
  background: "transparent",
  color: T.muted,
  border: "1px solid transparent",
  borderRadius: "6px",
  padding: "4px 10px",
  fontSize: "13px",
  minWidth: "32px",
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  transition: "color .12s, border-color .12s",
  "&:hover": { color: T.fg, borderColor: T.border },
});

const pagerBtnActiveStyle = css({
  background: T.accentSoft,
  color: T.accent,
  border: `1px solid ${T.accentBorder}`,
  borderRadius: "6px",
  padding: "4px 10px",
  fontSize: "13px",
  minWidth: "32px",
  textAlign: "center",
  display: "inline-block",
});

const pagerBtnDisabledStyle = css({
  background: "transparent",
  color: T.dim,
  border: "1px solid transparent",
  borderRadius: "6px",
  padding: "4px 10px",
  fontSize: "13px",
  minWidth: "32px",
  textAlign: "center",
  display: "inline-block",
});
