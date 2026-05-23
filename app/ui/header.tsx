import { css, type Handle } from "remix/ui";

import { routes } from "../routes.ts";
import { T } from "./theme.ts";
import { ThemeToggle } from "../assets/theme-toggle.tsx";
import { SearchButton, type SearchPost } from "../assets/search-modal.tsx";
import { MobileNav } from "../assets/mobile-nav.tsx";

type HeaderProps = {
  themeName: "light" | "dark";
  activePage?: "home" | "posts" | "archives";
  posts: SearchPost[];
};

export function Header(handle: Handle<HeaderProps>) {
  return () => {
    const active = handle.props.activePage ?? "home";
    return (
      <header mix={headerStyle}>
        <a rmx-document href={routes.home.href()} mix={brandStyle}>
          <span mix={brandIconStyle}>$</span>
          <span>kohei.dev</span>
        </a>
        <nav mix={navStyle}>
          <a
            rmx-document
            href={routes.home.href()}
            mix={active === "home" ? activeNavStyle : navLinkStyle}
          >
            Home
          </a>
          <a
            rmx-document
            href={routes.posts.href()}
            mix={active === "posts" ? activeNavStyle : navLinkStyle}
          >
            Posts
          </a>
          <a
            rmx-document
            href={routes.archives.href()}
            mix={active === "archives" ? activeNavStyle : navLinkStyle}
          >
            Archives
          </a>
        </nav>
        <div mix={spacerStyle} />
        <SearchButton posts={handle.props.posts} />
        <ThemeToggle themeName={handle.props.themeName} />
        <MobileNav activePage={active} />
      </header>
    );
  };
}

const headerStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "18px",
  padding: "14px 36px",
  borderBottom: `1px solid ${T.border}`,
  background: T.bg,
  position: "relative",
  "@media (max-width: 640px)": {
    padding: "12px 16px",
    gap: "10px",
    flexWrap: "wrap",
  },
});

const brandStyle = css({
  textDecoration: "none",
  color: T.fg,
  fontSize: "15px",
  fontWeight: 600,
  letterSpacing: "-0.3px",
  display: "inline-flex",
  alignItems: "baseline",
  gap: "6px",
});

const brandIconStyle = css({ color: T.accent });

const navStyle = css({
  display: "flex",
  gap: "14px",
  marginLeft: "18px",
  "@media (max-width: 640px)": {
    display: "none",
  },
});

const spacerStyle = css({ flex: 1 });

const activeNavStyle = css({
  background: "transparent",
  border: "none",
  color: T.fg,
  fontSize: "13px",
  padding: "6px 4px",
  textDecoration: "none",
  borderBottom: `2px solid ${T.accent}`,
});

const navLinkStyle = css({
  color: T.muted,
  fontSize: "13px",
  padding: "6px 4px",
  textDecoration: "none",
  borderBottom: "2px solid transparent",
  transition: "color .15s",
  "&:hover": { color: T.fg },
});
