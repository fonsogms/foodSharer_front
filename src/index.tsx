import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
const bootstrap = async () => {
  const body = await fetch(
    process.env.REACT_APP_DOMAIN + "/api/auth/loggedin",
    {
      method: "POST",
      credentials: "include",
    }
  );
  const data = await body.json();
  console.log(data);
  if (data.token) {
    ReactDOM.render(
      <React.StrictMode>
        <BrowserRouter>
          <App token={data.token} />
        </BrowserRouter>
      </React.StrictMode>,
      document.getElementById("root")
    );
  } else {
    ReactDOM.render(
      <React.StrictMode>
        <BrowserRouter>
          <App token={""} />
        </BrowserRouter>
      </React.StrictMode>,
      document.getElementById("root")
    );
  }
};
bootstrap();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
