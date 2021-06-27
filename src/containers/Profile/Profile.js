import React, { useState, useEffect } from 'react';
import Stats from '../../components/Stats';
import Actions from '../../components/Actions';

function Profile({ userID }) {
  const actions = ['Practice', 'Live', 'Tsunagari', 'Tweet'];
  const [actionResults, setActionResults] = useState([]);
  const [actionError, setActionError] = useState(null);
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

  const performAction = (userID) => {
    const data = {
      userID: userID,
    };
    return fetch('https://idol-game.herokuapp.com/action', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setActionResults((prevState) => {
          const newActionResults =
            prevState.length > 15 ? prevState.shift() : prevState;
          return [...newActionResults, data];
        });
      })
      .catch((error) => setActionError(error));
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:3001/profile/${userID}`)
      .then((res) => res.json())
      .then((data) => {
        setPlayer(data);
      })
      .catch((error) => setPlayerError(error));
  }, [actionResults, userID]);

  const stats = [];
  const hiddenInfo = ['id', 'userid', 'message'];
  for (const [key, value] of Object.entries(player)) {
    if (!hiddenInfo.includes(key)) stats.push([key.replace('_', ' '), value]);
  }

  const statsProps = {
    stats,
    playerError,
  };

  const actionsProps = {
    actionResults,
    actionError,
    actions,
    performAction,
    userID,
  };
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
