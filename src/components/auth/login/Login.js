import '../../Auth/AuthStyle.css'; // TODO: SPLIT
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleLogin(e) {
        e.preventDefault();
        setLoading(true);
        setError(''); // Reset error message

        try {
            const res = await fetch(process.env.API_URL + '/Login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            if (res.ok) {
                const data = await res.json();
                setLoading(false);
                // Redirect or take other actions on successful login
            } else {
                const errorMessage = await res.text();
                throw new Error(errorMessage);
            }
        } catch (error) {
            setLoading(false);
            setError('Failed to login: ' + error.message);
        }
    }

    return (
        <div className="auth-container">
            <div className="form-box fade-in">
                <form onSubmit={handleLogin}>
                    <h1>تسجيل الدخول</h1>

                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="اسم المستخدم"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <i className='bx bxs-user'></i>
                    </div>

                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="كلمة المرور"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <i className='bx bxs-lock-alt'></i>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <div className="forgot-link">
                        <a href="#">نسيت كلمة المرور؟</a>
                    </div>

                    <button type="submit" className="btn" disabled={loading}>
                        {loading ? 'جاري التحميل...' : 'تسجيل الدخول'}
                    </button>

                    <p>ليس لديك حساب؟ <Link to="/register">إنشاء حساب</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Login;
