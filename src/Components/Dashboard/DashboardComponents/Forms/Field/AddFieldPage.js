import { addField } from "../../../../../Services/fieldService";
import FieldForm from "./FieldForm";

const AddFieldPage = () => {
  const handleAdd = async (data) => {
    return await addField(data); // returns field with id
  };

  return <FieldForm onSubmit={handleAdd} submitLabel="إضافة ملعب جديد" />;
};
export default AddFieldPage;
