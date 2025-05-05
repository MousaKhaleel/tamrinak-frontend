import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getField } from "../../Services/fieldService"; // Assuming this is where your API functions are

function FieldDetails() {
  const { fieldId } = useParams(); // Get the field ID from the URL
  const navigate = useNavigate();
  const [field, setField] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the field details from the API
    const fetchFieldDetails = async () => {
      try {
        const data = await getField(fieldId); // Call the API to get the field data
        setField(data);
      } catch (error) {
        setError("Failed to fetch field details.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (fieldId) {
      fetchFieldDetails();
    } else {
      navigate("/"); // Redirect to home if no fieldId is found
    }
  }, [fieldId, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!field) {
    return <div>No field found.</div>;
  }

  return (
    <div>
      <h1>{field.name}</h1>
      <img
        src={field.imageUrl || "/default-field.jpg"}
        alt={field.name}
        style={{ width: "100%", height: "auto" }}
      />
      <p>{field.locationDesc}</p>
      <p>{field.pricePerHour || "Call for price"}</p>
      {/* Display other field details */}
    </div>
  );
}

export default FieldDetails;
