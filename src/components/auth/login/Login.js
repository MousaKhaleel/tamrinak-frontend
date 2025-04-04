import '../../Auth/AuthStyle.css';//TODO SPLIT
import { useState } from 'react';

function Login() {

    const [email, setEmail]=useState('');//TODO: use username instead of email
    const [password, setPassword]=useState('');
    const [loading, setLoading]=useState(false);

    async function handleLogin(e) {
        e.preventDefault();
        setLoading(true);
      
        try {
          const res = await fetch(process.env.API_URL+'/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          });
      
          if (res.ok) {
            const data = await res.json();
            setLoading(false);
            // setRedirect(true);
          } else {
            const errorMessage = await res.text();
            throw new Error(errorMessage);
          }
        } catch (error) {
          setLoading(false);
          alert('Failed to login: ' + error.message);
        }
      }
    
    return (
        <div>
            <div className="container">
                <div className="form-box login" id="login-section">
                    <form onSubmit={handleLogin}>
                        <h1>تسجيل الدخول</h1>
                        <div className="input-box">
                            <input
                                type="text"
                                id="login-username"
                                name="username"
                                placeholder="اسم المستخدم"
                                required
                            />
                            <i className="bx bxs-user" />
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                id="login-password"
                                name="password"
                                placeholder="كلمة المرور"
                                value={password} onChange={e=>setPassword(e.target.value)}
                                required
                            />
                            <i className="bx bxs-lock-alt" />
                        </div>
                        <div className="forgot-link">
                            <a href="#">نسيت كلمة المرور؟</a>
                        </div>
                        <button type="submit" className="btn">
                            تسجيل الدخول
                        </button>
                        <p>أو تسجيل الدخول عبر وسائل التواصل الاجتماعي</p>
                        <div className="social-icons">
                            <a href="#">
                                <i className="bx bxl-google" />
                            </a>
                            <a href="#">
                                <i className="bx bxl-facebook" />
                            </a>
                        </div>
                    </form>
                </div>
{/* ////////////////TODO////////////// */}
                <div className="toggle-box">
                    <div className="toggle-panel toggle-left">
                        <h1>مرحبًا</h1>
                        <p>ليس لديك حساب؟</p>
                        <button className="btn register-btn">إنشاء حساب</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>مرحبًا بعودتك!</h1>
                        <p>هل لديك حساب بالفعل؟</p>
                        <button className="btn login-btn">تسجيل الدخول</button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Login;