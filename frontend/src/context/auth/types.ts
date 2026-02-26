export interface TokenPayload {
  sub: string;
  role: string;
  company_id: string | null;
  exp: number;
}

export interface AuthContextType {
  user: TokenPayload | null;
  login: (token: string) => void;
  logout: () => void;
}
