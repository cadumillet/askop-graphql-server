const typeDefs = `#graphql
  type Project {
    _id: ObjectId!
    title: String!
    description: String
    cover: String!
    author: ObjectId!
    creators: [ObjectId]!
    views: Int!
    published: Boolean!
    createdAt: String!
    updatedAt: String!
    slug: String!
    content: [ContentBlock!]
  }
  type ContentBlock {
    _id: ObjectId!
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
  input ProjectContent {
    title: String!
    cover: String!
    description: String
    published: Boolean!
  }
  extend type Query {
    projects: [Project]
  }
  extend type Mutation {
    createProject(input: ProjectContent!): Project
  }
`;

export default typeDefs;
