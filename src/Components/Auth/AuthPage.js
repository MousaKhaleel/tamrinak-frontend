import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import "./AuthStyle.css";
import { login, register } from "../../Services/authService";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/AuthContext";
import { getProfilePicture } from "../../Services/userService";
const API_URL = process.env.API_URL || "https://localhost:7160";

const AuthPage = () => {
  const { loginUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const defaultMode = query.get("mode");

  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ Email: "", Password: "" });
  const [registerData, setRegisterData] = useState({ Name: "", Email: "", Password: "" });

  useEffect(() => {
    if (defaultMode === "register") {
      setIsRegistering(true);
    }
  }, [defaultMode]);

  const togglePanel = () => setIsRegistering((prev) => !prev);

const handleLoginSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const res = await login(loginData);
    const token = res.jwtToken;

    const profileRes = await fetch(`${API_URL}/api/User/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const profile = await profileRes.json();
    
    // Fetch profile picture
    const profileImage = await getProfilePicture(profile.id); // Adjust to match your profile object

    loginUser(token, profile, profileImage);

    toast.success("تم تسجيل الدخول بنجاح");
    navigate("/");
  } catch (err) {
    toast.error(err.message || "حدث خطأ أثناء تسجيل الدخول");
  } finally {
    setLoading(false);
  }
};

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(registerData);
      toast.success("تم إنشاء الحساب بنجاح، قم بتسجيل الدخول");
      setIsRegistering(false);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`auth-container ${isRegistering ? "right-panel-active" : ""}`}>
      <div className="form-container sign-in-container">
        <div className="back-home icon-wrapper"><a href="/"><GoHome /></a></div>
        <form onSubmit={handleLoginSubmit}>
          <h1>تسجيل الدخول</h1>
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={loginData.Email}
            onChange={(e) => setLoginData({ ...loginData, Email: e.target.value })}
            required
            disabled={loading}
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={loginData.Password}
            onChange={(e) => setLoginData({ ...loginData, Password: e.target.value })}
            required
            disabled={loading}
          />
          <button type="submit" className="w-100" disabled={loading}>
            {loading ? "جاري الدخول..." : "دخول"}
          </button>
          <p className="toggle-text">
            <Link to="/forgot-password"><span>هل نسيت كلمة المرور؟ </span></Link>
          </p>
          <p className="toggle-text" onClick={togglePanel}>
            ليس لديك حساب؟ <span>إنشاء حساب</span>
          </p>
        </form>
      </div>

      <div className="form-container sign-up-container">
        <div className="back-home icon-wrapper"><a href="/"><GoHome /></a></div>
        <form onSubmit={handleRegisterSubmit}>
          <h1>إنشاء حساب</h1>
          <input
            type="text"
            placeholder="الاسم الكامل"
            value={registerData.Name}
            onChange={(e) => setRegisterData({ ...registerData, Name: e.target.value })}
            required
            disabled={loading}
          />
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={registerData.Email}
            onChange={(e) => setRegisterData({ ...registerData, Email: e.target.value })}
            required
            disabled={loading}
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={registerData.Password}
            onChange={(e) => setRegisterData({ ...registerData, Password: e.target.value })}
            required
            disabled={loading}
          />
          <button type="submit" className="w-100" disabled={loading}>
            {loading ? "جاري التسجيل..." : "تسجيل"}
          </button>
          <p className="toggle-text" onClick={togglePanel}>
            هل لديك حساب؟ <span>تسجيل الدخول</span>
          </p>
        </form>
      </div>

      <div className="overlay-container"><div className="overlay"></div></div>
    </div>
  );
};

export default AuthPage;
