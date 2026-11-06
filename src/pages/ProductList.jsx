import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllProducts } from "../api/productsApi.js";
import { useFetch } from "../hooks/useFetch.js";
import { ProductCard } from "../components/ProductCard.jsx";

export function ProductList() {
  const { data, loading, error } = useFetch(getAllProducts);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";
  const selectedCategory = searchParams.get("category") || "all";

  const products = data?.products || [];

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["all", ...set];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesQuery = product.title
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      return matchesQuery && matchesCategory;
    });
  }, [products, query, selectedCategory]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchParams((prev) => {
      if (value) {
        prev.set("q", value);
      } else {
        prev.delete("q");
      }
      return prev;
    });
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSearchParams((prev) => {
      if (value && value !== "all") {
        prev.set("category", value);
      } else {
        prev.delete("category");
      }
      return prev;
    });
  };

  if (loading) {
    return <div style={{ textAlign: "center", padding: "48px" }}>Loading products...</div>;
  }

J if (error) {
    return (
      <div style={{ textAlign: "center", padding: "48px", color: "#ef4444" }}>
        Error: {error}
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ marginBottom: "24px" }}>Product Catalogue</h1>


      <div
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "24px",
          flexWrap: "wrap"
        }}
      >
        <input
          type="search"
          placeholder="Search products..."
          value={query}
          onChange={handleSearchChange}
          style={{
            flex: 1,
            minWidth: "200px",
            padding: "10px 14px",
            border: "1px solid currentColor",
            borderRadius: "4px",
            backgroundColor: "transparent",
            color: "inherit"
          }}
        />

        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          style={{
            padding: "10px 14px",
            border: "1px solid currentColor",
            borderRadius: "4px",
            backgroundColor: "transparent",
            color: "inherit"
          }}
        >
          {categories.map((cat) => (
            <option
              key={cat}
              value={cat}
              style={{ backgroundColor: "#222", color: "#fff" }}
            >
              {cat === "all" ? "All Categories" : cat.toUpperCase()}
            </option>
          ))}
        </select>
      </div>


      {filteredProducts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px", opacity: 0.7 }}>
          No products found matching your criteria.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "20px"
          }}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
