import { useEffect, useState, type ReactNode } from "react";

const BASE_URL = "https://inventory-backend-16mw.onrender.com";

type Summary = {
  total_products: number;
  total_stock_units: number;
  low_stock_products: number;
};

type LowStockProduct = {
  name: ReactNode;
  id: number;
  product_name: string;
  current_stock: number;
  min_stock: number;
};

const Reports = () => {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [lowStock, setLowStock] = useState<LowStockProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  Promise.all([
    fetch(`${BASE_URL}/products/dashboard/summary`).then(res => res.json()),
    fetch(`${BASE_URL}/products/alerts/low-stock`).then(res => res.json())
  ])
    .then(([summaryData, lowStockData]) => {
      setSummary(summaryData);
      setLowStock(lowStockData.products || []);
    })
    .finally(() => setLoading(false));
}, []);

  if (loading) {
    return <p className="p-6">Loading reports...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Reports</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Total Products</p>
          <p className="text-2xl font-bold">{summary?.total_products}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Total Stock Units</p>
          <p className="text-2xl font-bold">{summary?.total_stock_units}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Low Stock Products</p>
          <p className="text-2xl font-bold text-red-600">
            {summary?.low_stock_products}
          </p>
        </div>
      </div>

      {/* Low Stock List */}
      <h2 className="text-xl font-semibold mb-3">Low Stock Items</h2>

      {lowStock.length === 0 ? (
        <p className="text-gray-500">No low stock items 🎉</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Product</th>
              <th className="border p-2">Current Stock</th>
              <th className="border p-2">Min Stock</th>
            </tr>
          </thead>
          <tbody>
            {lowStock.map(p => (
              <tr key={p.id} className="text-center">
                <td className="border p-2">{p.name}</td>
                <td className="border p-2 text-red-600">
                  {p.current_stock}
                </td>
                <td className="border p-2">{p.min_stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Reports;
