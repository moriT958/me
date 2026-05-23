import { Feed } from "feed";

import type { Post } from "./content.ts";

const BASE_URL = "https://morit958.com";

export function buildRSSFeed(posts: Post[]): Feed {
  const feed = new Feed({
    title: "morit958",
    description: "morit958's blog",
    id: BASE_URL,
    link: BASE_URL,
    language: "ja",
    feedLinks: { rss: `${BASE_URL}/rss.xml` },
    author: { name: "Kohei Morita" },
    copyright: `Kohei Morita`,
  });

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `${BASE_URL}/posts/${post.slug}`,
      link: `${BASE_URL}/posts/${post.slug}`,
      description: post.excerpt,
      date: new Date(post.date),
    });
  }

  return feed;
}
