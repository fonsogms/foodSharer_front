import { Link } from "@material-ui/core";
import React from "react";
import {
  StyledFoodImage,
  StyledFoodItem,
  StyledFoodList,
  StyledFoodListRow,
  StyledTitle,
} from "./styles";

const FoodList = (props) => {
  return (
    <StyledFoodList>
      {props.filteredItems
        ? props.filteredItems.map((elem, index) => {
            let secondElem = props.filteredItems[index + 1];
            if (index % 2 == 0) {
              return (
                <StyledFoodListRow>
                  <StyledFoodItem
                    onClick={() => props.history.push(`/food/${elem.id}`)}
                  >
                    <StyledFoodImage
                      src={elem.pictures[0] ? elem.pictures[0].url : ""}
                      alt=""
                      onerror
                    />
                    <StyledTitle>{elem.title}</StyledTitle>
                    <h5>Expires:{new Date(elem.expiryDate).toDateString()}</h5>
                  </StyledFoodItem>
                  {secondElem && (
                    <StyledFoodItem
                      onClick={() =>
                        props.history.push(`/food/${secondElem.id}`)
                      }
                    >
                      <StyledFoodImage
                        src={
                          secondElem.pictures[0]
                            ? secondElem.pictures[0].url
                            : ""
                        }
                        alt=""
                      />

                      <StyledTitle>{secondElem.title}</StyledTitle>
                      <p> Expires:{new Date(elem.expiryDate).toDateString()}</p>
                    </StyledFoodItem>
                  )}
                </StyledFoodListRow>
              );
            } else {
              return null;
            }
          })
        : null}
    </StyledFoodList>
  );
};

export default FoodList;
