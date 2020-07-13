import React from 'react';
import Stats from '../../components/Stats';
import Actions from '../../components/Actions';

function Profile({ player }) {
  console.log('Profile', player);
  if (!player) {
    return <div>Loading</div>;
  }
  const stats = [];
  for (const [key, value] of Object.entries(player)) {
    stats.push([key.replace('_', ' '), value]);
  }

  return (
    <div className="flex mx-4 my-2 flex-wrap">
      <Stats stats={stats} />
      <Actions />
    </div>
  );
}

export default Profile;
