import React, { useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../api/productsApi.js";
import { useFetch } from "../hooks/useFetch.js";
import { useCartStore } from "../store/cartStore.js";

export function ProductDetail() {
  const { id } = useParams();
  const addItem = useCartStore((state) => state.addItem);


  const fetchFn = useCallback(() => getProductById(id), [id]);
  const { data: product, loading, error } = useFetch(fetchFn);

  if (loading) {
    return <div style={{ textAlign: "center", padding: "48px" }}>Loading product details...</div>;
  }


  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "48px", color: "#ef4444" }}>
        Error: {error}
      </div>
    );
  }


  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "48px" }}>
        Product not found.
      </div>
    );
  }

  return (
    <div style={{ padding: "16px 0px" }}>
      <Link
        to="/products"
        style={{
          display: "inline-block",
          marginBottom: "24px",
          textDecoration: "none",
          color: inherit,
          fontWeight: "500"
        }}
      >
        ← Back to Products
      </Link>


      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "40px",
          alignItems: "start"
        }}
      >
        <div style={{ width: "100%", borderRadius: "8px", overflow: "hidden" }}>
          <img
            src={product.thumbnail || product.images?[0]}
            alt={product.title}
            style={{
              width: "100%",
              maxHeight: "410px",
              objectFit: "cover",
              backgroundColor: "#f5f5f5"
            }}
          />
        </div>


        <div>
          <span
            style={{
              fontSize: "0.85rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              opacity: 0.7
            }}
          >
            {product.category}
          </span>
          <h1 style={{ margin: "8px 0 16px 0", fontSize: "2.2rem" }}>
            {product.title}
          </h1>
          <p style={{ fontSize: "1.8rem", fontWeight: "bold", margin: "0 0 16px 0" }}>
            ${product.price}
          </p>
          <p style={{ lineHeight: "1.6", opacity: 0.9, marginBottom: "24px" }}>
            {product.description}
          </p>

          <div style={{ marginBottom: "24px", fontSize: "0.95rem", opacity: 0.8 }}>
            <div>Stock: <strong>{product.stock}</strong></div>
            <div>Rating: <strong>{product.rating} / 5</strong></div>
          </div>

          <button
            type="button"
            onClick={() => addItem(product)}
            style={{
              cursor: "pointer",
              padding: "12px 32px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              fontWeight: "600",
              fontSize: "1rem"
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
