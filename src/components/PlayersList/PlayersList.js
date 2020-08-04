import React, { useState } from 'react';
import PlayerCard from '../PlayerCard';
import players from './data';

function PlayersList() {
  const itemPerPage = 10;
  const totalItem = players.length;
  const numberOfPages = totalItem / itemPerPage;
  const [currentPage, setCurrentPage] = useState(1);
  let pages = [];
  for (let i = 1; i <= numberOfPages; i++) {
    pages.push(
      <p
        className="text-xl text-bold cursor-pointer"
        onClick={() => setCurrentPage(i)}
      >
        {i}
      </p>
    );
  }
  return (
    <div>
      <div className="w-8/12 m-auto flex">
        <h1 className="text-2xl text-bold">Players List</h1>
        <div className="flex mt-auto ml-auto gap-2">{pages}</div>
      </div>
      {players.map((player, i) =>
        i < currentPage * itemPerPage ? (
          <PlayerCard key={player.id} player={player} />
        ) : null
      )}
    </div>
  );
}

export default PlayersList;
