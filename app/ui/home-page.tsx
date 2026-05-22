import { css } from "remix/ui";

import { HeroCard } from "../assets/hero-card.tsx";
import { Document } from "./document.tsx";
import { type HomePageProps } from "./home-types.ts";
import { RecentActivities } from "./recent-activities.tsx";
import { Footer } from "./footer.tsx";
import { Header } from "./header.tsx";
import { T } from "./theme.ts";

export function HomePage() {
  return ({ profile, activities, visibleCount, showMore }: HomePageProps) => {
    const visibleActivities = activities.slice(0, visibleCount);

    return (
      <Document title="Me | Home">
        <main mix={pageStyle}>
          <Header />
          <div mix={contentFillStyle}>
            <div mix={contentWrapStyle}>
              <HeroCard profile={profile} />
              <RecentActivities items={visibleActivities} showMore={showMore} />
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
