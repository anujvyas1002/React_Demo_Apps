/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/manageEmployees";

  const login = async (data) => {
    setUser(data);
    navigate(from, { replace: true });
  };

  const logout = () => {
    setUser(null);
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
