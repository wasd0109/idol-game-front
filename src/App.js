import React, { Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { getPlayerStats, logout } from './actions';
import Profile from './containers/Profile';
import Login from './components/Login';
import './output.css';
import './App.css';
const LazyRegister = React.lazy(() => import('./components/Register'));

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
      localStorage.setItem('username', username);
      localStorage.setItem('userID', userID);
      localStorage.setItem('loggedIn', loggedIn);
    }
  }, [userID, loggedIn, username, getPlayerStats]);
  if (!loggedIn) {
    return (
      <Suspense fallback={<div>Loading</div>}>
        <Router>
          <Switch>
            <Route path="/register">
              <LazyRegister />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </Router>
      </Suspense>
    );
  }
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
