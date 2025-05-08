import React, { useState } from "react";
import { addFacility } from "../../../Services/facilityService"; // adjust path as needed

const initialFormState = {
  name: "",
  locationDesc: "",
  type: "0",
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
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSportIdsChange = (e) => {
    const values = Array.from(e.target.selectedOptions, option => parseInt(option.value));
    setForm(prev => ({ ...prev, sportIds: values }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      const facilityData = {
        ...form,
        type: parseInt(form.type),
        pricePerMonth: form.pricePerMonth ? parseFloat(form.pricePerMonth) : null,
        offerPrice: form.offerPrice ? parseFloat(form.offerPrice) : null,
        offerDurationInMonths: form.offerDurationInMonths ? parseInt(form.offerDurationInMonths) : null,
      };

      await addFacility(facilityData);
      setSuccess(true);
      setForm(initialFormState);
    } catch (err) {
      setError("Failed to add facility: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header">
          <h4 className="mb-0">Add New Facility</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Facility Name</label>
              <input type="text" name="name" className="form-control" required value={form.name} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Location Description</label>
              <input type="text" name="locationDesc" className="form-control" required value={form.locationDesc} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Facility Type</label>
              <select name="type" className="form-select" value={form.type} onChange={handleChange}>
                <option value="0">Type 0</option>
                <option value="1">Type 1</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Sports (hold Ctrl to select multiple)</label>
              <select multiple className="form-select" value={form.sportIds} onChange={handleSportIdsChange}>
                <option value="1">Football</option>
                <option value="2">Basketball</option>
              </select>
            </div>

            <div className="row mb-3">
              <div className="col">
                <label className="form-label">Open Time</label>
                <input type="time" name="openTime" className="form-control" required value={form.openTime} onChange={handleChange} />
              </div>
              <div className="col">
                <label className="form-label">Close Time</label>
                <input type="time" name="closeTime" className="form-control" required value={form.closeTime} onChange={handleChange} />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Location Map (URL)</label>
              <input type="text" name="locationMap" className="form-control" value={form.locationMap} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input type="tel" name="phoneNumber" className="form-control" value={form.phoneNumber} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea name="description" className="form-control" rows="3" value={form.description} onChange={handleChange}></textarea>
            </div>

            <div className="row mb-3">
              <div className="col">
                <label className="form-label">Price per Month</label>
                <input type="number" name="pricePerMonth" className="form-control" value={form.pricePerMonth} onChange={handleChange} />
              </div>
              <div className="col">
                <label className="form-label">Offer Duration (months)</label>
                <input type="number" name="offerDurationInMonths" className="form-control" value={form.offerDurationInMonths} onChange={handleChange} />
              </div>
              <div className="col">
                <label className="form-label">Offer Price</label>
                <input type="number" name="offerPrice" className="form-control" value={form.offerPrice} onChange={handleChange} />
              </div>
            </div>

            <div className="form-check mb-3">
              <input type="checkbox" name="isAvailable" className="form-check-input" checked={form.isAvailable} onChange={handleChange} />
              <label className="form-check-label">Available</label>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">Facility added successfully!</div>}

            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? "Submitting..." : "Add Facility"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFacilityForm;
