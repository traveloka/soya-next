import createLocaleMiddleware from "../createLocaleMiddleware";

describe("Create Locale Middleware", () => {
  function setupTest() {
    return {
      options: {
        defaultLocale: "id-id",
        siteLocales: ["id-id", "en-id", "en-sg"],
      },
      res: {} as any,
      next: jest.fn(),
    };
  }

  it("requires default locale", () => {
    expect(() => createLocaleMiddleware()).toThrowErrorMatchingSnapshot();
  });

  it("requires site locales", () => {
    expect(() =>
      createLocaleMiddleware({ defaultLocale: "id-id" })
    ).toThrowErrorMatchingSnapshot();
  });

  it("should fallback to default locale", () => {
    const { options, next, res } = setupTest();
    const req: any = { url: "/" };
    createLocaleMiddleware(options)(req, res, next);
    expect(req).toMatchSnapshot();
  });

  it("should fallback country to its default and remove locale segment from url", () => {
    const { options, next, res } = setupTest();
    const req: any = { url: "/en/" };
    createLocaleMiddleware(options)(req, res, next);
    expect(req).toMatchSnapshot();
  });

  it("should match even without trailing slash", () => {
    const { options, next, res } = setupTest();
    const req: any = { url: "/en-sg" };
    createLocaleMiddleware(options)(req, res, next);
    expect(req).toMatchSnapshot();
  });

  it("should match available site locales and remove locale segment from url", () => {
    const { options, next, res } = setupTest();
    const req: any = { url: "/en-sg/" };
    createLocaleMiddleware(options)(req, res, next);
    expect(req).toMatchSnapshot();
  });

  it("should fallback to default locale if none match", () => {
    const { options, next, res } = setupTest();
    const req: any = { url: "/ms-my/" };
    createLocaleMiddleware(options)(req, res, next);
    expect(req).toMatchSnapshot();
  });
});
