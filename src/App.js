import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainPage from './containers/MainPage';
import Login from './components/Login';
import Loader from 'react-loader-spinner';
import './output.css';
import './App.css';
const LazyRegister = React.lazy(() => import('./components/Register'));


function App() {
  const initialUser = {
    username: localStorage.getItem('username')
      ? localStorage.getItem('username')
      : '',
    userID: localStorage.getItem('userID') ? localStorage.getItem('userID') : "0",
  }

  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn')
    ? localStorage.getItem('loggedIn')
    : false);

  const [user, setUser] = useState(initialUser);

  const { username, userID } = user;

  useEffect(() => {
    if (loggedIn) {
      localStorage.setItem('username', username);
      localStorage.setItem('userID', userID);
      localStorage.setItem('loggedIn', String(loggedIn));
    }
    if (!loggedIn) {
      localStorage.clear();
    }
  }, [userID, loggedIn, username]);

  const [error, setError] = useState(undefined);

  const onSubmit = (username, password, playerName = undefined) => {
    if ((!username || !password || playerName === null)) {
      return setError("Please enter all information")
    }
    const data = playerName ? { username, password, name: playerName } : { username, password };
    const url = playerName ? 'https://idol-game.herokuapp.com/register' : 'https://idol-game.herokuapp.com/login';
    fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => res.json()).then(data => {
      const { username, id } = data;
      if (username && id) {
        setUser({ username: username, userID: id });
        setLoggedIn(true);
      }
      else setError(data)
    }).catch((error) => setError(error))
  }

  const resetError = () => {
    setError(null);
  }

  return loggedIn ? (
    <MainPage userID={userID} setLoggedIn={setLoggedIn} />
  ) : (
      <Suspense
        fallback={
          <div className="flex justify-center mt-24">
            <Loader type="TailSpin" color="#00BFFF" height={200} width={200} />
          </div>
        }
      >
        <Router>
          <Switch>
            <Route path="/register">
              <LazyRegister onSubmit={onSubmit} error={error} resetError={resetError} />
            </Route>
            <Route path="/">
              <Login onSubmit={onSubmit} error={error} resetError={resetError} />
            </Route>
          </Switch>
        </Router>
      </Suspense>
    );
}

export default App;
