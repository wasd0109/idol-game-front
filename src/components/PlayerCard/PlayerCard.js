import React from 'react';

import profileImage from '../../assets/profile_image.jpg';

function PlayerCard({ player }) {
  const displayInfo = ['name', 'title', 'level', 'element', 'message'];
  const stats = [];
  for (const [key, value] of Object.entries(player)) {
    if (displayInfo.includes(key)) stats.push([key.replace('_', ' '), value]);
  }
  return (
    <div className="my-2 w-8/12 h-auto border-l-2 border-t-2 m-auto flex">
      <div className="justify-start w-2/12 h-auto border-r-2 border-b-2">
        <img src={profileImage} alt="Profile" />
      </div>
      <div className="grid w-10/12 grid-rows-3  grid-cols-2">
        {stats.map((stat, i) => (
          <p
            key={stat[0] + i}
            className={`row-span-1 ${
              stat[0] === 'message' ? 'col-span-2' : 'col-span-1 '
            } capitalize border-r-2 border-b-2`}
          >
            {stat[0]}: <span className="text-lg font-bold">{stat[1]}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

export default PlayerCard;
