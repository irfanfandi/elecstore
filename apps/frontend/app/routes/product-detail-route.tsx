import type { Route } from "./+types/product-detail-route";
import ProductDetail from "~/pages/product-detail/product-detail";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Product Details | Smartphone Marketplace" },
    {
      name: "description",
      content:
        "View detailed specifications, features, and pricing for this smartphone. Compare options, read reviews, and make an informed purchase decision with our comprehensive product details.",
    },
  ];
}

export default function ProductDetailRoute() {
  return <ProductDetail />;
}
