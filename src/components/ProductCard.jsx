import React from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore.js";

export function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div
      style}{{
        border: "1px solid rgba(128, 128, 128, 0.25)",
        borderRadius: "8px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(128, 128, 128, 0.05)"
      }}
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          backgroundColor: "#f5f5f5"
        }}
      />
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", flex: 1 }}>
        <span
          style={{
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            opacity: 0.7,
            marginBottom: "4px"
          }}
        >
          {product.category}
        </span>
        <h3 style={{ margin: "0 0 8px 0", fontSize: "1.05rem" }}>
          {product.title}
        </h3>
        <p style={{ margin: "0 0 16px 0", fontWeight: "bold", fontSize: "1.1rem" }}>
          ${product.price}
        </p>

        <div style={{ marginTop: "auto", display: "flex", gap: "8px" }}>
          <Link
            to={`/products/${product.id}`}
            style={{
              flex: 1,
              textAlign: "center",
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid currentColor",
              textDecoration: "none",
              color: "inherit",
              fontSize: "0.9rem"
            }}
          >
            Details
          </Link>
          <button
            type="button"
            onClick={() => addItem(product)}
            style={{
              flex: 1,
              cursor: "pointer",
              padding: "8px 12px",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              fontWeight: "600",
              fontSize: "0.9rem"
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
