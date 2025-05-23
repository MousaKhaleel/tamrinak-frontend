import React, { useState, useEffect } from "react";
import { fetchSports } from "../../../../../Services/SportService";
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = process.env.API_URL || "https://localhost:7160";

const defaultFieldData = {
  name: "",
  locationDesc: "",
  sportId: "",
  pricePerHour: "",
  openTime: "",
  closeTime: "",
  phoneNumber: "",
  capacity: "",
  locationMap: "",
  hasLighting: false,
  isIndoor: false,
};

const FieldForm = ({ initialData = {}, onSubmit, submitLabel }) => {
  const [formData, setFormData] = useState({ ...defaultFieldData, ...initialData });
  const [images, setImages] = useState([]);
  const [sports, setSports] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loadingSports, setLoadingSports] = useState(true);

  useEffect(() => {
    const loadSports = async () => {
      try {
        const sportsData = await fetchSports();
        setSports(sportsData);
      } catch {
        setError("فشل تحميل الرياضات.");
      } finally {
        setLoadingSports(false);
      }
    };
    loadSports();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const processedImages = [];

    const resizeAndCropImage = (file) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const targetWidth = 800;
          const targetHeight = 600;
          canvas.width = targetWidth;
          canvas.height = targetHeight;

          let sx = 0, sy = 0, sWidth = img.width, sHeight = img.height;
          const sourceAspectRatio = img.width / img.height;

          if (sourceAspectRatio > targetWidth / targetHeight) {
            sWidth = img.height * (targetWidth / targetHeight);
            sx = (img.width - sWidth) / 2;
          } else {
            sHeight = img.width * (targetHeight / targetWidth);
            sy = (img.height - sHeight) / 2;
          }

          ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, targetWidth, targetHeight);
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(new File([blob], file.name, { type: "image/jpeg" }));
            } else {
              resolve(null);
            }
          }, "image/jpeg");
        };
      });
    };

    Promise.all(files.map(resizeAndCropImage)).then((resized) => {
      setImages(resized.filter(Boolean));
    });
  };

const validatePhoneNumber = (phone) => {
  const phoneRegex = /^\+?\d{10,15}$/;
  return phoneRegex.test(phone);
};

const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  setFormData((prev) => ({
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
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

      if (!validatePhoneNumber(formData.phoneNumber)) {
    setError("رقم الهاتف غير صالح. الرجاء إدخال رقم صحيح.");
    return;
  }

    try {
      const payload = {
        ...formData,
        sportId: parseInt(formData.sportId),
        pricePerHour: parseFloat(formData.pricePerHour || 0),
        capacity: formData.capacity ? parseInt(formData.capacity) : null,
      };

      const field = await onSubmit(payload); // passed from Add/Edit page

      if (images.length > 0 && field?.id) {
        const formDataObj = new FormData();
        formDataObj.append("fieldId", field.id);
        images.forEach((img) => formDataObj.append("formFiles", img));

        const response = await fetch(`${API_URL}/api/Field/field-images`, {
          method: "POST",
          body: formDataObj,
        });

        if (!response.ok) throw new Error("Image upload failed");
      }

      setSuccess("تمت العملية بنجاح!");
      if (!initialData?.id) {
        setFormData(defaultFieldData);
        setImages([]);
      }
    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء حفظ البيانات.");
    }
  };

  return (
    <div className="container mt-5" dir="rtl">
      <div className="card shadow">
        <div className="card-header bg-primary text-white text-end">
          <h5 className="mb-0">{submitLabel}</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            {[
              { name: "name", placeholder: "اسم الملعب", required: true },
              { name: "locationDesc", placeholder: "وصف الموقع", required: true },
              { name: "pricePerHour", type: "number", placeholder: "السعر لكل ساعة", step: "0.01" },
              { name: "openTime", type: "time", required: true },
              { name: "closeTime", type: "time", required: true },
              { name: "phoneNumber", type: "tel", placeholder: "رقم الهاتف", required: true },
              { name: "capacity", type: "number", placeholder: "السعة (اختياري)" },
              { name: "locationMap", placeholder: "رابط الموقع على الخريطة (اختياري)" },
            ].map(({ name, placeholder, type = "text", required = false, step }) => (
              <div className="col-12" key={name}>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="form-control text-end"
                  required={required}
                  step={step}
                />
              </div>
            ))}

            <div className="col-12">
              <select
                name="sportId"
                value={formData.sportId}
                onChange={handleChange}
                className="form-select text-end"
                required
                disabled={loadingSports}
              >
                <option value="">اختر الرياضة</option>
                {sports.map((sport) => (
                  <option key={sport.id} value={sport.id}>
                    {sport.name}
                  </option>
                ))}
              </select>
              {loadingSports && <div className="text-muted text-end mt-1">جاري تحميل الرياضات...</div>}
            </div>

            <div className="col-12">
              <input
                type="file"
                multiple
                accept="image/*"
                className="form-control"
                onChange={handleImageChange}
              />
            </div>

            <div className="col-12 d-flex justify-content-end gap-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="hasLighting"
                  id="hasLighting"
                  checked={formData.hasLighting}
                  onChange={handleChange}
                />
                <label className="form-check-label me-2" htmlFor="hasLighting">إنارة</label>
              </div>

              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="isIndoor"
                  id="isIndoor"
                  checked={formData.isIndoor}
                  onChange={handleChange}
                />
                <label className="form-check-label me-2" htmlFor="isIndoor">داخلي</label>
              </div>
            </div>

            {error && <div className="alert alert-danger text-end">{error}</div>}
            {success && <div className="alert alert-success text-end">{success}</div>}

            <div className="col-12">
              <button type="submit" className="btn btn-primary w-100">{submitLabel}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FieldForm;
