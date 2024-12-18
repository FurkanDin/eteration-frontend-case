"use client"; 
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; 
import { useDispatch } from "react-redux";
import { addToCart } from "../../../store/cartSlice";

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { id } = params; 

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const response = await fetch(
          `https://5fc9346b2af77700165ae514.mockapi.io/products/${id}`
        );
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      };

      fetchProduct();
    }
  }, [id]); 

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found.</div>; 

  return (
    <div className="p-20 my-40 mx-20 shadow-lg   grid grid-cols-2  container bg-gray-50 rounded-lg">
      <div className="p-2">
        {" "}
        <img src={product.image} alt={product.name} className=" h-auto me-8" />
      </div>
      <div className="">
        <h1 className="text-4xl font-semibold text-left">{product.name}</h1>
        <h2 className=" text-3xl text-blue-500 mt-4 h-1 text-left">
          {product.price}₺
        </h2>
        <button
          onClick={() => handleAddToCart(product)}
          className="mt-16 w-full rounded-md bg-blue-600 py-2 text-white"
        >
          Add to Cart
        </button>
        <p className="mt-4">{product.description}</p>
       
      </div>
    </div>
  );
}
