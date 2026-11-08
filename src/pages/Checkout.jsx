import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore.js";
import { useAuth } from "../context/AuthContext.jsx";

export function Checkout() {
  const { items, clearCart } = useCartStore();
  const { user } = useAuth();
  const [form, setForm] = useState({
    fullName: user ? (user.firstName + " " + user.lastName) : "",
    address: "",
    city: "",
    cardNumber: ""
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName || !form.address || !form.city || !form.cardNumber) {
      setError("Please fill all required fields.");
      return;
    }
    clearCart();
    setSuccess(true);
  };

  if (success) {
    return (
      <div style={{ textAlign: "center", padding: 50 }}>
        <h2 style={{ color: "#16a34a" }}>Order Placed Successfully!</h2>
        <p>Thank you, {form.fullName}.</p>
        <Link to="/products" style={{ color: "#2563eb" }}>Continue Shopping</Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: 50 }}>
        <h2>No items to checkout.</h2>
        <Link to="/products" style={{ color: "#2563eb" }}>Go to Products</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h2>Checkout</h2>
      {error && <p style={{ color: "#ef4444" }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input placeholder="Full Name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} style={{ padding: 8 }} />
        <input placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} style={{ padding: 8 }} />
        <input placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} style={{ padding: 8 }} />
        <input placeholder="Card Number" value={form.cardNumber} onChange={(e) => setForm({ ...form, cardNumber: e.target.value })} style={{ padding: 8 }} />
        <button type="submit" style={{ padding: 12, background: "#2563eb", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}>
          Place Order (${total.toFixed(2)})
        </button>
      </form>
    </div>
  );
}
