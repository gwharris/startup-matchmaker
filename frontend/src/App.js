import React from "react";
//import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; //install bootstrap dependency "npm install bootstrap"

//import components
import { HomePage } from "./components";

//ENTRY POINT FOR APPLICATION
function App() {
  return (
    //homepage component
    <HomePage></HomePage>
  );
}

export default App;
