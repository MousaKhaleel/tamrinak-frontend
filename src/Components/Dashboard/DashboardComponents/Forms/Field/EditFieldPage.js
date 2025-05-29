import { updateField, getField } from "../../../../../Services/fieldService";
import FieldForm from "./FieldForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditFieldPage = () => {
  const { id } = useParams();
  const [fieldData, setFieldData] = useState(null);

  useEffect(() => {
    const loadField = async () => {
      const data = await getField(id);
      setFieldData(data);
    };
    loadField();
  }, [id]);

  const handleUpdate = async (data) => {
    return await updateField(id, data);
  };

  return fieldData ? (
    <FieldForm initialData={fieldData} onSubmit={handleUpdate} mode="edit" submitLabel="تحديث بيانات الملعب" />
  ) : (
    <div>جاري التحميل...</div>
  );
};
export default EditFieldPage;
