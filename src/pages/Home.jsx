import React from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore.js";

export function Home() {
  return (
    <div style={{ textAlign: "center", padding: "48px 16px" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "16px" }}>
        Welcome to Campus Store
      </h1>
      <p style={{ fontSize: "1.15rem", maxWidth: "600px", margin: "0 auto 32px auto", opacity: 0.85 }}>
        Explore our curated collection of tech, essentials, and everyday products. Fast, simple, and built with modern React.
      </p>
      <Link
        to="/products"
        style={{
          display: "inline-block",
          padding: "12px 28px",
          backgroundColor: "#2563eb",
          color: "#ffffff",
          textDecoration: "none",
          borderRadius: "6px",
          fontWeight: "600",
          fontSize: "1rem"
        }}
      >
        Browse Catalogue
      </Link>
    </div>
  );
}
