import React from 'react';
import PropTypes from 'prop-types';
import { Cookies } from 'react-cookie';
import getDisplayName from '../utils/getDisplayName';

export default Page => {
  class WithCookies extends React.Component {
    static displayName = getDisplayName('WithCookies', Page);

    static propTypes = {
      cookies: PropTypes.oneOfType([
        PropTypes.shape({
          cookies: PropTypes.objectOf(PropTypes.string),
        }),
        PropTypes.instanceOf(Cookies),
      ]).isRequired,
    };

    static async getInitialProps(ctx) {
      const cookies = ctx.req ? ctx.req.universalCookies : new Cookies();
      const props = Page.getInitialProps && await Page.getInitialProps({ ...ctx, cookies });
      return {
        ...props,
        cookies,
      };
    }

    constructor(props) {
      super(props);
      this.cookies = !process.browser ? props.cookies : new Cookies();
    }

    render() {
      const { ...props } = this.props;
      delete props.cookies;

      return <Page {...props} cookies={this.cookies} />;
    }
  }

  return WithCookies;
};
