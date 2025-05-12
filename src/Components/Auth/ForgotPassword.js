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
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow p-4 w-100" style={{ maxWidth: '500px' }}>
                <h3 className="mb-3 text-center">نسيت كلمة المرور</h3>
                <p className="text-center text-muted">
                    يرجى إدخال بريدك الإلكتروني لإعادة تعيين كلمة المرور الخاصة بك.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">البريد الإلكتروني</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="example@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? 'جاري الإرسال...' : 'إرسال رابط إعادة التعيين'}
                    </button>
                </form>

                {message && (
                    <div className="alert alert-success mt-3 text-center" role="alert">
                        {message}
                    </div>
                )}
                {error && (
                    <div className="alert alert-danger mt-3 text-center" role="alert">
                        {error}
                    </div>
                )}

                <div className="text-center mt-4">
                    <a href="/auth?mode=login" className="text-decoration-none">عودة إلى تسجيل الدخول</a>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
