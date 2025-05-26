import { useState } from "react";
import { Button } from "~/components/ui/button";
import { trpc } from "../../utils/trpc";
import { ProductCard } from "~/components/organisms/productCard";
import { Loading } from "~/components/ui/loading";
import LeftSidebar from "~/components/layout/leftSidebar";
import { Suspense } from "react";
import { useFilterProduct } from "~/hooks/useFilterProduct";

export function Home() {
  const { filters, setQueryParams } = useFilterProduct();
  const { page, search, sortBy, sortOrder, category } = filters;
  const { data, isLoading } = trpc.getAllProducts.useQuery({
    ...filters,
    categoryName: category,
  });

  if (isLoading) return <Loading />;

  const totalPages = data?.pagination.totalPages || 0;

  return (
    <div className="container mx-auto flex mt-24">
      <Suspense fallback={<Loading />}>
        <LeftSidebar />
      </Suspense>
      <div className="flex-1 px-4">
        <section className="max-w-screen-xl mx-auto">
          {/* Top Controls */}
          <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
            <span>
              {search &&
                `Showing ${data?.pagination.total.toLocaleString()}+ products for "${search}"`}
            </span>
            <select
              value={`${sortBy || ""}-${sortOrder || ""}`}
              onChange={(e) => {
                const [by, order] = e.target.value.split("-");
                setQueryParams({
                  ...filters,
                  search,
                  sortBy: by,
                  sortOrder: order,
                  page: 1,
                });
              }}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Sort by relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
            </select>
          </div>

          {/* Promo Banner */}
          <div className="flex items-center justify-between bg-gradient-to-r from-orange-100 to-orange-50 p-3 rounded-md mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-orange-500 mr-2 font-bold">FREE shipping </span> on your first
              order
            </div>
            <Button variant={"link"} className="text-red-900">
              Sign In
            </Button>
          </div>

          {/* Product Grid */}
          {data?.products.length === 0 ? (
            <div className="flex min-h-[60vh] justify-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {data?.products.map((product, index) => <ProductCard key={index} {...product} />)}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-4 mt-10">
                <Button
                  variant="outline"
                  onClick={() =>
                    setQueryParams({
                      search,
                      sortBy,
                      sortOrder,
                      page: page - 1,
                    })
                  }
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <span className="text-sm font-medium text-gray-700">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() =>
                    setQueryParams({
                      search,
                      sortBy,
                      sortOrder,
                      page: page + 1,
                    })
                  }
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
