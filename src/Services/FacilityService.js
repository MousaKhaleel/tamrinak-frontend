const API_URL = process.env.API_URL || "https://localhost:7160";

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

    if (!response.ok) {
      throw new Error(`Failed to fetch facilities: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching facilities:", error);
    return [];
  }
};

// Get one facility by ID (assumed ID is sent via query or body — update if needed)
export const getFacility = async (facilityId) => {
  const response = await fetch(`${API_URL}/api/Facility/facility/${facilityId}`);
  if (!response.ok) throw new Error("Failed to fetch facility");
  return await response.json();
};

// Add a new facility
export const addFacility = async (facilityData) => {
  const response = await fetch(`${API_URL}/api/Facility/facility`, {
    method: "POST",
    headers: { "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
     },
    body: JSON.stringify(facilityData),
  });
  if (!response.ok) throw new Error("Failed to add facility");
  return await response.json();
};

// Update an existing facility
export const updateFacility = async (facilityData) => {
  const response = await fetch(`${API_URL}/api/Facility/facility`, {
    method: "PUT",
    headers: { "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
     },
    body: JSON.stringify(facilityData),
  });
  if (!response.ok) throw new Error("Failed to update facility");
  return await response.json();
};

// Remove a facility
export const removeFacility = async (facilityId) => {
  const response = await fetch(`${API_URL}/api/Facility/facility?id=${facilityId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
     },
  });
  if (!response.ok) throw new Error("Failed to remove facility");
};

// Add multiple facility images
const addFacilityImages = async (facilityId, images) => {
  const formData = new FormData();
  formData.append("facilityId", facilityId.toString());
  
  images.forEach((file, index) => {
    formData.append(`formFiles`, file);
  });

  try {
    const response = await fetch(`${API_URL}/api/Facility/facility-images`, {
      method: "POST",
      body: formData,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });

    const text = await response.text();
    try {
      // Try to parse as JSON
      const data = text ? JSON.parse(text) : {};
      if (!response.ok) {
        throw new Error(data.message || "Failed to upload images");
      }
      return data;
    } catch (e) {
      // If not JSON, use the text as error message
      if (!response.ok) {
        throw new Error(text || "Failed to upload images");
      }
      return text;
    }
  } catch (error) {
    console.error("Error uploading images:", error);
    throw error;
  }
};



// Delete facility image
export const deleteFacilityImage = async (imageId) => {
  const response = await fetch(`${API_URL}/api/Facility/facility-image?id=${imageId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  });
  if (!response.ok) throw new Error("Failed to delete image");
};

// Get a facility photo
export const getFacilityPhoto = async (photoId) => {
  const response = await fetch(`${API_URL}/api/Facility/facility-photo?id=${photoId}`, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  });
  if (!response.ok) throw new Error("Failed to get facility photo");
  return await response.blob(); // Use blob() if you're loading an image
};

// Get a "renamed" (or rendered?) facility photo
export const getRenFacilityPhoto = async (photoId) => {
  const response = await fetch(`${API_URL}/api/Facility/ren-facility-photo?id=${photoId}`, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  });
  if (!response.ok) throw new Error("Failed to get rendered facility photo");
  return await response.blob();
};

// Get list of all facility photos
export const getFacilityPhotoList = async (facilityId) => {
  const response = await fetch(`${API_URL}/api/Facility/facility-photo-list?id=${facilityId}`, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  });
  if (!response.ok) throw new Error("Failed to get photo list");
  return await response.json();
};

// Get facilities by sport ID
export const getFacilitiesBySport = async (sportId) => {
    try {
  const response = await fetch(`${API_URL}/api/Facility/by-sport/${sportId}`, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  });
  if (!response.ok) throw new Error("Failed to fetch by sport");
  return await response.json();
  } catch (error) {
    console.error(`Error fetching facilities for sport ${sportId}:`, error);
    return []; // Returning empty array as per your original implementation
  }
};
