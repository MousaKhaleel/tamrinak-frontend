const API_URL = process.env.API_URL || "https://localhost:7160";

// Get rendered field photo blob
export const getFieldPhotoBlob = async (photoId) => {
  const response = await fetch(`${API_URL}/api/Field/ren-field-photo?id=${photoId}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  });
  if (!response.ok) throw new Error("Failed to get rendered field photo");
  return await response.blob();
};


// Get all fields
export const fetchFields = async () => {
  try {
    const response = await fetch(`${API_URL}/api/Field/all-fields`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
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
  const response = await fetch(`${API_URL}/api/Field/field/${fieldId}`, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  });
  if (!response.ok) throw new Error("Failed to fetch field");
  return await response.json();
};

// Add a new field
export const addField = async (fieldData) => {
  const response = await fetch(`${API_URL}/api/Field/field`, {
    method: "POST",
    headers: { "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
     },
    body: JSON.stringify(fieldData),
  });
  if (!response.ok) throw new Error("Failed to add field");

  // Assuming the backend returns the newly added field (with its id)
  return await response.json(); // This should return the field object that includes the `id`
};

// Update an existing field
export const updateField = async (fieldData) => {
  const response = await fetch(`${API_URL}/api/Field/field`, {
    method: "PUT",
    headers: { "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
     },
    body: JSON.stringify(fieldData),
  });
  if (!response.ok) throw new Error("Failed to update field");
  return await response.json();
};

// Remove a field
export const removeField = async (fieldId) => {
  const response = await fetch(`${API_URL}/api/Field/field?id=${fieldId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
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
  const response = await fetch(`${API_URL}/api/Field/field-image?id=${imageId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  });
  if (!response.ok) throw new Error("Failed to delete field image");
};

// Get field photo by ID
export const getFieldPhoto = async (photoId) => {
  const response = await fetch(`${API_URL}/api/Field/field-photo?id=${photoId}`, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  });
  if (!response.ok) throw new Error("Failed to get field photo");
  return await response.blob(); // Returns a photo (blob)
};

// Get renamed field photo
export const getRenFieldPhoto = async (photoId) => {
  const response = await fetch(`${API_URL}/api/Field/ren-field-photo?id=${photoId}`, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  });
  if (!response.ok) throw new Error("Failed to get rendered field photo");
  return await response.blob(); // Returns a photo (blob)
};

// Get list of field photos
export const getFieldPhotoList = async (fieldId) => {
  console.log("Fetching field photo list for field ID:", fieldId);
  const response = await fetch(`${API_URL}/api/Field/field-photo-list?fieldId=${fieldId}`, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  });
  if (!response.ok) throw new Error("Failed to get field photo list");
  // returns [{ id, imageData }]
  return await response.json();
};


// Get fields by sport ID
export const getFieldsBySport = async (sportId) => {
  try {
    const response = await fetch(`${API_URL}/api/Field/by-sport/${sportId}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    if (!response.ok) throw new Error("Failed to fetch fields by sport");
    return await response.json();
  } catch (error) {
    console.error(`Error fetching fields for sport ${sportId}:`, error);
    return [];
  }
};

// Get sport images by sport ID
export const getSportImages = async (sportId) => {
  const response = await fetch(`${API_URL}/api/Field/sport-images/${sportId}`, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  });
  if (!response.ok) throw new Error("Failed to get sport images");
  return await response.json();
};
