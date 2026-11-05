import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar.jsx";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

export function Layout() {
  const [theme, setTheme] = useLocalStorage("campus_store_theme", "light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const isDark = theme === "dark";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: isDark ? "#121212" : "#ffffff",
        color: isDark ? "#f0f0f0" : "#1a1a1a",
        transition: "background-color 0.2s ease, color 0.2s ease",
        fontFamily: "system-ui, -apple-system, sans-serif"
      }}
    >
      <NavBar theme={theme} onToggleTheme={toggleTheme} />

      <main
        style={{
          flex: 1,
          padding: "24px",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box"
        }}
      >
        <Outlet />
      </main>

      <footer
        style={{
          borderTop: "1px solid rgba(128, 128, 128, 0.3)",
          padding: "16px 24px",
          textAlign: "center",
          fontSize: "0.85rem",
          opacity: 0.7
        }}
      >
        Campus Store © 2026 — Web Programming Assignment 7
      </footer>
    </div>
  );
}
