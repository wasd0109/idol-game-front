import React from 'react';

import profileImage from '../../assets/profile_image.jpg';

function Stats({ stats }) {
  return (
    <div className="md:w-4/12" id="stats">
      <ul className="flex flex-wrap border-l-2 border-t-2">
        <img
          src={profileImage}
          alt=""
          className="w-12/12 border-l-0 border-r-2 border-b-2 m-auto"
        />
        {stats.map((stat) => {
          if (stat[0] === 'id' || stat[0] === 'userid') return null;
          return (
            <li
              key={stat[0]}
              className="w-6/12 capitalize border-r-2 border-b-2"
            >
              {stat[0]} <span className="text-lg font-bold">{stat[1]}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Stats;
