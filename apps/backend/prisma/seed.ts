import { PrismaClient } from "@prisma/client";
import { ulid } from "ulid";
import slugify from "slugify";

const prisma = new PrismaClient();

const categoriesData = [
  "ASUS",
  "VIVO",
  "Xiaomi",
  "Samsung",
  "Honor",
  "Realme",
  "Huawei",
  "Infinix",
  "OnePlus",
  "Google",
].map((name) => ({
  id: ulid(),
  name,
  slug: slugify(name, { lower: true }),
  description: `${name} smartphones`,
}));

const tagsData = [
  "Gaming",
  "Flagship",
  "Mid-Range",
  "Premium",
  "5G",
  "Stylus Support",
].map((name) => ({
  id: ulid(),
  name,
  slug: slugify(name, { lower: true }),
}));

const productsData = [
  {
    name: "ROG Phone 8 Pro",
    sku: "ROG-8PRO-001",
    price: 23337683,
    description:
      "High-performance gaming smartphone with advanced cooling system.",
    imageUrl:
      "https://s.alicdn.com/@sc04/kf/H8e2b51f18db0447fafabfe2c1ba8b87eS.jpg_720x720q50.jpg",
    category: "ASUS",
    tags: ["Gaming"],
  },
  {
    name: "VIVO iQOO 11 Pro",
    sku: "VIVO-IQOO11P-001",
    price: 12654941,
    description: "Flagship smartphone with Snapdragon 8 Gen 2 processor.",
    imageUrl:
      "https://s.alicdn.com/@sc04/kf/H3fa9af9c9992479cb01ddc379489c55bB.jpg_720x720q50.jpg",
    category: "VIVO",
    tags: ["Flagship"],
  },
  {
    name: "Xiaomi Redmi Note 13 Pro",
    sku: "XI-RN13P-001",
    price: 4653731,
    description: "Mid-range smartphone with 200MP camera and AMOLED display.",
    imageUrl:
      "https://s.alicdn.com/@sc04/kf/H23d37f0b70584e96bf9181ed1e673aebb.jpg_720x720q50.jpg",
    category: "Xiaomi",
    tags: ["Mid-Range"],
  },
  {
    name: "Samsung S23 Ultra N88",
    sku: "SAM-S23U-N88-001",
    price: 639321,
    description: "Premium smartphone with 100x Space Zoom and S Pen support.",
    imageUrl:
      "https://s.alicdn.com/@sc04/kf/H6bd0eec87f70469c85d8c6ec01ba0ec4n.jpg_720x720q50.jpg",
    category: "Samsung",
    tags: ["Premium", "Stylus Support"],
  },
  {
    name: "Honor Magic 4 Pro 5G",
    sku: "HON-MAGIC4P-001",
    price: 18500000,
    description: "5G smartphone with quad-camera setup and fast charging.",
    imageUrl:
      "https://s.alicdn.com/@sc04/kf/H78bb63d6cbb74fe4bac33ab8423090e3o.jpg_720x720q50.jpg",
    category: "Honor",
    tags: ["5G", "Premium"],
  },
  {
    name: "Realme GT Neo 5",
    sku: "RLM-GTN5-001",
    price: 6790000,
    description:
      "Affordable phone with flagship features and 240W fast charging.",
    imageUrl:
      "https://s.alicdn.com/@sc04/kf/Hb4b1777986a7434998e0c23ad6e37deaV.jpg_720x720q50.jpg",
    category: "Realme",
    tags: ["Flagship", "Mid-Range"],
  },
  {
    name: "Huawei P60 Pro",
    sku: "HUA-P60P-001",
    price: 10250000,
    description: "Smartphone with powerful camera system and high-end design.",
    imageUrl:
      "https://s.alicdn.com/@sc04/kf/H4775cd7f624e4cbbbd57b897fc8d7cd8R.jpg_720x720q50.jpg",
    category: "Huawei",
    tags: ["Premium"],
  },
  {
    name: "Infinix Zero Ultra",
    sku: "INFX-ZEROULT-001",
    price: 3890000,
    description: "Budget smartphone with 180W fast charge and AMOLED screen.",
    imageUrl:
      "https://s.alicdn.com/@sc04/kf/H75040d2232fe4dcd9649c17f01d526a3A.jpg_720x720q50.jpg",
    category: "Infinix",
    tags: ["Mid-Range"],
  },
  {
    name: "OnePlus 12R",
    sku: "ONE-12R-001",
    price: 8550000,
    description: "Balanced phone with long battery life and OxygenOS.",
    imageUrl:
      "https://s.alicdn.com/@sc04/kf/H3efcd01b21da47b19a19803cc3e60a68C.jpg_720x720q50.jpg",
    category: "OnePlus",
    tags: ["Flagship"],
  },
  {
    name: "Google Pixel 8 Pro",
    sku: "GOO-PX8P-001",
    price: 13500000,
    description: "Google’s latest phone with Tensor G3 and pro camera tools.",
    imageUrl:
      "https://s.alicdn.com/@sc04/kf/Hbb5a0e7c799d4e86a0bb233936898c52r.jpg_720x720q50.jpg",
    category: "Google",
    tags: ["Flagship"],
  },
];

async function main() {
  await prisma.category.createMany({
    data: categoriesData,
    skipDuplicates: true,
  });
  await prisma.tag.createMany({ data: tagsData, skipDuplicates: true });

  const categories = await prisma.category.findMany();
  const tags = await prisma.tag.findMany();

  for (const p of productsData) {
    const category = categories.find((c) => c.name === p.category);
    const productTags = tags.filter((t) => p.tags.includes(t.name));

    if (!category) continue;

    await prisma.product.create({
      data: {
        id: ulid(),
        name: p.name,
        sku: p.sku,
        slug: slugify(`${p.name}-${ulid()}`, { lower: true }),
        description: p.description,
        price: p.price,
        imageUrl: p.imageUrl,
        stockQuantity: 10,
        minimumOrderQuantity: 1,
        categoryId: category.id,
        tags: {
          connect: productTags.map((t) => ({ id: t.id })),
        },
      },
    });
  }

  console.log("✅ Seed completed with Alibaba data");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
