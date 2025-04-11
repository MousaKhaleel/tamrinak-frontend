import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./AuthStyle.css";
import { GoHome } from "react-icons/go";
import { Navigate } from 'react-router-dom';

const AuthPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const defaultMode = query.get("mode"); // 'login' or 'register'

  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    if (defaultMode === "register") {
      setIsRegistering(true);
    }
  }, [defaultMode]);

  const togglePanel = () => {
    setIsRegistering((prev) => !prev);
  };

  return (
    <div className={`auth-container ${isRegistering ? "right-panel-active" : ""}`}>
      <div className="form-container sign-in-container">
      <div className="back-home">
        <a href="/"><GoHome /></a>
</div>
        <form>
          <h1>تسجيل الدخول</h1>
          <input type="email" placeholder="البريد الإلكتروني" />
          <input type="password" placeholder="كلمة المرور" />
          <button className="w-100">دخول</button>
          <p className="toggle-text" onClick={togglePanel}>
            ليس لديك حساب؟ <span>إنشاء حساب</span>
          </p>
        </form>
      </div>

      <div className="form-container sign-up-container">
      <div className="back-home">
        <a href="/"><GoHome /></a>
</div>
        <form>
          <h1>إنشاء حساب</h1>
          <input type="text" placeholder="الاسم الكامل" />
          <input type="email" placeholder="البريد الإلكتروني" />
          <input type="password" placeholder="كلمة المرور" />
          <button className="w-100">تسجيل</button>
          <p className="toggle-text" onClick={togglePanel}>
            هل لديك حساب؟ <span>تسجيل الدخول</span>
          </p>
        </form>
      </div>

      <div className="overlay-container">
        <div className="overlay"></div>
      </div>
    </div>
  );
};

export default AuthPage;
