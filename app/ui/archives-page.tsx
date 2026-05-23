import { css, type Handle } from "remix/ui";

import { ArchivesHeading } from "../assets/archives-heading.tsx";
import { routes } from "../routes.ts";
import { Document } from "./document.tsx";
import { Footer } from "./footer.tsx";
import { Header } from "./header.tsx";
import { T } from "./theme.ts";
import type { RecentPost } from "./post-page.tsx";

export type ArchivesPageProps = {
  posts: RecentPost[];
  themeName: "light" | "dark";
};

type YearGroup = {
  year: string;
  posts: RecentPost[];
};

export function ArchivesPage(handle: Handle<ArchivesPageProps>) {
  return () => {
    const byYear = handle.props.posts.reduce<Record<string, RecentPost[]>>(
      (acc, p) => {
        const y = p.date.slice(0, 4);
        if (!acc[y]) acc[y] = [];
        acc[y]!.push(p);
        return acc;
      },
      {},
    );

    const yearGroups: YearGroup[] = Object.keys(byYear)
      .sort((a, b) => Number(b) - Number(a))
      .map((year) => ({ year, posts: byYear[year]! }));

    return (
      <Document title="kohei.dev | Archives" themeName={handle.props.themeName}>
        <main mix={pageStyle}>
          <Header themeName={handle.props.themeName} activePage="archives" />
          <div mix={contentFillStyle}>
            <div mix={contentWrapStyle}>
              <ArchivesHeading count={handle.props.posts.length} />
              <div mix={listStyle}>
                {yearGroups.map(({ year, posts }) => (
                  <YearSection key={year} year={year} posts={posts} />
                ))}
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </Document>
    );
  };
}

type YearSectionProps = {
  year: string;
  posts: RecentPost[];
};

function YearSection(handle: Handle<YearSectionProps>) {
  return () => (
    <div mix={yearGroupStyle}>
      <div mix={yearLabelStyle}>{handle.props.year}</div>
      {handle.props.posts.map((p, i) => (
        <ArchiveRow key={p.slug} post={p} isFirst={i === 0} />
      ))}
    </div>
  );
}

type ArchiveRowProps = {
  post: RecentPost;
  isFirst: boolean;
};

function ArchiveRow(handle: Handle<ArchiveRowProps>) {
  return () => {
    const { post, isFirst } = handle.props;
    const monthDay = post.date.slice(5);
    return (
      <a
        rmx-document
        href={routes.post.href({ slug: post.slug })}
        mix={rowStyle}
        style={{ borderTop: isFirst ? "none" : `1px solid ${T.border}` }}
      >
        <span mix={dateStyle}>{monthDay}</span>
        <span mix={titleStyle}>
          {post.title}
          {post.external ? <span mix={externalMarkStyle}>↗</span> : null}
        </span>
      </a>
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

const listStyle = css({ marginTop: "4px" });

const yearGroupStyle = css({ marginTop: "24px" });

const yearLabelStyle = css({
  color: T.accent,
  fontSize: "13px",
  fontWeight: 600,
  marginBottom: "4px",
});

const rowStyle = css({
  display: "grid",
  gridTemplateColumns: "82px 1fr",
  gap: "14px",
  padding: "8px 6px",
  textDecoration: "none",
  color: T.fg,
  borderRadius: "4px",
  transition: "background .12s",
  "&:hover": { background: T.hoverBg },
});

const dateStyle = css({
  color: T.muted,
  fontSize: "12px",
  paddingTop: "1px",
});

const titleStyle = css({ fontSize: "14px", color: T.fg });

const externalMarkStyle = css({
  color: T.muted,
  marginLeft: "5px",
  fontSize: "12px",
});
