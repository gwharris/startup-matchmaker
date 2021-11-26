import React from "react";
import { StartupList } from "../helpers/StartupList";
import StartupItem from "../components/StartupItem";
import "../styles/Startup.css";

function Startup() {
  return (
    <div className="startup">
      <h1 className="startupTitle">Startups</h1>
      <div className="startupList">
        {StartupList.map((startupItem, key) => {
          return (
            <StartupItem
              key={key}
              image={startupItem.image}
              name={startupItem.name}
              price={startupItem.price}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Startup;