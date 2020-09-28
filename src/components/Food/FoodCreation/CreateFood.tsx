import React, {
  useState,
  useEffect,
  ChangeEvent,
  MouseEvent,
  FormEvent,
} from "react";
import Address from "../Address";
import FileUpload from "../FileUpload";
import axios from "axios";
import { FoodDto } from "../foodDto.interface";
import {
  StyledAddFoodDiv,
  StyledAddFoodDivInput,
  StyledAddFoodForm,
  StyledAddFoodFormH4,
  StyledAddFoodInput,
  StyledAddFoodTitle,
} from "./Styles";
const CreateFood = (props) => {
  const [foodDto, setFoodDto] = useState<FoodDto>({
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
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFoodDto({ ...foodDto, [name]: value });
  };
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
  }, [foodDto, isUploaded]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = `Bearer ${props.token}`;
    try {
      const { data } = await axios.post(
        (process.env.REACT_APP_DOMAIN || "") + "/api/food/add",
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

  return (
    <StyledAddFoodDiv>
      <StyledAddFoodTitle>Add your food</StyledAddFoodTitle>
      <StyledAddFoodForm onSubmit={handleSubmit}>
        <div>
          <div>
            {errorMessage[0] &&
              errorMessage.map((elem, index) => {
                return <h2 key={index}>{elem}</h2>;
              })}
          </div>
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
          <StyledAddFoodFormH4>Contact (mail or phone)</StyledAddFoodFormH4>
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

        <button type="submit">Add food</button>
      </StyledAddFoodForm>
    </StyledAddFoodDiv>
  );
};

export default CreateFood;
