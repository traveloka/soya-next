import PropTypes from "prop-types";
import Head from "next/head";
import Router from "next/router";
import { Cookies } from "react-cookie";
import Layout from "../components/Layout";

const login = ({ cookies }) => () => {
  cookies.set("token", 123);
  Router.replace("/");
};

const LoginPage = ({ cookies }) => (
  <Layout>
    <Head>
      <title>Soya Next Project</title>
    </Head>
    <p>Authentication required</p>
    <button onClick={login({ cookies })}>Login</button>
  </Layout>
);

LoginPage.getInitialProps = ctx => {
  if (ctx.cookies.get("token")) {
    if (ctx.res) {
      ctx.res.redirect("/");
    } else {
      Router.replace("/");
    }
  }
};

LoginPage.propTypes = {
  cookies: PropTypes.instanceOf(Cookies)
};

export default LoginPage;
