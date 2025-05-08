import React, { useState } from 'react';
import { forgotPassword } from '../../Services/authService';
import { useAuth } from '../../Context/AuthContext';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const token = user?.token;
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        try {
            await forgotPassword(email, token);
            setMessage('تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.');
        } catch (err) {
            setError(err.message || 'حدث خطأ ما. يرجى المحاولة مرة أخرى.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>نسيت كلمة المرور</h2>
            <p>يرجى إدخال بريدك الإلكتروني لإعادة تعيين كلمة المرور الخاصة بك.</p>
            <form className="forgot-password-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'جاري الإرسال...' : 'إرسال رابط إعادة تعيين كلمة المرور'}
                </button>
            </form>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <p className="back-to-login">
                <a href="/auth?mode=login">عودة إلى تسجيل الدخول</a>
            </p>
        </div>
    );
}

export default ForgotPassword;
