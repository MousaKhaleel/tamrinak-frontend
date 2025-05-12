import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchFieldsBySportId } from "../../Services/fieldService";
import FieldCard from "./FieldCard";

function FieldsPage() {
  const [searchParams] = useSearchParams();
  const sportId = searchParams.get("sportId");
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFields = async () => {
      const data = await fetchFieldsBySportId(sportId);
      setFields(data);
      setLoading(false);
    };

    if (sportId) {
      getFields();
    } else {
      setLoading(false);
    }
  }, [sportId]);

  if (loading) return <div className="text-center">جارٍ تحميل الملاعب...</div>;

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
