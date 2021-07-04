import React from "react";
import { render } from "@testing-library/react";
import { LocaleLink } from "../LocaleLink";

// MOCK <Link /> component for shallow rendering.
jest.mock("next/link", () => {
  return jest.fn(props => {
    return <span {...props}>{props.children}</span>;
  });
});

describe("<LocaleLink />", () => {
  const context = {
    locale: {
      country: "id",
      language: "id",
    },
    defaultLocale: "id-id",
    siteLocales: ["id-id", "en-id"],
    router: {
      pathname: "/",
    },
  };

  it("should render <Link /> to navigate from default locale", () => {
    const { container } = render(
      <LocaleLink {...(context as any)} href="/about">
        <a>{"Tentang"}</a>
      </LocaleLink>
    );
    expect(container).toMatchSnapshot();
  });

  it("should render <Link /> to navigate from non-default locale", () => {
    const locale = {
      language: "en",
      country: "id",
    };
    const { container } = render(
      <LocaleLink {...(context as any)} href="/about" locale={locale}>
        <a>{"About"}</a>
      </LocaleLink>
    );
    expect(container).toMatchSnapshot();
  });

  it("should render <Link /> to navigate to custom route", () => {
    const { container } = render(
      <LocaleLink
        {...(context as any)}
        as="p/hello-world"
        href="/post?title=Hello World"
      >
        <a>{"Hello World"}</a>
      </LocaleLink>
    );
    expect(container).toMatchSnapshot();
  });

  it("should render <Link /> to navigate to another locale", () => {
    const locale = {
      language: "en",
      country: "id",
    };
    const { container } = render(
      <LocaleLink {...(context as any)} href={"/"} locale={locale}>
        <a>{"English (Indonesia)"}</a>
      </LocaleLink>
    );
    expect(container).toMatchSnapshot();
  });

  it("should accept locale object", () => {
    const { container } = render(
      <LocaleLink
        {...(context as any)}
        locale={{ language: "en", country: "sg" }}
        href="/about"
      >
        <a>{"About"}</a>
      </LocaleLink>
    );
    expect(container).toMatchSnapshot();
  });

  it("should accept href and 'as' as object", () => {
    const locale = {
      language: "en",
      country: "id",
    };
    const { container } = render(
      <LocaleLink
        {...(context as any)}
        locale={locale}
        as={{ pathname: "/blog/my-post" }}
        href={{
          pathname: "/blog/[slug]",
          query: { slug: "my-post" },
        }}
      >
        <a>{"My Post"}</a>
      </LocaleLink>
    );
    expect(container).toMatchSnapshot();
  });

  it("should render the <Link /> successfully while passing wrong as or href path", () => {
    const { container } = render(
      <LocaleLink locale={null} href={null} {...(context as any)}>
        <a>{"My Post"}</a>
      </LocaleLink>
    );
    expect(container).toMatchSnapshot();
  });
});
