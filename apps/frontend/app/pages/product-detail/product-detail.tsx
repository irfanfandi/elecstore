import { useParams } from "react-router";
import { trpc } from "../../utils/trpc";
import { Loading } from "~/components/ui/loading";
import ProductDetailSection from "~/components/organisms/productDetailSection";

type Props = {};

const ProductDetail = (props: Props) => {
  const { slug } = useParams();
  const { data: product, isLoading } = trpc.getBySlug.useQuery(slug ?? "");

  if (isLoading) {
    return <Loading />;
  }

  if (!product || typeof product === "string") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-6">
          Sorry, we couldn't find the product you're looking for.
        </p>
        <a
          href="/"
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
        >
          Return to Home
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex mt-24">
      <ProductDetailSection {...product} />
    </div>
  );
};

export default ProductDetail;
