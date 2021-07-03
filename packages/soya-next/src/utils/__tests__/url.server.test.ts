/**
 * @jest-environment node
 */
import { resolveUrl } from "../url";

describe("Url Util - resolveUrl (server)", () => {
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
