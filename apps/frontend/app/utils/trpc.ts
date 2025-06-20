import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../backend/src/trpc/product/router";

export const trpc = createTRPCReact<AppRouter>();
