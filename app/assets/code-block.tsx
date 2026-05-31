import { clientEntry, css, on, type Handle, type SerializableProps } from "remix/ui";

import { T } from "./theme.ts";

type CodeBlockProps = SerializableProps & {
  code: string;
};

export const CodeBlock = clientEntry(
  import.meta.url,
  function CodeBlock(handle: Handle<CodeBlockProps>) {
    let copied = false;

    const copy = () => {
      if (typeof navigator === "undefined") return;
      navigator.clipboard.writeText(handle.props.code).then(() => {
        copied = true;
        handle.update();
        setTimeout(() => {
          copied = false;
          handle.update();
        }, 1500);
      });
    };

    return () => (
      <button
        type="button"
        aria-label="Copy code"
        mix={[copyBtnStyle, copied ? copyBtnCopiedStyle : null, on("click", copy)]}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    );
  },
);

export const codeWrapperStyle = css({
  position: "relative",
  marginTop: "18px",
  maxWidth: "100%",
});

export const preStyle = css({
  background: T.panel2,
  border: `1px solid ${T.border}`,
  borderRadius: "8px",
  padding: "14px 18px",
  fontSize: "13px",
  overflowX: "auto",
  lineHeight: 1.65,
  margin: 0,
  maxWidth: "100%",
  "& .hljs": { color: T.text, background: "transparent" },
  "& .hljs-comment, & .hljs-quote": { color: T.muted, fontStyle: "italic" },
  "& .hljs-keyword, & .hljs-selector-tag, & .hljs-name, & .hljs-tag": { color: T.codeKeyword },
  "& .hljs-built_in, & .hljs-title": { color: T.codeFunc },
  "& .hljs-string, & .hljs-addition, & .hljs-section": { color: T.codeString },
  "& .hljs-attribute, & .hljs-selector-attr, & .hljs-type, & .hljs-variable, & .hljs-template-variable":
    { color: T.blue },
  "& .hljs-class .hljs-title": { color: T.blue },
  "& .hljs-literal, & .hljs-number, & .hljs-symbol": { color: T.purple },
  "& .hljs-deletion": { color: T.red },
  "& .hljs-meta": { color: T.muted },
  "& .hljs-regexp, & .hljs-bullet, & .hljs-selector-pseudo": { color: T.teal },
  "& .hljs-link": { color: T.blue, textDecoration: "underline" },
  "& .hljs-doctag, & .hljs-strong": { fontWeight: "bold", color: T.fg },
  "& .hljs-emphasis": { fontStyle: "italic" },
});

const copyBtnStyle = css({
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
  "&:hover": {
    color: T.fg,
    borderColor: T.borderStrong,
  },
});

const copyBtnCopiedStyle = css({
  color: T.accent,
  borderColor: T.accent,
});
