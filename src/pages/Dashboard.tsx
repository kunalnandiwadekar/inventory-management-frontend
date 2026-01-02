import { useEffect, useState } from "react";
import { fetchProducts } from "../api/productsApi";
import type { Product } from "../data/products";

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const totalProducts = products.length;
  const lowStock = products.filter(
    (p) => p.currentStock > 0 && p.currentStock <= p.minStock
  ).length;

  const outOfStock = products.filter(
    (p) => p.currentStock === 0
  ).length;

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">
          Total Products: {totalProducts}
        </div>

        <div className="bg-white p-4 rounded shadow">
          Low Stock: {lowStock}
        </div>

        <div className="bg-white p-4 rounded shadow">
          Out of Stock: {outOfStock}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
