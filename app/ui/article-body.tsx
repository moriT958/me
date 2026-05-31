import { css, type Handle } from "remix/ui";
import type { Root } from "hast";

import { T } from "../assets/theme.ts";
import { hastRootToJsx } from "../lib/hast-to-jsx.tsx";

type ArticleBodyProps = {
  body: Root;
};

export function ArticleBody(handle: Handle<ArticleBodyProps>) {
  return () => (
    <div class="article-body" mix={bodyStyle}>
      {hastRootToJsx(handle.props.body)}
    </div>
  );
}

const bodyStyle = css({
  marginTop: "22px",
  color: T.text,
  fontSize: "15px",
  lineHeight: 1.85,
  overflowX: "clip",
  overflowWrap: "break-word",
  wordBreak: "break-word",
  "& p": { marginTop: "18px" },
  "& p:first-child": { marginTop: "0" },
  "& h2": {
    fontSize: "20px",
    color: T.fg,
    marginTop: "32px",
    marginBottom: "8px",
    lineHeight: 1.3,
    borderBottom: `1px solid ${T.border}`,
    paddingBottom: "6px",
    scrollMarginTop: "72px",
  },
  "& h3": {
    fontSize: "17px",
    color: T.fg,
    marginTop: "28px",
    marginBottom: "6px",
    lineHeight: 1.3,
    borderBottom: `1px solid ${T.border}`,
    paddingBottom: "4px",
    scrollMarginTop: "72px",
  },
  "& h4": { color: T.fg, marginTop: "24px", marginBottom: "6px", lineHeight: 1.3 },
  "& h5": { color: T.fg, marginTop: "24px", marginBottom: "6px", lineHeight: 1.3 },
  "& h6": { color: T.fg, marginTop: "24px", marginBottom: "6px", lineHeight: 1.3 },
  "& a": { color: T.blue, textDecoration: "underline" },
  "& ul": { paddingLeft: "1.5em", marginTop: "18px" },
  "& ol": { paddingLeft: "1.5em", marginTop: "18px" },
  "& li": { marginTop: "6px" },
  "& blockquote": {
    borderLeft: `3px solid ${T.borderStrong}`,
    paddingLeft: "16px",
    color: T.muted,
    margin: "18px 0 0",
  },
  "& code": { fontSize: "13px", fontFamily: "inherit" },
  "& :not(pre) > code": {
    background: T.panel2,
    border: `1px solid ${T.border}`,
    borderRadius: "4px",
    padding: "1px 5px",
  },
  "& hr": { border: "none", borderTop: `1px solid ${T.border}`, marginTop: "28px" },
  "& strong": { color: T.fg },
  "& img": { maxWidth: "100%", borderRadius: "6px", marginTop: "18px" },
  "& table": {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "18px",
    fontSize: "14px",
    display: "block",
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",
  },
  "& th": {
    border: `1px solid ${T.border}`,
    padding: "8px 12px",
    background: T.panel,
    color: T.fg,
  },
  "& td": { border: `1px solid ${T.border}`, padding: "8px 12px" },
});
