import { clientEntry, css, on, type Handle, type SerializableProps } from "remix/ui";

import { T } from "./theme.ts";

type CodeBlockProps = SerializableProps & {
  code: string;
  lang?: string;
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

    return () => {
      return (
        <div mix={wrapperStyle}>
          <button
            type="button"
            aria-label="Copy code"
            mix={[copyBtnStyle, copied ? copyBtnCopiedStyle : null, on("click", copy)]}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
          <pre mix={preStyle}>
            <code>{handle.props.code}</code>
          </pre>
        </div>
      );
    };
  },
);

const wrapperStyle = css({
  position: "relative",
  marginTop: "18px",
});

const preStyle = css({
  background: T.panel2,
  border: `1px solid ${T.border}`,
  borderRadius: "8px",
  padding: "14px 18px",
  fontSize: "13px",
  color: T.fg,
  overflow: "auto",
  lineHeight: 1.65,
  margin: 0,
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
