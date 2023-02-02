import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import './index.css'

console.log(window.location.origin);

ReactDOM.render(
  <Auth0Provider
    domain=""
    clientId=""
    authorizationParams={{
      redirect_uri: "https://vedant-jain03.github.io/mlh-hack-commerce/"
    }}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
