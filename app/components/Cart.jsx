'use client'
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, setCart } from "../store/cartSlice";
import { useEffect } from "react";

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      dispatch(setCart(parsedCart));
    }
  }, [dispatch]);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <div className="w-full md:w-1/4 p-4 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
      {cart.length > 0 ? (
        <div className="space-y-4">
          {cart.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between border-b pb-2"
            >
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-gray-500">{product.price}₺</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch(removeFromCart(product.id))}
                  className="bg-gray-300 px-2 rounded-md"
                >
                  -
                </button>
                <span>{product.quantity}</span>
                <button
                  onClick={() => dispatch(addToCart(product))}
                  className="bg-blue-600 text-white px-2 rounded-md"
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between mt-4 font-bold text-lg">
            <span>Total Price:</span>
            <span>{totalPrice.toFixed(2)}₺</span>
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded-md">
            Checkout
          </button>
        </div>
      ) : (
        <p className="text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
}