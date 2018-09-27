import App, { Container } from "next/app";
import React from "react";
import { createPage } from "soya-next";

const Component = ({ children, ...props }) =>
  React.cloneElement(React.Children.only(children), props);
const BasePage = createPage()(Component);

export default class extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    const initialProps = await BasePage.getInitialProps(ctx);
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ...ctx, ...initialProps });
    }
    return { ...initialProps, pageProps };
  }

  render() {
    const {
      Component,
      pageProps,
      cookies,
      defaultLocale,
      siteLocales,
      locale,
      reduxState,
      store
    } = this.props;

    return (
      <Container>
        <BasePage
          cookies={cookies}
          defaultLocale={defaultLocale}
          siteLocales={siteLocales}
          locale={locale}
          reduxState={reduxState}
          store={store}
        >
          <Component {...pageProps} />
        </BasePage>
      </Container>
    );
  }
}
