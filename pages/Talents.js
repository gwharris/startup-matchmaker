import React from "react";
import { TalentList } from "../helpers/TalentList";
import TalentItem from "../components/TalentItem";
import "../styles/Talent.css";

function Talent() {
  return (
    <div className="talent">
      <h1 className="talentTitle">Talents</h1>
      <div className="talentList">
        {TalentList.map((talentItem, key) => {
          return (
            <TalentItem
              key={key}
              image={talentItem.image}
              name={talentItem.name}
              price={talentItem.price}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Talent;