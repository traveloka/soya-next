import Head from "next/head";
import PropTypes from "prop-types";
import logo from "./logo.svg";
import styles from "./Layout.module.css";
import "../../styles/global.css";

const Layout = ({ children }) => (
  <div className={styles.layout}>
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
    <img src={logo} />
    {children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
