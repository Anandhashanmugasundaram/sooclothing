

// // // import {
// // //   createContext,
// // //   useContext,
// // //   useEffect,
// // //   useState,
// // // } from "react";

// // // import axios from "axios";

// // // const AuthContext =
// // //   createContext(null);

// // // const KEY = "so_user_v1";

// // // export function AuthProvider({
// // //   children,
// // // }) {

// // //   const [user, setUser] =
// // //     useState(() => {

// // //       try {

// // //         const saved =
// // //           localStorage.getItem(KEY);

// // //         return saved
// // //           ? JSON.parse(saved)
// // //           : null;

// // //       } catch {

// // //         return null;

// // //       }

// // //     });

// // //   // SAVE USER
// // //   useEffect(() => {

// // //     if (user) {

// // //       localStorage.setItem(
// // //         KEY,
// // //         JSON.stringify(user)
// // //       );

// // //     } else {

// // //       localStorage.removeItem(KEY);

// // //     }

// // //   }, [user]);

// // //   // REGISTER
// // //   const register = async (
// // //     name,
// // //     email,
// // //     password
// // //   ) => {

// // //     const res = await axios.post(
// // //       "http://localhost:5000/api/auth/register",
// // //       {
// // //         name,
// // //         email,
// // //         password,
// // //       }
// // //     );

// // //     return res.data;
// // //   };

// // //   // LOGIN
// // //   const login = (
// // //     userData,
// // //     token
// // //   ) => {

// // //     // SAVE TOKEN
// // //     localStorage.setItem(
// // //       "token",
// // //       token
// // //     );

// // //     // SAVE USER
// // //     localStorage.setItem(
// // //       KEY,
// // //       JSON.stringify(userData)
// // //     );

// // //     // UPDATE STATE
// // //     setUser(userData);
// // //   };

// // //   // LOGOUT
// // //   const logout = () => {

// // //     localStorage.removeItem(
// // //       "token"
// // //     );

// // //     localStorage.removeItem(KEY);

// // //     setUser(null);
// // //   };

// // //   return (

// // //     <AuthContext.Provider
// // //       value={{
// // //         user,
// // //         setUser,
// // //         register,
// // //         login,
// // //         logout,
// // //       }}
// // //     >

// // //       {children}

// // //     </AuthContext.Provider>

// // //   );
// // // }

// // // export const useAuth = () => {

// // //   const ctx =
// // //     useContext(AuthContext);

// // //   if (!ctx) {

// // //     throw new Error(
// // //       "useAuth must be inside AuthProvider"
// // //     );

// // //   }

// // //   return ctx;
// // // };


// // import {
// //   createContext,
// //   useContext,
// //   useEffect,
// //   useState,
// // } from "react";

// // import {
// //   signInWithPopup,
// //   signOut,
// //   onAuthStateChanged,
// // } from "firebase/auth";

// // import {
// //   auth,
// //   googleProvider,
// // } from "@/firebase";

// // const AuthContext =
// //   createContext(null);

// // export function AuthProvider({
// //   children,
// // }) {

// //   const [user, setUser] =
// //     useState(null);

// //   const [loading, setLoading] =
// //     useState(true);

// //   useEffect(() => {

// //     const unsubscribe =
// //       onAuthStateChanged(
// //         auth,
// //         (currentUser) => {

// //           if (currentUser) {

// //             setUser({
// //               name:
// //                 currentUser.displayName,

// //               email:
// //                 currentUser.email,

// //               photo:
// //                 currentUser.photoURL,
// //             });

// //           } else {

// //             setUser(null);

// //           }

// //           setLoading(false);

// //         }
// //       );

// //     return unsubscribe;

// //   }, []);

// //   // GOOGLE LOGIN
// //   const googleLogin =
// //     async () => {

// //       await signInWithPopup(
// //         auth,
// //         googleProvider
// //       );

// //     };

// //   // LOGOUT
// //   const logout = async () => {

// //     await signOut(auth);

// //   };

// //   return (

// //     <AuthContext.Provider
// //       value={{
// //         user,
// //         googleLogin,
// //         logout,
// //       }}
// //     >

// //       {!loading && children}

// //     </AuthContext.Provider>

// //   );
// // }

// // export const useAuth = () => {

// //   const ctx =
// //     useContext(AuthContext);

// //   if (!ctx) {

// //     throw new Error(
// //       "useAuth must be inside AuthProvider"
// //     );

// //   }

// //   return ctx;
// // };

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

// import {
//   auth,
//   googleProvider,
// } from "@/firebase";

// const AuthContext =
//   createContext(null);

// // YOUR ADMIN EMAIL
// const ADMIN_EMAIL =
//   "mranonymous100m@gmail.com";

// export function AuthProvider({
//   children,
// }) {

//   const [user, setUser] =
//     useState(null);

//   const [loading, setLoading] =
//     useState(true);

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

//     return unsubscribe;

//   }, []);

//   // GOOGLE LOGIN
//   const googleLogin =
//     async () => {

//       await signInWithPopup(
//         auth,
//         googleProvider
//       );

//     };

//   // LOGOUT
//   const logout = async () => {

//     await signOut(auth);

//   };

//   return (

//     <AuthContext.Provider
//       value={{
//         user,
//         googleLogin,
//         logout,
//       }}
//     >

//       {!loading && children}

//     </AuthContext.Provider>

//   );
// }

// export const useAuth = () => {

//   const ctx =
//     useContext(AuthContext);

//   if (!ctx) {

//     throw new Error(
//       "useAuth must be inside AuthProvider"
//     );

//   }

//   return ctx;
// };




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

import {
  auth,
  googleProvider,
} from "@/firebase";

const AuthContext =
  createContext(null);

// ADMIN EMAIL
const ADMIN_EMAIL =
  "mranonymous100m@gmail.com";

export function AuthProvider({
  children,
}) {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // FIREBASE AUTH LISTENER
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

            // SAVE USER
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

    return unsubscribe;

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

        const email =
          result.user.email;

        // ADMIN REDIRECT
        if (
          email ===
          ADMIN_EMAIL
        ) {

          window.location.href =
            "/admin";

        } else {

          window.location.href =
            "/";

        }

      } catch (error) {

        console.log(error);

      }

    };

  // LOGOUT
  const logout =
    async () => {

      await signOut(auth);

      localStorage.removeItem(
        "user"
      );

      window.location.href =
        "/";

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