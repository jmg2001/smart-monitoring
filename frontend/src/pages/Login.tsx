import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import { useEffect } from "react";
import { AuthContext } from "../context/auth/AuthContext";

export default function Login() {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "super_admin") {
        navigate("/admin");
      } else {
        navigate("/client");
      }
    }
  }, [user]);

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

      login(response.data.access_token);

      navigate("/login");
    } catch (err) {
      console.log(err);
      setError("Credenciales inválidas");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-(--color-bg-primary)">
      <div className="bg-(--color-bg-primary-ligth) p-8 rounded-xl  w-96 flex-col">
        <form onSubmit={handleLogin} className="mb-2">
          <h2 className="text-2xl text-white font-bold mb-6 text-center">
            Iniciar Sesión
          </h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 p-3 bg-[#111827] border border-gray-600 rounded text-gray-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="w-full mb-6 p-3 bg-[#111827] border border-gray-600 rounded text-gray-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="text-white w-full bg-(--color-btn-primary) hover:bg-(--color-btn-primary-hover) p-3 rounded font-semibold cursor-pointer"
          >
            Iniciar Sesión
          </button>
        </form>
        <button
          onClick={() => navigate("/")}
          className="text-white w-full bg-(--color-btn-primary) hover:bg-(--color-btn-primary-hover) p-3 rounded font-semibold cursor-pointer"
        >
          Volver
        </button>
      </div>
    </div>
  );
}
