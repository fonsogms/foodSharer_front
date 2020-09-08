import React, { useEffect, useState } from "react";
import "./App.css";
import SignUp from "./components/auth/SignUp";
import { Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import Home from "./components/Home/Home";
import CreateFood from "./components/Food/FoodCreation/CreateFood";
import FoodDetails from "./components/Food/foodDetails/FoodDetails";
import FoodEdit from "./components/Food/editFood/FoodEdit";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile/Profile";
import ProfileFood from "./components/Profile/ProfileFood";
function App(props) {
  const [token, setToken] = useState<string>(props.token);

  return (
    <div className="App">
      <Navbar token={token} setToken={setToken}></Navbar>
      <Switch>
        <Route
          exact
          path="/singUp"
          render={(props) => {
            return (
              <SignUp {...props} token={token} setToken={setToken}></SignUp>
            );
          }}
        />
        <Route
          exact
          path="/profile"
          render={() => {
            return <Profile {...props} token={token}></Profile>;
          }}
        ></Route>
        <Route
          exact
          path="/profile/food"
          render={() => {
            return <ProfileFood {...props} token={token}></ProfileFood>;
          }}
        ></Route>
        <Route
          exact
          path="/login"
          render={(props) => {
            return <Login {...props} token={token} setToken={setToken}></Login>;
          }}
        />
        <Route
          exact
          path="/home"
          render={(props) => {
            return <Home {...props} token={token}></Home>;
          }}
        />

        <Route
          exact
          path="/food/add"
          render={(props) => {
            return <CreateFood {...props} token={token}></CreateFood>;
          }}
        />
        <Route
          exact
          path="/food/edit/:id"
          render={(props) => {
            return <FoodEdit {...props} token={token}></FoodEdit>;
          }}
        />
        <Route
          exact
          path="/food/:id"
          render={(props) => {
            return <FoodDetails {...props} token={token}></FoodDetails>;
          }}
        />
      </Switch>
    </div>
  );
}

export default App;
