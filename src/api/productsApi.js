const BASE_URL = "https://dummyjson.com/products";

export async function getProducts(limit = 30, skip = 0) {
  const res = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product details");
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function searchProducts(query) {
  const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Failed to search products");
  return res.json();
}

export async function getProductsByCategory(category) {
  const res = await fetch(`${BASE_URL}/category/${encodeURIComponent(category)}`);
  if (!res.ok) throw new Error("Failed to fetch products by category");
  return res.json();
}
