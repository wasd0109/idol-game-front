import React, { Suspense, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
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
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
  };

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('loggedIn') ? localStorage.getItem('loggedIn') : false
  );

  const [user, setUser] = useState(initialUser);

  const { username, token } = user;

  useEffect(() => {
    if (loggedIn) {
      localStorage.setItem('username', username);
      localStorage.setItem('token', token);
      localStorage.setItem('loggedIn', String(loggedIn));
    }
    if (!loggedIn) {
      localStorage.clear();
    }
  }, [token, loggedIn, username]);

  const [error, setError] = useState(undefined);

  const isEmpty = (string) => {
    return string.trim().length === 0 ? true : false;
  };

  const onLogin = (email, password) => {
    if (!email || !password) {
      return setError('Please enter all information');
    }
    const data = { email, password };
    const url =
      'http://localhost:5001/idolgame-back-f095d/us-central1/api/login';
    fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const token = data;
        if (token) {
          setUser({ token });
          setLoggedIn(true);
        } else setError(data);
      })
      .catch((error) => setError(error));
  };

  const onRegister = (email, password, confirmPassword, playerName) => {
    if (
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(confirmPassword) ||
      isEmpty(playerName)
    ) {
      return setError('Please enter all information');
    }
    const data = { email, password, confirmPassword, playerName };

    const url =
      'http://localhost:5001/idolgame-back-f095d/us-central1/api/register';

    fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const token = data;
        if (token) {
          setUser({ token });
          setLoggedIn(true);
        } else setError(data);
      })
      .catch((error) => setError(error));
  };

  const resetError = () => {
    setError(null);
  };
  return (
    <Router>
      <Route exact path="/">
        {loggedIn ? (
          <MainPage setLoggedIn={setLoggedIn} userID={token} />
        ) : (
          <Redirect to="/login" />
        )}
      </Route>

      <Suspense
        fallback={
          <div className="flex justify-center mt-24">
            <Loader type="TailSpin" color="#00BFFF" height={200} width={200} />
          </div>
        }
      >
        <Switch>
          <Route path="/register">
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <LazyRegister
                onRegister={onRegister}
                error={error}
                resetError={resetError}
              />
            )}
          </Route>
          <Route path="/login">
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Login onLogin={onLogin} error={error} resetError={resetError} />
            )}
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
