// import { createContext, useContext, useEffect, useState } from "react";

// const AuthContext = createContext(null);
// const KEY = "so_user_v1";

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch { return null; }
//   });

//   useEffect(() => {
//     if (user) localStorage.setItem(KEY, JSON.stringify(user));
//     else localStorage.removeItem(KEY);
//   }, [user]);

//   const login = async (email) => {
//     await new Promise((r) => setTimeout(r, 600));
//     const name = email.split("@")[0].replace(/\W/g, " ");
//     setUser({ name, email });
//   };

//   const register = async (name, email) => {
//     await new Promise((r) => setTimeout(r, 600));
//     setUser({ name, email });
//   };

//   const logout = () => setUser(null);

//   return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
// }

// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be inside AuthProvider");
//   return ctx;
// };


import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";

const AuthContext =
  createContext(null);

const KEY = "so_user_v1";

export function AuthProvider({
  children,
}) {

  const [user, setUser] =
    useState(() => {

      try {

        const saved =
          localStorage.getItem(KEY);

        return saved
          ? JSON.parse(saved)
          : null;

      } catch {

        return null;

      }

    });

  // SAVE USER
  useEffect(() => {

    if (user) {

      localStorage.setItem(
        KEY,
        JSON.stringify(user)
      );

    } else {

      localStorage.removeItem(KEY);

    }

  }, [user]);

  // REGISTER
  const register = async (
    name,
    email,
    password
  ) => {

    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      {
        name,
        email,
        password,
      }
    );

    return res.data;
  };

  // LOGIN
  const login = (
    userData,
    token
  ) => {

    // SAVE TOKEN
    localStorage.setItem(
      "token",
      token
    );

    // SAVE USER
    localStorage.setItem(
      KEY,
      JSON.stringify(userData)
    );

    // UPDATE STATE
    setUser(userData);
  };

  // LOGOUT
  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(KEY);

    setUser(null);
  };

  return (

    <AuthContext.Provider
      value={{
        user,
        setUser,
        register,
        login,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>

  );
}

export const useAuth = () => {

  const ctx =
    useContext(AuthContext);

  if (!ctx) {

    throw new Error(
      "useAuth must be inside AuthProvider"
    );

  }

  return ctx;
};