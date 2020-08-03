import React, { useState, useEffect } from 'react';
import Stats from '../../components/Stats';
import Actions from '../../components/Actions';
import Loader from 'react-loader-spinner';
// import useFetch from "../../api"


function Profile({ userID }) {
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

  const actionsProps = {
    actionResults,
    actionError,
    actions,
    performAction,
    userID
  }

  const [player, setPlayer] = useState({
    name: '',
    title: '',
    HP: 0,
    level: 0,
    element: '',
    exp: 0,
    attack: 0,
    defense: 0,
    magic_attack: 0,
    magic_defense: 0,
    agility: 0,
    luck: 0,
  });

  const [playerError, setPlayerError] = useState(null);
  const stats = [];
  const hiddenInfo = ['id', 'userid', 'message'];

  useEffect(() => {
    fetch(`https://idol-game.herokuapp.com/profile/${userID}`)
      .then((res) => res.json())
      .then((data) =>
        setPlayer(data[0]))

      .catch((error) => setPlayerError(error));
  }, [actionResults, userID])

  const statsProps = {
    stats,
    playerError
  }

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


  for (const [key, value] of Object.entries(player)) {
    if (!hiddenInfo.includes(key)) stats.push([key.replace('_', ' '), value]);
  }
  return (
    <div className="flex mx-4 my-2 flex-wrap">
      <div className="md:w-4/12 xl:w-3/12 h-auto" id="stats">
        <Stats {...statsProps} />
      </div>
      <div className="w-full my-2 md:my-0 md:w-7/12 m-auto">
        <Actions {...actionsProps} />
      </div>
    </div>
  );
}

export default Profile;
