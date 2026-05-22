import type { HeroProfile } from '../assets/hero-card.tsx'

export type HomeLink = {
  [key: string]: string
  label: string
  url: string
  href: string
}

export type HomeProfile = HeroProfile

export type RecentActivity = {
  date: string
  title: string
  href: string
}

export type RecentPost = {
  slug: string
  date: string
  title: string
  excerpt: string
}

export type HomePageProps = {
  profile: HomeProfile
  activities: RecentActivity[]
  visibleCount: number
  showMore: string | null
}

export type PostPageProps = {
  post: RecentPost
}
