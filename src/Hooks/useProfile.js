import { useAuth } from '../Context/AuthContext'; // Adjust the path
const API_URL = process.env.API_URL || "https://localhost:7160"; // Adjust the API URL as needed


const useProfile = () => {
  const { user } = useAuth(); // Access user context
  const token = user?.token; // Get the token from context

  const getProfile = async () => {
    if (!token) {
      throw new Error('No token found');
    }

    return await fetch(`${API_URL}/api/User/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Add Authorization header
      }
    })
    .then(res => res.json());
  };

  return getProfile;
};

export default useProfile;
