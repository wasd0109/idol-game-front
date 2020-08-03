import React, { useState } from 'react';
import Stats from '../../components/Stats';
import Actions from '../../components/Actions';
import Loader from 'react-loader-spinner';


// export const receiveActionResults = (
//   state = initialActionResults,
//   action = {}
// ) => {
//   switch (action.type) {
//     case "ACTION_SUCCESS":
//       const prevResults = [...state.actionResults];
//       if (state.actionResults.length > 15) {
//         state.actionResults.shift();
//       }
//       return Object.assign({}, state, {
//         actionResults: [...prevResults, action.payload],
//       });
//     default:
//       return state;
//   }
// };



function Profile({ player }) {
  const [actionResults, setActionResults] = useState(localStorage.getItem('actionList')
    ? localStorage.getItem('actionList').split(',')
    : []);
  const [actionError, setActionError] = useState(null);
  const actions = ['Practice', 'Live', 'Tsunagari', 'Tweet'];
  const performAction = (userID) => {
    const data = {
      userID: userID,
    };
    return fetch("https://idol-game.herokuapp.com/action", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setActionResults((prevState) => {
          const newActionResults = prevState.length > 15 ? prevState.shift() : prevState
          return [...newActionResults, data]
        });
      })
      .catch((error) => setActionError(error));
  };

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
        <Actions performAction={performAction} actionResults={actionResults} userID={player.userid} actions={actions} />
      </div>
    </div>
  );
}

export default Profile;
