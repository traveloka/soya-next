import { withRouter } from "next/router";
import Layout from "../components/Layout";

export default withRouter(({ router }) => (
  <Layout>
    <h1>{router.query.title || router.query.id}</h1>
    <p>This is the blog post content.</p>
  </Layout>
));
