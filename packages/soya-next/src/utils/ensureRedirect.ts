import type { SoyaNextRedirectConfig } from "../types";

export interface Params extends SoyaNextRedirectConfig {
  status?: number;
}

export default function ensureRedirect({
  method = "GET",
  status = 301,
  ...redirect
}: Params) {
  return { method, status, ...redirect };
}
