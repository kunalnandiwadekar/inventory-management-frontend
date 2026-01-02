import { useEffect, useState } from "react";
import {
  fetchProducts,
  stockIn,
  stockOut,
  addProduct,
  deleteProduct
} from "../api/productsApi";
import type { Product } from "../data/products";


const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    unit: "",
    price: 0,
    min_stock: 0,
    current_stock: 0,
  });

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch {
      setMessage("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addProduct({
        ...form,
        price: Number(form.price),
        min_stock: Number(form.min_stock),
        current_stock: Number(form.current_stock),
      });
      setMessage("Product added successfully");
      setForm({
        name: "",
        category: "",
        unit: "",
        price: 0,
        min_stock: 0,
        current_stock: 0,
      });
      loadProducts();
    } catch {
      setMessage("Failed to add product");
    }
  };

  const handleQtyChange = (id: number, value: number) => {
    setQuantities((prev) => ({ ...prev, [id]: value }));
  };

  const handleStockIn = async (id: number) => {
    const qty = quantities[id];
    if (!qty || qty <= 0) return;

    try {
      await stockIn(id, qty);
      setMessage("Stock added successfully");
      loadProducts();
    } catch {
      setMessage("Stock In failed");
    }
  };

  const handleStockOut = async (id: number) => {
    const qty = quantities[id];
    if (!qty || qty <= 0) return;

    try {
      await stockOut(id, qty);
      setMessage("Stock removed successfully");
      loadProducts();
    } catch {
      setMessage("Insufficient stock");
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      setMessage("Product deleted successfully");
      loadProducts();
    } catch {
      setMessage("Failed to delete product");
    }
  };


  if (loading) {
    return <p className="p-6 text-gray-600">Loading products...</p>;
  }

  return (
    <div className="p-6">
      {/* ADD PRODUCT FORM */}
      <form
        onSubmit={handleAddProduct}
        className="bg-white p-4 rounded shadow mb-6 grid grid-cols-3 gap-4"
      >
        <input
          name="name"
          placeholder="Product Name"
          className="border p-2"
          value={form.name}
          onChange={handleFormChange}
          required
        />

        <input
          name="category"
          placeholder="Category"
          className="border p-2"
          value={form.category}
          onChange={handleFormChange}
          required
        />

        <input
          name="unit"
          placeholder="Unit (kg / pcs)"
          className="border p-2"
          value={form.unit}
          onChange={handleFormChange}
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          className="border p-2"
          value={form.price}
          onChange={handleFormChange}
          required
        />

        <input
          name="min_stock"
          type="number"
          placeholder="Min Stock"
          className="border p-2"
          value={form.min_stock}
          onChange={handleFormChange}
          required
        />

        <input
          name="current_stock"
          type="number"
          placeholder="Current Stock"
          className="border p-2"
          value={form.current_stock}
          onChange={handleFormChange}
          required
        />

        <button
          type="submit"
          className="col-span-3 bg-blue-600 text-white py-2 rounded"
        >
          Add Product
        </button>
      </form>

      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {message && (
        <div className="mb-4 rounded bg-blue-50 text-blue-700 px-4 py-2">
          {message}
        </div>
      )}

      {/* PRODUCTS TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Unit</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Min Stock</th>
              <th className="border p-2">Current Stock</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => {
              const qty = quantities[p.id] || "";

              return (
                <tr key={p.id} className="text-center hover:bg-gray-50">
                  <td className="border p-2">{p.id}</td>
                  <td className="border p-2 font-medium">{p.name}</td>
                  <td className="border p-2">{p.category}</td>
                  <td className="border p-2">{p.unit}</td>
                  <td className="border p-2">₹{p.price}</td>
                  <td className="border p-2">{p.minStock}</td>

                  <td
                    className={`border p-2 font-semibold ${
                      p.currentStock === 0
                        ? "text-red-600"
                        : p.currentStock <= p.minStock
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {p.currentStock}
                  </td>

                  <td className="border p-2">
                    <div className="flex items-center justify-center gap-2">
                      <input
                        type="number"
                        min={1}
                        value={qty}
                        placeholder="Qty"
                        onChange={(e) =>
                          handleQtyChange(p.id, Number(e.target.value))
                        }
                        className="w-16 rounded border px-2 py-1 text-sm"
                      />

                      <button
                        type="button"
                        disabled={!qty || qty <= 0}
                        onClick={() => handleStockIn(p.id)}
                        className="px-2 py-1 bg-green-500 text-white rounded disabled:opacity-50"
                      >
                        + In
                      </button>

                      <button
                        type="button"
                        disabled={!qty || qty <= 0}
                        onClick={() => handleStockOut(p.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded disabled:opacity-50"
                      >
                        - Out
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(p.id)}
                        className="px-2 py-1 bg-gray-700 text-white rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
