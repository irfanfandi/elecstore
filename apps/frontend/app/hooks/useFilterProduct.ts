import { useLocation, useNavigate, useSearchParams } from "react-router";
import { useMemo, useCallback } from "react";

export type SortBy = "createdAt" | "name" | "price";
export type SortOrder = "asc" | "desc";

export const useFilterProduct = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const filters = useMemo(() => {
    const page = parseInt(params.get("page") || "1");
    const limit = parseInt(params.get("limit") || "8");
    const search = params.get("search") || undefined;

    // Convert comma-separated string to array (category)
    const categoryParam = params.get("category");
    const category = categoryParam
      ? categoryParam.split(",").map(String).filter(Boolean)
      : undefined;

    const sortBy = ["createdAt", "name", "price"].includes(params.get("sortBy") || "")
      ? (params.get("sortBy") as SortBy)
      : undefined;

    const sortOrder = ["asc", "desc"].includes(params.get("sortOrder") || "")
      ? (params.get("sortOrder") as SortOrder)
      : undefined;

    const minPriceRaw = params.get("minPrice");
    const maxPriceRaw = params.get("maxPrice");
    const minOrderRaw = params.get("minOrder");

    const minPrice =
      minPriceRaw !== null && !isNaN(Number(minPriceRaw)) ? Number(minPriceRaw) : undefined;
    const maxPrice =
      maxPriceRaw !== null && !isNaN(Number(maxPriceRaw)) ? Number(maxPriceRaw) : undefined;
    const minOrder =
      minOrderRaw !== null && !isNaN(Number(minOrderRaw)) ? Number(minOrderRaw) : undefined;

    return {
      page,
      limit,
      search,
      category,
      sortBy,
      sortOrder,
      minPrice,
      maxPrice,
      minOrder,
    };
  }, [params]);

  const setQueryParams = useCallback(
    (newValues: Record<string, string | number | string[] | undefined>) => {
      const newParams = new URLSearchParams(params.toString());

      Object.entries(newValues).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          if (key === "category" && Array.isArray(value)) {
            if (value.length > 0) {
              newParams.set(key, value.join(","));
            } else {
              newParams.delete(key);
            }
          } else {
            newParams.set(key, String(value));
          }
        } else {
          newParams.delete(key);
        }

        if (key !== "page") {
          newParams.set("page", "1");
        }
      });

      const searchStr = newParams.toString();

      if (location.pathname !== "/") {
        navigate("/?" + searchStr, { replace: true });
      } else {
        navigate({ search: searchStr });
      }
    },
    [params, location.pathname, navigate],
  );

  return {
    filters,
    setQueryParams,
  };
};
