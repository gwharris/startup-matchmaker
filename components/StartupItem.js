import React from "react";

function StartupItem({ image, name, price }) {
  return (
    <div className="startupItem">
      <div style={{ backgroundImage: `url(${image})` }}> </div>
      <h1> {name} </h1>
      <p> {price} </p>
    </div>
  );
}

export default StartupItem;
