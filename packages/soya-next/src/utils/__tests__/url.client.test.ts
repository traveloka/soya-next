import { convertLegacyUrlObjectToWhatwgUrl, resolveUrl } from "../url";
import {
  completeLegacyUrlObject,
  emptyLegacyUrlObject,
} from "./fixtures/urlFixtures";

describe("Url Util - convertLegacyUrlObjectToWhatwgUrl", () => {
  it("should not throw error while converting to WHATWG URL", () => {
    expect(() =>
      convertLegacyUrlObjectToWhatwgUrl(completeLegacyUrlObject)
    ).not.toThrowError();
  });

  it("should convert complete legacy url object into WHATWG URL", () => {
    expect(
      convertLegacyUrlObjectToWhatwgUrl(completeLegacyUrlObject).toString()
    ).toMatchSnapshot();
  });

  it("should convert empty legacy url object into WHATWG URL", () => {
    expect(
      convertLegacyUrlObjectToWhatwgUrl(emptyLegacyUrlObject).toString()
    ).toMatchSnapshot();
  });
});

describe("Url Util - resolveUrl (browser)", () => {
  it("should resolve url successfully", () => {
    expect(resolveUrl("/one/two/three", "four")).toBe("/one/two/four");
    expect(resolveUrl("http://example.com/", "/one")).toBe(
      "http://example.com/one"
    );
    expect(resolveUrl("http://example.com/one", "/two")).toBe(
      "http://example.com/two"
    );
    expect(resolveUrl("https://example.com/new/page", "/old")).toBe(
      "https://example.com/old"
    );
    expect(resolveUrl("https://example.com/new/page", "old")).toBe(
      "https://example.com/new/old"
    );
  });
});
