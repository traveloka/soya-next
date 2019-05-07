import Document, { Html, Head, Main, NextScript } from "next/document";
import config from "config";
import { htmlEscapeJsonString } from "next/dist/server/htmlescape";

const __NEXT_CONFIG__ = { ...config };
// exclude legacy and server config
delete __NEXT_CONFIG__.legacy;
delete __NEXT_CONFIG__.server;

export default class extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <script
            id="__NEXT_CONFIG__"
            type="application/json"
            nonce={this.props.nonce}
            crossOrigin={this.props.crossOrigin || process.crossOrigin}
            dangerouslySetInnerHTML={{
              __html: htmlEscapeJsonString(JSON.stringify(__NEXT_CONFIG__))
            }}
          />
          <NextScript />
        </body>
      </Html>
    );
  }
}
