import React, { useEffect, useState } from "react";
import axios from "axios";
import { FoodObject } from "../Food/foodDetails/FoodDetails";
const ProfileFood = (props) => {
  const [foodItems, setFoodItems] = useState<FoodObject[] | null>(null);
  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get(
          process.env.DOMAIN || "" + "/api/auth/profile",
          { headers: { Authorization: "Bearer " + props.token } }
        );
        setFoodItems(data.food);
      } catch (error) {
        console.log(error);
      }
    };

    getProfile();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        margin: "20px",
      }}
    >
      {foodItems
        ? foodItems.map((elem, index) => {
            return (
              <div key={index} style={{ display: "flex" }}>
                {elem.pictures.length ? (
                  <div style={{ margin: "10px" }}>
                    <img
                      style={{ width: "50px", height: "50px" }}
                      src={elem.pictures[0].url}
                      alt=""
                    />
                  </div>
                ) : (
                  <div>
                    <img
                      style={{ width: "50px", height: "auto" }}
                      src="/no-food-logo-764EA6FD7F-seeklogo.com.png"
                      alt=""
                    />
                  </div>
                )}
                <div>
                  <h2>{elem.title}</h2>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default ProfileFood;
