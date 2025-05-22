import type { Route } from "./+types/home-route";
import { Home } from "../pages/home/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home | Smartphone Marketplace" },
    {
      name: "description",
      content:
        "Browse our extensive collection of smartphones from top brands including Samsung, Apple, Xiaomi, and more. Find the perfect device with competitive prices and fast shipping.",
    },
  ];
}

export default function HomeRoute() {
  return <Home />;
}
