import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Profile from './containers/Profile';

import { getPlayerStats, logout } from './actions';

import './output.css';
import './App.css';
import Login from './components/Login';

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
    getPlayerStats(userID);
  }, []);
  if (!loggedIn) {
    return <Login />;
  }
  // REMOVE THIS AND SWITCH TO OTHER COOKIE METHOD
  localStorage.setItem('username', username);
  localStorage.setItem('userID', userID);
  localStorage.setItem('loggedIn', loggedIn);
  return (
    <Router>
      <div>
        <div id="navbar">
          <nav className="flex flex-wrap bg-blue-300 p-4">
            <Link to="/" className="pr-2">
              Home
            </Link>

            <Link to="/players" className="pr-2">
              Player List
            </Link>
            <button
              className="ml-auto"
              onClick={() => {
                localStorage.clear();
                logout();
              }}
            >
              Log Out
            </button>
          </nav>
        </div>
        <Switch>
          <Route path="/">
            <Profile char={player} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
