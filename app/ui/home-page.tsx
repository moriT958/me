import { css, type Handle } from "remix/ui";

import { HeroCard, type HeroProfile } from "../assets/hero-card.tsx";
import { Document } from "./document.tsx";
import { RecentActivities } from "../assets/recent-activities.tsx";
import { Footer } from "./footer.tsx";
import { Header } from "./header.tsx";
import { T } from "../assets/theme.ts";
import type { SearchPost } from "../assets/search-modal.tsx";

export type HomePageProps = {
  profile: HomeProfile;
  activities: RecentActivity[];
  initialCount: number;
  posts: SearchPost[];
};

export type HomeProfile = HeroProfile;

export type RecentActivity = {
  date: string;
  title: string;
  href: string;
};

export function HomePage(handle: Handle<HomePageProps>) {
  return () => (
    <Document
      title="morita's website"
      description="morit958 のウェブサイト。鹿児島の大学院生。Web や技術に関することを書きます。"
    >
      <main mix={pageStyle}>
        <Header activePage="home" posts={handle.props.posts} />
        <div mix={contentWrapStyle}>
          <HeroCard profile={handle.props.profile} />
          <RecentActivities
            items={handle.props.activities}
            initialCount={handle.props.initialCount}
          />
        </div>
        <Footer />
      </main>
    </Document>
  );
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
