import React, { useState } from "react";
import { addField } from "../../../Services/fieldService";

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
    <form dir="rtl" onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-semibold text-right">إضافة ملعب جديد</h2>

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="اسم الملعب"
        required
        className="w-full border p-2 rounded text-right"
      />
      <input
        name="locationDesc"
        value={formData.locationDesc}
        onChange={handleChange}
        placeholder="وصف الموقع"
        required
        className="w-full border p-2 rounded text-right"
      />
      <input
        type="number"
        name="sportId"
        value={formData.sportId}
        onChange={handleChange}
        placeholder="رقم الرياضة"
        required
        className="w-full border p-2 rounded text-right"
      />
      <input
        type="number"
        name="pricePerHour"
        value={formData.pricePerHour}
        onChange={handleChange}
        placeholder="السعر لكل ساعة"
        step="0.01"
        className="w-full border p-2 rounded text-right"
      />
      <input
        type="time"
        name="openTime"
        value={formData.openTime}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded text-right"
      />
      <input
        type="time"
        name="closeTime"
        value={formData.closeTime}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded text-right"
      />
      <input
        type="tel"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        placeholder="رقم الهاتف"
        required
        className="w-full border p-2 rounded text-right"
      />
      <input
        type="number"
        name="capacity"
        value={formData.capacity}
        onChange={handleChange}
        placeholder="السعة (اختياري)"
        className="w-full border p-2 rounded text-right"
      />
      <input
        name="locationMap"
        value={formData.locationMap}
        onChange={handleChange}
        placeholder="رابط الموقع على الخريطة (اختياري)"
        className="w-full border p-2 rounded text-right"
      />

      <label className="flex items-center flex-row-reverse gap-x-2">
        <input type="checkbox" name="hasLighting" checked={formData.hasLighting} onChange={handleChange} />
        <span>إنارة</span>
      </label>

      <label className="flex items-center flex-row-reverse gap-x-2">
        <input type="checkbox" name="isIndoor" checked={formData.isIndoor} onChange={handleChange} />
        <span>داخلي</span>
      </label>

      {error && <p className="text-red-600 text-right">{error}</p>}
      {success && <p className="text-green-600 text-right">{success}</p>}

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        إضافة الملعب
      </button>
    </form>
  );
};

export default AddFieldForm;
