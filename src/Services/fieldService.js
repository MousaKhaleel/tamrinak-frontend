const API_URL = process.env.API_URL || "https://localhost:7160";

const getHeaders = (isJson = true) => {
  const headers = {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  };
  if (isJson) headers["Content-Type"] = "application/json";
  return headers;
};

const parseResponse = async (response) => {
  const contentType = response.headers.get("content-type");
  if (!response.ok) throw new Error(await response.text());
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  } else {
    return await response.text();
  }
};

// Get rendered field photo blob
export const getFieldPhotoBlob = async (photoId) => {
  const response = await fetch(`${API_URL}/api/Field/ren-field-photo?id=${photoId}`, {
    headers: getHeaders()
  });
  if (!response.ok) throw new Error("Failed to get rendered field photo");
  return await response.blob();
};

// Get all fields
export const fetchFields = async () => {
  try {
    const response = await fetch(`${API_URL}/api/Field/all-fields`, {
      headers: getHeaders(false)
    });
    return await parseResponse(response);
  } catch (error) {
    console.error("Error fetching fields:", error);
    return [];
  }
};

// Get a specific field by ID
export const getField = async (fieldId) => {
  const response = await fetch(`${API_URL}/api/Field/field/${fieldId}`, {
    headers: getHeaders(false)
  });
  return await parseResponse(response);
};

// Add a new field
export const addField = async (fieldData) => {
  const response = await fetch(`${API_URL}/api/Field/field`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(fieldData),
  });
  return await parseResponse(response);
};

// Update an existing field
export const updateField = async (id, fieldData) => {
  const response = await fetch(`${API_URL}/api/Field/field?id=${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(fieldData),
  });
  const data = await parseResponse(response);
  if (!response.ok) {
    throw new Error(data.message || "Failed to update field");
  }
  return data;
};

// Remove a field
export const removeField = async (fieldId) => {
  // Pass fieldId directly in the URL path
  const response = await fetch(`${API_URL}/api/Field/field/?fieldId=${fieldId}`, { 
    method: "DELETE",
    headers: getHeaders(false)
  });
  return await parseResponse(response);
};

// Delete field image
export const deleteFieldImage = async (imageId) => {
  const response = await fetch(`${API_URL}/api/Field/field-image?id=${imageId}`, {
    method: "DELETE",
    headers: getHeaders(false)
  });
  return await parseResponse(response);
};

// Get field photo by ID
export const getFieldPhoto = async (photoId) => {
  const response = await fetch(`${API_URL}/api/Field/field-photo?id=${photoId}`, {
    headers: getHeaders(false)
  });
  if (!response.ok) throw new Error("Failed to get field photo");
  return await response.blob();
};

// Get renamed field photo
export const getRenFieldPhoto = async (photoId) => {
  const response = await fetch(`${API_URL}/api/Field/ren-field-photo?id=${photoId}`, {
    headers: getHeaders(false)
  });
  if (!response.ok) throw new Error("Failed to get rendered field photo");
  return await response.blob();
};

// Get list of field photos
export const getFieldPhotoList = async (fieldId) => {
  const response = await fetch(`${API_URL}/api/Field/field-photo-list?fieldId=${fieldId}`, {
    headers: getHeaders(false)
  });
  return await parseResponse(response);
};

// Get fields by sport ID
export const getFieldsBySport = async (sportId) => {
  try {
    const response = await fetch(`${API_URL}/api/Field/by-sport/${sportId}`, {
      headers: getHeaders(false)
    });
    return await parseResponse(response);
  } catch (error) {
    console.error(`Error fetching fields for sport ${sportId}:`, error);
    return [];
  }
};

// Get sport images by sport ID
export const getSportImages = async (sportId) => {
  const response = await fetch(`${API_URL}/api/Field/sport-images/${sportId}`, {
    headers: getHeaders(false)
  });
  return await parseResponse(response);
};
