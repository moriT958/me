import { clientEntry, css, on, type Handle } from "remix/ui";

import { MoonIcon } from "./icons/moon-icon.tsx";
import { SunIcon } from "./icons/sun-icon.tsx";

type ThemeName = "light" | "dark";

const THEME_COOKIE = "var-card-theme";

export const ThemeToggle = clientEntry(import.meta.url, function ThemeToggle(handle: Handle) {
  const applyTheme = (nextTheme: ThemeName) => {
    document.documentElement.dataset.theme = nextTheme;
    document.cookie = `${THEME_COOKIE}=${nextTheme}; Path=/; Max-Age=31536000; SameSite=Lax`;
    handle.update();
  };

  return () => {
    const currentTheme = readThemeFromDom() ?? "light";
    const nextTheme = currentTheme === "light" ? "dark" : "light";
    const label = nextTheme === "dark" ? "Switch to dark theme" : "Switch to light theme";

    return (
      <button
        type="button"
        aria-label={label}
        title={label}
        mix={[buttonStyle, on("click", () => applyTheme(nextTheme))]}
      >
        <span mix={moonIconStyle}>
          <MoonIcon />
        </span>
        <span mix={sunIconStyle}>
          <SunIcon />
        </span>
      </button>
    );
  };
});

function readThemeFromDom(): ThemeName | null {
  if (typeof document === "undefined") {
    return null;
  }
  const value = document.documentElement.dataset.theme;
  return value === "dark" || value === "light" ? value : null;
}

const moonIconStyle = css({
  display: "inline-flex",
  "[data-theme='dark'] &": { display: "none" },
});

const sunIconStyle = css({
  display: "none",
  "[data-theme='dark'] &": { display: "inline-flex" },
});

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
