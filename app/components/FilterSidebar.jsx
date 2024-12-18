import { useState, useEffect } from "react";

export default function FilterSidebar({ products, setFilter }) {
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBrands, setFilteredBrands] = useState([]);

  useEffect(() => {
    if (Array.isArray(products)) {
      const uniqueBrands = [...new Set(products.map((product) => product.brand))];
      setBrands(uniqueBrands);
      setFilteredBrands(uniqueBrands); 
    }
  }, [products]);

  // Handle changes in the filter
  const handleBrandChange = (brand) => {
    setSelectedBrands((prevSelectedBrands) => {
      const isAlreadySelected = prevSelectedBrands.includes(brand);
      if (isAlreadySelected) {
        return prevSelectedBrands.filter((item) => item !== brand); // Remove 
      } else {
        return [...prevSelectedBrands, brand]; // Add 
      }
    });
  };

  const handleFilterChange = () => {
    setFilter({
      brand: selectedBrands,
      model: selectedModel,
      sortBy,
      searchTerm,
    });
  };

  const handleBrandSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = brands.filter((brand) =>
      brand.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredBrands(filtered); 
  };

  return (
    <div className="hidden w-1/4 flex-col gap-4 p-4 md:flex">
      {/* Sort By Section */}
      <div className="rounded-md border p-4">
        <h3 className="font-semibold mb-2">Sort By</h3>
        <ul>
          <li>
            <input
              type="radio"
              name="sort"
              checked={sortBy === "oldToNew"}
              onChange={() => {
                setSortBy("oldToNew");
                handleFilterChange();
              }}
            />{" "}
            Old to New
          </li>
          <li>
            <input
              type="radio"
              name="sort"
              checked={sortBy === "priceLowToHigh"}
              onChange={() => {
                setSortBy("priceLowToHigh");
                handleFilterChange();
              }}
            />{" "}
            Price Low to High
          </li>
          <li>
            <input
              type="radio"
              name="sort"
              checked={sortBy === "priceHighToLow"}
              onChange={() => {
                setSortBy("priceHighToLow");
                handleFilterChange();
              }}
            />{" "}
            Price High to Low
          </li>
        </ul>
      </div>

      {/* Brand Filter Section */}
      <div className="rounded-md border p-4">
        <h3 className="font-semibold mb-2">Brands</h3>
        <input
          type="text"
          placeholder="Search"
          className="w-full rounded-md p-2"
          value={searchTerm}
          onChange={handleBrandSearch}
        />
        <div className="max-h-64 overflow-y-auto">
          <ul>
            {filteredBrands.map((brand) => (
              <li key={brand}>
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => {
                    handleBrandChange(brand);
                    handleFilterChange();
                  }}
                />{" "}
                {brand}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Model Filter Section */}
      <div className="rounded-md border p-4">
        <h3 className="font-semibold mb-2">Models</h3>
        <input
          type="text"
          placeholder="Search"
          className="w-full rounded-md p-2"
          onChange={(e) => {
            setSelectedModel(e.target.value);
            handleFilterChange();
          }}
        />
      </div>
    </div>
  );
}