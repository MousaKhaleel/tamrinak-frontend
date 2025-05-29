const API_URL = process.env.API_URL || "https://localhost:7160";

async function parseResponse(response) {
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return text;
  }
}

// Get all facilities
export const fetchFacilities = async () => {
  try {
    const response = await fetch(`${API_URL}/api/Facility/facilities`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
    });

    const data = await parseResponse(response);
    if (!response.ok) {
      throw new Error(data.message || `Failed to fetch facilities: ${response.status} ${response.statusText}`);
    }
    return data;
  } catch (error) {
    console.error("Error fetching facilities:", error);
    return [];
  }
};

// Get one facility by ID
export const getFacility = async (facilityId) => {
  const response = await fetch(`${API_URL}/api/Facility/facility/${facilityId}`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
  });
  const data = await parseResponse(response);
  if (!response.ok) throw new Error(data.message || "Failed to fetch facility");
  return data;
};

// Add a new facility
export const addFacility = async (facilityData) => {
  const response = await fetch(`${API_URL}/api/Facility/facility`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(facilityData),
  });
  const data = await parseResponse(response);
  if (!response.ok) throw new Error(data.message || "Failed to add facility");
  return data;
};

// Update an existing facility
export const updateFacility = async (facilityData) => {
  const response = await fetch(`${API_URL}/api/Facility/facility`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(facilityData),
  });
  const data = await parseResponse(response);
  if (!response.ok) throw new Error(data.message || "Failed to update facility");
  return data;
};

// Remove a facility
export const removeFacility = async (facilityId) => {
  const response = await fetch(`${API_URL}/api/Facility/facility?facilityId=${facilityId}`, { // Changed 'id' to 'facilityId'
    method: "DELETE",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
  });
  const data = await parseResponse(response);
  if (!response.ok) throw new Error(data.message || "Failed to remove facility");
  return data;
};

// Add multiple facility images
export const addFacilityImages = async (facilityId, images) => {
  const formData = new FormData();
  formData.append("facilityId", facilityId.toString());
  
  images.forEach((file) => {
    formData.append(`formFiles`, file);
  });

  const response = await fetch(`${API_URL}/api/Facility/facility-images`, {
    method: "POST",
    body: formData,
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  });

  const data = await parseResponse(response);
  if (!response.ok) throw new Error(data.message || "Failed to upload images");
  return data;
};

// Delete facility image
export const deleteFacilityImage = async (imageId) => {
  const response = await fetch(`${API_URL}/api/Facility/facility-image?id=${imageId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  });
  const data = await parseResponse(response);
  if (!response.ok) throw new Error(data.message || "Failed to delete image");
  return data;
};

// Get a facility photo (blob expected)
export const getFacilityPhoto = async (photoId) => {
  const response = await fetch(`${API_URL}/api/Facility/facility-photo?id=${photoId}`, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  });
  if (!response.ok) {
    // Try text/json error parsing
    const errorText = await response.text();
    throw new Error(errorText || "Failed to get facility photo");
  }
  return await response.blob();
};

// Get a "renamed" (rendered) facility photo (blob expected)
export const getRenFacilityPhoto = async (photoId) => {
  const response = await fetch(`${API_URL}/api/Facility/ren-facility-photo?id=${photoId}`, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to get rendered facility photo");
  }
  return await response.blob();
};

// Get list of all facility photos
export const getFacilityPhotoList = async (facilityId) => {
  const response = await fetch(`${API_URL}/api/Facility/facility-photo-list?id=${facilityId}`, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  });
  const data = await parseResponse(response);
  if (!response.ok) throw new Error(data.message || "Failed to get photo list");
  return data;
};

// Get facilities by sport ID
export const getFacilitiesBySport = async (sportId) => {
  try {
    const response = await fetch(`${API_URL}/api/Facility/by-sport/${sportId}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    const data = await parseResponse(response);
    if (!response.ok) throw new Error(data.message || "Failed to fetch by sport");
    return data;
  } catch (error) {
    console.error(`Error fetching facilities for sport ${sportId}:`, error);
    return [];
  }
};
