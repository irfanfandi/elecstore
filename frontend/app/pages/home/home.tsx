import { Button } from "~/components/ui/button";
import { trpc } from "../../utils/trpc";
import { ProductCard } from "~/components/organisms/productCard";
import { Loading } from "~/components/ui/loading";
import LeftSidebar from "~/components/layout/leftSidebar";
import { Suspense } from "react";

export function Home() {
  const { data, isLoading } = trpc.getAllProducts.useQuery();

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto flex mt-24">
      <Suspense fallback={<Loading />}>
        <LeftSidebar />
      </Suspense>
      <div className="flex items-center justify-center">
        <section className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
            <span>Showing 4,000+ products from global suppliers for "iphones 15 pro max"</span>
            <div className="flex items-center space-x-4">
              <span>Sort by relevance</span>
              <div className="flex items-center space-x-1">
                {/* Placeholder for list icon */}
                <div className="w-4 h-4 bg-gray-300"></div>
                {/* Placeholder for grid icon */}
                <div className="w-4 h-4 bg-gray-300"></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between bg-gradient-to-r from-orange-100 to-orange-50 p-3 rounded-md mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-orange-500 mr-2 font-bold">FREE shipping </span> on your first
              order
            </div>
            <Button variant={"link"} className="text-red-900">
              Sign In
            </Button>
          </div>
          {data && data?.length <= 0 ? (
            <div className="flex min-h-[60vh] justify-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
            </div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
              {data?.map((product, index) => <ProductCard key={index} {...product} />)}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
