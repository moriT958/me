(() => {
  const key = "var-card-theme";
  const fromCookie =
    document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  let theme = fromCookie;

  try {
    const value = localStorage.getItem(key);
    if (value === "dark" || value === "light") {
      theme = value;
    }
    localStorage.setItem(key, theme);
  } catch (_) {
    // Ignore storage errors and keep server-provided theme.
  }

  document.documentElement.dataset.theme = theme;
  document.cookie = `var-card-theme=${theme}; Path=/; Max-Age=31536000; SameSite=Lax`;
})();
