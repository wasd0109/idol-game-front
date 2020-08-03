import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Profile from './containers/Profile';
import Login from './components/Login';
import Loader from 'react-loader-spinner';
import Navbar from './components/Navbar';
import './output.css';
import './App.css';
const LazyRegister = React.lazy(() => import('./components/Register'));


function App(props) {
  const initialUser = {
    username: localStorage.getItem('username')
      ? localStorage.getItem('username')
      : '',
    userID: localStorage.getItem('userID') ? localStorage.getItem('userID') : "0",
  }
  const { logout } = props;
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

  const handleLogin = (username, id) => {
    if (username || id) {
      setUser({ username: username, userID: id });
      setLoggedIn(true);
    }
  }

  const [error, setError] = useState(undefined);

  const onSubmit = (username, password, playerName = undefined) => {
    setError(null);
    const data = playerName ? { username, password, playerName } : { username, password };
    const url = playerName ? 'https://idol-game.herokuapp.com/register' : 'https://idol-game.herokuapp.com/login';
    fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => res.json()).then(data => {
      const { username, id } = data;
      if (username && id) handleLogin(username, id)
      else setError(data)
    }).catch((error) => setError(error))
  }

  const resetError = () => {
    setError(null);
  }

  const onLogout = () => {
    setLoggedIn(!loggedIn);
  }

  return loggedIn ? (
    <Router>
      <Navbar onLogout={onLogout} />
      <div>
        <Switch>
          <Route path="/">
            <Profile userID={userID} />
          </Route>
        </Switch>
      </div>
    </Router>
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
