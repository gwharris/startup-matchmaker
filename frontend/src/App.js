import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; //install bootstrap dependency "npm install bootstrap"

//import components
import { Landing, PersonRegister, StartupRegister, PersonLogin, StartupLogin, PersonProfile, StartupProfile } from "./components";

//ENTRY POINT FOR APPLICATION
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Landing}></Route>
        <Route path="/personlogin" component={PersonLogin}></Route>
        <Route path="/startuplogin" component={StartupLogin}></Route>

        <Route path="/personregister" component={PersonRegister}></Route>
        <Route path="/startupregister" component={StartupRegister}></Route>

        <Route path="/personprofile" component={PersonProfile}></Route>
        <Route path="/startupprofile" component={StartupProfile}></Route>

      </Switch>
    </Router>
  );
}

export default App;
