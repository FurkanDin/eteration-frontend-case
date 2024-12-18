'use client'
import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import Pagination from "./components/Pagination";
import { getProducts } from "./utils/api";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import FilterSidebar from "./components/FilterSidebar";
import Cart from "./components/Cart";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    brand: [],
    model: "",
    sortBy: "",
    searchTerm: "",
  });
  // const { cart } = useSelector((state) => state.cart);

  const perPage = 12; 

  useEffect(() => {
    // API'den ürünleri al
    getProducts(page, filter).then((data) => {
      setProducts(data);
      setFilteredProducts(data); 
    });
  }, [page]);

  useEffect(() => {
    let newProducts = [...products];

    if (filter.brand.length > 0) {
      newProducts = newProducts.filter((product) =>
        filter.brand.includes(product.brand)
      );
    }

    if (filter.model) {
      newProducts = newProducts.filter((product) =>
        product.model.toLowerCase().includes(filter.model.toLowerCase())
      );
    }

    if (filter.searchTerm) {
      newProducts = newProducts.filter((product) =>
        product.name.toLowerCase().includes(filter.searchTerm.toLowerCase())
      );
    }

    if (filter.sortBy === "priceLowToHigh") {
      newProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (filter.sortBy === "priceHighToLow") {
      newProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (filter.sortBy === "oldToNew") {
      newProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    setFilteredProducts(newProducts);
  }, [filter, products]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(filteredProducts.length / perPage);

  return (
    <div>
      <Header setFilter={setFilter} />
      <div className="flex flex-col md:flex-row">
        <FilterSidebar products={products} setFilter={setFilter} />
        <div className="flex-1">
          <ProductList products={filteredProducts.slice((page - 1) * perPage, page * perPage)} />
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
        <Cart />
      </div>
    </div>
  );
}