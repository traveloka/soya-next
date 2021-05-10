/**
 * @jest-environment node
 */
import setupTest from "./utils/withLocalePageSetup";
import type { IncomingMessage } from "http";

describe("withLocalePage - Server", () => {
  it("should add default locale, locale, and site locales to page props", async () => {
    const { commonProps, context, PageWithLocale } = setupTest();
    const props = await PageWithLocale.getInitialProps({
      ...commonProps,
      req: context as IncomingMessage,
    });
    expect(props).toMatchSnapshot();
  });
});
