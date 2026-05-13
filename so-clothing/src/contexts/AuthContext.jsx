// src/contexts/AuthContext.jsx

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth, googleProvider } from "@/firebase";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

const ADMIN_EMAIL = "mranonymous100m@gmail.com";

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // AUTH LISTENER
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const userData = {
          name: currentUser.displayName,
          email: currentUser.email,
          photo: currentUser.photoURL,
          uid: currentUser.uid,
          isAdmin: currentUser.email === ADMIN_EMAIL,
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // LOGIN
  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const currentUser = result.user;

      const userData = {
        name: currentUser.displayName,
        email: currentUser.email,
        photo: currentUser.photoURL,
        uid: currentUser.uid,
        isAdmin: currentUser.email === ADMIN_EMAIL,
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      toast.success("Login successful");

      navigate(currentUser.email === ADMIN_EMAIL ? "/admin" : "/");
    } catch (err) {
      console.log(err);
      toast.error("Google login failed");
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      await signOut(auth);

      setUser(null);
      localStorage.removeItem("user");

      toast.success("Logged out successfully");

      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, googleLogin, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);