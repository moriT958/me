import { createContextKey, type Middleware } from "remix/router";

export type Theme = "light" | "dark";

const THEME_COOKIE = "var-card-theme";

export const ThemeName = createContextKey<Theme>();

export function theme(): Middleware<{
  key: typeof ThemeName;
  value: Theme;
  property: "themeName";
}> {
  return (context) => {
    context.set(ThemeName, readThemeName(context.request.headers.get("cookie")), {
      property: "themeName",
    });
  };
}

function readThemeName(cookieHeader: string | null): Theme {
  if (!cookieHeader) return "light";
  for (const item of cookieHeader.split(";")) {
    const [rawKey, rawValue] = item.split("=");
    if (!rawKey || !rawValue) continue;
    if (rawKey.trim() !== THEME_COOKIE) continue;
    return rawValue.trim() === "dark" ? "dark" : "light";
  }
  return "light";
}
