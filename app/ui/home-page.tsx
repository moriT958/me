import { css, type Handle } from "remix/ui";

import { HeroCard, type HeroProfile } from "../assets/hero-card.tsx";
import { Document } from "./document.tsx";
import { RecentActivities } from "./recent-activities.tsx";
import { Footer } from "./footer.tsx";
import { Header } from "./header.tsx";
import { T } from "./theme.ts";
import type { SearchPost } from "../assets/search-modal.tsx";

export type HomePageProps = {
  profile: HomeProfile;
  activities: RecentActivity[];
  visibleCount: number;
  showMore: string | null;
  themeName: "light" | "dark";
  posts: SearchPost[];
};

export type HomeProfile = HeroProfile;

export type RecentActivity = {
  date: string;
  title: string;
  href: string;
};

export function HomePage(handle: Handle<HomePageProps>) {
  return () => {
    const visibleActivities = handle.props.activities.slice(
      0,
      handle.props.visibleCount,
    );

    return (
      <Document title="morita's website" themeName={handle.props.themeName}>
        <main mix={pageStyle}>
          <Header
            themeName={handle.props.themeName}
            activePage="home"
            posts={handle.props.posts}
          />
          <div mix={contentWrapStyle}>
            <HeroCard profile={handle.props.profile} />
            <RecentActivities
              items={visibleActivities}
              showMore={handle.props.showMore}
            />
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
  display: "grid",
  gridTemplateRows: "auto 1fr auto",
});

const contentWrapStyle = css({
  padding: "36px 36px 48px",
  maxWidth: "820px",
  margin: "0 auto",
  "@media (max-width: 640px)": {
    padding: "24px 16px 40px",
  },
});
