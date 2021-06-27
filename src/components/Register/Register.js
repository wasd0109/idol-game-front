import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorBar from '../ErrorBar/index';

function Register({ onRegister, error, resetError }) {
  const [email, setEmail] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 "
              htmlFor="password"
            >
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="******************"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              role="ConfirmPassword"
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <Link
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={(event) => {
                event.preventDefault();
                resetError();
                onRegister(email, password, confirmPassword, playerName);
              }}
              to="/dashboard"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              onClick={resetError}
            >
              <p>Login</p>
            </Link>
          </div>
          <div className="mt-4 mb-2">
            {error ? <ErrorBar msg={error} /> : null}
          </div>
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
