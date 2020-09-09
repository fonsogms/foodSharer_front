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
  });
  const [errorMessage, setErrorMessage] = useState<string[]>([""]);

  const [edit, setEdit] = useState<boolean>(false);
  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get(
          (process.env.REACT_APP_DOMAIN || "") + "/api/profile",
          { headers: { Authorization: "Bearer " + props.token } }
        );
        setProfileData(data);
      } catch (error) {
        console.log(error);
        console.log(error.response.data.message);
        let newErrorMessage: string[] = [""];
        if (typeof error.response.data.message == "string") {
          newErrorMessage[0] = error.response.data.message;
        } else {
          newErrorMessage = error.response.data.message;
        }
        if (newErrorMessage.includes("Unauthorized")) {
          props.history.push("/");
        }
        setErrorMessage(newErrorMessage);
      }
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
          token={props.token}
        />
      )}
    </div>
  );
};

export default Profile;
