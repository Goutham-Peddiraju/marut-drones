import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("https://marut-drones.onrender.com/auth/login", {
  email,
  password,
});

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setLoading(false);
      navigate("/"); // redirect to dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Login to Marut Drones</h2>
      <form className="space-y-4" onSubmit={handleSignIn}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 w-full rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="border p-2 w-full rounded" required />
        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 mt-6 mb-5" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
      {error && <p className="text-red-600 text-center">{error}</p>}
      <p className="text-center mt-4">
        New User? <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
      </p>
    </div>
  );
}
