import React, { useEffect, useState, useContext } from "react";
import Map from "./Map";
import axios from "axios";
import SearchBar from "./SearchBar";
export interface LatLong {
  latitude: number;
  longitude: number;
}
interface Pictures {
  url: string;
  public_id: string;
}
export interface Food {
  id: number;
  title: string;
  expiryDate: string;
  description: string;
  latitude: number;
  longitude: number;
  address: string;
  pictures: Pictures[];
  owner: number;
}
interface ViewPort {
  longitude: number;
  latitude: number;
  width: string;
  height: string;
  zoom: number;
}

const Home = (props) => {
  const [location, setLocation] = useState<LatLong>({
    latitude: 0,
    longitude: 0,
  });
  const [filteredItems, setFilteredItems] = useState<Food[]>();
  const [foodItems, setFoodItems] = useState<Food[]>([
    {
      id: 0,
      title: "",
      expiryDate: "",
      description: "",
      latitude: 0,
      longitude: 0,
      address: "",
      pictures: [],

      owner: 0,
    },
  ]);
  const [viewPort, setViewPort] = useState<ViewPort>({
    longitude: 0,
    latitude: 0,
    width: "60vw",
    height: "60vh",
    zoom: 10,
  });
  const [search, setSearch] = useState("");
  const getData = () => {
    if (!props.token) {
      props.history.push("/login");
      return;
    }
    navigator.geolocation.getCurrentPosition(async (data) => {
      const { coords } = data;
      const food = await getLocations(
        coords.latitude,
        coords.longitude,
        100 / (viewPort.zoom + 1),
        props.token
      );
      setViewPort({
        ...viewPort,
        longitude: coords.longitude,
        latitude: coords.latitude,
      });

      setFoodItems(food);
      setLocation(coords);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    const filtered = foodItems.filter((elem) => {
      if (elem.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        return true;
    });
    setFilteredItems(filtered);
  }, [search]);
  useEffect(() => {
    const changeData = async () => {
      const food = await getLocations(
        viewPort.latitude,
        viewPort.longitude,
        1500 / viewPort.zoom,
        props.token
      );
      setFoodItems(food);
      setFilteredItems(food);
    };
    changeData();
  }, [viewPort]);
  const getLocations = async (
    latitude: number,
    longitude: number,
    distance: number,
    token: string
  ) => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_DOMAIN +
          `/api/food?latitude=${latitude}&longitude=${longitude}&distance=${distance}`,
        { headers: { Authorization: "Bearer " + token } }
      );
      return data;
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
    }
  };
  return (
    <div>
      <h1>Welcome User</h1>
      <SearchBar setSearch={setSearch} search={search}></SearchBar>
      {location.latitude ? (
        <div>
          <Map
            location={location}
            foodItems={filteredItems}
            viewPort={viewPort}
            setViewPort={setViewPort}
          ></Map>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
