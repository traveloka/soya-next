import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import config from "config";
import htmlescape from "htmlescape";

const __NEXT_CONFIG__ = { ...config };
// exclude legacy and server config
delete __NEXT_CONFIG__.legacy;
delete __NEXT_CONFIG__.server;

export default class extends Document {
  render() {
    const { __NEXT_DATA__ } = this.props;
    return (
      <html>
        <Head>
          <link
            rel="stylesheet"
            href={`${__NEXT_DATA__.assetPrefix}/_next/static/style.css`}
          />
        </Head>
        <body>
          <Main />
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `__NEXT_CONFIG__ = ${htmlescape(__NEXT_CONFIG__)}`
            }}
          />
          <NextScript />
        </body>
      </html>
    );
  }
}
