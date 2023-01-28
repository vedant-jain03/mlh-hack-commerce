import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import './index.css'

ReactDOM.render(
  <Auth0Provider
    domain="dev-wom8eixet6jpwh6v.us.auth0.com"
    clientId="qeYsXkQKWKPOsn08KnJktMUEmnBRNw0T"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
