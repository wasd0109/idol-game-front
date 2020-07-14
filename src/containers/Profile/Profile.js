import React from 'react';
import Stats from '../../components/Stats';
import Actions from '../../components/Actions';
import Loader from 'react-loader-spinner';

function Profile({ player }) {
  if (!player) {
    return (
      <div className="flex justify-center">
        <div className="md:mt-32 z-10">
          <Loader
            type="TailSpin"
            color="#00BFFF"
            height={200}
            width={200}
            timeout={5000}
          />
        </div>
      </div>
    );
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
