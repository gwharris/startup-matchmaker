import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; //install bootstrap dependency "npm install bootstrap"

//import components
import { HomePage, Register, Login } from "./components";

//ENTRY POINT FOR APPLICATION
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path='/register' component={Register}></Route>
      </Switch>
    </Router>
  );
}

export default App;
