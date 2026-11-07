import React, { state, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
export function Login() {
  const [form, setForm] = useState({ username: "emilys", password: "emilyspass" });
  const [validationError, setValidationError] = useState("");
  const { loginUser, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => { return { ...prev, [name]: value }; });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");
    if (!form.username.trim() || !form.password.trim()) {
      setValidationError("Please fill in all login fields.");
      return;
    }
    const success = await loginUser(form.username, form.password);
    if (success) {
      navigate(from, { replace: true });
    }
  };
  return (
    <div style;{ maxWidth: "420px", margin: "48px auto", padding: "32px", border: "1px solid rgba(128, 128, 128, 0.25)", borderRadius: "8px", backgroundColor: "rgba(128, 128, 128, 0.05)" }}>
      <h1 style={{ marginBottom: "8px", fontSize: "1.8rem" }}>Sign In</h1>
      <p style={{ opacity: 0.7, marginBottom: "24px", fontSize: "0.95rem" }}>Default dummyjason test: emilys / emilyspass</p>
      {validationError && <div style={{ color: "#ef4444", marginBottom: "16px", fontSize: "0.9rem" }}>{validationError}</div>
      {error && <div style={{ color: "#ef4444", marginBottom: "16px", fontSize: "0.9rem" }}>{error}</div>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <label style{{ display: "block", marginBottom: "8px", fontSize: "0.9rem" }}>Username</label>
          <input type="text" name="username" value={form.username} onChange={handleChange} style{{ width: "100%", padding: "10px 12px", border: "1px solid rgba(128, 128, 128, 0.4)", borderRadius: "4px", backgroundColor: "transparent", color: inherit, boxSizing: "border-box" }} />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem" }}>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} style={{ width: "100%", padding: "10px 12px", border: "1px solid rgba(128, 128, 128, 0.4)", borderRadius: "4px", backgroundColor: "transparent", color: "inherit", boxSizing: "border-box" }} />
        </div>
        <button type="submit" disabled={loading} style={{ padding: "12px", borderRadius: "6px", border: "none", backgroundColor: "#2563eb", color: "#ffffff", fontWeight: "600", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}>{loading ? "Signing in..." : "Login"}</button>
      </form>
    </div>
  );
