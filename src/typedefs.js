"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
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
    projects: [Project]
    verified: Boolean!
    settings: Settings!
    createdAt: String!
  }

  type Project {
    id: ID!
    title: String!
    description: String
    cover: String!
    author: User!
    creators: [User]!
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

  input ProjectContent {
    title: String!
    cover: String
  }

  type Query {
    projects: [Project],
    creators: [User]
  }

  type Mutation {
    signup(input: SignupInput!): AuthUser!
    signin(input: SigninInput!): AuthUser!
    createProject(input: ProjectContent): Project
    # TODO: save zine as draft (WIP)
  }
`;
exports.typeDefs = typeDefs;
