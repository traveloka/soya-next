import type { UrlObject } from "url";

/**
 * Convert legacy URL object into WHATWG URL object.
 * @param legacyUrl Legacy URL Object.
 */
export function convertLegacyUrlObjectToWhatwgUrl(legacyUrl: UrlObject): URL {
  const urlAuth = legacyUrl.auth?.split(":") || [];
  const urlUsername = urlAuth[0] || "";
  const urlPassword = urlAuth[1] || "";

  // INFO: Use dummy baseUrl here for relative url.
  return Object.assign(new URL("http://localhost"), {
    hash: legacyUrl.hash || "",
    host: legacyUrl.host || "",
    hostname: legacyUrl.hostname || "",
    password: urlPassword,
    pathname: legacyUrl.pathname || "/",
    port: String(legacyUrl.port || ""),
    protocol: legacyUrl.protocol || "http:",
    search: legacyUrl.search || "",
    username: urlUsername,
  });
}

/**
 * WHATWG URL implementation for the deprecated `url.parse()` method.
 * @see [https://nodejs.org/api/url.html#url_url_resolve_from_to](https://nodejs.org/api/url.html#url_url_resolve_from_to)
 * @param from The Base URL being resolved against.
 * @param to The HREF URL being resolved.
 */
export function resolveUrl(from: string, to: string) {
  // INFO: Don't know why NodeJS URL implementation does not throw error while
  // specifying 'resolve://' as baseUrl. So, current workaround for the client-side
  // implementation is by specifying 'resolve://dummy/' (must with trailing-slash) baseUrl
  // and then strip out '//dummy' from the result.
  // TODO: Change back the implementation based on the NodeJS documentation if
  // the browser doesn't return TypeError for 'resolve://' baseUrl.
  const baseUrl =
    typeof window !== "undefined" ? "resolve://dummy/" : "resolve://";

  const resolvedUrl = new URL(to, new URL(from, baseUrl));
  if (resolvedUrl.protocol === "resolve:") {
    // `from` is a relative URL.
    const { pathname, search, hash } = resolvedUrl;
    const result = `${pathname}${search}${hash}`;
    return typeof window !== "undefined"
      ? result.replace("//dummy", "")
      : result;
  }
  return resolvedUrl.toString();
}
