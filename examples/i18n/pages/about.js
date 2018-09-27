import { localeShape } from "soya-next/prop-types";
import Layout from "../components/Layout";
import data from "../data/i18n.json";

const AboutPage = ({ locale }) => (
  <Layout>
    <h1>{data[locale.language].titleAboutUs}</h1>
    <p>{data[locale.language].contentAboutUs}</p>
  </Layout>
);

AboutPage.propTypes = {
  locale: localeShape
};

export default AboutPage;
