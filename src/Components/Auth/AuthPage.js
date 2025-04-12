import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import "./AuthStyle.css";
import { login, register } from "../../Services/authService";
import { toast } from "react-toastify";

import { useAuth } from "../../Context/AuthContext";

const AuthPage = () => {
  const { loginUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const defaultMode = query.get("mode");

  const [isRegistering, setIsRegistering] = useState(false);
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
    try {
      const res = await login(loginData);
      loginUser(res.jwtToken);
      toast.success("تم تسجيل الدخول بنجاح");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(registerData);
      toast.success("تم إنشاء الحساب بنجاح، قم بتسجيل الدخول");
      setIsRegistering(false); // Go to login form
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className={`auth-container ${isRegistering ? "right-panel-active" : ""}`}>
      <div className="form-container sign-in-container">
        <div className="back-home"><a href="/"><GoHome /></a></div>
        <form onSubmit={handleLoginSubmit}>
          <h1>تسجيل الدخول</h1>
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, Email: e.target.value })}
            required  
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, Password: e.target.value })}
            required
          />
          <button type="submit" className="w-100">دخول</button>
          <p className="toggle-text" onClick={togglePanel}>
            ليس لديك حساب؟ <span>إنشاء حساب</span>
          </p>
        </form>
      </div>

      <div className="form-container sign-up-container">
        <div className="back-home"><a href="/"><GoHome /></a></div>
        <form onSubmit={handleRegisterSubmit}>
          <h1>إنشاء حساب</h1>
          <input
            type="text"
            placeholder="الاسم الكامل"
            value={registerData.name}
            onChange={(e) => setRegisterData({ ...registerData, Name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={registerData.email}
            onChange={(e) => setRegisterData({ ...registerData, Email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={registerData.password}
            onChange={(e) => setRegisterData({ ...registerData, Password: e.target.value })}
            required
          />
          <button type="submit" className="w-100">تسجيل</button>
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
