import React, { useState, useEffect } from 'react';
import Stats from '../../components/Stats';
import Actions from '../../components/Actions';

function Profile({ userId }) {
  const actions = ['Practice', 'Live', 'Tsunagari', 'Tweet'];
  const [actionResults, setActionResults] = useState([]);
  const [actionError, setActionError] = useState(null);
  const [player, setPlayer] = useState({
    name: null,
    title: null,
    HP: null,
    level: null,
    element: null,
    exp: null,
    attack: null,
    defense: null,
    magic_attack: null,
    magic_defense: null,
    agility: null,
    luck: null,
  });

  const [playerError, setPlayerError] = useState(null);

  const prettifyStats = (stats) => {
    const {
      playerName,
      HP,
      level,
      exp,
      attack,
      defense,
      magicAttack,
      magicDefense,
      agility,
      luck,
      element,
      title,
    } = stats;

    return {
      name: playerName,
      title,
      HP,
      level,
      element,
      exp,
      attack,
      defense,
      magic_attack: magicAttack,
      magic_defense: magicDefense,
      agility,
      luck,
    };
  };

  const performAction = (userId) => {
    const data = {
      userId: userId,
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
    console.log(userId);
    fetch(
      `http://localhost:5001/idolgame-back-f095d/us-central1/api/profile?userId=${userId}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPlayer(data);
      })
      .catch((error) => setPlayerError(error));
  }, [actionResults, userId]);

  const stats = [];

  const prettyStats = prettifyStats(player);
  const hiddenInfo = ['uid', 'message'];
  for (const [key, value] of Object.entries(prettyStats)) {
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
    userId,
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
