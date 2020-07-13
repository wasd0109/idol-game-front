import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { getPlayerStats, logout } from './actions';
import Profile from './containers/Profile';
import Login from './components/Login';
import Register from './components/Register';
import './output.css';
import './App.css';

const mapStateToProps = (state) => {
  return {
    player: state.setPlayerStats.player,
    username: state.logUserIn.username,
    userID: state.logUserIn.userID,
    loggedIn: state.logUserIn.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPlayerStats: (userID) => dispatch(getPlayerStats(userID)),
    logout: () => dispatch(logout()),
  };
};

function App(props) {
  const { getPlayerStats, player, username, userID, loggedIn, logout } = props;
  useEffect(() => {
    if (loggedIn) {
      getPlayerStats(userID);
    }
  }, [userID]);
  if (!loggedIn) {
    return (
      <Router>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    );
  }
  // REMOVE THIS AND SWITCH TO OTHER COOKIE METHOD
  localStorage.setItem('username', username);
  localStorage.setItem('userID', userID);
  localStorage.setItem('loggedIn', loggedIn);
  return (
    <Router>
      <div>
        <nav className="flex flex-wrap bg-blue-300 p-4" id="navbar">
          <Link to="/" className="pr-2">
            Home
          </Link>

          <Link to="/players" className="pr-2">
            Player List
          </Link>
          <Link to="/" className="ml-auto">
            <button
              onClick={() => {
                localStorage.clear();
                logout();
              }}
            >
              Log Out
            </button>
          </Link>
        </nav>

        <Switch>
          <Route path="/">
            <Profile player={player} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
