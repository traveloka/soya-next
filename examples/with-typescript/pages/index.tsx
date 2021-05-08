import Head from "next/head";
import { createPage } from "soya-next";
import Layout from "../components/Layout/Layout";

const IndexPage = () => (
  <Layout>
    <Head>
      <title>Soya Next Project</title>
    </Head>
    <p>This is your project homepage</p>
  </Layout>
);

export default createPage()(IndexPage);
