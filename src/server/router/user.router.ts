import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from "@trpc/server";
import { createUserSchema } from "../schema/user.schema";
import { createRouter } from "./context";

export const userRouter = createRouter().mutation("register-user", {
  input: createUserSchema,

  async resolve({ ctx, input }) {
    const { email, name } = input;

    try {
      const user = await ctx.prisma.user.create({
        data: {
          email,
          name,
        },
      });

      return user;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          throw new trpc.TRPCError({
            code: "CONFLICT",
            message: "User already exists",
          });
        }
      } else {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "This shit broken dawg",
        });
      }
    }
  },
});
