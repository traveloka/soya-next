import { shallow } from "enzyme";
import React from "react";
import { LocaleLink } from "../LocaleLink";

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
    const wrapper = shallow(
      <LocaleLink {...context} href="/about">
        <a>Tentang</a>
      </LocaleLink>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should render <Link /> to navigate from non-default locale", () => {
    const locale = {
      language: "en",
      country: "id"
    };
    const wrapper = shallow(
      <LocaleLink {...context} href="/about" locale={locale}>
        <a>About</a>
      </LocaleLink>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should render <Link /> to navigate to custom route", () => {
    const wrapper = shallow(
      <LocaleLink
        {...context}
        as="p/hello-world"
        href="/post?title=Hello World"
      >
        <a>Hello World</a>
      </LocaleLink>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should render <Link /> to navigate to another locale", () => {
    const locale = {
      language: "en",
      country: "id"
    };
    const wrapper = shallow(
      <LocaleLink {...context} locale={locale}>
        <a>English (Indonesia)</a>
      </LocaleLink>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should accept locale object", () => {
    const wrapper = shallow(
      <LocaleLink
        {...context}
        locale={{ language: "en", country: "sg" }}
        href="/about"
      >
        <a>About</a>
      </LocaleLink>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
