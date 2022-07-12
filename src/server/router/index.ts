// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { userRouter } from "./user.router";
import { exampleRouter } from "./example";
export const appRouter = createRouter()
  .transformer(superjson)
  .merge("users.", userRouter)
  .merge("example.", exampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
