import '../../Auth/AuthStyle.css'; // TODO SPLIT
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Update form data state
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Form validation
    const validateForm = () => {
        if (formData.password !== formData.confirmPassword) {
            setError('كلمة المرور وتأكيد كلمة المرور غير متطابقين');
            return false;
        }

        if (!formData.email.includes('@')) {
            setError('البريد الإلكتروني غير صحيح');
            return false;
        }

        setError('');
        return true;
    };

    // Handle register
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!validateForm()) {
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/Register`, {
                method: 'POST',
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.ok) {
                // Redirect or success logic
            } else {
                setError('حدث خطأ أثناء التسجيل، الرجاء المحاولة لاحقًا');
            }
        } catch (err) {
            setError('حدث خطأ في الاتصال، الرجاء المحاولة لاحقًا');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="form-box fade-in">
                <form onSubmit={handleRegister}>
                    <h1>إنشاء حساب</h1>
                    {error && <div className="error-message">{error}</div>}
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="اسم المستخدم"
                            required
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <i className='bx bxs-user'></i>
                    </div>
                    <div className="input-box">
                        <input
                            type="email"
                            placeholder="البريد الإلكتروني"
                            required
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <i className='bx bxs-envelope'></i>
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="كلمة المرور"
                            required
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <i className='bx bxs-lock-alt'></i>
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="تأكيد كلمة المرور"
                            required
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />
                        <i className='bx bxs-lock-alt'></i>
                    </div>
                    <button type="submit" className="btn" disabled={loading}>
                        {loading ? 'جاري التسجيل...' : 'إنشاء حساب'}
                    </button>
                    <p>هل لديك حساب؟ <Link to="/login">تسجيل الدخول</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Register;
