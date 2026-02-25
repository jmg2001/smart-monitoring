import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

interface Props {
  children: React.ReactNode;
  roles?: string[];
}

interface TokenPayload {
  role: string;
}

export default function PrivateRoute({ children, roles }: Props) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  if (roles) {
    const decoded = jwtDecode<TokenPayload>(token);

    if (!roles.includes(decoded.role)) {
      return <Navigate to="/" />;
    }
  }

  return <>{children}</>;
}