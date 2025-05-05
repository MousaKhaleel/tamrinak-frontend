import React, { useEffect, useState } from "react";
import { fetchFacilities } from "../../Services/facilityService";
import FacilityCard from "../Facility/FacilityCard";
import NavigationBar from "../NavigationBar/NavigationBar";
import Footer from "../Footer/Footer";

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

  return ( 
    <div>
        {/* <NavigationBar /> */}
        <FacilityCard facilities={facilities} />
        {/* <Footer /> */}
    </div>
 );
};

export default FacilitiesPage;
