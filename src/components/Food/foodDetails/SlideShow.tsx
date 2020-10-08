import React from "react";
import { Slide } from "react-slideshow-image";
import { StyledFoodDetails, StyledSlideShow } from "./Styles";

const SlideShow = (props) => {
  return (
    <StyledSlideShow className="slide-container">
      <Slide>
        {props.pictures.map((elem, index) => {
          return (
            <div
              className="each-slide"
              style={{
                height: "300px",
                width: "100%",
                backgroundImage: `url(${elem.url})`,
                backgroundSize: "100% 100%",
              }}
            >
              <span>Slide {index}</span>
            </div>
          );
        })}
      </Slide>
    </StyledSlideShow>
  );
};

export default SlideShow;
