import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="product-item">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price}₺</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <Link href={`/product/${product.id}`}>View Details</Link>
    </div>
  );
};

export default ProductItem;