import { createContext, useContext, useEffect, useState } from "react";
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  getCurrentUser,
} from "../api/authApi";

//context shares user's state globally throughout the app. useState is used for local state

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []); //empty dependency array = run useEffect after AuthProvider has rendered for the first time

  //credentials for sending and accepting cookies from the server
  async function login(credentials) {
    const result = await apiLogin(credentials);

    if (result.success) {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    }

    return result;
  }

  //userData to get users input
 async function register(userData) {
   const result = await apiRegister(userData);

   if (result.success) {
     const currentUser = await getCurrentUser();
     setUser(currentUser);
   }

   return result;
 }

  async function logout() {
    await apiLogout();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
