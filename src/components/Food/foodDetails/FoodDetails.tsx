import React, { useState, useEffect } from "react";
import { FoodDto } from "../foodDto.interface";
import axios from "axios";
import "react-slideshow-image/dist/styles.css";
import SlideShow from "./SlideShow";
import { StyledFoodDetails, StyledFoodDetailsMainDiv } from "./Styles";
export interface FoodObject extends FoodDto {
  id: number;
}
const FoodDetails = (props) => {
  const [foodDto, setFoodDto] = useState<FoodObject>({
    id: 0,
    title: "",
    pictures: [],

    description: "",
    contact: "",
    latitude: 0,
    longitude: 0,
    address: "",
    expiryDate: "",
  });
  const [errorMessage, setErrorMessage] = useState<string[]>([""]);
  useEffect(() => {
    const getData = async (): Promise<void> => {
      console.log(props.token);

      try {
        const { data } = await axios.get(
          (process.env.REACT_APP_DOMAIN || "") +
            "/api/food/details/" +
            props.match.params.id,
          { headers: { Authorization: "Bearer " + props.token } }
        );
        //setErrorMessage([""]);
        const newFoodDto = {
          id: data.id,
          title: data.title,
          pictures: data.pictures,
          description: data.description,
          contact: data.contact,
          latitude: data.latitude,
          longitude: data.longitude,
          address: data.address,
          expiryDate: data.expiryDate,
        };
        setFoodDto(newFoodDto);
      } catch (error) {
        console.log(error);
        console.log(error.response.data.message);
        let newErrorMessage: string[] = [""];
        if (typeof error.response.data.message == "string") {
          newErrorMessage[0] = error.response.data.message;
        } else {
          newErrorMessage = error.response.data.message;
        }
        setErrorMessage(newErrorMessage);
      }
    };
    getData();
  }, []);
  console.log(foodDto.pictures[0]);
  return (
    <StyledFoodDetailsMainDiv>
      <StyledFoodDetails>
        {errorMessage[0] ? (
          errorMessage.map((elem, index) => {
            return <h2 key={index}>{elem}</h2>;
          })
        ) : (
          <>
            {Object.keys(foodDto).map((key, index) => {
              console.log(foodDto, key);
              if (typeof foodDto[key] === "object") {
                return <SlideShow pictures={foodDto[key]}></SlideShow>;
              }
              if (typeof foodDto[key] === "string") {
                return (
                  <div key={index}>
                    <h1>{key == "title" ? null : key + ":"}</h1>
                    <h1>{foodDto[key]}</h1>
                  </div>
                );
              }
            })}
            {/*   <div>
            <button>
              <Link to={"/food/edit/" + foodDto.id}>Edit</Link>
            </button>
          </div> */}
          </>
        )}
      </StyledFoodDetails>
    </StyledFoodDetailsMainDiv>
  );
};

export default FoodDetails;
