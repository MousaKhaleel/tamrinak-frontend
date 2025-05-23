// FacilitiesPage.js
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getFacilitiesBySport } from "../../Services/FacilityService";
import FacilityCard from "./FacilityCard"; // You'll need to create this component

const FacilitiesPage = () => {
  const [searchParams] = useSearchParams();
  const sportId = searchParams.get("sportId");
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        setLoading(true);
        setError(null);
        if (sportId) {
          const data = await getFacilitiesBySport(sportId);
          setFacilities(data);
        }
      } catch (err) {
        console.error("Fetch facilities error:", err);
        setError("حدث خطأ أثناء جلب بيانات المنشآت");
        setFacilities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, [sportId]);

  if (loading) {
    return <div className="text-center py-5">جار التحميل...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-danger">{error}</div>;
  }

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">المنشآت</h1>
      <div className="row">
        {facilities.length > 0 ? (
          facilities.map((facility) => (
            <FacilityCard key={facility.id} facility={facility} />
          ))
        ) : (
          <div className="col-12">
            <div className="text-center py-5 bg-light rounded">
              <h4>لا توجد منشآت متاحة لهذه الرياضة</h4>
              <p className="text-muted">يمكنك البحث عن منشآت لرياضات أخرى</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacilitiesPage;