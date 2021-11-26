import React from "react";

function TalentItem({ image, name, price }) {
  return (
    <div className="talentItem">
      <div style={{ backgroundImage: `url(${image})` }}> </div>
      <h1> {name} </h1>
      <p> {price} </p>
    </div>
  );
}

export default TalentItem;
