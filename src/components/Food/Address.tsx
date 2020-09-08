import React, { useState, SyntheticEvent, ChangeEvent } from "react";
import axios from "axios";
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
    props.setFoodDto({ ...props.foodDto, [name]: value });
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
    props.setFoodDto({
      ...props.foodDto,
      address: place.place_name,
      latitude,
      longitude,
    });
    setSuggestions([]);
  };
  return (
    <div>
      <h4>Address</h4>
      <div>
        <input
          type="text"
          name="address"
          onChange={handleChange}
          value={props.foodDto.address}
        />
      </div>
      {suggestions.map((elem, index) => {
        return (
          <div key={index} onClick={() => selectSuggestion(elem)}>
            {elem.place_name}
          </div>
        );
      })}
    </div>
  );
};

export default Address;
