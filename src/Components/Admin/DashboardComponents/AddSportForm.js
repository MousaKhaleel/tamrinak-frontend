import React, { useState } from 'react';
import { addSport } from '../../../Services/sportService';

const AddSportForm = () => {
  const [sportData, setSportData] = useState({
    Name: '',
    Description: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSportData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const response = await addSport(sportData);
      if (response) {
        alert('Sport added successfully!');
        setSportData({ Name: '', Description: '' }); // Reset form
      } else {
        alert('Failed to add sport');
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Add New Sport</h5>
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

            <button type="submit" className="btn btn-success w-100">Add Sport</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSportForm;
