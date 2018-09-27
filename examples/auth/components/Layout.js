import PropTypes from "prop-types";
import Link from "next/link";
import Router from "next/router";
import { Cookies, withCookies } from "react-cookie";

const logout = ({ cookies }) => () => {
  cookies.remove("token");
  Router.replace("/");
};

const Layout = ({ cookies, children }) => (
  <>
    <Link href="/">
      <a>Public</a>
    </Link>{" "}
    <Link href="/protected">
      <a>Protected</a>
    </Link>{" "}
    {cookies.get("token") && (
      <button onClick={logout({ cookies })}>Logout</button>
    )}
    <hr />
    {children}
  </>
);

Layout.propTypes = {
  cookies: PropTypes.instanceOf(Cookies).isRequired,
  children: PropTypes.node
};

export default withCookies(Layout);
