const API_URL = process.env.API_URL;//TODO

export const fetchSports = async () => {
  try {
    const response = await fetch("https://localhost:7160/api/Sport/get-all-sports");
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