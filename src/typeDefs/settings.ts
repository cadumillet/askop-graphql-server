const typeDefs = `#graphql
  type Settings {
    _id: ID!
    user: User!
    emailNotifications: Boolean!
  }
`;

export default typeDefs;
