import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("https://marut-drones.onrender.com/auth/register", {
  name,
  email,
  password,
});

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create a new account</h2>
      <form className="space-y-4" onSubmit={handleSignUp}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="border p-2 w-full rounded" required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 w-full rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="border p-2 w-full rounded" required />
        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 mt-6 mb-5" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      {error && <p className="text-red-600 text-center">{error}</p>}
      <p className="text-center">Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link></p>
    </div>
  );
}
