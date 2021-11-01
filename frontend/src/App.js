import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; //install bootstrap dependency "npm install bootstrap"

//import components
import homepage from "./components/homepage";
import Login from "./components/login";
//ENTRY POINT FOR APPLICATION
function App() {
  return (
    <div className="App">
      <h1>Hello From React!</h1>
    </div>
  );
}

export default App;
