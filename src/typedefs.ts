// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    zines: [Zine]
    verified: Boolean!
    settings: Settings!
    createdAt: String!
  }

  type Zine {
    id: ID!
    title: String!
    cover: String!
    author: User!
    creators: [User]
    views: Int!
    published: Boolean!
    createdAt: String!
  }

  type Settings {
    id: ID!
    user: User!
    emailNotifications: Boolean!
  }

  type AuthUser {
    token: String!
    user: User!
  }

  input SigninInput {
    email: String!
    password: String!
  }

  input SignupInput {
    email: String!
    password: String!
  }

  input ZineContent {
    title: String!
    cover: String
  }

  type Query {
    zines: [Zine],
    creators: [User]
  }

  type Mutation {
    signup(input: SignupInput!): AuthUser!
    signin(input: SigninInput!): AuthUser!
    createZine(input: ZineContent): Zine
    # TODO: save zine as draft (WIP)
  }
`;

export { typeDefs };
