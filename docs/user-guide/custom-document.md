# Custom Document

Please refer to [this](https://github.com/zeit/next.js#custom-document) documentation for customizing document.

The document in Soya Next is customized like the following:

```js
import Document, { Head, Main, NextScript } from "next/document";
import config from "config";
import htmlescape from "htmlescape";

const __NEXT_CONFIG__ = { ...config };
// exclude legacy and server config
delete __NEXT_CONFIG__.legacy;
delete __NEXT_CONFIG__.server;

export default class extends Document {
  render() {
    return (
      <html>
        <Head />
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
```
