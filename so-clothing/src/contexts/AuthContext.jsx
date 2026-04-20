import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const KEY = "so_user_v1";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch { return null; }
  });

  useEffect(() => {
    if (user) localStorage.setItem(KEY, JSON.stringify(user));
    else localStorage.removeItem(KEY);
  }, [user]);

  const login = async (email) => {
    await new Promise((r) => setTimeout(r, 600));
    const name = email.split("@")[0].replace(/\W/g, " ");
    setUser({ name, email });
  };

  const register = async (name, email) => {
    await new Promise((r) => setTimeout(r, 600));
    setUser({ name, email });
  };

  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
