import React, { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts, getCategories, searchProducts, getProductsByCategory } from "../api/productsApi.js";
import { useFetch } from "../hooks/useFetch.js";
import { ProductCard } from "../components/ProductCard.jsx";

export function ProductList() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const cat = params.get("category") || "";

  const { data: categories } = useFetch(useCallback(() => getCategories(), []));
  const fetchProducts = useCallback(() => {
    if (q) return searchProducts(q);
    if (cat) return getProductsByCategory(cat);
    return getProducts();
  }, [q, cat]);

  const { data, loading, error } = useFetch(fetchProducts);
  const products = data?.products || [];

  return (
    <div>
      <h2>All Products</h2>
      <div style={{ display: "flex", gap: 12, margin: "16px 0" }}>
        <input
          placeholder="Search..."
          value={q}
          onChange={(e) => setParams(e.target.value ? { q: e.target.value, ...(cat ? { category: cat } : {}) } : (cat ? { category: cat } : {}))}
          style={{ padding: 8, flex: 1 }}
        />
        <select
          value={cat}
          onChange={(e) => setParams(e.target.value ? { category: e.target.value, ...(q ? { q } : {}) } : (q ? { q } : {}))}
          style={{ padding: 8 }}
        >
          <option value="">All Categories</option>
          {Array.isArray(categories) && categories.map((c) => {
            const val = typeof c === "string" ? c : c.slug || c.name;
            const name = typeof c === "string" ? c : c.name || c.slug;
            return <option key={val} value={val}>{name}</option>;
          })}
        </select>
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: "#ef4444" }}>Error: {error}</p>}
      {!loading && !error && products.length === 0 && <p>No products found.</p>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
