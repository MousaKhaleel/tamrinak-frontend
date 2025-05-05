const API_URL = process.env.API_URL || "https://localhost:7160";

export const fetchSports = async () => {
  try {
    const response = await fetch(`${API_URL}/api/Sport/get-all-sports`);
    if (!response.ok) {
      throw new Error("Failed to fetch sports");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching sports:", error);
    return [];
  }
};

//TODO: add sport admin, update sport, delete sport
// Get single sport by ID (assuming ID is passed as query param like ?id=123)
export const getSport = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/Sport/get-sport?id=${id}`);
    if (!response.ok) throw new Error("Failed to fetch sport");
    return await response.json();
  } catch (error) {
    console.error("Error fetching sport:", error);
    return null;
  }
};

// Add a new sport
export const addSport = async (sportData) => {
  try {
    const response = await fetch(`${API_URL}/api/Sport/add-sport`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sportData),
    });
    if (!response.ok) throw new Error("Failed to add sport");
    return await response.json();
  } catch (error) {
    console.error("Error adding sport:", error);
    return null;
  }
};

// Update an existing sport
export const updateSport = async (sportData) => {
  try {
    const response = await fetch(`${API_URL}/api/Sport/update-sport`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sportData),
    });
    if (!response.ok) throw new Error("Failed to update sport");
    return await response.json();
  } catch (error) {
    console.error("Error updating sport:", error);
    return null;
  }
};

// Delete a sport by ID (assuming ID is passed as query param like ?id=123)
export const deleteSport = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/Sport/remove-sport?id=${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete sport");
    return true;
  } catch (error) {
    console.error("Error deleting sport:", error);
    return false;
  }
};

// Update sport image (FormData, typically includes image file)
export const updateSportImage = async (id, formData) => {
  try {
    const response = await fetch(`${API_URL}/api/Sport/update-sport-image/${id}`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to update sport image");
    return await response.json();
  } catch (error) {
    console.error("Error updating sport image:", error);
    return null;
  }
};