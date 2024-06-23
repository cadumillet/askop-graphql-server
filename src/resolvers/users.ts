import { Users } from "../database";

const resolvers = {
  Query: {
    users: () => Users.find(),
  },
  Mutation: {
    signup: async (_: any, { input }: any) => Users.insertOne(input),
  },
};
export default resolvers;
