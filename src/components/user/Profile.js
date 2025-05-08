import { useAuth } from "../../Context/AuthContext";
import { useState } from "react";
import { FaUser, FaEnvelope, FaUserShield, FaKey, FaPaperPlane } from "react-icons/fa";
import { sendConfirmationEmail } from "../../Services/authService";
import { deleteUser } from "../../Services/userService";

function Profile() {
  const { user, logoutUser } = useAuth();
  const profile = user?.profile;
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Replace this with real password update logic
    console.log("Changing password...", form);
    setShowModal(false);
  };

  const handleSendConfirmationEmail = async () => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await sendConfirmationEmail(user.token);
      setSuccessMessage("تم إرسال رسالة التأكيد بنجاح!");
    } catch (error) {
      setErrorMessage(error.message || "فشل إرسال رسالة التأكيد.");
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light" dir="rtl">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">جارٍ التحميل...</span>
        </div>
      </div>
    );
  }

  const handleDeleteUser = async () => {
    if (window.confirm("هل أنت متأكد من أنك تريد حذف الحساب؟ هذا الإجراء لا يمكن التراجع عنه.")) {
      try {
        await deleteUser(user.profile.id);
        alert("تم حذف الحساب بنجاح.");
        logoutUser();
        window.location.href = "/"; // or logout function
      } catch (error) {
        alert("حدث خطأ أثناء حذف الحساب.");
      }
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center" dir="rtl">
      <div
        className="card shadow-lg border-0 w-100"
        style={{
          maxWidth: "1000px",
          background: "linear-gradient(135deg, #ffffff, #fdf7e7)",
          borderRadius: "1rem",
        }}
      >
        <div
          className="card-header text-white text-center py-4"
          style={{
            backgroundColor: "#102E50",
            borderTopLeftRadius: "1rem",
            borderTopRightRadius: "1rem",
          }}
        >
          <h2 className="fw-bold mb-0">الملف الشخصي</h2>
        </div>

        <div className="card-body p-5 row align-items-center">
          <div className="col-md-4 text-center mb-4 mb-md-0">
            {profile.profileImageUrl ? (
              <img
                src={profile.profileImageUrl}
                alt="الصورة الشخصية"
                className="img-fluid rounded-circle border border-4"
                style={{
                  maxWidth: "220px",
                  borderColor: "#F5C45E",
                  boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
                }}
              />
            ) : (
              <div className="text-muted fs-5">لا توجد صورة شخصية</div>
            )}
          </div>
          <div className="col-md-8 text-end">
            <div className="mb-4">
              <FaUser className="ms-2 text-warning" />
              <strong className="text-dark">الاسم:</strong>{" "}
              <span className="fs-5">{profile.name}</span>
            </div>
            <div className="mb-4">
              <FaEnvelope className="ms-2 text-warning" />
              <strong className="text-dark">البريد الإلكتروني:</strong>{" "}
              <span className="fs-5">{profile.email}</span>
            </div>
            <div className="mb-4">
              <FaUserShield className="ms-2 text-warning" />
              <strong className="text-dark">الأدوار:</strong>{" "}
              <span className="fs-5">{profile.roles?.join("، ")}</span>
            </div>

            {/* Send Confirmation Email Button */}
            <button
              className="btn mt-3 text-white"
              style={{ backgroundColor: "#F5C45E", color: "#102E50" }}
              onClick={handleSendConfirmationEmail}
              disabled={loading}
            >
              <FaPaperPlane className="ms-2" />
              {loading ? "جاري الإرسال..." : "إرسال رسالة تأكيد"}
            </button>

            {successMessage && <div className="text-success mt-2">{successMessage}</div>}
            {errorMessage && <div className="text-danger mt-2">{errorMessage}</div>}

            <button
              className="btn mt-3 text-white"
              style={{ backgroundColor: "#F5C45E", color: "#102E50" }}
              onClick={() => setShowModal(true)}
            >
              <FaKey className="ms-2" />
              تغيير كلمة المرور
            </button>
            <button
  className="btn mt-3"
  style={{ backgroundColor: "#dc3545", color: "#fff" }}
  onClick={handleDeleteUser}
>
  حذف الحساب
</button>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered" dir="rtl">
            <div className="modal-content">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title">تغيير كلمة المرور</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3 text-end">
                    <label className="form-label">كلمة المرور الحالية</label>
                    <input
                      type="password"
                      className="form-control"
                      name="currentPassword"
                      required
                      value={form.currentPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3 text-end">
                    <label className="form-label">كلمة المرور الجديدة</label>
                    <input
                      type="password"
                      className="form-control"
                      name="newPassword"
                      required
                      value={form.newPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3 text-end">
                    <label className="form-label">تأكيد كلمة المرور</label>
                    <input
                      type="password"
                      className="form-control"
                      name="confirmPassword"
                      required
                      value={form.confirmPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    إلغاء
                  </button>
                  <button type="submit" className="btn btn-primary">
                    حفظ التغييرات
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
