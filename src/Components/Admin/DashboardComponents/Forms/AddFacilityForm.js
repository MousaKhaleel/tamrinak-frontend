import React, { useState, useEffect } from "react";
import { addFacility } from "../../../../Services/facilityService";

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

const validateImage = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    
    img.onload = () => {
      const width = img.width;
      const height = img.height;

      // Check maximum dimensions
      if (width > 2000 || height > 2000) {
        reject(new Error(`Image resolution is too high. Maximum allowed is 2000x2000. Your image is ${width}x${height}.`));
        return;
      }

      // Check minimum dimensions for facilities
      if (width < 800 || height < 600) {
        reject(new Error(`Image resolution too low for facility. Minimum 800x600 required. Your image is ${width}x${height}.`));
        return;
      }

      // If validation passes, resolve with the original file
      resolve(file);
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
  });
};

const addFacilityImages = async (facilityId, images) => {
  const formData = new FormData();
  formData.append("facilityId", facilityId);
  
  images.forEach((file, index) => {
    formData.append(`formFiles`, file);
  });

  try {
    const response = await fetch(`${API_URL}/api/Facility/facility-images`, {
      method: "POST",
      body: formData,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });

    if (!response.ok) {
      // Try to parse error message, fall back to status text if parsing fails
      let errorMessage = response.statusText;
      try {
        const errorData = await response.text();
        errorMessage = errorData || response.statusText;
      } catch (e) {
        console.error("Failed to parse error response:", e);
      }
      throw new Error(errorMessage);
    }
    
    // Try to parse JSON only if response is OK
    try {
      return await response.json();
    } catch (e) {
      // If no JSON body, return success message
      return { message: "Images uploaded successfully" };
    }
  } catch (error) {
    console.error("Error uploading images:", error);
    throw error;
  }
};

const AddFacilityForm = () => {
  const [form, setForm] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [sports, setSports] = useState([]);
  const [loadingSports, setLoadingSports] = useState(true);
  const [images, setImages] = useState([]);
  const [imageErrors, setImageErrors] = useState([]);

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

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const errors = [];
    const validFiles = [];

    // Clear previous errors
    setImageErrors([]);
    
    // Check total number of images (max 15)
    if (files.length > 15) {
      setImageErrors([`You can upload maximum 15 images. Selected ${files.length}. Only first 15 will be processed.`]);
    }

    // Process files
    for (const file of files.slice(0, 15)) {
      try {
        const validatedFile = await validateImage(file);
        validFiles.push(validatedFile);
      } catch (error) {
        errors.push(`${file.name}: ${error.message}`);
      }
    }

    if (errors.length > 0) {
      setImageErrors(errors);
    }

    setImages(validFiles);
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
    };

    const createdFacility = await addFacility(facilityData);

    if (createdFacility?.id && images.length > 0) {
      try {
        await addFacilityImages(createdFacility.id, images);
      } catch (uploadError) {
        // If image upload fails but facility was created, show partial success
        setSuccess(true);
        setError(`Facility created but images failed to upload: ${uploadError.message}`);
        return;
      }
    }

    setSuccess(true);
    setForm(initialFormState);
    setImages([]);
    setImageErrors([]);
  } catch (err) {
    setError(err.message || "Failed to add facility");
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

            <div className="mb-3">
              <label className="form-label">Upload Facility Images (Max 15, Min 800x600px, Max 2000x2000px)</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
              {imageErrors.length > 0 && (
                <div className="alert alert-warning mt-2">
                  <ul className="mb-0">
                    {imageErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
              {images.length > 0 && (
                <div className="mt-2">
                  <small className="text-muted">
                    {images.length} valid image(s) selected
                  </small>
                </div>
              )}
            </div>

            <div className="row mb-3">
              <div className="col">
                <label className="form-label">Price per Month</label>
                <input type="number" name="pricePerMonth" className="form-control" value={form.pricePerMonth} onChange={handleChange} />
              </div>
              <div className="col">
                <label className="form-label">Offer Duration (months)</label>
                <input type="number" name="offerDurationInMonths" className="form-control" onChange={handleChange} />
              </div>
              <div className="col">
                <label className="form-label">Offer Price</label>
                <input type="number" name="offerPrice" className="form-control" onChange={handleChange} />
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