const API_URL = process.env.API_URL;

export const fetchFacilities = async () => {
  try {
    const response = await fetch(API_URL);
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
