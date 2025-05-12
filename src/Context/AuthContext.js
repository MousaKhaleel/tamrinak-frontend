import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

useEffect(() => {
  const token = localStorage.getItem("token");
  const profile = localStorage.getItem("profile");
  const profileImage = localStorage.getItem("profileImage");
  if (token && profile) {
    setUser({ token, profile: JSON.parse(profile), profileImage });
  }
}, []);

const loginUser = (token, profile, profileImage) => {
  localStorage.setItem("token", token);
  localStorage.setItem("profile", JSON.stringify(profile));
  localStorage.setItem("profileImage", profileImage); // optional for persistence
  setUser({ token, profile, profileImage });
};

const updateProfileImage = (newImageUrl) => {
  const updatedUser = {
    ...user,
    profileImage: newImageUrl,
    profile: {
      ...user.profile,
      profileImage: newImageUrl, // assuming your backend returns this key
    },
  };
  localStorage.setItem("profileImage", newImageUrl);
  localStorage.setItem("profile", JSON.stringify(updatedUser.profile));
  setUser(updatedUser);
};

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    localStorage.removeItem("profileImage");
    setUser(null);
  };

  return (
<AuthContext.Provider value={{ user, loginUser, logoutUser, updateProfileImage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
