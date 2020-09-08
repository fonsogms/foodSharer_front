import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FoodObject } from "../Food/foodDetails/FoodDetails";
const ProfileFood = (props) => {
  const [foodItems, setFoodItems] = useState<FoodObject[] | null>(null);
  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get(
          (process.env.REACT_APP_DOMAIN || "") + "/api/auth/profile",
          { headers: { Authorization: "Bearer " + props.token } }
        );
        setFoodItems(data.food);
      } catch (error) {
        console.log(error);
      }
    };

    getProfile();
  }, []);
  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    try {
      const { data } = await axios.delete(
        process.env.REACT_APP_DOMAIN + "/api/food/" + id,
        {
          headers: {
            Authorization: "Bearer " + props.token,
          },
        }
      );
      //@ts-ignore
      const filteredFood = foodItems.filter((elem) => {
        if (elem.id != id) {
          return true;
        }
      });
      setFoodItems(filteredFood);
    } catch (error) {
      console.log(error);
    }
  };
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
                <div style={{ margin: "10px" }}>
                  <h2>{elem.title}</h2>
                </div>
                <div style={{ margin: "10px" }}>
                  {" "}
                  <Link to={`/food/edit/${elem.id}`}>Edit</Link>
                </div>
                <div style={{ margin: "10px" }}>
                  <button
                    onClick={(e) => {
                      handleDelete(e, elem.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default ProfileFood;
