import { useAuth } from "../../Context/AuthContext";
import { useState } from "react";
import { FaUser, FaEnvelope, FaUserShield, FaKey, FaPaperPlane } from "react-icons/fa";
import { sendConfirmationEmail } from "../../Services/authService";
import { deleteUser, uploadProfilePicture } from "../../Services/userService";
import defaultImage from "../../Assets/Defaults/profile-42914_1280.png";
import { toast } from "react-toastify";

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
    // TODO: Replace with actual logic
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

  const handleDeleteUser = async () => {
    if (window.confirm("هل أنت متأكد من أنك تريد حذف الحساب؟")) {
      try {
        await deleteUser(user.profile.id);
        toast.success("تم حذف الحساب بنجاح.");
        logoutUser();
        window.location.href = "/";
      } catch {
        toast.error("حدث خطأ أثناء حذف الحساب.");
      }
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

const handleImageUpload = async (file) => {
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  setLoading(true);
  setErrorMessage("");
  setSuccessMessage("");

  try {
    const response = await uploadProfilePicture(formData, user.profile.id);
    if (response?.imageBase64 || response?.success) {
      setSuccessMessage("تم تحديث الصورة بنجاح!");
      window.location.reload(); // or update context state if preferred
    } else {
      setErrorMessage("فشل في رفع الصورة.");
    }
  } catch (error) {
    setErrorMessage("حدث خطأ أثناء رفع الصورة.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="container mt-1" dir="rtl">
      <div className="card shadow p-4 pt-5 mx-auto" style={{ maxWidth: "600px", borderRadius: "16px" }}>
        <div className="d-flex align-items-center gap-3 mb-4 flex-wrap">
          {profile.profileImageUrl ? (
            <img
              src={profile.profileImageUrl}
              alt="الصورة الشخصية"
              className="rounded-circle border"
              style={{
                width: "72px",
                height: "72px",
                objectFit: "cover",
                borderColor: "#F5C45E",
              }}
            />
          ) : (
            <div>
            <img src={defaultImage} alt="الصورة الشخصية" className="rounded-circle border" style={{ width: "72px", height: "72px", objectFit: "cover", borderColor: "#F5C45E" }} />
            </div>
          )}


          <div className="flex-grow-1">
            <h5 className="mb-0 fw-bold">{profile.name}</h5>
            <small className="text-muted">{profile.email}</small>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="profileImage" className="form-label">تحديث الصورة الشخصية</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            id="profileImage"
            onChange={(e) => handleImageUpload(e.target.files[0])}
          />
        </div>
        <div className="mb-3">
          <FaUserShield className="ms-2 text-warning" />
          <strong>الأدوار:</strong> <span>{profile.roles?.join("، ")}</span>
        </div>

        <div className="d-flex flex-column gap-2 mt-4">
          <button
            className="btn btn-primary text-white"
            onClick={handleSendConfirmationEmail}
            disabled={loading}
          >
            <FaPaperPlane className="ms-2" />
            {loading ? "جاري الإرسال..." : "إرسال رسالة تأكيد"}
          </button>

          <button
            className="btn btn-primary text-white"
            onClick={() => setShowModal(true)}
          >
            <FaKey className="ms-2" />
            تغيير كلمة المرور
          </button>

          <button className="btn btn-danger" onClick={handleDeleteUser}>
            حذف الحساب
          </button>
        </div>

        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
      </div>

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
                  {["currentPassword", "newPassword", "confirmPassword"].map((field, idx) => (
                    <div className="mb-3 text-end" key={idx}>
                      <label className="form-label">
                        {field === "currentPassword" ? "كلمة المرور الحالية" :
                          field === "newPassword" ? "كلمة المرور الجديدة" :
                            "تأكيد كلمة المرور"}
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name={field}
                        value={form[field]}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  ))}
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
