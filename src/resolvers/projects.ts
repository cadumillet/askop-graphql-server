import { Projects } from "../database";
import { Resolvers } from "../types/resolvers";
import { formatDate } from "../utils/formatters";
import { generateSlug } from "../utils/projects";

const resolvers: Resolvers = {
  Query: {
    projects: async () => Projects.find().toArray(),
  },
  Mutation: {
    createProject: async (_, { input }) => {
      const slug = generateSlug(input.title);

      const { insertedId } = await Projects.insertOne({
        ...input,
        views: 0,
        published: input.published,
        createdAt: formatDate(new Date()),
        updatedAt: formatDate(new Date()),
        author: "",
        creators: [],
        // TODO: add author from context (authenticated user)
        slug,
      });
      return Projects.findOne({ _id: insertedId });
    },
  },
};

export default resolvers;
