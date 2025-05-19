// src/context/AuthContext.js
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Create the context
export const AuthContext = createContext();

// AuthProvider component to wrap around your app
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("authToken") || "");

  const [role, setRole] = useState(() => {
    try {
      const storedToken = localStorage.getItem("authToken");
      const decoded = jwtDecode(storedToken);
      return decoded?.role || "";
    } catch {
      return "";
    }
  });

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    const decoded = jwtDecode(authToken);
    setRole(decoded?.role || "");
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("authToken", authToken);
  };

  const logout = () => {
    setUser(null);
    setToken("");
    setRole("");
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) logout();
        else setRole(decoded.role);
      } catch {
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
