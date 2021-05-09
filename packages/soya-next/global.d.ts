// INFO: status & statusCode fields are used inside decodeParam util.
declare interface URIError extends Error {
  status?: number;
  statusCode?: number;
}
