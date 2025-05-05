import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user will include token + profile

  useEffect(() => {
    const token = localStorage.getItem("token");
    const profile = localStorage.getItem("profile");
    if (token && profile) {
      setUser({ token, profile: JSON.parse(profile) });
    }
  }, []);

  const loginUser = (token, profile) => {
    localStorage.setItem("token", token);
    localStorage.setItem("profile", JSON.stringify(profile));
    setUser({ token, profile });
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
