import React from "react";
import Link from "next/link";
import Post from "../components/Post";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import config from "config";
import Layout from "../components/Layout";
import createApolloPage from "../hocs/createApolloPage";

class ListPage extends React.Component {
  componentWillMount() {
    this.props.allPostsQuery.refetch();
  }

  render() {
    if (this.props.allPostsQuery.loading) {
      return (
        <Layout>
          <div className="flex w-100 h-100 items-center justify-center pt7">
            <div>Loading (from {config.graphqlEndpoint})</div>
          </div>
        </Layout>
      );
    }

    let blurClass = "";
    if (this.props.url.pathname !== "/") {
      blurClass = " blur";
    }

    return (
      <Layout>
        <div className={"w-100 flex justify-center pa6" + blurClass}>
          <div className="w-100 flex flex-wrap" style={{ maxWidth: 1150 }}>
            <Link href="/create">
              <a className="ma3 box new-post br2 flex flex-column items-center justify-center ttu fw6 f20 black-30 no-underline">
                <img
                  src={require("../assets/plus.svg")}
                  alt=""
                  className="plus mb3"
                />
                <div>New Post</div>
              </a>
            </Link>
            {this.props.allPostsQuery.allPosts &&
              this.props.allPostsQuery.allPosts.map(post => (
                <Post
                  key={post.id}
                  post={post}
                  refresh={() => this.props.allPostsQuery.refetch()}
                />
              ))}
          </div>
          {this.props.children}
        </div>
      </Layout>
    );
  }
}

const ALL_POSTS_QUERY = gql`
  query AllPostsQuery {
    allPosts(orderBy: createdAt_DESC) {
      id
      imageUrl
      description
    }
  }
`;

const ListPageWithQuery = graphql(ALL_POSTS_QUERY, {
  name: "allPostsQuery",
  options: {
    fetchPolicy: "network-only"
  }
})(ListPage);

export default createApolloPage(ListPageWithQuery);
