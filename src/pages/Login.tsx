
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://inventory-backend-16mw.onrender.com";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      // Encode credentials for the backend query parameters
      const params = new URLSearchParams({
        username,
        password,
      });

      const res = await fetch(
        `${BASE_URL}/auth/login?${params.toString()}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await res.json();

      if (!data.access_token) {
        throw new Error("Access token not received from server");
      }

      // Save authentication details
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("token", data.access_token);

      // Redirect to dashboard
      navigate("/dashboard", { replace: true });

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-2">
          Inventory Management
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Login to continue
        </p>

        {/* Demo Credentials */}
        <div className="mb-4 rounded bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
          <p className="font-semibold">Demo Credentials</p>
          <p>
            Username: <b>admin</b>
          </p>
          <p>
            Password: <b>admin123</b>
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 rounded bg-red-50 text-red-700 px-3 py-2 text-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">

          <div>
            <label className="block text-sm font-medium mb-1">
              Username
            </label>

            <input
              type="text"
              required
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>

            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="mt-6 text-xs text-center text-gray-400">
          © Inventory Management System
        </p>

      </div>
    </div>
  );
};

export default Login;
