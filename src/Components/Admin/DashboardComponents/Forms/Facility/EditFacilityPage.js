import React, { useEffect, useState } from "react";
import FacilityForm from "./FacilityForm";
import { updateFacility, getFacility } from "../../../../../Services/facilityService";
import { useParams } from "react-router-dom";

const EditFacilityPage = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const facility = await getFacility(id);
      setInitialData({
        ...facility,
        type: facility.type.toString(),
      });
    };
    fetchData();
  }, [id]);

  const handleUpdate = async (data) => {
    return await updateFacility(id, data);
  };

  return initialData ? (
    <FacilityForm initialData={initialData} onSubmit={handleUpdate} mode="edit" />
  ) : (
    <div>Loading...</div>
  );
};

export default EditFacilityPage;
