import '../../Auth/AuthStyle.css';//TODO SPLIT
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleRegister(e) {
        e.preventDefault()
        setLoading(true)
        if (password === confirmPassword) {
            const res = await fetch(process.env.REACT_APP_API_URL + '/Register', {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: { 'Content-Type': 'application/json' }
            })
            setLoading(false)
            //   setRedirect(true)
        }
        else {
            alert('Password and confirm password do not match')
            setLoading(false)
        }
    }

    return (
        <div className="auth-container">
            <div className="form-box fade-in">
                <form>
                    <h1>إنشاء حساب</h1>
                    <div className="input-box">
                        <input type="text" placeholder="اسم المستخدم" required />
                        <i className='bx bxs-user'></i>
                    </div>
                    <div className="input-box">
                        <input type="email" placeholder="البريد الإلكتروني" required />
                        <i className='bx bxs-envelope'></i>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="كلمة المرور" required />
                        <i className='bx bxs-lock-alt'></i>
                    </div>
                    <button type="submit" className="btn">إنشاء حساب</button>
                    <p>أو التسجيل عبر وسائل التواصل</p>
                    <div className="social-icons">
                        <a href="#"><i className='bx bxl-google'></i></a>
                        <a href="#"><i className='bx bxl-facebook'></i></a>
                    </div>
                    <p>هل لديك حساب؟ <Link to="/login">تسجيل الدخول</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Register;