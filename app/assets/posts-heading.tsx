import { css, type Handle } from "remix/ui";

type PostsHeadingProps = {
  count: number;
};

export function PostsHeading(handle: Handle<PostsHeadingProps>) {
  return () => (
    <div mix={wrapStyle}>
      <div mix={cmdLineStyle}>
        <span mix={accentStyle}>$</span> <span mix={typedStyle}>ls posts/</span>
        <span mix={caretStyle} />
      </div>
      <div mix={subtitleStyle}>{handle.props.count} entries · 最新から</div>
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
  animation: "typing-posts 0.38s steps(9) forwards",
  "@keyframes typing-posts": {
    from: { width: "0ch" },
    to: { width: "9ch" },
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
    "blink 1.05s steps(1) infinite, caret-hide-posts 0s 0.38s forwards",
  "@keyframes caret-hide-posts": {
    to: { opacity: 0, width: 0, margin: 0 },
  },
});

const subtitleStyle = css({
  color: "var(--muted)",
  fontSize: "12px",
  marginTop: "4px",
  opacity: 0,
  animation: "subtitle-fade-in-posts 0.3s ease 0.38s forwards",
  "@keyframes subtitle-fade-in-posts": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
});
