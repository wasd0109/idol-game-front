import React, { useState, useEffect } from 'react';
import PlayerCard from '../PlayerCard';
import useFetch from '../../api';
// import players from './data';

function PlayersList() {
  const [itemPerPage, setItemPerPage] = useState(10);
  const [players, error, isLoading] = useFetch(
    'https://idol-game.herokuapp.com/players'
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageState, setPageState] = useState({
    pageUpper: players ? Math.round(players.length / itemPerPage) : 1,
    pageLower: 1,
  });

  const numberOfPages = players ? Math.round(players.length / itemPerPage) : 1;

  let pagesBtn = [];

  useEffect(() => {
    if (numberOfPages > 5 && currentPage > 3) {
      setPageState({
        pageUpper: currentPage + 2,
        pageLower: currentPage - 2,
      });
    }
  }, [currentPage, numberOfPages]);

  if (isLoading) return null;

  for (let i = pageState.pageLower; i <= numberOfPages; i++) {
    if (i <= pageState.pageUpper)
      pagesBtn.push(
        <span
          className={`text-xl text-bold mx-1 ${
            i === currentPage ? 'text-gray-600' : 'cursor-pointer'
          }`}
          onClick={() => setCurrentPage(i)}
          key={i}
          id={String(i)}
        >
          {i}
        </span>
      );
  }
  return (
    <div>
      <div className="w-8/12 m-auto flex">
        <h1 className="text-2xl text-bold">Players List</h1>
        <div className="flex mt-auto ml-auto">
          <span className="ml-auto">Page: {pagesBtn}</span>
        </div>
      </div>
      {players.map((player, i) => {
        if (
          i > (currentPage - 1) * itemPerPage &&
          i < currentPage * itemPerPage
        ) {
          return <PlayerCard key={player.id} player={player} />;
        }
        return null;
      })}
    </div>
  );
}

export default PlayersList;
