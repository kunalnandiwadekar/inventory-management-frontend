const BASE_URL = "https://inventory-backend-16mw.onrender.com";

export const fetchSuppliers = async () => {
  const res = await fetch(`${BASE_URL}/suppliers`);
  if (!res.ok) throw new Error("Failed to fetch suppliers");
  return res.json();
};

export const addSupplier = async (supplier: {
  name: string;
  contact_person: string;
  phone: string;
  email: string;
  address: string;
}) => {
  const res = await fetch(`${BASE_URL}/suppliers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(supplier),
  });

  if (!res.ok) throw new Error("Failed to add supplier");
  return res.json();
};
