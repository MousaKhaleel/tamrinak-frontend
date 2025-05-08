const API_URL = process.env.API_URL || "https://localhost:7160";

// Get rendered field photo blob
export const getFieldPhotoBlob = async (photoId) => {
  const response = await fetch(`${API_URL}/api/Field/get-ren-field-photo?id=${photoId}`);
  if (!response.ok) throw new Error("Failed to get rendered field photo");
  return await response.blob();
};


// Get all fields
export const fetchFields = async () => {
  try {
    const response = await fetch(`${API_URL}/api/Field/get-fields`);
    if (!response.ok) throw new Error("Failed to fetch fields");
    return await response.json();
  } catch (error) {
    console.error("Error fetching fields:", error);
    return [];
  }
};

// Get a specific field by ID
// Fetch field details
export const getField = async (fieldId) => {
  const response = await fetch(`${API_URL}/api/Field/get-field?id=${fieldId}`);
  if (!response.ok) throw new Error("Failed to fetch field");
  return await response.json();
};

// Add a new field
export const addField = async (fieldData) => {
  const response = await fetch(`${API_URL}/api/Field/add-field`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fieldData),
  });
  if (!response.ok) throw new Error("Failed to add field");

  // Assuming the backend returns the newly added field (with its id)
  return await response.json(); // This should return the field object that includes the `id`
};

// Update an existing field
export const updateField = async (fieldData) => {
  const response = await fetch(`${API_URL}/api/Field/update-field`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fieldData),
  });
  if (!response.ok) throw new Error("Failed to update field");
  return await response.json();
};

// Remove a field
export const removeField = async (fieldId) => {
  const response = await fetch(`${API_URL}/api/Field/remove-field?id=${fieldId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to remove field");
};

// Add field image TODO
// const formDataImages = new FormData();
// images.forEach((image) => {
//   formDataImages.append("formFiles", image); // same key name as backend expects
// });

// await fetch(`${API_URL}/api/Field/add-field-images?fieldId=${field.id}`, {
//   method: "POST",
//   body: formDataImages,
// });

// Delete field image
export const deleteFieldImage = async (imageId) => {
  const response = await fetch(`${API_URL}/api/Field/delete-field-image?id=${imageId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete field image");
};

// Get field photo by ID
export const getFieldPhoto = async (photoId) => {
  const response = await fetch(`${API_URL}/api/Field/get-field-photo?id=${photoId}`);
  if (!response.ok) throw new Error("Failed to get field photo");
  return await response.blob(); // Returns a photo (blob)
};

// Get renamed field photo
export const getRenFieldPhoto = async (photoId) => {
  const response = await fetch(`${API_URL}/api/Field/get-ren-field-photo?id=${photoId}`);
  if (!response.ok) throw new Error("Failed to get rendered field photo");
  return await response.blob(); // Returns a photo (blob)
};

// Get list of field photos
export const getFieldPhotoList = async (fieldId) => {
  const response = await fetch(`${API_URL}/api/Field/get-field-photo-list?fieldId=${fieldId}`);
  if (!response.ok) throw new Error("Failed to get field photo list");
  // returns [{ id, imageData }]
  return await response.json();
};


// Get fields by sport ID
export const fetchFieldsBySportId = async (sportId) => {
  try {
    const response = await fetch(`${API_URL}/api/Field/by-sport/${sportId}`);
    if (!response.ok) throw new Error("Failed to fetch fields by sport");
    return await response.json();
  } catch (error) {
    console.error(`Error fetching fields for sport ${sportId}:`, error);
    return [];
  }
};

// Get sport images by sport ID
export const getSportImages = async (sportId) => {
  const response = await fetch(`${API_URL}/api/Field/get-sport-images/${sportId}`);
  if (!response.ok) throw new Error("Failed to get sport images");
  return await response.json();
};
