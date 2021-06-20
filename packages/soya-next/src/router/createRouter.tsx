import { Router } from "express";
import cookieMiddleware from "universal-cookie-express";
import createLocaleMiddleware from "./createLocaleMiddleware";
import ensureRedirect from "../utils/ensureRedirect";
import parseRedirectionPath from "../utils/parseRedirectionPath";
import { toPath } from "../utils/locale";

import type { Request, Response } from "express";
import type { ServerResponse } from "http";
import type Server from "next/dist/next-server/server/next-server";
import type {
  SoyaNextConfig,
  SoyaNextRedirectConfig,
  SoyaNextServerConfig,
} from "../types";

declare module "next/dist/next-server/server/next-server" {
  export default interface Server {
    /**
     * @deprecated `dev` property does not exist anymore
     * since next 7.
     */
    dev?: boolean;
  }
}

declare module "express-serve-static-core" {
  export interface Router extends Record<string, any> {}
}

export interface CreateRouterOption {
  basePath?: SoyaNextConfig["basePath"];
  compression?: SoyaNextServerConfig["compression"];
  defaultLocale?: SoyaNextConfig["defaultLocale"];
  redirects?: SoyaNextConfig["redirects"];
  routes?: SoyaNextConfig["routes"];
  siteLocales?: SoyaNextConfig["siteLocales"];
  whoami?: SoyaNextConfig["whoami"];
}

export default function createRouter(
  app: Server,
  options?: CreateRouterOption
) {
  const {
    basePath,
    routes = {},
    redirects = {},
    defaultLocale,
    siteLocales,
    compression,
    whoami = {},
  } = options || {};
  const router = Router();
  const handle = app.getRequestHandler();
  if (!app.dev) {
    router.use(require("compression")(compression));
  }

  const newRedirects = Object.keys(redirects).reduce<
    Record<string, SoyaNextRedirectConfig>
  >((newRedirects, from) => {
    const redirect = redirects[from];
    const newRoute = routes[redirect.to];
    newRedirects[from] = {
      page: (newRoute && newRoute.page) || redirect.to,
      ...redirect,
    };
    return newRedirects;
  }, {});
  router.use((req, res, next) => {
    req.redirects = newRedirects;
    next();
  });
  router.use(cookieMiddleware());
  if (defaultLocale && siteLocales) {
    router.use(createLocaleMiddleware({ defaultLocale, siteLocales }));
  }
  if (basePath) {
    router.use((req, res, next) => {
      let test: string | undefined;
      let exclude: string | string[] | undefined;
      if (typeof basePath === "string") {
        test = basePath;
      } else {
        ({ test, exclude } = basePath);
      }
      const excludes = (app.dev
        ? ["/_next/webpack-hmr", "/_next/on-demand-entries-ping"]
        : []
      ).concat(exclude || []);
      if (
        (excludes.length && excludes.includes(req.url)) ||
        req.url.startsWith(String(test))
      ) {
        req.url = req.url.replace(new RegExp(`^${test}/*`), "/");
        return next();
      }
      // INFO: Don't know why express `Response` type error here while
      // it already extends the `http.ServerResponse` class.
      app.render404(req, res as ServerResponse);
    });
  }
  Object.keys(newRedirects).forEach(from => {
    const { method, status, to } = ensureRedirect(newRedirects[from]);
    router[method.toLowerCase()](from, (req: any, res: any) => {
      const localeSegment = toPath(req.locale, defaultLocale);
      const redirectionPath = parseRedirectionPath(
        localeSegment + to,
        req.params
      );
      res.redirect(status, redirectionPath);
    });
  });
  Object.keys(routes).forEach(path => {
    const { method = "GET", page } = routes[path];
    router[method.toLowerCase()](path, (req: Request, res: Response) => {
      app.render(
        req,
        res as ServerResponse,
        page,
        Object.assign({}, req.query, req.params)
      );
    });
  });
  router.get("/whoami", (req, res) => {
    const uptime = process.uptime();
    res.json({
      nodeId: process.env.NODE_GROUP,
      uptime: `${Math.floor(uptime / 86400)}d, ${Math.floor(
        (uptime % 86400) / 3600
      )}h, ${Math.floor((uptime % 3600) / 60)}m, ${Math.floor(uptime % 60)}s`,
      ...whoami,
    });
  });
  router.get("*", (req, res) => handle(req, res as ServerResponse));
  return router;
}
