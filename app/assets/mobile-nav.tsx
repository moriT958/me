import {
  clientEntry,
  css,
  on,
  type Handle,
  type SerializableProps,
} from "remix/ui";

import { MenuIcon } from "./icons/menu-icon.tsx";
import { CloseIcon } from "./icons/close-icon.tsx";

type MobileNavProps = SerializableProps & {
  activePage: "home" | "posts" | "archives";
};

export const MobileNav = clientEntry(
  import.meta.url,
  function MobileNav(handle: Handle<MobileNavProps>) {
    let menuOpen = false;

    return () => {
      const active = handle.props.activePage;

      return (
        <div mix={wrapperStyle}>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            mix={[
              hamburgerStyle,
              on("click", () => {
                menuOpen = !menuOpen;
                handle.update();
              }),
            ]}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          {menuOpen && (
            <div mix={dropdownStyle}>
              <a
                rmx-document
                href="/"
                mix={[
                  linkStyle,
                  active === "home" ? linkActiveStyle : null,
                  on("click", () => {
                    menuOpen = false;
                    handle.update();
                  }),
                ]}
              >
                Home
              </a>
              <a
                rmx-document
                href="/posts"
                mix={[
                  linkStyle,
                  active === "posts" ? linkActiveStyle : null,
                  on("click", () => {
                    menuOpen = false;
                    handle.update();
                  }),
                ]}
              >
                Posts
              </a>
              <a
                rmx-document
                href="/archives"
                mix={[
                  linkStyle,
                  active === "archives" ? linkActiveStyle : null,
                  on("click", () => {
                    menuOpen = false;
                    handle.update();
                  }),
                ]}
              >
                Archives
              </a>
            </div>
          )}
        </div>
      );
    };
  },
);

const wrapperStyle = css({
  display: "none",
  "@media (max-width: 640px)": {
    display: "contents",
  },
});

const hamburgerStyle = css({
  display: "none",
  "@media (max-width: 640px)": {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent",
    border: "1px solid var(--border)",
    color: "var(--muted)",
    borderRadius: "8px",
    width: "34px",
    height: "30px",
    cursor: "pointer",
    flexShrink: 0,
    fontFamily: "inherit",
    transition: "color .15s, border-color .15s",
    "&:hover": {
      color: "var(--fg)",
      borderColor: "var(--border-strong)",
    },
  },
});

const dropdownStyle = css({
  display: "none",
  "@media (max-width: 640px)": {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    borderTop: "1px solid var(--border)",
    paddingTop: "8px",
    paddingBottom: "4px",
    gap: "2px",
  },
});

const linkStyle = css({
  color: "var(--muted)",
  fontSize: "14px",
  padding: "10px 4px",
  textDecoration: "none",
  transition: "color .15s",
  "&:hover": { color: "var(--fg)" },
});

const linkActiveStyle = css({
  color: "var(--fg)",
  fontWeight: 600,
});
