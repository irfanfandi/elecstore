import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home-route.tsx"),
  route("product-detail/:slug", "routes/product-detail-route.tsx"),
] satisfies RouteConfig;
