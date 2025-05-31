import React from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { formatToIDR } from "~/utils/function";

type ProductDetailProps = {
  imageUrl: string | null;
  name: string;
  price: string;
  description: string;
  minimumOrderQuantity: number;
  category: {
    name: string;
    description: string | null;
    id: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
  } | null;
};

const ProductDetailSection = ({
  imageUrl,
  name,
  price,
  minimumOrderQuantity,
  category,
  description,
}: ProductDetailProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-start max-w-6xl mx-auto p-6 bg-white rounded-3xl shadow-sm">
      {/* Product Image */}
      <div className="relative group">
        <div className="aspect-square overflow-hidden rounded-2xl bg-gray-50">
          <img
            src={imageUrl || ""}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="absolute top-4 left-4">
          <Badge className="bg-orange-500/90 text-white backdrop-blur-sm">New Arrival</Badge>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-orange-500">{formatToIDR(price)}</span>
            <span className="text-sm text-gray-500">/ unit</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 mb-1">Minimum Order</p>
            <p className="font-semibold">{minimumOrderQuantity} units</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 mb-1">Category</p>
            <p className="font-semibold">{category?.name || "Uncategorized"}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Available Colors</p>
            <div className="flex gap-3">
              {["Silver", "Black", "Gold", "Titanium"].map((color) => (
                <button
                  key={color}
                  className="w-8 h-8 rounded-full border-2 border-gray-200 hover:border-orange-500 transition-colors"
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Storage Options</p>
            <div className="flex gap-3">
              {["1TB", "512GB", "256GB"].map((storage) => (
                <button
                  key={storage}
                  className="px-4 py-2 rounded-lg border border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-colors"
                >
                  {storage}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm font-medium text-gray-700 mb-2">Product Grade</p>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-500/10 text-green-700">A+</Badge>
              <span className="text-sm text-gray-600">Almost new condition</span>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm font-medium text-gray-700 mb-2">Description</p>
            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white h-12 text-base font-medium">
            Send Inquiry
          </Button>
          <Button variant="outline" className="flex-1 h-12 text-base font-medium">
            Chat Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSection;
