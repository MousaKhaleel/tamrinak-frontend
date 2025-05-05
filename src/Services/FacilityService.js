const API_URL = process.env.API_URL || "https://localhost:7160";

// Get all facilities
export const fetchFacilities = async () => {
  try {
    const response = await fetch(`${API_URL}/api/Facility/get-facilities`);
    if (!response.ok) throw new Error("Failed to fetch facilities");
    return await response.json();
  } catch (error) {
    console.error("Error fetching facilities:", error);
    return [];
  }
};

// Get one facility by ID (assumed ID is sent via query or body — update if needed)
export const getFacility = async (facilityId) => {
  const response = await fetch(`${API_URL}/api/Facility/get-facility?id=${facilityId}`);
  if (!response.ok) throw new Error("Failed to fetch facility");
  return await response.json();
};

// Add a new facility
export const addFacility = async (facilityData) => {
  const response = await fetch(`${API_URL}/api/Facility/add-facility`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(facilityData),
  });
  if (!response.ok) throw new Error("Failed to add facility");
  return await response.json();
};

// Update an existing facility
export const updateFacility = async (facilityData) => {
  const response = await fetch(`${API_URL}/api/Facility/update-facility`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(facilityData),
  });
  if (!response.ok) throw new Error("Failed to update facility");
  return await response.json();
};

// Remove a facility
export const removeFacility = async (facilityId) => {
  const response = await fetch(`${API_URL}/api/Facility/remove-facility?id=${facilityId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to remove facility");
};

// Add facility image
export const addFacilityImage = async (formData) => {
  const response = await fetch(`${API_URL}/api/Facility/add-facility-image`, {
    method: "POST",
    body: formData, // multipart/form-data
  });
  if (!response.ok) throw new Error("Failed to upload image");
  return await response.json();
};

// Delete facility image
export const deleteFacilityImage = async (imageId) => {
  const response = await fetch(`${API_URL}/api/Facility/delete-facility-image?id=${imageId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete image");
};

// Get a facility photo
export const getFacilityPhoto = async (photoId) => {
  const response = await fetch(`${API_URL}/api/Facility/get-facility-photo?id=${photoId}`);
  if (!response.ok) throw new Error("Failed to get facility photo");
  return await response.blob(); // Use blob() if you're loading an image
};

// Get a "renamed" (or rendered?) facility photo
export const getRenFacilityPhoto = async (photoId) => {
  const response = await fetch(`${API_URL}/api/Facility/get-ren-facility-photo?id=${photoId}`);
  if (!response.ok) throw new Error("Failed to get rendered facility photo");
  return await response.blob();
};

// Get list of all facility photos
export const getFacilityPhotoList = async (facilityId) => {
  const response = await fetch(`${API_URL}/api/Facility/get-facility-photo-list?id=${facilityId}`);
  if (!response.ok) throw new Error("Failed to get photo list");
  return await response.json();
};

// Get facilities by sport ID
export const getFacilitiesBySport = async (sportId) => {
  const response = await fetch(`${API_URL}/api/Facility/by-sport/${sportId}`);
  if (!response.ok) throw new Error("Failed to fetch by sport");
  return await response.json();
};
