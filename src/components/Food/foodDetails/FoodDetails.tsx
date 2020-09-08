import React, { useState, useEffect } from "react";
import { FoodDto } from "../foodDto.interface";
import { Link } from "react-router-dom";
import axios from "axios";
export interface FoodObject extends FoodDto {
  id: number;
}
const FoodDetails = (props) => {
  const [foodDto, setFoodDto] = useState<FoodObject>({
    id: 0,
    title: "",
    description: "",
    latitude: 0,
    longitude: 0,
    address: "",
    expiryDate: "",
    pictures: [],
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
        setFoodDto(data);
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
    <div>
      {errorMessage[0] ? (
        errorMessage.map((elem, index) => {
          return <h2 key={index}>{elem}</h2>;
        })
      ) : (
        <>
          {Object.keys(foodDto).map((key, index) => {
            console.log(foodDto, key);
            if (typeof foodDto[key] === "string") {
              return (
                <div key={index}>
                  <h1>
                    {key}: {foodDto[key]}
                  </h1>
                </div>
              );
            }
            if (typeof foodDto[key] === "object") {
              console.log("happening");
              return (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {foodDto[key].map((elem, index) => {
                    return (
                      <img
                        key={index}
                        src={elem.url}
                        alt="food_pics"
                        style={{ width: "100px", height: "auto" }}
                      />
                    );
                  })}
                </div>
              );
            }
          })}
          <div>
            <button>
              <Link to={"/food/edit/" + foodDto.id}>Edit</Link>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FoodDetails;
