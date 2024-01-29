import { ajax } from "./preset";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

const themeToken = {
  colorPrimary: "#4F185A",
};

if (process.env.NODE_ENV === "development") {
  import("@kne/modules-dev/dist/create-entry.css");
  import("@kne/modules-dev/dist/create-entry").then((module) => {
    const Entry = module.default(App);
    root.render(
      <React.StrictMode>
        <Entry preset={{ ajax }} themeToken={themeToken} />
      </React.StrictMode>
    );
  });
} else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
