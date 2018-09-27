import Layout from "../components/Layout";
import Dictionary from "../components/Dictionary";

const IndexPage = () => (
  <Layout>
    <Dictionary component="h1" entryKey="titleHome" />
    <Dictionary component="p" entryKey="contentHome" />
  </Layout>
);

export default IndexPage;
