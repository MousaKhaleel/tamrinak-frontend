import React, { useState, useEffect } from "react";
import { addFacility } from "../../../Services/facilityService";
const API_URL = process.env.API_URL || "https://localhost:7160";

const fetchSports = async () => {
  try {
    const response = await fetch(`${API_URL}/api/Sport/all-sports`);
    if (!response.ok) {
      throw new Error("Failed to fetch sports");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching sports:", error);
    return [];
  }
};

const facilityTypes = [
  { value: 0, label: "Football Club" },
  { value: 1, label: "Gym" },
  { value: 2, label: "Basketball Club" },
  { value: 3, label: "Tennis Club" },
  { value: 4, label: "Swimming Club" },
  { value: 5, label: "Martial Arts" },
  { value: 6, label: "Other" },
];

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
  isAvailable: true,
};

const AddFacilityForm = () => {
  const [form, setForm] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [sports, setSports] = useState([]);
  const [loadingSports, setLoadingSports] = useState(true);

  useEffect(() => {
    const loadSports = async () => {
      try {
        const sportsData = await fetchSports();
        setSports(sportsData);
      } catch (err) {
        console.error("Failed to load sports:", err);
        setError("Failed to load sports list");
      } finally {
        setLoadingSports(false);
      }
    };
    
    loadSports();
  }, []);

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
    {facilityTypes.map((type) => (
      <option key={type.value} value={type.value}>
        {type.label}
      </option>
    ))}
  </select>
</div>
            <div className="mb-3">
              <label className="form-label">Sports (hold Ctrl to select multiple)</label>
              {loadingSports ? (
                <div className="text-muted">Loading sports...</div>
              ) : (
                <select 
                  multiple 
                  className="form-select" 
                  value={form.sportIds} 
                  onChange={handleSportIdsChange}
                  disabled={loadingSports}
                >
                  {sports.map((sport) => (
                    <option key={sport.id} value={sport.id}>
                      {sport.name}
                    </option>
                  ))}
                </select>
              )}
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
                <input type="number" name="offerDurationInMonths" className="form-control"/>
              </div>
              <div className="col">
                <label className="form-label">Offer Price</label>
                <input type="number" name="offerPrice" className="form-control"/>
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
