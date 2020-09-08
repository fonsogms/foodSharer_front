import React, { useEffect } from "react";
import axios from "axios";

const Profile = (props) => {
  useEffect(() => {
    const getProfile = async () => {
      const profile = await axios.get(
        process.env.REACT_APP_DOMAIN + "/api/auth/profile",
        { headers: { Authorization: "Bearer " + props.token } }
      );
      console.log(profile);
    };

    getProfile();
  }, []);
  return <div></div>;
};

export default Profile;
