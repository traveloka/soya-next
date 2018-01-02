# React & Apollo Quickstart in Soya Next

* [React](https://facebook.github.io/react/): Frontend framework for building user interfaces
* [Apollo Client](https://github.com/apollographql/apollo-client): Fully-featured, production ready caching GraphQL client
* [Graphcool](https://www.graph.cool): Backend development framework based on GraphQL + Serverless

## Example

![](http://imgur.com/3S6fUeI.gif)

## Quickstart

> For more information on how to get started refer to the full "React & Apollo"-[tutorial](https://www.graph.cool/docs/quickstart/frontend/react/apollo-tijghei9go/) or watch the corresponding [video](https://www.youtube.com/watch?v=OoPQl8hcIug).

### 1. Install the [Graphcool CLI](https://docs-next.graph.cool/reference/graphcool-cli/overview-zboghez5go)

```sh
npm install -g graphcool-framework
```

Now that the CLI is installed, you can use it to create the file structure for new service with the `graphcool-framework init` command.

Create the local file structure for a new Graphcool service inside a directory called server:

```sh
# Create a local service definition in a new directory called `server`
graphcool-framework init server
```

`graphcool-framework init server` creates the local service structure inside the specified server directory:

```
.
└── server
    ├── graphcool.yml
    ├── types.graphql
    └── src
        ├── hello.graphql
        └── hello.js
```

### 2. Define data model

Next, you need to define your data model inside the newly created `types.graphql`-file.

Replace the current contents in `types.graphql` with the following type definition (you can delete the predefined `User` type):

```graphql
type Post @model {
  # Required system field
  id: ID! @isUnique # read-only (managed by Graphcool)

  # Optional system fields (remove if not needed)
  createdAt: DateTime! # read-only (managed by Graphcool)
  updatedAt: DateTime! # read-only (managed by Graphcool)

  description: String!
  imageUrl: String!
}
```

### 3. Deploy the GraphQL server

You're now ready to put your Graphcool service into production! Navigate into the `server` directory and [deploy](https://docs-next.graph.cool/reference/graphcool-cli/commands-aiteerae6l#graphcool-deploy) the service:

```sh
cd server
graphcool deploy
```

When prompted which cluster you want to deploy to, choose any of the **Shared Clusters** options (`shared-eu-west-1`, `shared-ap-northeast-1` or `shared-us-west-2`).

Save the HTTP endpoint for the `Simple API` from the output, you'll need it in the next step.

> **Note**: You can now test your GraphQL API inside a GraphQL playground. Simply type the `graphcool playground` command and start sending queries and mutations.

### 4. Connect the frontend app with your GraphQL API

Paste the `Simple API` endpoint from the previous step to `./config/default.json` as `graphqlEndpoint`:

```json
{
  // replace `__SIMPLE_API_ENDPOINT__` with the endpoint from the previous step
  "graphqlEndpoint": "__SIMPLE_API_ENDPOINT__"
}
```

> **Note**: If you ever lose your endpoint, you can get access to it again with the `graphcool info` command.

### 5. Install dependencies & run locally

```sh
cd ..
yarn install
yarn start # open http://localhost:3000 in your browser
```

## Next steps

* [Documentation](https://www.graph.cool/docs)
* [Advanced GraphQL features](https://www.graph.cool/docs/tutorials/advanced-features-eath7duf7d/)
* [Authentication & Permissions](https://www.graph.cool/docs/reference/authorization/overview-iegoo0heez/)
* [Implementing business logic with serverless functions](https://www.graph.cool/docs/reference/functions/overview-boo6uteemo/)


## Help & Community [![Slack Status](https://slack.graph.cool/badge.svg)](https://slack.graph.cool)

Say hello in graphcool [Slack](http://slack.graph.cool/) or visit the [Graphcool Forum](https://www.graph.cool/forum) if you run into issues or have questions.

![](http://i.imgur.com/5RHR6Ku.png)


