import React from "react";
import { LocaleLink } from "../LocaleLink";
import { render } from "@testing-library/react";

// MOCK <Link /> component for shallow rendering
jest.mock("next/link", () => {
  return jest.fn(props => {
    return <span {...props}>{props.children}</span>;
  });
});

describe("<LocaleLink />", () => {
  const context = {
    locale: {
      country: "id",
      language: "id"
    },
    defaultLocale: "id-id",
    siteLocales: ["id-id", "en-id"],
    router: {
      pathname: "/"
    }
  };

  it("should render <Link /> to navigate from default locale", () => {
    const { container } = render(
      <LocaleLink {...context} href="/about">
        <a>Tentang</a>
      </LocaleLink>
    );
    expect(container).toMatchSnapshot();
  });

  it("should render <Link /> to navigate from non-default locale", () => {
    const locale = {
      language: "en",
      country: "id"
    };
    const { container } = render(
      <LocaleLink {...context} href="/about" locale={locale}>
        <a>About</a>
      </LocaleLink>
    );
    expect(container).toMatchSnapshot();
  });

  it("should render <Link /> to navigate to custom route", () => {
    const { container } = render(
      <LocaleLink
        {...context}
        as="p/hello-world"
        href="/post?title=Hello World"
      >
        <a>Hello World</a>
      </LocaleLink>
    );
    expect(container).toMatchSnapshot();
  });

  it("should render <Link /> to navigate to another locale", () => {
    const locale = {
      language: "en",
      country: "id"
    };
    const { container } = render(
      <LocaleLink {...context} locale={locale}>
        <a>English (Indonesia)</a>
      </LocaleLink>
    );
    expect(container).toMatchSnapshot();
  });

  it("should accept locale object", () => {
    const { container } = render(
      <LocaleLink
        {...context}
        locale={{ language: "en", country: "sg" }}
        href="/about"
      >
        <a>About</a>
      </LocaleLink>
    );
    expect(container).toMatchSnapshot();
  });
});
