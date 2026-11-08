import React from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore.js";

export function Cart() {
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (items.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: 50 }}>
        <h2>Your Cart is Empty</h2>
        <Link to="/products" style={{ color: "#2563eb" }}>Browse Products</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Shopping Cart</h2>
        <button onClick={clearCart} style={{ color: "#ef4444", border: "1px solid #ef4444", background: "none", padding: "6px 12px", borderRadius: 4, cursor: "pointer" }}>Clear Cart</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, margin: "20px 0" }}>
        {items.map((i) => (
          <div key={i.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid rgba(128,128,128,0.3)", padding: 12, borderRadius: 6 }}>
            <img src={i.thumbnail} alt={i.title} style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 4 }} />
            <div style={{ flex: 1, marginLeft: 16 }}>
              <h4>{i.title}</h4>
              <p>${i.price} each</p>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button onClick={() => updateQuantity(i.id, i.quantity - 1)}>-</button>
              <span>{i.quantity}</span>
              <button onClick={() => updateQuantity(i.id, i.quantity + 1)}>+</button>
            </div>
            <div style={{ width: 80, textAlign: "right", fontWeight: "bold" }}>${(i.price * i.quantity).toFixed(2)}</div>
            <button onClick={() => removeItem(i.id)} style={{ marginLeft: 12, color: "#ef4444", border: "none", background: "none", cursor: "pointer" }}>Remove</button>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(128,128,128,0.3)", paddingTop: 16 }}>
        <h3>Total: ${total.toFixed(2)}</h3>
        <Link to="/checkout" style={{ padding: "10px 24px", background: "#2563eb", color: "#fff", textDecoration: "none", borderRadius: 4 }}>Proceed to Checkout →</Link>
      </div>
    </div>
  );
}
