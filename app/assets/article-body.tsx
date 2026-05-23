import { clientEntry, css, ref, type Handle, type SerializableProps } from "remix/ui";

import { T } from "./theme.ts";

type ArticleBodyProps = SerializableProps & {
  body: string;
};

export const ArticleBody = clientEntry(
  import.meta.url,
  function ArticleBody(handle: Handle<ArticleBodyProps>) {
    function enhance(root: HTMLElement) {
      root.querySelectorAll<HTMLPreElement>("pre").forEach((pre) => {
        if (pre.parentElement?.dataset.codeWrapper) return;

        const wrapper = document.createElement("div");
        wrapper.dataset.codeWrapper = "1";
        wrapper.style.cssText = "position:relative;margin-top:18px";

        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = "Copy";
        btn.setAttribute("aria-label", "Copy code");
        btn.className = "code-copy-btn";

        btn.addEventListener("click", () => {
          const code = pre.querySelector("code");
          if (!code) return;
          navigator.clipboard.writeText(code.textContent ?? "").then(() => {
            btn.textContent = "Copied!";
            btn.classList.add("code-copy-btn--copied");
            setTimeout(() => {
              btn.textContent = "Copy";
              btn.classList.remove("code-copy-btn--copied");
            }, 1500);
          }).catch(() => {});
        });

        pre.parentNode!.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);
        wrapper.appendChild(btn);
        pre.style.marginTop = "0";
      });
    }

    return () => (
      <div
        class="article-body"
        mix={[bodyStyle, ref((node: HTMLElement) => enhance(node))]}
        innerHTML={handle.props.body}
      />
    );
  },
);

const bodyStyle = css({
  marginTop: "22px",
  color: T.text,
  fontSize: "15px",
  lineHeight: 1.85,
  overflowX: "clip",
  overflowWrap: "break-word",
  wordBreak: "break-word",
  "& [data-code-wrapper]": { maxWidth: "100%" },
  "& p": { marginTop: "18px" },
  "& p:first-child": { marginTop: "0" },
  "& h2": { fontSize: "20px", color: T.fg, marginTop: "32px", marginBottom: "8px", lineHeight: 1.3 },
  "& h3": { fontSize: "17px", color: T.fg, marginTop: "28px", marginBottom: "6px", lineHeight: 1.3 },
  "& h4": { color: T.fg, marginTop: "24px", marginBottom: "6px", lineHeight: 1.3 },
  "& h5": { color: T.fg, marginTop: "24px", marginBottom: "6px", lineHeight: 1.3 },
  "& h6": { color: T.fg, marginTop: "24px", marginBottom: "6px", lineHeight: 1.3 },
  "& a": { color: T.accent, textDecoration: "underline" },
  "& ul": { paddingLeft: "1.5em", marginTop: "18px" },
  "& ol": { paddingLeft: "1.5em", marginTop: "18px" },
  "& li": { marginTop: "6px" },
  "& blockquote": {
    borderLeft: `3px solid ${T.borderStrong}`,
    paddingLeft: "16px",
    color: T.muted,
    margin: "18px 0 0",
  },
  "& pre": {
    background: T.panel2,
    border: `1px solid ${T.border}`,
    borderRadius: "8px",
    padding: "14px 18px",
    fontSize: "13px",
    overflowX: "auto",
    lineHeight: 1.65,
    marginTop: "18px",
    maxWidth: "100%",
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
  "& th": { border: `1px solid ${T.border}`, padding: "8px 12px", background: T.panel, color: T.fg },
  "& td": { border: `1px solid ${T.border}`, padding: "8px 12px" },
  // Code copy button
  "& .code-copy-btn": {
    position: "absolute",
    top: "10px",
    right: "12px",
    background: T.panel,
    border: `1px solid ${T.border}`,
    borderRadius: "5px",
    color: T.muted,
    fontSize: "11px",
    padding: "3px 8px",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "color .12s, border-color .12s",
  },
  "& .code-copy-btn:hover": { color: T.fg, borderColor: T.borderStrong },
  "& .code-copy-btn--copied": { color: T.accent, borderColor: T.accent },
  // Syntax highlighting (rehype-highlight / highlight.js)
  "& .hljs": { color: T.text, background: "transparent" },
  "& .hljs-comment": { color: T.muted, fontStyle: "italic" },
  "& .hljs-quote": { color: T.muted, fontStyle: "italic" },
  "& .hljs-keyword": { color: T.accent },
  "& .hljs-selector-tag": { color: T.accent },
  "& .hljs-built_in": { color: T.accent },
  "& .hljs-name": { color: T.accent },
  "& .hljs-tag": { color: T.accent },
  "& .hljs-string": { color: "var(--code-string)" },
  "& .hljs-title": { color: "var(--code-string)" },
  "& .hljs-section": { color: "var(--code-string)" },
  "& .hljs-attribute": { color: "var(--code-string)" },
  "& .hljs-literal": { color: "var(--code-string)" },
  "& .hljs-addition": { color: "var(--code-string)" },
  "& .hljs-deletion": { color: T.muted },
  "& .hljs-meta": { color: T.muted },
  "& .hljs-selector-attr": { color: T.muted },
  "& .hljs-selector-pseudo": { color: T.muted },
  "& .hljs-number": { color: T.dim },
  "& .hljs-symbol": { color: T.dim },
  "& .hljs-bullet": { color: T.dim },
  "& .hljs-regexp": { color: T.dim },
  "& .hljs-doctag": { fontWeight: "bold", color: T.fg },
  "& .hljs-strong": { fontWeight: "bold", color: T.fg },
  "& .hljs-emphasis": { fontStyle: "italic" },
  "& .hljs-link": { color: T.accent, textDecoration: "underline" },
  "& .hljs-type": { color: "var(--code-string)" },
  "& .hljs-class .hljs-title": { color: "var(--code-string)" },
});

