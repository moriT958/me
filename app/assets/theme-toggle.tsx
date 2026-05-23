import { clientEntry, css, on, type Handle } from "remix/ui";

import { MoonIcon } from "./icons/moon-icon.tsx";
import { SunIcon } from "./icons/sun-icon.tsx";

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
          {nextTheme === "dark" ? <MoonIcon /> : <SunIcon />}
        </button>
      );
    };
  },
);

function readThemeFromDom(): ThemeName | null {
  if (typeof document === "undefined") {
    return null;
  }
  const value = document.documentElement.dataset.theme;
  return value === "dark" || value === "light" ? value : null;
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
