import { Link } from "react-router-dom";

function PaymentCancelled() {
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100" dir="rtl">
            <div className="card text-center p-4 shadow-lg" style={{ maxWidth: '500px' }}>
                <div className="text-danger display-3 mb-3">✗</div>
                <h2 className="mb-3">تم إلغاء العملية</h2>
                <p className="mb-2">
                    لم يتم إكمال عملية الدفع بنجاح.
                </p>
                <p className="text-muted">
                    لم يتم خصم أي مبلغ من حسابك. يمكنك المحاولة مرة أخرى.
                </p>
                <div className="d-flex gap-2 justify-content-center">
                    <Link className="btn btn-outline-danger mt-3 px-4" to="/">
                        العودة للرئيسية
                    </Link>
                    <Link className="btn btn-danger mt-3 px-4" to="">
                        المحاولة مرة أخرى
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PaymentCancelled;