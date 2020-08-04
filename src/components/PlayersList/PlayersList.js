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
      <span
        className="text-xl text-bold cursor-pointer mx-1"
        onClick={() => setCurrentPage(i)}
        key={i}
      >
        {i}
      </span>
    );
  }
  console.log(currentPage);
  return (
    <div>
      <div className="w-8/12 m-auto flex">
        <h1 className="text-2xl text-bold">Players List</h1>
        <div className="flex mt-auto ml-auto">
          <span>Page: {pages}</span>
        </div>
      </div>
      {players.map((player, i) => {
        if (
          i > (currentPage - 1) * itemPerPage &&
          i < currentPage * itemPerPage
        ) {
          console.log((currentPage - 1) * itemPerPage);
          return <PlayerCard key={player.id} player={player} />;
        }
        return null;
      })}
    </div>
  );
}

export default PlayersList;
