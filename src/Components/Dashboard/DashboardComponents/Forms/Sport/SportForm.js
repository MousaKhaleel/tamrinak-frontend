import React, { useState, useEffect } from 'react';

const SportForm = ({ initialData = { Name: '', Description: '' }, onSubmit, submitLabel = 'Add Sport', requireImage = true }) => {
  const [formFile, setFormFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [sportData, setSportData] = useState(() => ({
  Name: initialData.Name || '',
  Description: initialData.Description || '',
}));

useEffect(() => {
  if (initialData && Object.keys(initialData).length > 0) {
    setSportData({
      Name: initialData.Name || '',
      Description: initialData.Description || '',
    });
  }
  // Only clear file input when initialData changes, maybe?
  setFormFile(null);
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSportData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormFile(e.target.files[0]);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!sportData.Name) {
      newErrors.Name = 'Name is required';
    } else if (sportData.Name.length > 25) {
      newErrors.Name = 'Name cannot be longer than 25 characters';
    }

    if (sportData.Description && sportData.Description.length > 100) {
      newErrors.Description = 'Description cannot be longer than 100 characters';
    }

    if (requireImage && !formFile) {
      newErrors.formFile = 'Image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await onSubmit({ ...sportData, formFile });
      // Optionally reset form on add
      if (submitLabel.toLowerCase().includes('add')) {
        setSportData({ Name: '', Description: '' });
        setFormFile(null);
        if (document.getElementById('formFile')) {
          document.getElementById('formFile').value = null;
        }
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">{submitLabel}</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">Name</label>
              <input
                type="text"
                id="Name"
                name="Name"
                className={`form-control ${errors.Name ? 'is-invalid' : ''}`}
                value={sportData.Name}
                onChange={handleChange}
                placeholder="Enter sport name"
              />
              {errors.Name && <div className="invalid-feedback">{errors.Name}</div>}
            </div>

            {/* Description Input */}
            <div className="mb-3">
              <label htmlFor="Description" className="form-label">Description</label>
              <textarea
                id="Description"
                name="Description"
                className={`form-control ${errors.Description ? 'is-invalid' : ''}`}
                value={sportData.Description}
                onChange={handleChange}
                placeholder="Optional description"
              ></textarea>
              {errors.Description && <div className="invalid-feedback">{errors.Description}</div>}
            </div>

            {/* Image Input */}
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">Sport Image {requireImage ? '' : '(Optional)'}</label>
              <input
                type="file"
                id="formFile"
                name="formFile"
                accept="image/*"
                className={`form-control ${errors.formFile ? 'is-invalid' : ''}`}
                onChange={handleFileChange}
              />
              {errors.formFile && <div className="invalid-feedback">{errors.formFile}</div>}
            </div>

            <button type="submit" className="btn btn-success w-100">{submitLabel}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SportForm;
