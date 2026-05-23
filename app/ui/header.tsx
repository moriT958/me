import { css, type Handle } from "remix/ui";

import { routes } from "../routes.ts";
import { T } from "./theme.ts";
import { ThemeToggle } from "../assets/theme-toggle.tsx";

type HeaderProps = {
  themeName: "light" | "dark";
  activePage?: "home" | "posts" | "archives";
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
        <SearchButton />
        <ThemeToggle themeName={handle.props.themeName} />
      </header>
    );
  };
}

function SearchButton() {
  return () => (
    <button type="button" mix={searchButtonStyle}>
      <svg
        viewBox="0 0 24 24"
        width="13"
        height="13"
        aria-hidden="true"
        fill="none"
      >
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M16.5 16.5 21 21"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      <span mix={shortcutStyle}>⌘K</span>
    </button>
  );
}

const headerStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "18px",
  padding: "14px 36px",
  borderBottom: `1px solid ${T.border}`,
  background: T.bg,
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

const navStyle = css({ display: "flex", gap: "14px", marginLeft: "18px" });

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

const searchButtonStyle = css({
  background: "transparent",
  border: `1px solid ${T.border}`,
  color: T.muted,
  borderRadius: "8px",
  padding: "5px 10px",
  fontFamily: "inherit",
  fontSize: "12px",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  marginRight: "8px",
  transition: "color .15s, border-color .15s",
  "&:hover": {
    color: T.fg,
    borderColor: T.borderStrong,
  },
});

const shortcutStyle = css({ color: T.dim, fontSize: "11px" });
