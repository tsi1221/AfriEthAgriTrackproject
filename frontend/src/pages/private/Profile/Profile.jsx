import React, { useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    name: "Tsehaynesh Biruh",
    email: "tsehay@example.com",
    phone: "+251912345678",
    address: "Addis Ababa, Ethiopia",
    publicKey: "0x1234...abcd",
    role: "Farmer",
  });

  const [tempUser, setTempUser] = useState({ ...user });

  const handleChange = (e) => {
    setTempUser({ ...tempUser, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(tempUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempUser(user); // Reset changes
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-card">
        {Object.keys(user).map((key) => (
          <div key={key} className="profile-item">
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
            {isEditing ? (
              <input
                type="text"
                name={key}
                value={tempUser[key]}
                onChange={handleChange}
              />
            ) : (
              <span>{user[key]}</span>
            )}
          </div>
        ))}
      </div>

      <div className="profile-actions">
        {isEditing ? (
          <>
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
