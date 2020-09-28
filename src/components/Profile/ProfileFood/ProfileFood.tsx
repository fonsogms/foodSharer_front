import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FoodObject } from "../../Food/foodDetails/FoodDetails";
import async from "react-async";
import {
  StyledDeleteButton,
  StyledEditButton,
  StyledFoodPicture,
  StyledMainFoodProfileOrganizer,
  StyledMainProfileFood,
  StyledPictureDiv,
  StyledProfileFoodButtons,
  StyledProfileFoodElement,
  StyledProfileFoodInfo,
  StyledProfileFoodTitle,
} from "./Styles";
import { StyledFoodImage } from "../../Home/styles";

const ProfileFood = (props) => {
  const [foodItems, setFoodItems] = useState<FoodObject[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get(
          (process.env.REACT_APP_DOMAIN || "") + "/api/profile/food",
          { headers: { Authorization: "Bearer " + props.token } }
        );
        console.log(data);
        setFoodItems(data);
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
  console.log(foodItems, loading);
  return (
    <StyledMainFoodProfileOrganizer>
      <StyledMainProfileFood>
        {foodItems
          ? foodItems.map((elem, index) => {
              return (
                <StyledProfileFoodElement key={index}>
                  {elem.pictures.length ? (
                    <StyledPictureDiv>
                      <StyledFoodPicture src={elem.pictures[0].url} alt="" />
                    </StyledPictureDiv>
                  ) : (
                    <StyledPictureDiv>
                      <StyledFoodPicture src="/no-food-logo-764EA6FD7F-seeklogo.com.png" />
                    </StyledPictureDiv>
                  )}
                  <StyledProfileFoodInfo>
                    <StyledProfileFoodTitle>
                      {elem.title}
                    </StyledProfileFoodTitle>
                    <StyledProfileFoodButtons>
                      <StyledEditButton>
                        <Link
                          to={`/food/edit/${elem.id}`}
                          style={{
                            textDecoration: "none",
                            color: "white",
                            fontFamily: "Chewy",
                          }}
                        >
                          Edit
                        </Link>
                      </StyledEditButton>
                      <StyledDeleteButton
                        onClick={(e) => {
                          handleDelete(e, elem.id);
                        }}
                      >
                        Delete
                      </StyledDeleteButton>
                    </StyledProfileFoodButtons>
                  </StyledProfileFoodInfo>
                </StyledProfileFoodElement>
              );
            })
          : null}
      </StyledMainProfileFood>
    </StyledMainFoodProfileOrganizer>
  );
};

export default ProfileFood;
