import { useAuth } from "../../Context/AuthContext";
import { useState } from "react";
import { FaUser, FaEnvelope, FaUserShield, FaKey, FaPaperPlane } from "react-icons/fa";
import { sendConfirmationEmail } from "../../Services/authService";
import { deleteUser, uploadProfilePicture } from "../../Services/userService";
import defaultImage from "../../Assets/Defaults/profile-42914_1280.png";
import { toast } from "react-toastify";

import CropModal from "./CropModal"; // adjust path
import { deleteProfilePicture, requestVenueManager } from "../../Services/userService";



function Profile() {
const { user, logoutUser, updateProfileImage } = useAuth();
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

  const [cropSrc, setCropSrc] = useState(null); // base64 image
const [selectedFile, setSelectedFile] = useState(null);


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

const handleImageUpload = (file) => {
  if (!file) return;

  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
  const maxSize = 200 * 1024 * 1024;

  if (!validTypes.includes(file.type)) {
    setErrorMessage("نوع الملف غير مدعوم. يرجى تحميل صورة (JPEG, PNG, GIF)");
    return;
  }

  if (file.size > maxSize) {
    setErrorMessage("حجم الصورة كبير جدًا. الحد الأقصى 200MB");
    return;
  }

  const reader = new FileReader();
  reader.onloadend = () => {
    setCropSrc(reader.result); // open modal with base64
    setSelectedFile(file); // keep the file in case needed
  };
  reader.readAsDataURL(file);
};

const handleCroppedImage = async (croppedFile) => {
  try {
    setLoading(true);
    setCropSrc(null);
    const response = await uploadProfilePicture(croppedFile, user.profile.id);
    
    if (response?.imageUrl || response?.success) {
      const newImageUrl = response.imageUrl || response.profileImageUrl;
      updateProfileImage(newImageUrl); // ✅ Update context directly
      setSuccessMessage("تم تحديث الصورة بنجاح!");
    } else {
      setErrorMessage(response?.message || "فشل في رفع الصورة.");
    }
  } catch (err) {
    setErrorMessage(err.message || "حدث خطأ أثناء رفع الصورة.");
  } finally {
    setLoading(false);
  }
};


const handleDeleteProfilePicture = async () => {
  if (!profile.profileImageBase64) {
    toast.info("لا توجد صورة لحذفها.");
    return;
  }

  if (window.confirm("هل أنت متأكد من حذف الصورة الشخصية؟")) {
    try {
      setLoading(true);
      const res = await deleteProfilePicture();
      if (res.success) {
        updateProfileImage(null); // Update context
        toast.success("تم حذف الصورة الشخصية بنجاح.");
      } else {
        throw new Error(res.message || "فشل حذف الصورة.");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }
};

const handleVenueManagerRequest = async () => {
  try {
    setLoading(true);
    const res = await requestVenueManager();
    toast.success(res.message || "تم إرسال طلبك بنجاح.");
  } catch (err) {
    toast.error(err.message || "فشل إرسال الطلب.");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="container mt-1" dir="rtl">
      <div className="card shadow p-4 pt-5 mx-auto" style={{ maxWidth: "600px", borderRadius: "16px" }}>
        <div className="d-flex align-items-center gap-3 mb-4 flex-wrap">
{profile.profileImageBase64 ? (
  <img
    src={`data:image/jpeg;base64,${profile.profileImageBase64}`}
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
    <img 
      src={defaultImage} 
      alt="الصورة الشخصية" 
      className="rounded-circle border" 
      style={{ 
        width: "72px", 
        height: "72px", 
        objectFit: "cover", 
        borderColor: "#F5C45E" 
      }} 
    />
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
            disabled={loading}
          />

          {loading && (
            <div className="mt-2 text-primary">جاري رفع الصورة...</div>
          )}
          <button
  className="btn btn-outline-danger mt-2"
  onClick={handleDeleteProfilePicture}
  disabled={loading}
>
  حذف الصورة الشخصية
</button>

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
  className="btn btn-warning text-white"
  onClick={handleVenueManagerRequest}
  disabled={loading}
>
  <FaUserShield className="ms-2" />
  طلب أن تصبح مالك منشأة
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
      {cropSrc && (
  <CropModal
    image={cropSrc}
    onCancel={() => setCropSrc(null)}
    onCropComplete={handleCroppedImage}
  />
)}

    </div>
  );
}

export default Profile;
