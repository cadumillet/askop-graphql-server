import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import "dotenv/config";

import connectDb from "./database";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import { getUserFromToken } from "./auth";

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // includeStacktraceInErrorResponses: false,
});

connectDb();

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const token = req.headers.authorization || "";
    const user = await getUserFromToken(token);
    return { user };
  },
}).then(({ url }) => console.log(`🚀  Server ready at: ${url}`));
