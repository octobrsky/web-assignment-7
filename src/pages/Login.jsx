import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export function Login() {
  const [form, setForm] = useState({ username: "emilys", password: "emilysspassword" });
  const [err, setErr] = useState("");
  const { loginUser, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) return setErr("Please fill all fields.");
    const ok = await loginUser(form.username, form.password);
    if (ok) navigate(from, { replace: true });
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, border: "1px solid rgba(128,128,128,0.3)", borderRadius: 8 }}>
      <h2>Sign In</h2>
      <p style={{ fontSize: "0.85rem", opacity: 0.7 }}>emilys / emilysspassword</p>
      {(err || error) && <p style={{ color: "#ef4444" }}>{err || error}</p>}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input name="username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder="Username" style={{ padding: 8 }} />
        <input type="password" name="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password" style={{ padding: 8 }} />
        <button type="submit" disabled={loading} style={{ padding: 10, background: "#2563eb", color: "#fff", border: "none", borderRadius: 4 }}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
