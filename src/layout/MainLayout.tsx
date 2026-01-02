import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../auth";

const MainLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6">Inventory</h2>
        <ul className="space-y-3">
          <li
            className="font-medium cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </li>
          <li
            className="font-medium cursor-pointer"
            onClick={() => navigate("/products")}
          >
            Products
          </li>
          <li
            className="font-medium cursor-pointer"
            onClick={() => navigate("/reports")}
          >
            Reports
          </li>
          <li
            className="font-medium cursor-pointer"
            onClick={() => navigate("/suppliers")}
          >
            Suppliers
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
