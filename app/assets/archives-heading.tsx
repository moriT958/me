import { css, type Handle } from "remix/ui";

type ArchivesHeadingProps = {
  count: number;
};

export function ArchivesHeading(handle: Handle<ArchivesHeadingProps>) {
  return () => (
    <div mix={wrapStyle}>
      <div mix={cmdLineStyle}>
        <span mix={accentStyle}>$</span>{" "}
        <span mix={typedStyle}>ls archives/</span>
        <span mix={caretStyle} />
      </div>
      <div mix={subtitleStyle}>{handle.props.count} posts</div>
    </div>
  );
}

const wrapStyle = css({
  borderBottom: "1px solid var(--border)",
  paddingBottom: "14px",
  marginBottom: "4px",
});

const cmdLineStyle = css({
  fontSize: "22px",
  fontWeight: 700,
  color: "var(--fg)",
  letterSpacing: "-0.3px",
});

const accentStyle = css({ color: "var(--accent)" });

const typedStyle = css({
  display: "inline-block",
  overflow: "hidden",
  whiteSpace: "nowrap",
  verticalAlign: "bottom",
  animation: "typing-archives 0.50s steps(12) forwards",
  "@keyframes typing-archives": {
    from: { width: "0ch" },
    to: { width: "12ch" },
  },
});

const caretStyle = css({
  display: "inline-block",
  width: "2px",
  height: "1em",
  verticalAlign: "-0.12em",
  background: "var(--fg)",
  marginLeft: "1px",
  animation:
    "blink 1.05s steps(1) infinite, caret-hide-archives 0s 0.50s forwards",
  "@keyframes caret-hide-archives": {
    to: { opacity: 0, width: 0, margin: 0 },
  },
});

const subtitleStyle = css({
  color: "var(--muted)",
  fontSize: "12px",
  marginTop: "4px",
  opacity: 0,
  animation: "subtitle-fade-in-archives 0.3s ease 0.50s forwards",
  "@keyframes subtitle-fade-in-archives": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
});
