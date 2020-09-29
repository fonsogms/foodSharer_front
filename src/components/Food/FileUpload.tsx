import React, { SyntheticEvent, useState, ChangeEvent } from "react";
import axios from "axios";
import {
  StyledAddFoodFormH4,
  StyledFileUploadComponent,
  StyledFileUploadInput,
  StyledFileUploadLabel,
} from "./FoodCreation/Styles";
import { StyledDeleteButton } from "../Profile/ProfileFood/Styles";
import { StyledDeletePicture } from "./editFood/styles";
const FileUpload = (props) => {
  const [loading, setLoading] = useState<Boolean>(false);

  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setLoading(true);
    const files = e.target.files;
    const data = new FormData();
    data.append("image", files[0]);

    try {
      const fileInfo = await axios.post(
        process.env.REACT_APP_DOMAIN + "/upload/image",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setLoading(false);
      props.setFoodDto({
        ...props.foodDto,
        pictures: [
          { url: fileInfo.data.url, public_id: fileInfo.data.public_id },
          ...props.foodDto.pictures,
        ],
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const deletePic = async (id: string): Promise<void> => {
    const filteredPics = props.foodDto.pictures.filter((elem) => {
      if (elem.public_id === id) {
        return false;
      } else {
        return true;
      }
    });

    await axios.delete(
      (process.env.REACT_APP_DOMAIN || "") + "/api/food/cloudinary",
      {
        headers: {
          Authorization: "Bearer " + props.token,
        },
        data: { id: [id] },
      }
    );

    props.setFoodDto({ ...props.foodDto, pictures: filteredPics });
  };
  return (
    <StyledFileUploadComponent>
      <StyledAddFoodFormH4>Add Pictures</StyledAddFoodFormH4>
      <div>
        {loading ? (
          <div>
            <img
              style={{ width: "200px", height: "auto" }}
              alt="loading_Image"
              src="/6d391369321565.5b7d0d570e829.gif"
            />
          </div>
        ) : (
          <StyledFileUploadLabel>
            Add File
            <StyledFileUploadInput
              className="custom-file-input"
              aria-describedby="inputGroupFileAddon01"
              type="file"
              name="pictures"
              onChange={uploadImage}
            />
          </StyledFileUploadLabel>
        )}
      </div>

      {props.foodDto.pictures.length
        ? props.foodDto.pictures.map((elem, index) => {
            if (index <= 5) {
              return (
                <div key={index}>
                  <img
                    src={elem.url}
                    alt="food_image"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <div>
                    <StyledDeletePicture
                      onClick={(e: SyntheticEvent) => {
                        e.preventDefault();
                        deletePic(elem.public_id);
                      }}
                    >
                      Delete image
                    </StyledDeletePicture>
                  </div>
                </div>
              );
            }
          })
        : null}
    </StyledFileUploadComponent>
  );
};

export default FileUpload;
