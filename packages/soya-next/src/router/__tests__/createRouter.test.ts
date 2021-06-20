import createRouter from "../createRouter";

jest.mock("express/lib/router", () =>
  jest.fn(() => {
    const middlewares: any[] = [];
    const routes: any[] = [];
    return {
      middlewares,
      routes,
      get: jest.fn((path, handler) => {
        routes.push({ path, handler });
      }),
      use: jest.fn(middleware => {
        middlewares.push(middleware);
      }),
    };
  })
);

describe("createRouter", () => {
  function createFakeNext(dev: boolean = false) {
    const handle = jest.fn();
    return {
      dev,
      dir: ".",
      dist: ".next",
      getRequestHandler: jest.fn(() => handle),
      handle,
      render: jest.fn(),
      render404: jest.fn(),
      serveStatic: jest.fn(),
    };
  }

  describe("production", () => {
    it("should create gzip enabled router", () => {
      const app = createFakeNext();
      const router = createRouter(app as any);
      // @ts-ignore
      expect(router.use.mock.calls.length).toBe(3);
    });

    it("should create router with base path and exclude a path", () => {
      const app = createFakeNext();
      const router = createRouter(app as any, {
        basePath: {
          test: "/base",
          exclude: "/healthcheck",
        },
      });
      const req = { url: "/healthcheck" };
      const res = { json: jest.fn() };
      const next = jest.fn();

      router.middlewares[3](req, res, next);
      expect(req.url).toBe("/healthcheck");
      expect(next).toBeCalled();
    });
  });

  describe("non-production", () => {
    it("should create basic router", async () => {
      const app = createFakeNext(true);
      const router = createRouter(app as any);
      const req = {
        headers: {},
        params: {
          path: "/react.png",
        },
      };
      const res = { json: jest.fn() };
      const next = jest.fn();

      // redirects middleware
      router.middlewares[0](req, res, next);
      expect(req).toHaveProperty("redirects");
      expect(next).toBeCalled();

      // universal cookies middleware
      router.middlewares[1](req, res, next);
      expect(req).toHaveProperty("universalCookies");
      expect(next.mock.calls.length).toBe(2);

      // whoami
      router.routes[0].handler(req, res);
      expect(res.json).toBeCalled();

      // next handler
      await router.routes[1].handler(req, res);
      // @ts-ignore
      expect(app.handle).toBeCalled();

      // @ts-ignore
      expect(router.use.mock.calls.length).toBe(2);
      // @ts-ignore
      expect(router.get.mock.calls.length).toBe(2);
      expect(app.getRequestHandler).toBeCalled();
    });

    it("should create router with custom routes", async () => {
      const app = createFakeNext(true);
      const routes = {
        "/p/:id": {
          page: "/post",
        },
      };
      const router = createRouter(app as any, { routes });
      await router.routes[0].handler(
        {
          query: { locale: "en-id" },
          params: { id: 1 },
        },
        {}
      );
      expect(app.render).toBeCalled();
      expect(app.render.mock.calls[0]).toMatchSnapshot();
      // @ts-ignore
      expect(router.get.mock.calls.length).toBe(3);
    });

    it("should create router with redirection", () => {
      const app = createFakeNext(true);
      const defaultLocale = "id-id";
      const routes = {
        "/p/:id": {
          page: "/post",
        },
      };
      const redirects = {
        "/tentang": {
          to: "/about",
        },
        "/post/:id": {
          to: "/p/:id",
        },
      };
      const router = createRouter(app as any, {
        defaultLocale,
        routes,
        redirects,
      });
      const res = {
        redirect: jest.fn(),
      };
      router.routes[0].handler({}, res);
      expect(res.redirect).toBeCalled();
      expect(res.redirect.mock.calls[0]).toMatchSnapshot();
      router.routes[1].handler(
        {
          locale: {
            language: "en",
            country: "id",
          },
          params: { id: 1 },
        },
        res
      );
      expect(res.redirect.mock.calls[1]).toMatchSnapshot();
      // @ts-ignore
      expect(router.get.mock.calls.length).toBe(5);
    });

    it("should create locale aware router", () => {
      const app = createFakeNext(true);
      const router = createRouter(app as any, {
        defaultLocale: "id-id",
        siteLocales: ["id-id", "en-id"],
      });
      // @ts-ignore
      expect(router.use.mock.calls.length).toBe(3);
    });

    it("should create router with base path", () => {
      const app = createFakeNext(true);
      const router = createRouter(app as any, {
        basePath: "/base",
      });
      const req = { url: "/base" };
      const res = { json: jest.fn() };
      const next = jest.fn();

      router.middlewares[2](req, res, next);
      expect(req.url).toBe("/");
      expect(next).toBeCalled();

      router.middlewares[2]({ url: "/" }, res, next);
      expect(app.render404).toBeCalled();
    });

    it("should create router with base path and exclude some paths", () => {
      const app = createFakeNext(true);
      const router = createRouter(app as any, {
        basePath: {
          test: "/base",
          exclude: ["/healthcheck", "/whoami"],
        },
      });
      const req = { url: "/whoami" };
      const res = { json: jest.fn() };
      const next = jest.fn();

      router.middlewares[2](req, res, next);
      expect(req.url).toBe("/whoami");
      expect(next).toBeCalled();
    });
  });
});
