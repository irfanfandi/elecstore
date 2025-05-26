import { initTRPC } from "@trpc/server";
import { string, z } from "zod";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const t = initTRPC.create({
  errorFormatter({ shape }) {
    console.error("tRPC Error:", shape);
    return shape;
  },
});

export const appRouter = t.router({
  getBySlug: t.procedure.input(z.string()).query(async ({ input }) => {
    try {
      const product = await prisma.product.findUnique({
        include: {
          category: true,
          tags: true,
        },
        where: { slug: input },
      });

      if (!product) {
        throw new Error("Product not found");
      }

      return product;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch product: ${error.message}`);
      }
      throw new Error(
        "An unexpected error occurred while fetching the product"
      );
    }
  }),
  getAllProducts: t.procedure
    .input(
      z
        .object({
          search: z.string().optional(),
          categoryName: z.array(string()).optional(),
          sortBy: z.enum(["createdAt", "name", "price"]).optional(),
          sortOrder: z.enum(["asc", "desc"]).optional(),
          minPrice: z.number().optional(),
          maxPrice: z.number().optional(),
          minOrder: z.number().optional(),
          page: z.number().min(1).default(1),
          limit: z.number().min(1).max(100).default(10),
        })
        .optional()
    )
    .query(async ({ input }) => {
      try {
        const {
          search,
          categoryName,
          sortBy = "createdAt",
          sortOrder = "desc",
          minPrice,
          maxPrice,
          minOrder,
          page = 1,
          limit = 10,
        } = input || {};

        const skip = (page - 1) * limit;

        const where = {
          AND: [
            search
              ? {
                  OR: [
                    {
                      name: {
                        contains: search,
                        mode: Prisma.QueryMode.insensitive,
                      },
                    },
                    {
                      description: {
                        contains: search,
                        mode: Prisma.QueryMode.insensitive,
                      },
                    },
                  ],
                }
              : {},
            categoryName
              ? {
                  category: {
                    name: { in: categoryName },
                  },
                }
              : {},
            minPrice
              ? {
                  price: {
                    gte: minPrice,
                  },
                }
              : {},
            maxPrice
              ? {
                  price: {
                    lte: maxPrice,
                  },
                }
              : {},
            minOrder
              ? {
                  minimumOrderQuantity: {
                    gte: minOrder,
                  },
                }
              : {},
          ],
        };

        const [products, total] = await Promise.all([
          prisma.product.findMany({
            where,
            include: {
              category: true,
              tags: true,
            },
            orderBy: {
              [sortBy]: sortOrder,
            },
            skip,
            take: limit,
          }),
          prisma.product.count({ where }),
        ]);

        return {
          products,
          pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
          },
        };
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to fetch products: ${error.message}`);
        }
        throw new Error("An unexpected error occurred while fetching products");
      }
    }),
});

export type AppRouter = typeof appRouter;
