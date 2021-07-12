import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

const app = (
  <Router>
    <App />
  </Router>
);
ReactDOM.render(
  <React.StrictMode>{app}</React.StrictMode>,
  document.getElementById("root")
);
