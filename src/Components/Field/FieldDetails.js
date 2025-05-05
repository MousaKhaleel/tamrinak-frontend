import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getField } from "../../Services/fieldService"; // Assuming this is where your API functions are
import { bookField } from "../../Services/bookingService"; // Importing the bookField function

function FieldDetails() {
  const { fieldId } = useParams(); // Get the field ID from the URL
  const navigate = useNavigate();
  const [field, setField] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingData, setBookingData] = useState({
    userId: 1, // Replace with actual logged-in user ID
    fieldId,
    bookingDate: "",
    startTime: "",
    endTime: "",
    numberOfPeople: 1,
  });
  const [bookingError, setBookingError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(null);

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

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingError(null);
    setBookingSuccess(null);

    try {
      const result = await bookField(bookingData);
      setBookingSuccess("Booking successful!");
      setBookingData({
        ...bookingData,
        bookingDate: "",
        startTime: "",
        endTime: "",
        numberOfPeople: 1,
      });
    } catch (error) {
      setBookingError(error.message || "Booking failed");
    }
  };

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
      
      {/* Booking Form */}
      <h2>Book this field</h2>
      {bookingError && <div style={{ color: "red" }}>{bookingError}</div>}
      {bookingSuccess && <div style={{ color: "green" }}>{bookingSuccess}</div>}
      <form onSubmit={handleBookingSubmit}>
        {/* Booking Date */}
        <div>
          <label htmlFor="bookingDate">Date:</label>
          <input
            type="date"
            id="bookingDate"
            name="bookingDate"
            value={bookingData.bookingDate}
            onChange={handleBookingChange}
            required
          />
        </div>

        {/* Start Time */}
        <div>
          <label htmlFor="startTime">Start Time:</label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={bookingData.startTime}
            onChange={handleBookingChange}
            required
          />
        </div>

        {/* End Time */}
        <div>
          <label htmlFor="endTime">End Time:</label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={bookingData.endTime}
            onChange={handleBookingChange}
            required
          />
        </div>

        {/* Number of People */}
        <div>
          <label htmlFor="numberOfPeople">Number of People:</label>
          <input
            type="number"
            id="numberOfPeople"
            name="numberOfPeople"
            min="1"
            max="25"
            value={bookingData.numberOfPeople}
            onChange={handleBookingChange}
            required
          />
        </div>

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
}

export default FieldDetails;
