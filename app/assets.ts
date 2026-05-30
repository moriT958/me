import { createAssetServer } from "remix/assets";

const rootDir = process.cwd();

export const assetServer = createAssetServer({
  basePath: "/assets",
  rootDir,
  fileMap: {
    "app/*path": "app/*path",
    "node_modules/*path": "node_modules/*path",
  },
  allow: ["app/assets/**", "node_modules/**"],
  deny: ["app/**/*.server.*"],
  sourceMaps: process.env.NODE_ENV === "development" ? "external" : undefined,
  fingerprint: process.env.NODE_ENV === "production" ? { buildId: "1" } : undefined,
  watch: process.env.NODE_ENV === "production" ? false : undefined,
  scripts: {
    define: {
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV ?? "development"),
    },
  },
});

export const entryHref: string = await assetServer.getHref(
  new URL("./assets/entry.ts", import.meta.url).href,
);
