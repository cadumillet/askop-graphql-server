import { authenticated } from "../auth/helpers";
import { Projects } from "../database";
import { Resolvers } from "../types/resolvers";
import { generateSlug } from "../utils/projects";

const resolvers: Resolvers = {
  Query: {
    projects: async () => Projects.find().toArray(),
  },
  Mutation: {
    createProject: authenticated(async (_, { input }, { user }) => {
      const slug = generateSlug(input.title);

      const { insertedId } = await Projects.insertOne({
        ...input,
        views: 0,
        published: input.published,
        createdAt: new Date(),
        updatedAt: new Date(),
        author: user._id,
        slug,
      });
      return Projects.findOne({ _id: insertedId });
    }),
  },
};

export default resolvers;
