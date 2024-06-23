const typeDefs = `#graphql
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
  extend type Query {
    users: [User] # creators
  }
  extend type Mutation {
    signup(input: SignupInput!): AuthUser!
    signin(input: SigninInput!): AuthUser!
  }
`;

export default typeDefs;
