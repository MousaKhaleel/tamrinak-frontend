import React from "react";
import FacilityForm from "./FacilityForm";
import { addFacility } from "../../../../../Services/facilityService";

const AddFacilityPage = () => {
  const initialData = {
    name: "",
    locationDesc: "",
    type: "0",
    sportIds: [],
  openTime: "09:00",
  closeTime: "17:00",
    locationMap: "",
    phoneNumber: "",
    description: "",
    pricePerMonth: "",
    isAvailable: true,
  };

  const handleAdd = async (data) => {
    return await addFacility(data);
  };

  return <FacilityForm initialData={initialData} onSubmit={handleAdd} mode="add" />;
};

export default AddFacilityPage;
