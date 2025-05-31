import { formatToIDR } from "~/utils/function";
import { Button } from "../ui/button";

type ProductCardProps = {
  imageUrl: string | null;
  name: string;
  slug: string;
  price: string;
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

export function ProductCard({
  imageUrl,
  name,
  price,
  minimumOrderQuantity,
  slug,
  category,
}: ProductCardProps) {
  return (
    <div className="rounded-lg bg-white overflow-hidden w-[290px] cursor-pointer group">
      <a
        href={`/product-detail/${slug}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-center items-center"
      >
        <img
          src={imageUrl || ""}
          alt={name}
          className="w-full h-48 object-contain p-4 transition-transform duration-300 group-hover:scale-110"
        />
      </a>

      <div className="p-4 space-y-2">
        <a
          href={`/product-detail/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium line-clamp-2 cursor-pointer hover:text-orange-500 block"
        >
          {name}
        </a>
        <h2 className="text-xl font-extrabold text-black">{formatToIDR(price)}</h2>
        <p className="text-xs text-gray-600">Min. order: {minimumOrderQuantity}</p>
        <p className="text-sm underline">Guangzhou Liulong Trading Co., Ltd.</p>
        <p className="text-xs text-gray-400">{category?.name || ""}</p>
        <Button variant="outline" className="w-full text-sm mt-2 rounded-full border-gray-300">
          Chat now
        </Button>
      </div>
    </div>
  );
}
