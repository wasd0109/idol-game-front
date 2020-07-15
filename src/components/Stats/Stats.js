import React from 'react';

import profileImage from '../../assets/profile_image.jpg';
import Skeleton from 'react-loading-skeleton';

function Stats({ stats }) {
  return (
    <ul className="flex flex-wrap border-l-2 border-t-2">
      <div className="w-12/12 h-auto border-l-0 border-r-2 border-b-2 m-auto">
        <img src={profileImage} alt="Profile" />
      </div>
      {stats.map((stat, i) => {
        if (stat[0] === 'id' || stat[0] === 'userid' || stat[0] === 'message')
          return null;
        return stat[1] ? (
          <li key={stat[0]} className="w-6/12 capitalize border-r-2 border-b-2">
            {stat[0]} <span className="text-lg font-bold">{stat[1]}</span>
          </li>
        ) : (
          <li key={i} className="w-6/12 capitalize border-r-2 border-b-2">
            {stat[0]}{' '}
            <span className="text-lg font-bold">
              <Skeleton width={40} />
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default Stats;
