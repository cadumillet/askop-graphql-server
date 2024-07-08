import { ObjectId } from "mongodb";
import { authenticated } from "../auth/helpers";
import { Projects } from "../database";
import { Resolvers } from "../types/resolvers";
import { generateSlug } from "../utils/projects";

const resolvers: Resolvers = {
  Query: {
    projects: async () => {
      const projects = await Projects.find().toArray();
      return projects.map((project) => ({
        ...project,
        _id: project._id.toString(),
      }));
    },
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
    deleteProject: authenticated(async (_, { id }, { user }) => {
      const project = await Projects.findOne({ _id: new ObjectId(id) });
      if (!project) {
        throw new Error("Project not found");
      }
      console.log(project);

      // if (project.author !== user._id) {
      //   throw new Error("Not authorized");
      // }
      // const res = await Projects.deleteOne({ _id: new ObjectId(id) });
      return project;
    }),
  },
};

export default resolvers;
