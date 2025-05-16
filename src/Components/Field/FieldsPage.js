import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getFieldsBySport } from "../../Services/fieldService";
import FieldCard from "./FieldCard";

const FieldsPage = () => {
  const [searchParams] = useSearchParams();
  const sportId = searchParams.get("sportId");
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFields = async () => {
      if (sportId) {
        const data = await getFieldsBySport(sportId);
        setFields(data);
        setLoading(false);
      }
    };

    fetchFields();
  }, [sportId]);

  if (loading) {
    return <div className="text-center">جار التحميل...</div>;
  }

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">الملاعب المرتبطة بالرياضة</h1>
      <div className="row g-4">
      {fields.length > 0 ? (
  fields.map((field) => <FieldCard key={field.id} field={field} />)
) : (
  <div className="text-center w-100">لا توجد ملاعب متاحة لهذه الرياضة</div>
)}
      </div>
    </div>
  );
}

export default FieldsPage;
