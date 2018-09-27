import { localeShape } from "soya-next/prop-types";
import Layout from "../components/Layout";
import data from "../data/i18n.json";

const IndexPage = ({ locale }) => (
  <Layout>
    <h1>{data[locale.language].titleHome}</h1>
    <p>{data[locale.language].contentHome}</p>
  </Layout>
);

IndexPage.propTypes = {
  locale: localeShape.isRequired
};

export default IndexPage;
