import { css } from "remix/ui";

import { T } from "./theme.ts";

export function Footer() {
  return () => <footer mix={footerStyle}>Copyright © 2026 Kohei Morita</footer>;
}

const footerStyle = css({
  padding: "16px 36px",
  color: T.dim,
  fontSize: "11px",
  textAlign: "center",
  background: T.bg,
});
