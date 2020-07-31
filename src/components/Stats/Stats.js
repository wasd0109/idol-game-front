import React from 'react';
import profileImage from '../../assets/profile_image.jpg';
import Skeleton from 'react-loading-skeleton';

function Stats({ stats }) {
  return (
    <ul className="flex flex-wrap border-l-2 border-t-2">
      <div className="w-12/12 h-auto border-l-0 border-r-2 border-b-2 m-auto">
        <img src={profileImage} alt="Profile" />
      </div>
      {stats.map((stat) => {
        return (
          <li key={stat[0]} className="w-6/12 capitalize border-r-2 border-b-2">
            {stat[0]}
            {" "}
            {stat[1] ? (
              <span className="text-lg font-bold">{stat[1]}</span>
            ) :
              <span className="text-lg font-bold" id="skeleton"><Skeleton width={40} /></span>
            }

          </li>
        );
      })}
    </ul>
  );
}

export default Stats;
