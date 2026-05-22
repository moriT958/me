import { css, type Handle } from "remix/ui";

import { HeroCard } from "../assets/hero-card.tsx";
import { Document } from "./document.tsx";
import { type HomePageProps } from "./home-types.ts";
import { RecentActivities } from "./recent-activities.tsx";
import { Footer } from "./footer.tsx";
import { Header } from "./header.tsx";
import { T } from "./theme.ts";

export function HomePage(handle: Handle<HomePageProps>) {
  return () => {
    const visibleActivities = handle.props.activities.slice(0, handle.props.visibleCount);

    return (
      <Document title="Me | Home" themeName={handle.props.themeName}>
        <main mix={pageStyle}>
          <Header themeName={handle.props.themeName} />
          <div mix={contentFillStyle}>
            <div mix={contentWrapStyle}>
              <HeroCard profile={handle.props.profile} />
              <RecentActivities items={visibleActivities} showMore={handle.props.showMore} />
            </div>
          </div>
          <Footer />
        </main>
      </Document>
    );
  };
}

const pageStyle = css({
  minHeight: "100vh",
  background: T.bg,
  color: T.text,
  display: "flex",
  flexDirection: "column",
});

const contentFillStyle = css({
  flex: 1,
  minHeight: 0,
});

const contentWrapStyle = css({
  padding: "36px 36px 48px",
  maxWidth: "820px",
  margin: "0 auto",
});
