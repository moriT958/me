import { createRouter, type MiddlewareContext } from "remix/router";
import { staticFiles } from "remix/middleware/static";
import { compression } from "remix/compression-middleware";

import controller from "./actions/controller.tsx";
import { render } from "./middleware/render.tsx";
import { theme } from "./middleware/theme.ts";
import { routes } from "./routes.ts";

type AppContext = MiddlewareContext<[ReturnType<typeof render>, ReturnType<typeof theme>]>;

declare module "remix/router" {
  interface RouterTypes {
    context: AppContext;
  }
}

export const router = createRouter<AppContext>({
  middleware: [
    compression(),
    staticFiles("./public", { index: false, cacheControl: "public, max-age=31536000, immutable" }),
    render(),
    theme(),
  ],
});

router.map(routes, controller);
