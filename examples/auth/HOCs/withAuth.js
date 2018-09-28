import React from "react";
import Router from "next/router";

export default Page =>
  class extends React.Component {
    static async getInitialProps(ctx) {
      const { cookies, res } = ctx;
      if (!cookies.get("token")) {
        if (res && res.redirect) {
          res.redirect("/login");
        } else if (process.browser) {
          Router.replace("/login");
        }
        return {};
      }
      return Page.getInitialProps && (await Page.getInitialProps(ctx));
    }

    render() {
      return <Page {...this.props} />;
    }
  };
