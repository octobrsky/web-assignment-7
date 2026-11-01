export async function fetchProducts(signal) {
  const response = await fetch("https://dummyjson.com/products?limit=100", {
    signal
  });

  if (!response.ok) {
    throw new Error(`Failed to load products: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.products;
}

export async function fetchProduct(id, signal) {
  const response = await fetch(`https://dummyjson.com/products/${id}`, {
    signal
  });

  if (!response.ok) {
    throw new Error(`Product not found (Status: ${response.status})`);
  }

  const data = await response.json();
  return data;
}
