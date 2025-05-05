import { useEffect, useState } from "react";
import userService from "../../Services/userService";

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await userService.getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to load profile", error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Roles:</strong> {profile.roles.join(", ")}</p>
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
