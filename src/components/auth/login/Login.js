import '../../Auth/AuthStyle.css';//TODO SPLIT
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {

    const [email, setEmail] = useState('');//TODO: use username instead of email
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(process.env.API_URL + '/Login', {
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
        <div className="auth-container">
            <div className="form-box fade-in">
                <form>
                    <h1>تسجيل الدخول</h1>
                    <div className="input-box">
                        <input type="text" placeholder="اسم المستخدم" required />
                        <i className='bx bxs-user'></i>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="كلمة المرور" required />
                        <i className='bx bxs-lock-alt'></i>
                    </div>
                    <div className="forgot-link">
                        <a href="#">نسيت كلمة المرور؟</a>
                    </div>
                    <button type="submit" className="btn">تسجيل الدخول</button>
                    <p>أو تسجيل الدخول عبر وسائل التواصل</p>
                    <div className="social-icons">
                        <a href="#"><i className='bx bxl-google'></i></a>
                        <a href="#"><i className='bx bxl-facebook'></i></a>
                    </div>
                    <p>ليس لديك حساب؟ <Link to="/register">إنشاء حساب</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Login;