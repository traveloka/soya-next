import { createApolloPageFactory } from "soya-next/pages";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import config from "config";
import fetch from "isomorphic-unfetch";

const configureApolloClient = apolloState =>
  new ApolloClient({
    link: new HttpLink({ uri: config.graphqlEndpoint, fetch }),
    cache: new InMemoryCache().restore(apolloState)
  });

export default createApolloPageFactory(configureApolloClient);
