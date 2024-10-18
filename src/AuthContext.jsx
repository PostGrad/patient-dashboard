import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("token")
  );
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? parseJwt(token) : null;
  });

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
        { email, password }
      );
      const { token } = response.data;
      console.log("token after login => ", token);
      localStorage.setItem("token", token);
      setAuthToken(token);
      setUser(parseJwt(token));
      return { success: true };
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.error || "Login failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setUser(null);
  };

  useEffect(() => {
    if (authToken) {
      // axios.defaults.headers.common["Authorization"] = authToken;
      console.log("node env => ", process.env.NODE_ENV);
      const tokenHeader =
        process.env.NODE_ENV === "production"
          ? `Bearer ${authToken}`
          : authToken;
      console.log("tokenHeader in context => ", tokenHeader);

      axios.defaults.headers.common["authorization"] = tokenHeader;
      axios.defaults.withCredentials = true;
      console.log("axios.defaults => ", axios.defaults);
    } else {
      delete axios.defaults.headers.common["authorization"];
    }
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ user, authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
