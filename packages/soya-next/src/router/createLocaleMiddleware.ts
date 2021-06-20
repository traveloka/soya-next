import getBaseUrl from "../utils/getBaseUrl";

import type { RequestHandler } from "express";

export interface CreateLocaleMiddlewareOption {
  defaultLocale?: string;
  siteLocales?: string[];
}

export default function createLocaleMiddleware(
  options?: CreateLocaleMiddlewareOption
): RequestHandler {
  const { defaultLocale, siteLocales } = options || {};

  if (typeof defaultLocale !== "string") {
    throw new Error("Expected defaultLocale to be a locale string.");
  }
  if (
    typeof siteLocales !== "object" ||
    siteLocales.constructor !== Array ||
    siteLocales.length === 0
  ) {
    throw new Error("Expected siteLocales to be an array of locale string.");
  }
  return (req, res, next) => {
    let [language, country] = defaultLocale.split("-");
    const baseUrl = getBaseUrl(req);
    const { pathname } = new URL(req.url, baseUrl.origin);
    const [localeSegment] = pathname.substr(1).split("/");
    if (localeSegment) {
      const [languageSegment, countrySegment = country] = localeSegment.split(
        "-"
      );
      if (siteLocales.indexOf(`${languageSegment}-${countrySegment}`) !== -1) {
        country = countrySegment;
        language = languageSegment;
        req.url = req.url.substr(localeSegment.length + 1) || "/";
      }
    }
    req.defaultLocale = defaultLocale;
    req.siteLocales = siteLocales;
    req.locale = {
      country,
      language,
    };
    next();
  };
}
