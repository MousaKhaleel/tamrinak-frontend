const API_URL = process.env.API_URL || "https://localhost:7160";

const parseResponse = async (response) => {
  const contentType = response.headers.get("Content-Type") || "";
  if (contentType.includes("application/json")) {
    return await response.json();
  } else {
    return await response.text();
  }
};

// Get all sports
export const fetchSports = async () => {
  try {
    const response = await fetch(`${API_URL}/api/Sport/all-sports`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });

    if (!response.ok) throw new Error(await parseResponse(response));
    return await parseResponse(response);
  } catch (error) {
    console.error("Error fetching sports:", error);
    return [];
  }
};

// Get single sport by ID
export const getSport = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/Sport/sport/${id}`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) throw new Error(await parseResponse(response));
    return await parseResponse(response);
  } catch (error) {
    console.error("Error fetching sport:", error.message);
    throw error;
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

    if (!response.ok) throw new Error(await parseResponse(response));
    return await parseResponse(response);
  } catch (error) {
    console.error("Error adding sport:", error);
    return null;
  }
};

// Update an existing sport
export const updateSport = async (id, sportData) => {
  try {
    const response = await fetch(`${API_URL}/api/Sport/sport?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(sportData),
    });

    if (!response.ok) throw new Error(await parseResponse(response));
    return await parseResponse(response);
  } catch (error) {
    console.error("Error updating sport:", error);
    return null;
  }
};

// Delete a sport
export const deleteSport = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/Sport/sport?id=${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });

    if (!response.ok) throw new Error(await parseResponse(response));
    return true;
  } catch (error) {
    console.error("Error deleting sport:", error);
    return false;
  }
};

// Update sport image
export const updateSportImage = async (id, formData) => {
  try {
    const response = await fetch(`${API_URL}/api/Sport/sport-image/${id}`, {
      method: "POST",
      body: formData,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });

    if (!response.ok) throw new Error(await parseResponse(response));
    return await parseResponse(response);
  } catch (error) {
    console.error("Error updating sport image:", error);
    return null;
  }
};
