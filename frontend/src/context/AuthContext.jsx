import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    token
      ? localStorage.setItem("token", token)
      : localStorage.removeItem("token");

    role
      ? localStorage.setItem("role", role)
      : localStorage.removeItem("role");

    user
      ? localStorage.setItem("user", JSON.stringify(user))
      : localStorage.removeItem("user");
  }, [token, role, user]);


const login = ({ token, role, user }) => {
  setToken(token);
  setRole(role);
  setUser(user);

  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  localStorage.setItem("user", JSON.stringify(user));

  api.defaults.headers.Authorization = `Bearer ${token}`;
};

  const logout = () => {
    setToken(null);
    setRole(null);
    setUser(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        user,
        login,
        logout,
        isAuth: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
