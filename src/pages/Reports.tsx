
import { useEffect, useState } from "react";

const BASE_URL = "https://inventory-backend-16mw.onrender.com";

type Summary = {
  total_products: number;
  total_stock_units: number;
  low_stock_products: number;
};

type LowStockProduct = {
  id: number;
  name?: string;
  product_name?: string;
  current_stock: number;
  min_stock: number;
};

const Reports = () => {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [lowStock, setLowStock] = useState<LowStockProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("access_token");

        if (!token) {
          throw new Error("Authentication token not found. Please log in again.");
        }

        const headers = {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        };

        const [summaryResponse, lowStockResponse] =
          await Promise.all([
            fetch(`${BASE_URL}/products/dashboard/summary`, {
              headers,
            }),
            fetch(`${BASE_URL}/products/alerts/low-stock`, {
              headers,
            }),
          ]);

        if (!summaryResponse.ok || !lowStockResponse.ok) {
          throw new Error(
            `API request failed: Summary ${summaryResponse.status}, Low Stock ${lowStockResponse.status}`
          );
        }

        const summaryData = await summaryResponse.json();
        const lowStockData = await lowStockResponse.json();

        setSummary(summaryData);

        setLowStock(
          Array.isArray(lowStockData)
            ? lowStockData
            : lowStockData.products || []
        );
      } catch (err) {
        console.error("Reports error:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load reports"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return <p className="p-6">Loading reports...</p>;
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">
        <h2 className="text-xl font-bold">Unable to load reports</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Reports</h1>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Total Products</p>
          <p className="text-2xl font-bold">
            {summary?.total_products ?? 0}
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Total Stock Units</p>
          <p className="text-2xl font-bold">
            {summary?.total_stock_units ?? 0}
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Low Stock Products</p>
          <p className="text-2xl font-bold text-red-600">
            {summary?.low_stock_products ?? 0}
          </p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-3">
        Low Stock Items
      </h2>

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
            {lowStock.map((p) => (
              <tr key={p.id} className="text-center">
                <td className="border p-2">
                  {p.name ?? p.product_name ?? "Unnamed"}
                </td>
                <td className="border p-2 text-red-600">
                  {p.current_stock}
                </td>
                <td className="border p-2">
                  {p.min_stock}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Reports;
