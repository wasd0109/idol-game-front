import React, { useState } from 'react';
import { Link } from "react-router-dom";
import ErrorBar from '../ErrorBar';
import AlertBar from '../AlertBar';

function Login({ onSubmit, error, resetError }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  if (error && isLoggingIn) setIsLoggingIn(false);
  return (
    <div className="flex justify-center mt-4 md:mt-16">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-2 mb-4">
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
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
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
                if (username && password)
                  setIsLoggingIn(true);
                resetError();
                onSubmit(username, password)
              }}
            >
              Login
            </button>
            <Link to="/register" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" onClick={resetError}><p>Register</p></Link>
          </div>
          <div className="mt-4 mb-2">{error ? <ErrorBar msg={error} /> : null}
            {isLoggingIn ? <AlertBar msg="Logging in" /> : null}</div>
        </form>
      </div>
    </div>
  );
}

export default Login;
