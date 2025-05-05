import React, { useState } from 'react';
import { addSport } from '../../../Services/sportService'; // Adjust the import path as needed

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
      } else {
        alert('Failed to add sport');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="Name">Name</label>
        <input
          type="text"
          id="Name"
          name="Name"
          value={sportData.Name}
          onChange={handleChange}
          required
        />
        {errors.Name && <span style={{ color: 'red' }}>{errors.Name}</span>}
      </div>

      <div>
        <input
          name="name"
          value={sportData.Name}
          onChange={handleChange}
          placeholder="اسم اللعبة"
          required
          className="w-full border p-2 rounded text-right"
        />
        <label htmlFor="Description">Description</label>
        <textarea
          id="Description"
          name="Description"
          value={sportData.Description}
          onChange={handleChange}
        />
        {errors.Description && <span style={{ color: 'red' }}>{errors.Description}</span>}
      </div>

      <button type="submit">Add Sport</button>
    </form>
  );
};

export default AddSportForm;
