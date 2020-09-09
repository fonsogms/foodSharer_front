import React, { useEffect, useState } from "react";
import axios from "axios";
import { ProfileData } from "./ProfileData.interface";
import Address from "../Food/Address";

const ProfileEdit = (props) => {
  const [editableProfileData, setEditableProfileData] = useState<ProfileData>(
    props.profileData
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableProfileData({ ...editableProfileData, [name]: value });
  };

  const handleEdit = async () => {
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_DOMAIN + "/api/profile",
        editableProfileData,
        {
          headers: {
            Authorization: "Bearer " + props.token,
          },
        }
      );
      props.setProfileData({ ...props.profileData, ...data });
      props.setEdit(false);
    } catch (error) {}
  };
  return (
    <div>
      <h2>Change your contact details</h2>
      {Object.keys(editableProfileData).map((elem) => {
        if (elem == "username") {
          return null;
        }
        if (elem == "address") {
          return (
            <Address
              target={editableProfileData}
              setTarget={setEditableProfileData}
            ></Address>
          );
        }
        if (typeof editableProfileData[elem] === "string") {
          return (
            <div>
              <div>
                <h3>{elem}</h3>
                <input
                  type="text"
                  name={elem}
                  onChange={(e) => handleChange(e)}
                  value={editableProfileData[elem]}
                />
              </div>
            </div>
          );
        }
      })}
      <div>
        <button onClick={handleEdit}>Save edit</button>
        <button
          onClick={() => {
            props.setEdit(false);
          }}
        >
          Discard changes
        </button>
      </div>
    </div>
  );
};
export default ProfileEdit;
