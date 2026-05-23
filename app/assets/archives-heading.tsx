import {
  clientEntry,
  css,
  type Handle,
  type SerializableProps,
} from "remix/ui";

type ArchivesHeadingProps = SerializableProps & {
  count: number;
};

export const ArchivesHeading = clientEntry(
  import.meta.url,
  function ArchivesHeading(handle: Handle<ArchivesHeadingProps>) {
    const CMD = "ls archives/";
    let n = 0;
    let started = false;

    return () => {
      if (!started && typeof window !== "undefined") {
        started = true;
        let i = 0;
        const iv = setInterval(() => {
          i++;
          n = i;
          handle.update();
          if (i >= CMD.length) clearInterval(iv);
        }, 42);
      }

      const typed = CMD.slice(0, n);
      const done = n >= CMD.length;

      return (
        <div mix={wrapStyle}>
          <div mix={cmdLineStyle}>
            <span mix={accentStyle}>$</span> <span>{typed}</span>
            {!done && <span mix={caretStyle} />}
          </div>
          <div mix={subtitleStyle} style={{ opacity: done ? 1 : 0 }}>
            {handle.props.count} posts
          </div>
        </div>
      );
    };
  },
);

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

const caretStyle = css({
  display: "inline-block",
  width: "2px",
  height: "1em",
  verticalAlign: "-0.12em",
  background: "var(--fg)",
  animation: "blink 1.05s steps(1) infinite",
  marginLeft: "1px",
});

const subtitleStyle = css({
  color: "var(--muted)",
  fontSize: "12px",
  marginTop: "4px",
  transition: "opacity .3s ease",
});
