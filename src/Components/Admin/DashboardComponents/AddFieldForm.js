import React, { useState } from "react";
import { addField } from "../../../Services/fieldService";

import 'bootstrap/dist/css/bootstrap.min.css';


const AddFieldForm = () => {
  const [formData, setFormData] = useState({
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
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const payload = {
        ...formData,
        sportId: parseInt(formData.sportId),
        pricePerHour: parseFloat(formData.pricePerHour || 0),
        openTime: formData.openTime,
        closeTime: formData.closeTime,
        capacity: formData.capacity ? parseInt(formData.capacity) : null,
        hasLighting: formData.hasLighting,
        isIndoor: formData.isIndoor,
      };
      await addField(payload);
      setSuccess("تمت إضافة الملعب بنجاح!");
      setFormData({
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
      });
    } catch (err) {
      setError("فشل في إضافة الملعب. يرجى التحقق من المدخلات.");
    }
  };

  return (
    <div className="container mt-5" dir="rtl">
      <div className="card shadow">
        <div className="card-header bg-primary text-white text-end">
          <h5 className="mb-0">إضافة ملعب جديد</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">

            {[
              { name: "name", placeholder: "اسم الملعب", required: true },
              { name: "locationDesc", placeholder: "وصف الموقع", required: true },
              { name: "sportId", type: "number", placeholder: "رقم الرياضة", required: true },
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
              <button type="submit" className="btn btn-primary w-100">إضافة الملعب</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFieldForm;
