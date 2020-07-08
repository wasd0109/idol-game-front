import React from 'react';
import './Actions.css';

const performed = [
  'Running',
  'Joking',
  'Haha',
  'Catch',
  'Running',
  'Joking',
  'Haha',
  'Catch',
  'Running',
  'Joking',
  'Haha',
  'Catch',
  'Joking',
  'Haha',
  'Catch',
  'Running',
  'Joking',
  'Haha',
  'Catch',
];

function Actions() {
  return (
    <div className="w-6/12">
      <div id="performed" className="border-2 p-2 overflow-y-scroll">
        {performed.map((action, i) => {
          return <h1 className="">{action}</h1>;
        })}
      </div>
      <div id="actions" className="flex justify-evenly my-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded w-2/12"
          id="practice"
        >
          Practice
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded w-2/12"
          id="live"
        >
          Live
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded w-2/12"
          id="tsunagari"
        >
          Tsunagari
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded w-2/12"
          id="tweet"
        >
          Tweet
        </button>
      </div>
    </div>
  );
}

export default Actions;
