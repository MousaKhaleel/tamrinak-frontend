import { Link } from "react-router-dom";

function PaymentSuccess() {
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100" dir="rtl">
            <div className="card text-center p-4 shadow-lg" style={{ maxWidth: '500px' }}>
                <div className="text-success display-3 mb-3">✓</div>
                <h2 className="mb-3">تمت العملية بنجاح!</h2>
                <p className="mb-2">
                    شكرًا لطلبك. تمت معالجة الدفع بنجاح.
                </p>
                <p className="text-muted">
                    تم إرسال بريد تأكيد إلى عنوان بريدك الإلكتروني المسجل.
                </p>
                <Link className="btn btn-success mt-3 px-4" to="/">
                    المتابعة
                </Link>
            </div>
        </div>
    );
}

export default PaymentSuccess;
