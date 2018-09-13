import React from "react";
import PropTypes from "prop-types";
import hoistStatics from "hoist-non-react-statics";
import { Cookies } from "react-cookie";
import getDisplayName from "../utils/getDisplayName";
import { NEXT_STATICS } from "../constants/Statics";

export default Page => {
  class WithCookies extends React.Component {
    static displayName = getDisplayName("WithCookies", Page);

    static propTypes = {
      cookies: PropTypes.oneOfType([
        PropTypes.shape({
          cookies: PropTypes.objectOf(PropTypes.string)
        }),
        PropTypes.instanceOf(Cookies)
      ]).isRequired
    };

    static async getInitialProps(ctx) {
      const cookies = (ctx.req && ctx.req.universalCookies) || new Cookies();
      const props =
        Page.getInitialProps &&
        (await Page.getInitialProps({ ...ctx, cookies }));
      return {
        ...props,
        cookies
      };
    }

    constructor(props) {
      super(props);
      this.cookies = process.browser ? new Cookies() : props.cookies;
    }

    render() {
      const { ...props } = this.props;
      delete props.cookies;

      return <Page {...props} cookies={this.cookies} />;
    }
  }

  return hoistStatics(WithCookies, Page, NEXT_STATICS);
};
