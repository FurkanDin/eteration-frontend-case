import { useSelector } from "react-redux";
export default function Header({ setFilter }) {
    const cart = useSelector((state) => state.cart);

    const totalPrice = cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    const handleSearch = (e) => {
        setFilter({ name: e.target.value });
      };
    return (
      <header className="flex items-center justify-between bg-blue-600 p-4 text-white">
        <h1 className="text-2xl font-bold">Eteration</h1>
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Search"
          className="w-1/3 rounded-md p-2 text-black"
        />
        <div className="flex items-center gap-4">
          <span>🛒 {totalPrice}₺</span>
          <span>👤 Kerem</span>
        </div>
      </header>
    );
  }