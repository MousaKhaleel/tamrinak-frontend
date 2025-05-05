import React, { useState } from "react";
import { addFacility } from "../../../Services/facilityService"; // adjust path as needed

const initialFormState = {
  name: "",
  locationDesc: "",
  type: "0", // assuming FacilityType enum starts from 0
  sportIds: [],
  openTime: "",
  closeTime: "",
  locationMap: "",
  phoneNumber: "",
  description: "",
  pricePerMonth: "",
  offerDurationInMonths: "",
  offerPrice: "",
  isAvailable: true,
};

const AddFacilityForm = () => {
  const [form, setForm] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSportIdsChange = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => parseInt(option.value)
    );
    setForm((prev) => ({ ...prev, sportIds: values }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      // Convert time strings to proper format (HH:mm)
      const facilityData = {
        ...form,
        openTime: form.openTime,
        closeTime: form.closeTime,
        type: parseInt(form.type),
        pricePerMonth: form.pricePerMonth ? parseFloat(form.pricePerMonth) : null,
        offerPrice: form.offerPrice ? parseFloat(form.offerPrice) : null,
        offerDurationInMonths: form.offerDurationInMonths ? parseInt(form.offerDurationInMonths) : null,
      };
      await addFacility(facilityData);
      alert("Facility added successfully");
      setForm(initialFormState);
    } catch (err) {
      setError("Failed to add facility: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded max-w-xl mx-auto">
      <h2 className="text-xl font-semibold">Add Facility</h2>

      <input name="name" placeholder="Name" required value={form.name} onChange={handleChange} className="input" />
      <input name="locationDesc" placeholder="Location Description" required value={form.locationDesc} onChange={handleChange} className="input" />
      <select name="type" value={form.type} onChange={handleChange} className="input">
        <option value="0">Type 0</option>
        <option value="1">Type 1</option>
        {/* Add more as needed */}
      </select>
      <select multiple value={form.sportIds} onChange={handleSportIdsChange} className="input">
        <option value="1">Football</option>
        <option value="2">Basketball</option>
        {/* Add sport options dynamically if needed */}
      </select>
      <input name="openTime" type="time" required value={form.openTime} onChange={handleChange} className="input" />
      <input name="closeTime" type="time" required value={form.closeTime} onChange={handleChange} className="input" />
      <input name="locationMap" placeholder="Location Map" value={form.locationMap} onChange={handleChange} className="input" />
      <input name="phoneNumber" placeholder="Phone Number" type="tel" value={form.phoneNumber} onChange={handleChange} className="input" />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="input" />
      <input name="pricePerMonth" placeholder="Price per Month" type="number" value={form.pricePerMonth} onChange={handleChange} className="input" />
      <input name="offerDurationInMonths" placeholder="Offer Duration (Months)" type="number" value={form.offerDurationInMonths} onChange={handleChange} className="input" />
      <input name="offerPrice" placeholder="Offer Price" type="number" value={form.offerPrice} onChange={handleChange} className="input" />
      <label>
        <input name="isAvailable" type="checkbox" checked={form.isAvailable} onChange={handleChange} />
        Available
      </label>

      {error && <div className="text-red-500">{error}</div>}
      <button type="submit" disabled={submitting} className="btn">
        {submitting ? "Submitting..." : "Add Facility"}
      </button>
    </form>
  );
};

export default AddFacilityForm;
