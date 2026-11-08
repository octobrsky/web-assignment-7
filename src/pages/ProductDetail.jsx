import React, { useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../api/productsApi.js";
import { useFetch } from "../hooks/useFetch.js";
import { useCartStore } from "../store/cartStore.js";

export function ProductDetail() {
  const { id } = useParams();
  const addItem = useCartStore((s) => s.addItem);
  const fetchFn = useCallback(() => getProductById(id), [id]);
  const { data: p, loading, error } = useFetch(fetchFn);

  if (loading) return <div style={{ padding: 40, textAlign: "center" }}>Loading...</div>;
  if (error) return <div style={{ padding: 40, color: "#ef4444", textAlign: "center" }}>Error: {error}</div>;
  if (!p) return <div style={{ padding: 40, textAlign: "center" }}>Product not found.</div>;

  return (
    <div style={{ padding: 20 }}>
      <Link to="/products">← Back to Products</Link>
      <div style={{ display: "flex", gap: 32, marginTop: 20, flexWrap: "wrap" }}>
        <img src={p.thumbnail} alt={p.title} style={{ width: 300, height: 300, objectFit: "cover", borderRadius: 8 }} />
        <div style={{ maxWidth: 500 }}>
          <h2>{p.title}</h2>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>${p.price}</p>
          <p>{p.description}</p>
          <p>Stock: {p.stock} | Rating: {p.rating} / 5</p>
          <button onClick={() => addItem(p)} style={{ padding: "10px 24px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
