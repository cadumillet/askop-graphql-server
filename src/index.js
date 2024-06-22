"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const typedefs_1 = require("./typedefs");
const models_1 = require("./db/models");
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        projects: () => models_1.models.Project.findMany({}),
        creators: () => [],
    },
    Mutation: {
        createProject: (_, { input }) => input,
    },
};
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new server_1.ApolloServer({
    typeDefs: typedefs_1.typeDefs,
    resolvers,
});
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
(0, standalone_1.startStandaloneServer)(server, {
    listen: { port: 4000 },
}).then(({ url }) => console.log(`🚀  Server ready at: ${url}`));
