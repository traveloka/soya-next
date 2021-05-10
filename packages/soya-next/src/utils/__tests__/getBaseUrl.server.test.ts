/**
 * @jest-environment node
 */
import getBaseUrl from "../getBaseUrl";
import type { IncomingMessage } from "http";

describe("getBaseUrl - Server", () => {
  function createReq(req?: Partial<IncomingMessage>): IncomingMessage {
    return {
      ...req,
      headers: {
        host: "localhost",
        ...(req?.headers || {}),
      },
    } as IncomingMessage;
  }

  it("should return the baseUrl correctly - no custom localhost", () => {
    expect(getBaseUrl(createReq())).toEqual({
      host: "localhost",
      origin: "http://localhost",
      protocol: "http:",
    });
  });

  it("should return the baseUrl correctly - host and proto from x-forwarded-* header", () => {
    expect(
      getBaseUrl(
        createReq({
          headers: {
            host: "localhost:8090",
            "x-forwarded-host": "localhost:8090",
            "x-forwarded-proto": "https",
          },
        })
      )
    ).toEqual({
      host: "localhost:8090",
      origin: "https://localhost:8090",
      protocol: "https:",
    });
  });

  it("should return the custom localhost when req is undefined", () => {
    expect(getBaseUrl(undefined, "localhost", 8080)).toEqual({
      host: "localhost:8080",
      origin: "http://localhost:8080",
      protocol: "http:",
    });
  });
});
