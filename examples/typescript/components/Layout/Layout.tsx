import React, { SFC, ReactNode } from "react";
import Head from "next/head";
import logo from "./logo.svg";
import styles from "./Layout.module.css";
import "../../styles/global.css";

type Props = {
  children: ReactNode;
};

const Layout: SFC<Props> = ({ children }) => (
  <div className={styles.layout}>
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
    <img src={logo} />
    {children}
  </div>
);

export default Layout;
