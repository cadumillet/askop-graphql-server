const typeDefs = `#graphql
  type Project {
    _id: ID!
    title: String!
    description: String
    cover: String!
    author: ID!
    creators: [ID]
    views: Int!
    published: Boolean!
    createdAt: Date!
    updatedAt: Date!
    slug: String!
    content: [ContentBlock!]
  }
  type ContentBlock {
    _id: ID!
    type: ContentType!
    content: String!
    order: Int!
    format: ContentFormat!
  }
  enum ContentType {
    TEXT
    IMAGE
    VIDEO
  }
  enum ContentFormat {
    PLAIN_TEXT
    MARKDOWN
    HTML
  }
  input ProjectInput {
    title: String!
    cover: String!
    description: String
    published: Boolean!
  }
  extend type Query {
    projects: [Project]
  }
  extend type Mutation {
    createProject(input: ProjectInput!): Project
    deleteProject(id: ID!): Project
  }
`;

export default typeDefs;
