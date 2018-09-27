import Head from "next/head";
import Layout from "../components/Layout/Layout";
import PostLink from "../components/PostLink/PostLink";

const IndexPage = () => (
  <Layout>
    <Head>
      <title>Soya Next Project</title>
    </Head>
    <ul>
      <PostLink id="hello-nextjs" title="Hello Next.js" />
      <PostLink id="learn-nextjs" title="Learn Next.js is awesome" />
      <PostLink id="deploy-nextjs" title="Deploy apps with Zeit" />
    </ul>
  </Layout>
);

export default IndexPage;
