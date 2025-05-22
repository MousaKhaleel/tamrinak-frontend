// components/FacilityForm.jsx
import React, { useState, useEffect } from "react";
import { addFacilityImages } from "../../../../../Services/facilityService";

const API_URL = process.env.API_URL || "https://localhost:7160";

const facilityTypes = [
  { value: 0, label: "Football Club" },
  { value: 1, label: "Gym" },
  { value: 2, label: "Basketball Club" },
  { value: 3, label: "Tennis Club" },
  { value: 4, label: "Swimming Club" },
  { value: 5, label: "Martial Arts" },
  { value: 6, label: "Other" },
];

const fetchSports = async () => {
  try {
    const response = await fetch(`${API_URL}/api/Sport/all-sports`);
    if (!response.ok) throw new Error("Failed to fetch sports");
    return await response.json();
  } catch (error) {
    console.error("Error fetching sports:", error);
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
        reject(new Error(`Max resolution 2000x2000. Your image: ${width}x${height}`));
      else if (width < 800 || height < 600)
        reject(new Error(`Min resolution 800x600. Your image: ${width}x${height}`));
      else resolve(file);
    };
    img.onerror = () => reject(new Error("Failed to load image"));
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
      setError(err.message || "Failed to submit form");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
    <form onSubmit={handleSubmit}>
      <h4>{mode === "edit" ? "Edit Facility" : "Add New Facility"}</h4>

      <div className="mb-3">
        <label className="form-label">Facility Name</label>
        <input type="text" name="name" required className="form-control" value={form.name} onChange={handleChange} />
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

      <div className="mb-3">
        <label className="form-label">Upload Images</label>
        <input type="file" multiple accept="image/*" onChange={handleImageChange} className="form-control" />
        {imageErrors.length > 0 && (
          <div className="alert alert-warning mt-2">
            <ul>{imageErrors.map((err, idx) => <li key={idx}>{err}</li>)}</ul>
          </div>
        )}
      </div>

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? "Submitting..." : mode === "edit" ? "Update Facility" : "Add Facility"}
      </button>
      {success && <div className="alert alert-success mt-2">Success!</div>}
      {error && <div className="alert alert-danger mt-2">{error}</div>}
    </form>
    </div>
  );
};

export default FacilityForm;
