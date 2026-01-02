const BASE_URL = "https://inventory-backend-16mw.onrender.com";

export const addProduct = async (product: {
  name: string;
  category: string;
  unit: string;
  price: number;
  min_stock: number;
  current_stock: number;
}) => {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    throw new Error("Failed to add product");
  }

  return res.json();
};

export const deleteProduct = async (productId: number) => {
  const res = await fetch(
    `${BASE_URL}/products/${productId}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    throw new Error("Delete failed");
  }

  return res.json();
};


export const fetchProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();


  return data.map((p: any) => ({
    id: p.id,                   
    name: p.name,                
    category: p.category,
    unit: p.unit,
    price: p.price,
    minStock: p.min_stock,
    currentStock: p.current_stock,
  }));
};

export const stockIn = async (id: number, quantity: number) => {
  const res = await fetch(
    `${BASE_URL}/products/${id}/stock-in`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    }
  );

  if (!res.ok) {
    throw new Error("Stock in failed");
  }

  return res.json();
};

export const stockOut = async (id: number, quantity: number) => {
  const res = await fetch(
    `${BASE_URL}/products/${id}/stock-out`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    }
  );

  if (!res.ok) {
    throw new Error("Stock out failed");
  }

  return res.json();
};
