import React from "react";
import getDisplayName from "../getDisplayName";

describe("React Component Utils", () => {
  it("should get component display name", () => {
    expect(getDisplayName("HOC", () => <div />)).toBe("HOC(Component)");
  });
});
