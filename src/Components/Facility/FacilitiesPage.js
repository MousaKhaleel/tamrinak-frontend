import React, { useEffect, useState } from "react";
import { fetchFacilities } from "../../Services/FacilityService";
import FacilitiesGrid from "../Facility/FacilitiesGrid";

const FacilitiesPage = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFacilities = async () => {
      const data = await fetchFacilities();
      setFacilities(data);
      setLoading(false);
    };

    getFacilities();
  }, []);

  if (loading) {
    return <div className="text-center">جار التحميل...</div>;
  }

  return <FacilitiesGrid facilities={facilities} />;
};

export default FacilitiesPage;
