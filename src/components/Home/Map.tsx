import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { LatLong, Food } from "./Home";
import { Link } from "react-router-dom";
import {
  StyledCheckFoodDetailsButton,
  StyledMap,
  StyledPopUp,
  StyledPopUpImage,
} from "./styles";
const token =
  "pk.eyJ1IjoiZm9uc29nbXMiLCJhIjoiY2swbWRsZWo3MTV6bTNkcW9vc29ybDZyMSJ9.EiT_I5moTDeyh3CM_Uc5CQ";
const Map = (props) => {
  const [userPos, setUserPos] = useState<LatLong>({
    longitude: props.viewPort.longitude,
    latitude: props.viewPort.latitude,
  });
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  return (
    <StyledMap>
      <ReactMapGL
        {...props.viewPort}
        mapboxApiAccessToken={token}
        mapStyle="mapbox://styles/fonsogms/ck9h762i810v71io0zxm8bg2k"
        onViewportChange={(viewport) => {
          props.setViewPort(viewport);
        }}
      >
        {props.foodItems.map((food) => {
          return (
            <div>
              <Marker
                longitude={food.longitude}
                latitude={food.latitude}
                offsetTop={-50}
                offsetLeft={-25}
              >
                <img
                  onClick={() => {
                    setSelectedFood({ ...food });
                  }}
                  src="/food_marker.png"
                  alt=""
                  style={{ width: "50px", height: "auto" }}
                />{" "}
              </Marker>
            </div>
          );
        })}

        <Marker
          longitude={userPos.longitude}
          latitude={userPos.latitude}
          offsetTop={-50}
          offsetLeft={-25}
        >
          <img
            src="/external-content.duckduckgo.com.png"
            alt=""
            style={{ width: "50px", height: "auto" }}
          />{" "}
        </Marker>
        {selectedFood ? (
          <Popup
            longitude={selectedFood.longitude}
            latitude={selectedFood.latitude}
            onClose={() => {
              setSelectedFood(null);
            }}
            closeOnClick={false}
          >
            <StyledPopUp>
              {" "}
              <h3>{selectedFood.title}</h3>
              <div>
                <StyledPopUpImage
                  src={
                    selectedFood.pictures[0] ? selectedFood.pictures[0].url : ""
                  }
                />
              </div>
              <StyledCheckFoodDetailsButton>
                <Link
                  to={`/food/${selectedFood.id}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Check Food details
                </Link>
              </StyledCheckFoodDetailsButton>
            </StyledPopUp>
          </Popup>
        ) : null}
      </ReactMapGL>
    </StyledMap>
  );
};

export default Map;
