import Router from "express/lib/router";
import cookieMiddleware from "universal-cookie-express";
import createLocaleMiddleware from "./createLocaleMiddleware";
import ensureRedirect from "../utils/ensureRedirect";
import parseRedirectionPath from "../utils/parseRedirectionPath";
import { toPath } from "../utils/locale";

const defaultOptions = {
  routes: {},
  redirects: {}
};

export default (
  app,
  {
    basePath,
    routes = defaultOptions.routes,
    redirects = defaultOptions.redirects,
    defaultLocale,
    siteLocales,
    compression,
    whoami = {}
  } = defaultOptions
) => {
  const router = Router();
  const handle = app.getRequestHandler();
  if (!app.dev) {
    router.use(require("compression")(compression));
  }

  const newRedirects = Object.keys(redirects).reduce((newRedirects, from) => {
    const redirect = redirects[from];
    const newRoute = routes[redirect.to];
    newRedirects[from] = {
      page: (newRoute && newRoute.page) || redirect.to,
      ...redirect
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
      let test;
      let exclude;
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
        req.url.startsWith(test)
      ) {
        req.url = req.url.replace(new RegExp(`^${test}/*`), "/");
        return next();
      }
      app.render404(req, res);
    });
  }
  Object.keys(newRedirects).forEach(from => {
    const { method, status, to } = ensureRedirect(newRedirects[from]);
    router[method.toLowerCase()](from, (req, res) => {
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
    router[method.toLowerCase()](path, (req, res) => {
      app.render(req, res, page, Object.assign({}, req.query, req.params));
    });
  });
  router.get("/whoami", (req, res) => {
    const uptime = process.uptime();
    res.json({
      nodeId: process.env.NODE_GROUP,
      uptime: `${Math.floor(uptime / 86400)}d, ${Math.floor(
        (uptime % 86400) / 3600
      )}h, ${Math.floor((uptime % 3600) / 60)}m, ${Math.floor(uptime % 60)}s`,
      ...whoami
    });
  });
  router.get("*", (req, res) => handle(req, res));
  return router;
};
