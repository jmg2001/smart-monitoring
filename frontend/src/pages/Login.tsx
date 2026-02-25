import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      console.log(response)

      localStorage.setItem("token", response.data.access_token);

      navigate("/");
    } catch (err: any) {
      setError("Credenciales inválidas");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#0f172a]">
      <form
        onSubmit={handleLogin}
        className="bg-[#1e293b] p-8 rounded-xl border border-gray-700 w-96"
      >
        <h2 className="text-2xl text-cyan-400 font-bold mb-6">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 bg-[#111827] border border-gray-600 rounded text-gray-200"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 bg-[#111827] border border-gray-600 rounded text-gray-200"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-cyan-500 p-3 rounded font-semibold"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}
