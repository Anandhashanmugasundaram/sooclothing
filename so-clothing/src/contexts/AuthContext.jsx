// // src/contexts/AuthContext.jsx

// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// import {
//   signInWithPopup,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";

// import { toast } from "sonner";

// import {
//   auth,
//   googleProvider,
// } from "@/firebase";

// const AuthContext =
//   createContext(null);

// // ADMIN EMAIL
// const ADMIN_EMAIL =
//   "mranonymous100m@gmail.com";

// export function AuthProvider({
//   children,
// }) {

//   const [user, setUser] =
//     useState(null);

//   const [loading, setLoading] =
//     useState(true);

//   // AUTH LISTENER
//   useEffect(() => {

//     const unsubscribe =
//       onAuthStateChanged(
//         auth,
//         (currentUser) => {

//           if (currentUser) {

//             const userData = {
//               name:
//                 currentUser.displayName,

//               email:
//                 currentUser.email,

//               photo:
//                 currentUser.photoURL,

//               uid:
//                 currentUser.uid,

//               isAdmin:
//                 currentUser.email ===
//                 ADMIN_EMAIL,
//             };

//             setUser(userData);

//             localStorage.setItem(
//               "user",
//               JSON.stringify(userData)
//             );

//           } else {

//             setUser(null);

//             localStorage.removeItem(
//               "user"
//             );

//           }

//           setLoading(false);

//         }
//       );

//     return () =>
//       unsubscribe();

//   }, []);

//   // GOOGLE LOGIN
//   const googleLogin =
//     async () => {

//       try {

//         const result =
//           await signInWithPopup(
//             auth,
//             googleProvider
//           );

//         const currentUser =
//           result.user;

//         const userData = {
//           name:
//             currentUser.displayName,

//           email:
//             currentUser.email,

//           photo:
//             currentUser.photoURL,

//           uid:
//             currentUser.uid,

//           isAdmin:
//             currentUser.email ===
//             ADMIN_EMAIL,
//         };

//         // SAVE USER
//         setUser(userData);

//         localStorage.setItem(
//           "user",
//           JSON.stringify(userData)
//         );

//         toast.success(
//           "Login successful"
//         );

//         // REDIRECT
//         if (
//           currentUser.email ===
//           ADMIN_EMAIL
//         ) {

//           window.location.href =
//             "/admin";

//         } else {

//           window.location.href =
//             "/";

//         }

//       } catch (error) {

//         console.log(error);

//         toast.error(
//           "Google login failed"
//         );

//       }

//     };

//   // LOGOUT
//   const logout =
//     async () => {

//       try {

//         await signOut(auth);

//         setUser(null);

//         localStorage.removeItem(
//           "user"
//         );

//         toast.success(
//           "Logged out successfully"
//         );

//         window.location.href =
//           "/";

//       } catch (error) {

//         console.log(error);

//         toast.error(
//           "Logout failed"
//         );

//       }

//     };

//   return (

//     <AuthContext.Provider
//       value={{
//         user,
//         googleLogin,
//         logout,
//       }}
//     >

//       {!loading &&
//         children}

//     </AuthContext.Provider>

//   );

// }

// export const useAuth =
//   () => {

//     const ctx =
//       useContext(AuthContext);

//     if (!ctx) {

//       throw new Error(
//         "useAuth must be inside AuthProvider"
//       );

//     }

//     return ctx;

//   };


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

import {
  useNavigate,
} from "react-router-dom";

import { toast } from "sonner";

import {
  auth,
  googleProvider,
} from "@/firebase";

const AuthContext =
  createContext(null);

const ADMIN_EMAIL =
  "mranonymous100m@gmail.com";

export function AuthProvider({
  children,
}) {

  const navigate =
    useNavigate();

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // FIREBASE LISTENER
  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {

          if (currentUser) {

            const userData = {
              name:
                currentUser.displayName,

              email:
                currentUser.email,

              photo:
                currentUser.photoURL,

              uid:
                currentUser.uid,

              isAdmin:
                currentUser.email ===
                ADMIN_EMAIL,
            };

            setUser(userData);

            localStorage.setItem(
              "user",
              JSON.stringify(userData)
            );

          } else {

            setUser(null);

            localStorage.removeItem(
              "user"
            );

          }

          setLoading(false);

        }
      );

    return () =>
      unsubscribe();

  }, []);

  // GOOGLE LOGIN
  const googleLogin =
    async () => {

      try {

        const result =
          await signInWithPopup(
            auth,
            googleProvider
          );

        const currentUser =
          result.user;

        const userData = {
          name:
            currentUser.displayName,

          email:
            currentUser.email,

          photo:
            currentUser.photoURL,

          uid:
            currentUser.uid,

          isAdmin:
            currentUser.email ===
            ADMIN_EMAIL,
        };

        setUser(userData);

        localStorage.setItem(
          "user",
          JSON.stringify(userData)
        );

        toast.success(
          "Login successful"
        );

        // NO PAGE RELOAD
        if (
          currentUser.email ===
          ADMIN_EMAIL
        ) {

          navigate("/admin");

        } else {

          navigate("/");

        }

      } catch (error) {

        console.log(error);

        toast.error(
          "Google login failed"
        );

      }

    };

  // LOGOUT
  const logout =
    async () => {

      try {

        await signOut(auth);

        setUser(null);

        localStorage.removeItem(
          "user"
        );

        toast.success(
          "Logged out successfully"
        );

        navigate("/");

      } catch (error) {

        console.log(error);

        toast.error(
          "Logout failed"
        );

      }

    };

  return (

    <AuthContext.Provider
      value={{
        user,
        googleLogin,
        logout,
      }}
    >

      {!loading &&
        children}

    </AuthContext.Provider>

  );

}

export const useAuth =
  () => {

    const ctx =
      useContext(AuthContext);

    if (!ctx) {

      throw new Error(
        "useAuth must be inside AuthProvider"
      );

    }

    return ctx;

  };