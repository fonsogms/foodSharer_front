import React, { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { FoodDto } from "../foodDto.interface";
import Address from "../Address";
import FileUpload from "../FileUpload";
import {
  StyledAddFoodDiv,
  StyledAddFoodForm,
  StyledAddFoodTitle,
  StyledAddFoodFormH4,
  StyledAddFoodInput,
  StyledAddFoodDivInput,
} from "../FoodCreation/Styles";
import {
  StyledDeleteButton,
  StyledEditButton,
  StyledProfileFoodButtons,
} from "../../Profile/ProfileFood/Styles";
import { StyledEditFoodButtons } from "./styles";

interface FoodObject extends FoodDto {
  id: number;
}
const FoodEdit = (props) => {
  const [foodDto, setFoodDto] = useState<FoodObject>({
    id: 0,
    title: "",
    description: "",
    contact: "",
    latitude: 0,
    longitude: 0,
    address: "",
    expiryDate: "",
    pictures: [],
  });
  const [errorMessage, setErrorMessage] = useState<string[]>([""]);
  const [isUploaded, setIsUploaded] = useState<Boolean>(false);

  useEffect(() => {
    const getData = async (): Promise<void> => {
      try {
        const { data } = await axios.get(
          (process.env.REACT_APP_DOMAIN || "") +
            "/api/food/" +
            props.match.params.id,
          { headers: { Authorization: "Bearer " + props.token } }
        );
        setErrorMessage([""]);

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
  useEffect(() => {
    let handleUnload;
    if (!isUploaded) {
      handleUnload = async (event) => {
        let ids = foodDto.pictures.map((elem) => {
          return elem.public_id;
        });

        await axios.delete(
          (process.env.REACT_APP_DOMAIN || "") + "/api/food/cloudinary",
          {
            headers: {
              Authorization: "Bearer " + props.token,
            },
            data: {
              id: ids,
            },
          }
        );
      };
      window.onbeforeunload = handleUnload;
    }
    if (isUploaded) {
      window.onbeforeunload = null;
    }
  }, [foodDto, isUploaded, props]);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = `Bearer ${props.token}`;
    try {
      const { data } = await axios.put(
        (process.env.REACT_APP_DOMAIN || "") +
          "/api/food/" +
          props.match.params.id,
        foodDto,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setIsUploaded(true);
      props.history.push("/food/" + data.id);
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFoodDto({ ...foodDto, [name]: value });
  };
  const deleteFood = async (e) => {
    const token = `Bearer ${props.token}`;
    try {
      const { data } = await axios.delete(
        (process.env.REACT_APP_DOMAIN || "") +
          "/api/food/" +
          props.match.params.id,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      props.history.push("/home");
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
  return (
    <StyledAddFoodDiv>
      <StyledAddFoodTitle>Edit your food</StyledAddFoodTitle>

      <StyledAddFoodForm onSubmit={handleSubmit}>
        {errorMessage[0]
          ? errorMessage.map((elem, index) => {
              return <h2 key={index}>{elem}</h2>;
            })
          : foodDto.title && (
              <>
                <div>
                  <div>
                    <StyledAddFoodFormH4> Title</StyledAddFoodFormH4>
                    <StyledAddFoodDivInput>
                      <StyledAddFoodInput
                        type="text"
                        name="title"
                        onChange={handleChange}
                        value={foodDto.title}
                      />
                    </StyledAddFoodDivInput>
                  </div>
                  <div>
                    <StyledAddFoodFormH4>Description</StyledAddFoodFormH4>
                    <StyledAddFoodDivInput>
                      <StyledAddFoodInput
                        type="text"
                        name="description"
                        onChange={(e) => handleChange(e)}
                        value={foodDto.description}
                      />
                    </StyledAddFoodDivInput>
                  </div>
                  <div>
                    <StyledAddFoodFormH4>
                      Contact (mail or phone)
                    </StyledAddFoodFormH4>
                    <StyledAddFoodDivInput>
                      <StyledAddFoodInput
                        type="text"
                        name="contact"
                        onChange={(e) => handleChange(e)}
                        value={foodDto.contact}
                      />
                    </StyledAddFoodDivInput>
                  </div>
                  <div>
                    <StyledAddFoodFormH4>Expiry Date</StyledAddFoodFormH4>
                    <StyledAddFoodDivInput>
                      <StyledAddFoodInput
                        type="Date"
                        name="expiryDate"
                        onChange={handleChange}
                        value={foodDto.expiryDate}
                      />
                    </StyledAddFoodDivInput>
                  </div>

                  <Address target={foodDto} setTarget={setFoodDto}></Address>
                  <FileUpload
                    setFoodDto={setFoodDto}
                    foodDto={foodDto}
                    token={props.token}
                  ></FileUpload>
                </div>
                <StyledEditFoodButtons>
                  <StyledEditButton type="submit">Edit</StyledEditButton>
                  <StyledDeleteButton onClick={deleteFood}>
                    Delete
                  </StyledDeleteButton>
                </StyledEditFoodButtons>
              </>
            )}
      </StyledAddFoodForm>
    </StyledAddFoodDiv>
  );
};

export default FoodEdit;
