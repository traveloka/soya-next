import getBaseUrl from "../getBaseUrl";

describe("getBaseUrl - Browser", () => {
  it("should return the baseUrl correctly - no custom localhost", () => {
    expect(getBaseUrl()).toEqual({
      host: "localhost",
      origin: "http://localhost",
      protocol: "http:",
    });
  });

  it("should return the baseUrl correctly - custom localhost", () => {
    const oldLocation = window.location;
    // @ts-ignore
    delete window.location;
    window.location = {
      host: "",
    } as any;

    expect(getBaseUrl(undefined, "localhost", 8080)).toEqual({
      host: "localhost:8080",
      origin: "http://localhost:8080",
      protocol: "http:",
    });

    window.location = oldLocation;
  });
});
