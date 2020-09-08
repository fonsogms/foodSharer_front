import React, { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { FoodDto } from "../foodDto.interface";
import Address from "../Address";
import FileUpload from "../FileUpload";

interface FoodObject extends FoodDto {
  id: number;
}
const FoodEdit = (props) => {
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
  const [isUploaded, setIsUploaded] = useState<Boolean>(false);

  useEffect(() => {
    const getData = async (): Promise<void> => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_DOMAIN ||
            "" + "/api/food/" + props.match.params.id,
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
        process.env.REACT_APP_DOMAIN ||
          "" + "/api/food/" + props.match.params.id,
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
        process.env.REACT_APP_DOMAIN ||
          "" + "/api/food/" + props.match.params.id,
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
    <div>
      <form onSubmit={handleSubmit}>
        {errorMessage[0] && !foodDto.title ? (
          errorMessage.map((elem, index) => {
            return <h2 key={index}>{elem}</h2>;
          })
        ) : (
          <>
            <div>
              <div>
                <h4> Title</h4>
                <div>
                  <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    value={foodDto.title}
                  />
                </div>
              </div>
              <div>
                <h4>Description</h4>
                <div>
                  <input
                    type="text"
                    name="description"
                    onChange={(e) => handleChange(e)}
                    value={foodDto.description}
                  />
                </div>
              </div>
              <div>
                <h4>Expiry Date</h4>
                <div>
                  <input
                    type="Date"
                    name="expiryDate"
                    onChange={handleChange}
                    value={foodDto.expiryDate}
                  />
                </div>
              </div>

              <Address foodDto={foodDto} setFoodDto={setFoodDto}></Address>
              <FileUpload
                setFoodDto={setFoodDto}
                foodDto={foodDto}
                token={props.token}
              ></FileUpload>
            </div>
            <div style={{ margin: "10px" }}>
              <button type="submit">Edit Food</button>
              <button onClick={deleteFood}>Delete Food</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default FoodEdit;
