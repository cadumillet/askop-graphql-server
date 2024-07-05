const typeDefs = `#graphql
  type User {
    _id: ObjectId!
    email: String!
    password: String!
    firstName: String
    lastName: String
    projects: [Project]
    verified: Boolean
    settings: Settings
    createdAt: Date!
    lastModified: Date!
  }
  type AuthUser {
    token: String!
    user: User
  }
  extend type Query {
    users: [User] # creators
  }
  extend type Mutation {
    signup(email: String!, password: String!): AuthUser
    signin(email: String!, password: String!): AuthUser
  }
`;

export default typeDefs;
