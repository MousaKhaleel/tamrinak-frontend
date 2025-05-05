import { useEffect, useState } from "react";
import useProfile from "../../Hooks/useProfile";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null); // For handling errors

  const getProfile = useProfile();

  useEffect(() => {
    getProfile()
      .then(profileData => {
        setProfile(profileData); // Set the fetched profile data
      })
      .catch(err => {
        setError(err.message); // Capture and display errors
        console.error(err);
      });
  }, [getProfile]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Roles:</strong> {profile.roles?.join(", ")}</p>
      {/* Show image if available */}
      {profile.profileImageUrl ? (
        <img src={profile.profileImageUrl} alt="Profile" width="100" />
      ) : (
        <p>No profile image</p>
      )}
    </div>
  );
}

export default Profile;
