export const fetchFieldsBySportId = async (sportId) => {
    try {
      const response = await fetch(`https://localhost:7160/api/Field/by-sport/${sportId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch fields");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching fields for sport ${sportId}:`, error);
      return [];
    }
  };
  