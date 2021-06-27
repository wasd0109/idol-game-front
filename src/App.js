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
    userId: localStorage.getItem('userId')
      ? localStorage.getItem('userId')
      : '',
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
  };

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('loggedIn') ? localStorage.getItem('loggedIn') : false
  );

  const [user, setUser] = useState(initialUser);

  const { userId, token } = user;

  useEffect(() => {
    if (loggedIn) {
      localStorage.setItem('userId', userId);
      localStorage.setItem('token', token);
      localStorage.setItem('loggedIn', String(loggedIn));
    }
    if (!loggedIn) {
      localStorage.clear();
    }
  }, [token, loggedIn, userId]);

  const [error, setError] = useState(undefined);

  const isEmpty = (string) => {
    return string.trim().length === 0 ? true : false;
  };

  const isEmail = (email) => {
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return email.match(pattern) ? true : false;
  };

  const onLogin = (email, password) => {
    if (isEmpty(email) || isEmpty(password)) {
      return setError('Please enter all information');
    }
    if (!isEmail(email)) {
      return setError('Please enter a valid email');
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
        if (data.token) {
          setUser(data);
          setLoggedIn(true);
        } else setError('User not found');
      })
      .catch((error) => [setError(error.keys)]);
  };

  const onRegister = (email, password, confirmPassword, playerName) => {
    if (
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(confirmPassword) ||
      isEmpty(playerName)
    ) {
      return setError('Please enter all information');
    } else if (password.length < 6) {
      return setError('Password too short');
    } else if (password !== confirmPassword) {
      return setError("Password don't match");
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
        if (data.token) {
          setUser(data);
          setLoggedIn(true);
        } else setError(data);
      })
      .catch((error) => console.log(error));
  };

  const resetError = () => {
    setError(null);
  };
  return (
    <Router>
      <Route exact path="/">
        {loggedIn ? (
          <MainPage setLoggedIn={setLoggedIn} userId={userId} />
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
