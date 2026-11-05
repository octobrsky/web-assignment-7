import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCartStore } from "../store/cartStore.js";

export function NavBar({ theme, onToggleTheme }) {
  const { user, logoutUser } = useAuth();

  const totalItemCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  const getNavLinkStyle = ({ isActive }) => ({
    textDecoration: "none",
    fontWeight: isActive ? "700" : "500",
    color: "inherit",
    borderBottom: isActive ? "2px solid currentColor" : "none",
    paddingBottom: "4px"
  });

  return (
    <header
      style={{
        borderBottom: "1px solid rgba(128, 128, 128, 0.3)",
        padding: "16px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
          Campus Store
        </span>
        <nav style={{ display: "flex", gap: "16px" }}>
          <NavLink to="/" style={getNavLinkStyle}>
            Home
          </NavLink>
          <NavLink to="/products" style={getNavLinkStyle}>
            Products
          </NavLink>
          <NavLink to="/cart" style={getNavLinkStyle}>
            Cart ({totalItemCount})
          </NavLink>
        </nav>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button
          type="button"
          onClick={onToggleTheme}
          style={{
            cursor: "pointer",
            padding: "6px 12px",
            borderRadius: "4px",
            border: "1px solid currentColor",
            backgroundColor: "transparent",
            color: "inherit"
          }}
        >
          {theme === "light" ? "Dark" : "Light"}
        </button>

        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span>Hi, <strong>{user.username}</strong></span>
            <button
              type="button"
              onClick={logoutUser}
              style={{
                cursor: "pointer",
                padding: "6px 12px",
                borderRadius: "4px",
                border: "1px solid currentColor",
                backgroundColor: "transparent",
                color: "inherit"
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <NavLink to="/login" style={getNavLinkStyle}>
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
}
