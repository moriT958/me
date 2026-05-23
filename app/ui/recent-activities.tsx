import { css, type Handle } from "remix/ui";

import { T } from "../assets/theme.ts";
import type { RecentActivity } from "./home-page.tsx";

type RecentActivitiesProps = {
  items: RecentActivity[];
  showMore: string | null;
};

export function RecentActivities(handle: Handle<RecentActivitiesProps>) {
  return () => (
    <section mix={sectionStyle}>
      <div mix={titleRowStyle}>
        <h2 mix={titleStyle}>
          <span mix={titleIconStyle}>$</span>
          <span>Recent activities</span>
        </h2>
      </div>
      <div mix={listStyle}>
        {handle.props.items.map((item) => {
          const external = item.href === "#";
          return (
            <a
              rmx-document
              key={`${item.date}:${item.title}`}
              href={item.href}
              mix={activityItemStyle}
            >
              <span mix={dateStyle}>{item.date}</span>
              <span mix={itemTitleStyle}>
                {item.title}
                {external ? <span mix={externalMarkStyle}>↗</span> : null}
              </span>
            </a>
          );
        })}
      </div>
      {handle.props.showMore ? (
        <div mix={moreWrapStyle}>
          <a rmx-document href={handle.props.showMore} mix={moreButtonStyle}>
            more
          </a>
        </div>
      ) : null}
    </section>
  );
}

const sectionStyle = css({ marginTop: "36px" });

const titleRowStyle = css({
  display: "flex",
  alignItems: "baseline",
  gap: "10px",
});

const titleStyle = css({
  margin: 0,
  color: T.fg,
  fontSize: "15px",
  fontWeight: 600,
  display: "inline-flex",
  alignItems: "baseline",
  gap: "8px",
});

const titleIconStyle = css({
  color: T.accent,
  fontSize: "14px",
});

const listStyle = css({
  marginTop: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

const activityItemStyle = css({
  display: "grid",
  gridTemplateColumns: "94px 1fr",
  gap: "14px",
  padding: "10px 4px",
  borderBottom: `1px solid ${T.border}`,
  textDecoration: "none",
  color: T.fg,
  borderRadius: "4px",
  transition: "background .12s",
  "&:hover": { background: T.hoverBg },
});

const dateStyle = css({
  color: T.muted,
  fontSize: "12px",
  paddingTop: "2px",
});

const itemTitleStyle = css({
  color: T.fg,
  fontSize: "14px",
});

const externalMarkStyle = css({
  color: T.muted,
  marginLeft: "5px",
  fontSize: "12px",
});

const moreWrapStyle = css({
  marginTop: "12px",
  textAlign: "center",
});

const moreButtonStyle = css({
  background: "transparent",
  border: `1px solid ${T.border}`,
  color: T.muted,
  fontSize: "12px",
  padding: "4px 18px",
  borderRadius: "999px",
  textDecoration: "none",
  transition: "color .12s, border-color .12s",
  "&:hover": {
    color: T.fg,
    borderColor: T.borderStrong,
  },
});
