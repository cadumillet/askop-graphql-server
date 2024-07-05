import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "src/typeDefs",
  generates: {
    "src/types/resolvers.ts": {
      config: {
        useIndexSignature: true,
      },
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
  config: {
    require: ["ts-node/register"],
  },
};

export default config;
