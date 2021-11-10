import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; //install bootstrap dependency "npm install bootstrap"

//import components
import { HomePage, Register, Login, Matches } from "./components";

//ENTRY POINT FOR APPLICATION
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/matches" component={Matches}></Route>
      </Switch>
    </Router>
  );
}

export default App;
