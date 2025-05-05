const API_URL = process.env.API_URL;

export const fetchFacilities = async () => {
  try {
    const response = await fetch("https://localhost:7160/api/Field/get-fields");
    if (!response.ok) {
      throw new Error("Failed to fetch facilities");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching facilities:", error);
    return [];
  }
};
