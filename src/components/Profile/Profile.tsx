import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FoodObject } from "../Food/foodDetails/FoodDetails";
import { ProfileData } from "./ProfileData.interface";
import ShowProfile from "./ShowProfile";
import ProfileEdit from "./ProfileEdit";

const Profile = (props) => {
  const [profileData, setProfileData] = useState<ProfileData>({
    id: 0,
    username: "",
    phone: "",
    address: "",
    latitude: 0,
    longitude: 0,
    mail: "",
    food: [],
  });
  const [edit, setEdit] = useState<boolean>(false);
  useEffect(() => {
    const getProfile = async () => {
      const { data } = await axios.get(
        (process.env.REACT_APP_DOMAIN || "") + "/api/auth/profile",
        { headers: { Authorization: "Bearer " + props.token } }
      );
      setProfileData(data);
    };
    getProfile();
  }, []);
  return (
    <div>
      {!edit ? (
        <div>
          <ShowProfile profileData={profileData}></ShowProfile>
          <div>
            <button
              onClick={() => {
                setEdit(true);
              }}
            >
              Edit
            </button>
          </div>
        </div>
      ) : (
        <ProfileEdit
          profileData={profileData}
          setProfileData={setProfileData}
          setEdit={setEdit}
        />
      )}
    </div>
  );
};

export default Profile;
