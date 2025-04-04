import '../../Auth/AuthStyle.css';//TODO SPLIT
import { useState } from 'react';

function Register() {

    const [name, setName]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [confirmPassword, setConfirmPassword]=useState('');
    const [loading, setLoading]=useState(false);

    async function handleRegister(e) {
        e.preventDefault()
        setLoading(true)
        if(password===confirmPassword){
        const res=await fetch(process.env.REACT_APP_API_URL+'/register',{
        method:'POST',
        body: JSON.stringify({name, email, password}),
        headers:{'Content-Type':'application/json'}
      })
      setLoading(false)
    //   setRedirect(true)
    }
    else{
      alert('Password and confirm password do not match')
      setLoading(false)
    }
    }

    return (
        <div>
            <div className="form-box register" id="register-section">
                <form onSubmit={handleRegister}>
                    <h1>إنشاء حساب</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            id="register-username"
                            name="username"
                            placeholder="اسم المستخدم"
                            value={name} onChange={e=>setName(e.target.value)}
                            required
                        />
                        <i className="bx bxs-user" />
                    </div>
                    <div className="input-box">
                        <input
                            type="email"
                            id="register-email"
                            name="email"
                            placeholder="البريد الإلكتروني"
                            value={email} onChange={e=>setEmail(e.target.value)}
                            required
                        />
                        <i className="bx bxs-envelope" />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            id="register-password"
                            name="password"
                            placeholder="كلمة المرور"
                            value={password} onChange={e=>setPassword(e.target.value)}
                            required
                        />
                        <i className="bx bxs-lock-alt" />
                    </div>
                    <div className="input-box">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input name="cpassword" type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} className="form-control" id="cpassword" placeholder="Confirm password" required/>
                    </div>
                    <button type="submit" className="btn">
                        إنشاء حساب
                    </button>
                    <p>أو التسجيل عبر وسائل التواصل الاجتماعي</p>
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

    );
}

export default Register;