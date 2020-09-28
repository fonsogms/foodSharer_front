import React, { useState, SyntheticEvent, ChangeEvent } from "react";
import axios from "axios";
import {
  StyledAddFoodDivInput,
  StyledAddFoodFormH4,
  StyledAddFoodInput,
  StyledSuggestionDiv,
} from "./FoodCreation/Styles";
const getUrl = (address): string => {
  return `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?types=address&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}
  `;
};
const Address = (props) => {
  const [suggestions, setSuggestions]: [any[], Function] = useState([]);
  const handleChange = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const { name, value } = e.target;
    props.setTarget({ ...props.target, [name]: value });
    try {
      const {
        data: { features },
      } = await axios.get(getUrl(value));
      console.log(features);
      setSuggestions(features);
    } catch (err) {
      console.log(err);
    }
  };

  const selectSuggestion = (place) => {
    const [longitude, latitude] = place.center;
    props.setTarget({
      ...props.target,
      address: place.place_name,
      latitude,
      longitude,
    });
    setSuggestions([]);
  };
  return (
    <div>
      <StyledAddFoodFormH4>Address</StyledAddFoodFormH4>
      <StyledAddFoodDivInput>
        <StyledAddFoodInput
          type="text"
          name="address"
          onChange={handleChange}
          value={props.target.address}
        />
      </StyledAddFoodDivInput>
      {suggestions.map((elem, index) => {
        return (
          <StyledSuggestionDiv
            key={index}
            onClick={() => selectSuggestion(elem)}
          >
            {elem.place_name}
          </StyledSuggestionDiv>
        );
      })}
    </div>
  );
};

export default Address;
