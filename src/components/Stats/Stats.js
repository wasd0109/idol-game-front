import React from 'react';

import profileImage from '../../assets/profile_image.jpg';

const name = 'Pekorin';
const element = 'Fire';
const level = 0;
const attack = 23;
const defense = 30;
const magicAttack = 30;
const magicDefense = 40;
const agility = 10;
const luck = 5;

const stats = [
  ['name', name],
  ['level', level],
  ['element', element],
  ['attack', attack],
  ['defense', defense],
  ['magic attack', magicAttack],
  ['magic defense', magicDefense],
  ['agility', agility],
  ['luck', luck],
];

const actions = ['Practice', 'Live'];

function Stats() {
  return (
    <div className="mx-4 w-4/12 " id="stats">
      <ul className="flex flex-wrap border-l-2 border-t-2">
        <img
          src={profileImage}
          alt=""
          className="w-12/12 border-l-0 border-r-2 border-b-2 m-auto"
        />
        {stats.map((stat) => {
          const width = stat[0] === 'name' ? 'w-full' : 'w-6/12';
          return (
            <li className={`${width} capitalize border-r-2 border-b-2`}>
              {stat[0]} <span className="text-lg font-bold">{stat[1]}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Stats;
