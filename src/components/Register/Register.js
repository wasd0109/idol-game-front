import React, { useState } from 'react';
import { Link } from "react-router-dom";
import ErrorBar from '../ErrorBar/index';

function Register({ onSubmit, error, resetError }) {
  const [username, setUsername] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="flex justify-center mt-4 md:mt-16">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-2 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="playername"
            >
              Player Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="playername"
              type="text"
              placeholder="Player Name"
              value={playerName}
              onChange={(event) => setPlayerName(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 "
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={(event) => {
                event.preventDefault();
                resetError();
                onSubmit(username, password, playerName,);
              }}
            >
              Register
            </button>
            <Link to="/" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" onClick={resetError}><p>Login</p></Link>
          </div>
          <div className="mt-4 mb-2">{error ? <ErrorBar msg={error} /> : null}</div>
        </form>
        <div className="text-center">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://myidol46.netlify.app/privacy"
          >
            Privacy Claim
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;
