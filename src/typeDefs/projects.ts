const typeDefs = `#graphql
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
  input ProjectContent {
    title: String!
    cover: String
  }
  extend type Query {
    projects: [Project]
  }
  extend type Mutation {
    createProject(input: ProjectContent!): Project!
  }
`;

export default typeDefs;
