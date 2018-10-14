import App, { Container, createUrl } from "next/app";
import React from "react";
import { createPage } from "soya-next";

const Page = ({ Component, pageProps, router, ...props }) => (
  <Component {...props} {...pageProps} url={createUrl(router)} />
);
const BasePage = createPage()(Page);

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
    return (
      <Container>
        <BasePage {...this.props} />
      </Container>
    );
  }
}
