import React from 'react';
import Stats from '../../components/Stats';
import ActionsContainer from '../../containers/ActionsContainer';
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
  const hiddenInfo = ['id', 'userid', 'message'];
  for (const [key, value] of Object.entries(player)) {
    if (!hiddenInfo.includes(key)) stats.push([key.replace('_', ' '), value]);
  }
  return (
    <div className="flex mx-4 my-2 flex-wrap">
      <div className="md:w-4/12 xl:w-3/12 h-auto" id="stats">
        <Stats stats={stats} />
      </div>
      <div className="w-full my-2 md:my-0 md:w-7/12 m-auto">
        <ActionsContainer />
      </div>
    </div>
  );
}

export default Profile;
