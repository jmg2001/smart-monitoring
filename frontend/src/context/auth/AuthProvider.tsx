import { useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";
import type { TokenPayload } from "../../types";
import { setupInterceptors } from "../../api/axios";

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const navigate = useNavigate();
  const [user, setUser] = useState<TokenPayload | null>(null);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode<TokenPayload>(token);
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode<TokenPayload>(token);

      if (decoded.exp * 1000 < Date.now()) {
        logout();
      } else {
        setUser(decoded);
      }
    } catch {
      logout();
    }
  }, []);

  useEffect(() => {
    setupInterceptors(logout);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
