import { useEffect, useState } from "react";
import { addSupplier, fetchSuppliers } from "../api/suppliersApi";

type Supplier = {
  id: number;
  name: string;
  contact_person: string;
  phone: string;
  email: string;
  address: string;
};

const Suppliers = () => {
  const [form, setForm] = useState({
    name: "",
    contact_person: "",
    phone: "",
    email: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const loadSuppliers = async () => {
    const data = await fetchSuppliers();
    setSuppliers(data);
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addSupplier(form);
      alert("Supplier added successfully");
      setForm({
        name: "",
        contact_person: "",
        phone: "",
        email: "",
        address: "",
      });
      await loadSuppliers(); // 🔑 refresh table
    } catch {
      alert("Failed to add supplier");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Suppliers</h1>

      {/* Add Supplier Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow grid grid-cols-2 gap-4 mb-6"
      >
        <input
          name="name"
          placeholder="Supplier Name"
          className="border p-2"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="contact_person"
          placeholder="Contact Person"
          className="border p-2"
          value={form.contact_person}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          type="tel"
          placeholder="Phone (digits only)"
          className="border p-2"
          value={form.phone}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            setForm({ ...form, phone: value });
          }}
          maxLength={10}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border p-2"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="address"
          placeholder="Address"
          className="border p-2 col-span-2"
          value={form.address}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="col-span-2 bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Supplier"}
        </button>
      </form>

      {/* Supplier List */}
      <h2 className="text-xl font-semibold mb-3">Supplier List</h2>

      {suppliers.length === 0 ? (
        <p className="text-gray-500">No suppliers found</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Contact Person</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Address</th>
            </tr>
          </thead>

          <tbody>
            {suppliers.map((s) => (
              <tr key={s.id} className="text-center">
                <td className="border p-2">{s.name}</td>
                <td className="border p-2">{s.contact_person}</td>
                <td className="border p-2">{s.phone}</td>
                <td className="border p-2">{s.email}</td>
                <td className="border p-2">{s.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Suppliers;
