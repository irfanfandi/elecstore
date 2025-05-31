import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useFilterProduct } from "~/hooks/useFilterProduct";

const categories = [
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
];

export default function LeftSidebar() {
  const { filters, setQueryParams } = useFilterProduct();

  const selectedCategories = useMemo(() => filters.category || [], [filters.category]);

  const [localMinPrice, setLocalMinPrice] = useState<string>("");
  const [localMaxPrice, setLocalMaxPrice] = useState<string>("");
  const [localMinOrder, setLocalMinOrder] = useState<string>("");

  useEffect(() => {
    setLocalMinPrice(filters.minPrice ? String(filters.minPrice) : "");
    setLocalMaxPrice(filters.maxPrice ? String(filters.maxPrice) : "");
    setLocalMinOrder(filters.minOrder ? String(filters.minOrder) : "");
  }, [filters.minPrice, filters.maxPrice, filters.minOrder]);

  const toggleCategory = useCallback(
    (category: string) => {
      let newCategories: string[];
      if (selectedCategories.includes(category)) {
        newCategories = selectedCategories.filter((c) => c !== category);
      } else {
        newCategories = [...selectedCategories, category];
      }

      setQueryParams({
        category: newCategories.length > 0 ? newCategories.join(",") : undefined,
      });
    },
    [selectedCategories, setQueryParams],
  );

  const onApplyPrice = useCallback(() => {
    setQueryParams({
      minPrice: localMinPrice || undefined,
      maxPrice: localMaxPrice || undefined,
    });
  }, [localMinPrice, localMaxPrice, setQueryParams]);

  const onApplyMinOrder = useCallback(() => {
    setQueryParams({
      minOrder: localMinOrder || undefined,
    });
  }, [localMinOrder, setQueryParams]);

  const clearAllFilters = useCallback(() => {
    setQueryParams({
      ...filters,
      category: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      minOrder: undefined,
      page: 1,
    });
    setLocalMinPrice("");
    setLocalMaxPrice("");
    setLocalMinOrder("");
  }, [filters, setQueryParams]);

  return (
    <aside className="w-full md:w-64 border-r px-4 py-6 space-y-6 text-sm bg-white">
      <div className="space-y-2">
        <h4 className="font-semibold">Categories</h4>
        <div className="flex flex-col space-x-2 gap-4">
          {categories.map((category, idx) => (
            <div className="flex gap-4" key={`${category}-${idx}`}>
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <Label htmlFor={category}>{category}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold">Price</h4>
        <div className="flex items-center gap-2">
          <div className="flex flex-col w-full">
            <Input
              placeholder="Min."
              className="w-full text-sm"
              type="number"
              value={localMinPrice}
              onChange={(e) => setLocalMinPrice(e.target.value)}
            />
          </div>
          <span>-</span>
          <div className="flex flex-col w-full">
            <Input
              placeholder="Max."
              className="w-full text-sm"
              type="number"
              value={localMaxPrice}
              onChange={(e) => setLocalMaxPrice(e.target.value)}
            />
          </div>
          <Button size="sm" className="rounded-full px-3" onClick={onApplyPrice}>
            OK
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold">Min. order</h4>
        <div className="flex gap-2">
          <Input
            placeholder="e.g. 10"
            className="w-full text-sm"
            type="number"
            value={localMinOrder}
            onChange={(e) => setLocalMinOrder(e.target.value)}
          />
          <Button size="sm" className="rounded-full px-3" onClick={onApplyMinOrder}>
            OK
          </Button>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          variant={"outline"}
          size="sm"
          className="rounded-full px-3"
          onClick={clearAllFilters}
        >
          Clear All Filter
        </Button>
      </div>
    </aside>
  );
}
