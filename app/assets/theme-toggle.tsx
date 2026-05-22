import { clientEntry, css, on, type Handle } from "remix/ui";

type ThemeName = "light" | "dark";

type ThemeToggleProps = {
  themeName: ThemeName;
};

const STORAGE_KEY = "var-card-theme";
const THEME_COOKIE = "var-card-theme";

export const ThemeToggle = clientEntry(
  import.meta.url,
  function ThemeToggle(handle: Handle<ThemeToggleProps>) {
    let themeName = handle.props.themeName;

    function applyTheme(nextTheme: ThemeName) {
      themeName = nextTheme;
      if (typeof document !== "undefined") {
        document.documentElement.dataset.theme = nextTheme;
      }
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(STORAGE_KEY, nextTheme);
      }
      if (typeof document !== "undefined") {
        document.cookie = `${THEME_COOKIE}=${nextTheme}; Path=/; Max-Age=31536000; SameSite=Lax`;
      }
      handle.update();
    }

    return () => {
      const currentTheme = readThemeFromDom() ?? themeName;
      const nextTheme = currentTheme === "light" ? "dark" : "light";
      const label =
        nextTheme === "dark" ? "Switch to dark theme" : "Switch to light theme";

      return (
        <button
          type="button"
          aria-label={label}
          title={label}
          mix={[buttonStyle, on("click", () => applyTheme(nextTheme))]}
        >
          {nextTheme === "dark" ? moonIcon() : sunIcon()}
        </button>
      );
    };
  },
);

function moonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M20 14.2A8.5 8.5 0 1 1 9.8 4a7 7 0 1 0 10.2 10.2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function readThemeFromDom(): ThemeName | null {
  if (typeof document === "undefined") {
    return null;
  }
  const value = document.documentElement.dataset.theme;
  return value === "dark" || value === "light" ? value : null;
}

function sunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      aria-hidden="true"
      fill="none"
    >
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2.5v2.5M12 19v2.5M21.5 12H19M5 12H2.5M18.7 5.3 17 7M7 17l-1.7 1.7M18.7 18.7 17 17M7 7 5.3 5.3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

const buttonStyle = css({
  background: "transparent",
  border: "1px solid var(--border)",
  color: "var(--muted)",
  borderRadius: "999px",
  width: "34px",
  height: "30px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "color .15s, border-color .15s",
  "&:hover": {
    color: "var(--fg)",
    borderColor: "var(--border-strong)",
  },
});
