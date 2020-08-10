import { withRouter } from "next/router";
import Layout from "../components/Layout";

const PostPage = withRouter(({ router }) => (
  <Layout>
    <h1>{router.query.title || router.query.id}</h1>
    <p>This is the blog post content.</p>
  </Layout>
));

export default PostPage;
