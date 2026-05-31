import { clientEntry, css, ref, type Handle, type SerializableProps } from "remix/ui";

import { T } from "./theme.ts";
import type { TocItem } from "../content.ts";

type TocProps = SerializableProps & {
  toc: TocItem[];
};

export const TableOfContents = clientEntry(
  import.meta.url,
  function TableOfContents(handle: Handle<TocProps>) {
    const setup = (nav: HTMLElement) => {
      if (nav.dataset.tocInit) return;
      nav.dataset.tocInit = "1";
      const ids = handle.props.toc.map((item) => item.id);

      const anchors = new Map<string, HTMLAnchorElement>();
      nav.querySelectorAll<HTMLAnchorElement>("a[href^='#']").forEach((a) => {
        const id = (a.getAttribute("href") ?? "").slice(1);
        if (id) anchors.set(id, a);
      });

      let current = "";

      const setActive = (id: string) => {
        if (id === current) return;
        const prev = anchors.get(current);
        if (prev) prev.style.removeProperty("color");
        const next = anchors.get(id);
        if (next) next.style.setProperty("color", "var(--teal)");
        current = id;
      };

      const update = () => {
        const offset = 88; // sticky header height + buffer
        let best = ids[0];
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top < offset) {
            best = id;
          }
        }
        if (best) setActive(best);
      };

      let raf = 0;
      window.addEventListener(
        "scroll",
        () => {
          if (raf) return;
          raf = requestAnimationFrame(() => {
            update();
            raf = 0;
          });
        },
        { passive: true },
      );

      update();
    };

    return () => {
      const { toc } = handle.props;
      return (
        <nav mix={[navStyle, ref((node: HTMLElement) => setup(node))]} aria-label="目次">
          <p mix={labelStyle}>On this page</p>
          <ul mix={listStyle}>
            {toc.map((item) => (
              <li key={item.id}>
                <a
                  rmx-document
                  href={`#${item.id}`}
                  mix={item.level === 3 ? linkH3Style : linkH2Style}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      );
    };
  },
);

const navStyle = css({
  position: "sticky",
  top: "72px",
  maxHeight: "calc(100vh - 90px)",
  overflowY: "auto",
  paddingRight: "4px",
});

const labelStyle = css({
  margin: "0 0 10px",
  fontSize: "11px",
  fontWeight: 600,
  color: T.muted,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
});

const listStyle = css({
  listStyle: "none",
  padding: 0,
  margin: 0,
  borderLeft: `1px solid ${T.border}`,
  paddingLeft: "12px",
});

const linkH2Style = css({
  display: "block",
  fontSize: "12px",
  color: T.muted,
  textDecoration: "none",
  padding: "4px 0",
  lineHeight: 1.45,
  transition: "color .12s",
  "&:hover": { color: T.fg },
});

const linkH3Style = css({
  display: "block",
  fontSize: "12px",
  color: T.dim,
  textDecoration: "none",
  padding: "3px 0 3px 12px",
  lineHeight: 1.45,
  transition: "color .12s",
  "&:hover": { color: T.fg },
});
