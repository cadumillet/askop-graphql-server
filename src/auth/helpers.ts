import { GraphQLResolveInfo } from "graphql";
import { User } from "../types/resolvers";
import { GraphQLError } from "graphql";

type Context = {
  user: User;
};

type ResolverFn<TRoot = any, TArgs = any> = (
  root: TRoot,
  args: TArgs,
  context: Context,
  info: GraphQLResolveInfo
) => any;

export const authenticated =
  <TRoot, TArgs>(next: ResolverFn<TRoot, TArgs>): ResolverFn<TRoot, TArgs> =>
  (root: any, args, context, info) => {
    if (!context.user) {
      throw new GraphQLError("Must authenticate", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    }

    return next(root, args, context, info);
  };
