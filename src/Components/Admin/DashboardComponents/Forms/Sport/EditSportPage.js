import React, { useEffect, useState } from 'react';
import SportForm from './SportForm';
import { getSport, updateSport } from '../../../../../Services/sportService';
import { toast } from 'react-toastify';

const EditSportPage = ({ sportId }) => {
  const [sportData, setSportData] = useState(null);

  useEffect(() => {
    const fetchSport = async () => {
      const data = await getSport(sportId);
      setSportData(data);
    };
    fetchSport();
  }, [sportId]);

  const handleUpdate = async (data) => {
    const response = await updateSport(sportId, data);
    if (response) {
      toast.success('Sport updated successfully!');
    } else {
      toast.error('Failed to update sport');
    }
  };

  if (!sportData) return <div>Loading...</div>;

  return <SportForm initialData={sportData} onSubmit={handleUpdate} isEdit={true} />;
};

export default EditSportPage;
