import { Projects } from "../database";
import { generateSlug } from "../utils/projects";

const resolvers = {
  Query: {
    projects: async () => Projects.find().toArray(),
  },
  Mutation: {
    createProject: async (_: any, { input }: any) => {
      console.log(input);
      // Usage
      const slug = generateSlug(input.title);

      const { insertedId } = await Projects.insertOne({
        ...input,
        views: 0,
        published: input.published,
        createdAt: new Date(),
        updatedAt: new Date(),
        // TODO: add author from context (authenticated user)
        slug,
      });
      return Projects.findOne({ _id: insertedId });
    },
  },
};

export default resolvers;
