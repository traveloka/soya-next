type Params = {
  method: string;
  page: string;
  status: number;
  to: string;
};

export default function ensureRedirect({
  method = "GET",
  status = 301,
  ...redirect
}: Params) {
  return { method, status, ...redirect };
}
