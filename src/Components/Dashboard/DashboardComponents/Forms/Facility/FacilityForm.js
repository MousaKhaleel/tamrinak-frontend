import React, { useState, useEffect } from "react";
import { addFacilityImages } from "../../../../../Services/facilityService";

const API_URL = process.env.API_URL || "https://localhost:7160";

const facilityTypes = [
  { value: 0, label: "نادي كرة قدم" },
  { value: 1, label: "صالة رياضية" },
  { value: 2, label: "نادي كرة سلة" },
  { value: 3, label: "نادي تنس" },
  { value: 4, label: "نادي سباحة" },
  { value: 5, label: "فنون قتالية" },
  { value: 6, label: "أخرى" },
];

const fetchSports = async () => {
  try {
    const response = await fetch(`${API_URL}/api/Sport/all-sports`);
    if (!response.ok) throw new Error("فشل في جلب الرياضات");
    return await response.json();
  } catch (error) {
    console.error("خطأ في جلب الرياضات:", error);
    return [];
  }
};

const validateImage = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const { width, height } = img;
      if (width > 2000 || height > 2000)
        reject(new Error(`الحد الأقصى للدقة 2000x2000. صورتك: ${width}x${height}`));
      else if (width < 800 || height < 600)
        reject(new Error(`الحد الأدنى للدقة 800x600. صورتك: ${width}x${height}`));
      else resolve(file);
    };
    img.onerror = () => reject(new Error("فشل في تحميل الصورة"));
  });
};

const FacilityForm = ({ initialData, onSubmit, mode = "add" }) => {
  const [form, setForm] = useState(initialData);
  const [sports, setSports] = useState([]);
  const [loadingSports, setLoadingSports] = useState(true);
  const [images, setImages] = useState([]);
  const [imageErrors, setImageErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadSports = async () => {
      const sportsData = await fetchSports();
      setSports(sportsData);
      setLoadingSports(false);
    };
    loadSports();
  }, []);

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^(\+962|00962|0)?(78|77|79)\d{7}$/;
    return phoneRegex.test(phone);
  };

  const validateLocationDesc = (desc) => {
    return !/^\d+$/.test(desc);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "phoneNumber") {
      if (!validatePhoneNumber(value)) {
        setError("رقم الهاتف غير صالح. الرجاء إدخال رقم صحيح.");
      } else {
        setError("");
      }
    }

    if (name === "locationDesc") {
      if (!validateLocationDesc(value)) {
        setError("عنوان الملعب لا يمكن أن يكون أرقامًا فقط.");
      } else {
        setError("");
      }
    }
  };

  const handleSportIdsChange = (e) => {
    const values = Array.from(e.target.selectedOptions, (opt) => parseInt(opt.value));
    setForm((prev) => ({ ...prev, sportIds: values }));
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files).slice(0, 15);
    const validFiles = [];
    const errors = [];

    for (const file of files) {
      try {
        const validated = await validateImage(file);
        validFiles.push(validated);
      } catch (err) {
        errors.push(`${file.name}: ${err.message}`);
      }
    }

    setImages(validFiles);
    setImageErrors(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess(false);

    if (!validatePhoneNumber(form.phoneNumber)) {
      setError("رقم الهاتف غير صالح. الرجاء إدخال رقم صحيح.");
      setSubmitting(false);
      return;
    }

    if (!validateLocationDesc(form.locationDesc)) {
      setError("عنوان الملعب لا يمكن أن يكون أرقامًا فقط.");
      setSubmitting(false);
      return;
    }

    try {
      const payload = {
        ...form,
        type: parseInt(form.type),
        pricePerMonth: form.pricePerMonth ? parseFloat(form.pricePerMonth) : null,
      };

      const result = await onSubmit(payload);

      if (result?.id && images.length > 0) {
        await addFacilityImages(result.id, images);
      }

      setSuccess(true);
      if (mode === "add") {
        setForm(initialData);
        setImages([]);
      }
    } catch (err) {
      setError(err.message || "فشل في إرسال النموذج");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-5 py-4" dir="rtl"> {/* Added dir="rtl" for right-to-left layout */}
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">
            {mode === "edit" ? "تعديل المنشأة" : "إضافة منشأة جديدة"}
          </h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>

            {/* اسم المنشأة */}
            <div className="mb-3">
              <label className="form-label fw-semibold">اسم المنشأة</label>
              <input type="text" name="name" required className="form-control" value={form.name} onChange={handleChange} />
            </div>

            {/* وصف الموقع */}
            <div className="mb-3">
              <label className="form-label fw-semibold">العنوان</label>
              <input type="text" name="locationDesc" className="form-control" required value={form.locationDesc} onChange={handleChange} />
            </div>

            {/* نوع المنشأة */}
            <div className="mb-3">
              <label className="form-label fw-semibold">نوع المنشأة</label>
              <select name="type" className="form-select" value={form.type} onChange={handleChange}>
                {facilityTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* تحديد الرياضات المتعددة */}
            <div className="mb-3">
              <label className="form-label fw-semibold">الرياضات (اضغط Ctrl لتحديد أكثر من رياضة)</label>
              {loadingSports ? (
                <div className="form-text">جاري تحميل الرياضات...</div>
              ) : (
                <select
                  multiple
                  className="form-select"
                  value={form.sportIds}
                  onChange={handleSportIdsChange}
                  disabled={loadingSports}
                >
                  {sports.map((sport) => (
                    <option key={sport.id} value={sport.id}>{sport.name}</option>
                  ))}
                </select>
              )}
            </div>

            {/* أوقات الفتح والإغلاق */}
            <div className="row mb-3">
              <div className="col">
                <label className="form-label fw-semibold">وقت الفتح</label>
                <input type="time" name="openTime" className="form-control" required value={form.openTime} onChange={handleChange} />
              </div>
              <div className="col">
                <label className="form-label fw-semibold">وقت الإغلاق</label>
                <input type="time" name="closeTime" className="form-control" required value={form.closeTime} onChange={handleChange} />
              </div>
            </div>

            {/* خريطة الموقع */}
            <div className="mb-3">
              <label className="form-label fw-semibold">خريطة الموقع (رابط URL)</label>
              <input type="text" name="locationMap" className="form-control" value={form.locationMap} onChange={handleChange} />
            </div>

            {/* رقم الهاتف */}
            <div className="mb-3">
              <label className="form-label fw-semibold">رقم الهاتف</label>
              <input type="tel" name="phoneNumber" className="form-control" value={form.phoneNumber} onChange={handleChange} />
              {error && form.phoneNumber && !validatePhoneNumber(form.phoneNumber) && ( // Show error only if it's a phone number error
                <div className="form-text text-danger">{error}</div>
              )}
            </div>

            <div className="mb-3">
  <label className="form-label fw-semibold">السعر الشهري</label>
  <input
    type="number"
    name="pricePerMonth"
    className="form-control"
    value={form.pricePerMonth}
    onChange={handleChange}
    min="0"
    step="0.01"
  />
</div>

            {/* الوصف */}
            <div className="mb-3">
              <label className="form-label fw-semibold">الوصف</label>
              <textarea name="description" className="form-control" rows="3" value={form.description} onChange={handleChange}></textarea>
            </div>

            {/* تحميل الصور */}
            { mode === "add" && (
            <div className="mb-3">
              <label className="form-label fw-semibold">تحميل الصور</label>
              <input type="file" multiple accept="image/*" onChange={handleImageChange} className="form-control" />
              {imageErrors.length > 0 && (
                <div className="alert alert-warning mt-2">
                  <ul className="mb-0">{imageErrors.map((err, idx) => <li key={idx}>{err}</li>)}</ul>
                </div>
              )}
            </div>
            )}

            {/* زر الإرسال */}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? "جاري الإرسال..." : mode === "edit" ? "تحديث المنشأة" : "إضافة منشأة"}
              </button>
            </div>

            {/* تنبيهات النجاح والخطأ */}
            {success && <div className="alert alert-success mt-3">تم حفظ المنشأة بنجاح!</div>}
            {error && (!form.phoneNumber || validatePhoneNumber(form.phoneNumber)) && (!form.locationDesc || validateLocationDesc(form.locationDesc)) && ( // Show general error if not a phone or locationDesc error
                <div className="alert alert-danger mt-3">{error}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default FacilityForm;