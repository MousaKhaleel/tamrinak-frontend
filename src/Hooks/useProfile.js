import { useAuth } from '../Context/AuthContext';
const API_URL = process.env.API_URL || "https://localhost:7160";


const useProfile = () => {
  const { user } = useAuth();
  const token = user?.token;

  const getProfile = async () => {
    if (!token) {
      throw new Error('No token found');
    }

    return await fetch(`${API_URL}/api/User/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json());
  };

  return getProfile;
};

export default useProfile;
