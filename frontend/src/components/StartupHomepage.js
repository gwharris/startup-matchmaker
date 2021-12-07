import React from 'react'
import { PersonItem } from '.'

const StartupHomepage = () => {
    return (
    <div className="person">
        <h1 className="personName">Startups</h1>
        <div className="personList">
          {/* {StartupList.map((startupItem, key) => {
            return (
              <StartupItem
                key={key}
                image={startupItem.image}
                name={startupItem.name}
                price={startupItem.price}
              />
            );
          })} */}
        </div>
    </div>
    )
}

export default StartupHomepage
