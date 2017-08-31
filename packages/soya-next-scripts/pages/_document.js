import Document, { Head, Main, NextScript } from 'next/document';
import { pageEnhancer } from 'soya-next/pages';
import flush from 'styled-modules/server';

const __SOYA_CONFIG__ = { ...require('config') };
// exclude legacy and server config
delete __SOYA_CONFIG__.legacy;
delete __SOYA_CONFIG__.server;

export default class extends Document {
  static displayName = 'SoyaDocument';

  static getInitialProps({ renderPage }) {
    return {
      ...renderPage(pageEnhancer),
      styles: flush(),
    };
  }

  render() {
    return (
      <html>
        <Head />
        <body>
          <Main />
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
                __SOYA_CONFIG__ = ${JSON.stringify(__SOYA_CONFIG__)}
              `
            }}
          />
          <NextScript />
        </body>
      </html>
    );
  }
}
