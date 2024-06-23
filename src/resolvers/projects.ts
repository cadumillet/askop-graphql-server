const resolvers = {
  Query: {
    projects: () => [],
  },
  Mutation: {
    createProject: (_: any, { input }: any) => input,
  },
};

export default resolvers;
