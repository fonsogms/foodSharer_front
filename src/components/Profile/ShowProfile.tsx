import React from "react";

const ShowProfile = (props) => {
  return (
    <div>
      {Object.keys(props.profileData).map((elem) => {
        console.log(props.profileData[elem]);
        if (typeof props.profileData[elem] === "string") {
          return (
            <div>
              <h3>
                {elem}:{" "}
                {props.profileData[elem] ? props.profileData[elem] : "N/A"}
              </h3>
            </div>
          );
        }
      })}
      <div></div>
    </div>
  );
};

export default ShowProfile;
