import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { GithubProvider } from "./context/context";
import { Auth0Provider } from "@auth0/auth0-react";
import { AppContextProvider } from "./context/context";

const domain = "dev-llj13v1m6qse0ok2.us.auth0.com";
const clientId = "5eXmzCYZdR5fzhCijNbuCPHHovnIJQTF";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-llj13v1m6qse0ok2.us.auth0.com"
      clientId="5eXmzCYZdR5fzhCijNbuCPHHovnIJQTF"
      redirectUri={window.location.origin}
    >
      <AppContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppContextProvider>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
