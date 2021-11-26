import "./App.css";
import Navbar from "./components/Navbar";
import Talents from "./pages/Talents";
import Startups from "./pages/Startups";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Talents} />
          <Route path="/startup" exact component={Startups} />
        </Switch>
        
      </Router>
    </div>
  );
}

export default App;
