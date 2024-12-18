import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

const ProductList = ({ products }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (!Array.isArray(products) || products.length === 0) {
    return <div>Product not found</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex flex-col items-center rounded-md border p-4 shadow-md"
        >
          <Link href={`/product/${product.id}`}>
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
            <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>
            <p className="text-blue-600">{product.price}₺</p>
          </Link>
          <button
            onClick={() => handleAddToCart(product)}
            className="mt-2 w-full rounded-md bg-blue-600 py-2 text-white"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;