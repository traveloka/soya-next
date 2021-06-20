import type { IncomingMessage } from "http";

/**
 * Get base url from `req` or `window` object (server side or client side).
 *
 * Credit to: https://github.com/jakeburden/next-absolute-url
 *
 * @param [req] IncomingMessage object.
 * @param [localhostAddress] Localhost address. Default: `localhost`
 * @param [localhostPort] Localhost port. Default: `3000`.
 */
export default function getBaseUrl(
  req?: IncomingMessage,
  localhostAddress: string = "localhost",
  localhostPort: number = 3000
) {
  const localhost = `${localhostAddress}${
    [80, 443].includes(localhostPort) ? "" : `:${localhostPort}`
  }`;

  let host =
    (typeof window !== "undefined"
      ? window.location.host
      : req?.headers?.host) || localhost;
  let protocol = /^localhost(:\d+)?$/.test(host) ? "http:" : "https:";
  protocol = localhostPort === 443 ? "https:" : protocol;

  if (typeof req?.headers?.["x-forwarded-host"] === "string") {
    host = req.headers["x-forwarded-host"];
  }
  if (typeof req?.headers?.["x-forwarded-proto"] === "string") {
    protocol = `${req.headers["x-forwarded-proto"]}:`;
  }

  return { host, protocol, origin: `${protocol}//${host}` };
}
