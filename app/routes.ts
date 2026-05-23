import { get, route } from "remix/routes";

export const routes = route({
  assets: get("/assets/*path"),
  home: "/",
  posts: "/posts",
  post: "/posts/:slug",
  archives: "/archives",
  tags: "/tags/:name",
  rss: "/rss.xml",
});
