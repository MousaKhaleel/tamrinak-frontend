import React from 'react';
import SportForm from './SportForm';
import { addSport } from '../../../../../Services/SportService';
import { toast } from 'react-toastify';

const AddSportPage = () => {
  const handleAdd = async (data) => {
    const response = await addSport(data);
    if (response) {
      toast.success('Sport added successfully!');
    } else {
      toast.error('Failed to add sport');
    }
  };

  return <SportForm onSubmit={handleAdd} isEdit={false} />;
};

export default AddSportPage;
