import decodeParam from "../decodeParam";

describe("DecodeParam Utils", () => {
  it("should return as is if it's not a string or is an empty string", () => {
    expect(decodeParam("")).toBe("");
    expect(decodeParam({ a: 1 })).toMatchSnapshot();
  });

  it("should throw an URIError exception when used wrongly", () => {
    expect(() => {
      decodeParam("/error/%A0");
    }).toThrowErrorMatchingSnapshot();
  });
});
