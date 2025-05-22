import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const t = initTRPC.create({
  errorFormatter({ shape }) {
    console.error("tRPC Error:", shape);
    return shape;
  },
});

export const appRouter = t.router({
  getBySlug: t.procedure.input(z.string()).query(async ({ input }) => {
    const product = await prisma.product.findUnique({
      include: {
        category: true,
        tags: true,
      },
      where: { slug: input },
    });

    if (!product) {
      return "Product not found";
    }

    return product;
  }),
  getAllProducts: t.procedure.query(async () => {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        tags: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return products;
  }),
});

export type AppRouter = typeof appRouter;
