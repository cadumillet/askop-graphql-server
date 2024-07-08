import { comparePassword, generateToken, hashPassword } from "../auth";
import { Users } from "../database";
import { Resolvers } from "../types/resolvers";

const resolvers: Resolvers = {
  Query: {
    users: async () => {
      const users = await Users.find().toArray();
      return users.map((user) => ({ ...user, _id: user._id.toString() }));
    },
  },
  Mutation: {
    signin: async (_, { email, password }) => {
      const user = await Users.findOne({ email });
      if (!user) {
        throw new Error("Email or password incorrect");
      }
      const isCorrectPassword = await comparePassword(password, user.password);
      if (!isCorrectPassword) {
        throw new Error("Email or password incorrect");
      }

      const token = generateToken(user);
      return { token, user: { ...user, _id: user._id.toString() } };
    },
    signup: async (_: any, { email, password }: any) => {
      const existingUser = await Users.findOne({ email });
      if (existingUser) {
        throw new Error("User already exists");
      }

      const hash = await hashPassword(password);

      const { insertedId: newUserId } = await Users.insertOne({
        email,
        password: hash,
        verified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const user = await Users.findOne({ _id: newUserId });
      if (!user) {
        throw new Error("Email or password incorrect");
      }

      const token = generateToken(user);
      return { token, user: { ...user, _id: user._id.toString() } };
    },
  },
};
export default resolvers;
