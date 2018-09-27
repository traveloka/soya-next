import Layout from "../components/Layout";
import Dictionary from "../components/Dictionary";

const AboutPage = () => (
  <Layout>
    <Dictionary component="h1" entryKey="titleAboutUs" />
    <Dictionary component="p" entryKey="contentAboutUs" />
  </Layout>
);

export default AboutPage;
