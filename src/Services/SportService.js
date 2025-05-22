const API_URL = process.env.API_URL || "https://localhost:7160";

export const fetchSports = async () => {
  try {
    const response = await fetch(`${API_URL}/api/Sport/all-sports`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
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
    const response = await fetch(`${API_URL}/api/Sport/sport/${id}`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching sport:", error.message);
    throw error; // Re-throw to let the caller handle it
  }
};

// Add a new sport
export const addSport = async (sportData) => {
  try {
    const formData = new FormData();
    formData.append("Name", sportData.Name);
    formData.append("Description", sportData.Description);
    formData.append("formFile", sportData.formFile);

    const response = await fetch(`${API_URL}/api/Sport/sport`, {
      method: "POST",
      body: formData,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
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
    const response = await fetch(`${API_URL}/api/Sport/sport`, {
      method: "PUT",
      headers: { "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
     },
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
    const response = await fetch(`${API_URL}/api/Sport/sport?id=${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
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
    const response = await fetch(`${API_URL}/api/Sport/sport-image/${id}`, {
      method: "POST",
      body: formData,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    if (!response.ok) throw new Error("Failed to update sport image");
    return await response.json();
  } catch (error) {
    console.error("Error updating sport image:", error);
    return null;
  }
};