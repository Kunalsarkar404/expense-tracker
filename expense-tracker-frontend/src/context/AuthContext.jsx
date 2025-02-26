import { createContext, useEffect, useState } from "react";
import { loginUser, logoutUser, registerUser } from "../services/authService";
import { useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    const userData = await loginUser(email, password);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const register = async (name, email, password) => {
    const userData = await registerUser(name, email, password);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    localStorage.removeItem("user");
  };

  const getUserName = () => {
    return user?.name;
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, getUserName }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);