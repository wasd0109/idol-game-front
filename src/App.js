import React, { Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { getPlayerStats, logout } from './actions';
import Profile from './containers/Profile';
import Login from './components/Login';
import Loader from 'react-loader-spinner';
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

const generateNavBarButton = (name, link) => (
  <Link
    to={link}
    className="transition duration-500 hover:bg-white h-full pt-2 pr-2"
  >
    <p className="text-lg font-medium">{name}</p>
  </Link>
);

function App(props) {
  const {
    getPlayerStats,
    player,
    username,
    userID,
    loggedIn,
    logout,
    currentLocation,
  } = props;
  useEffect(() => {
    if (loggedIn) {
      getPlayerStats(userID);
      localStorage.setItem('username', username);
      localStorage.setItem('userID', userID);
      localStorage.setItem('loggedIn', loggedIn);
    }
  }, [userID, loggedIn, username, getPlayerStats]);

  const navBarContent = [
    ['Home', '/'],
    ['Player List', '/players'],
    ['Battle', '/battle'],
    ['Setting', '/setting'],
  ];
  return loggedIn ? (
    <Router>
      <nav className="flex flex-wrap bg-blue-300 pl-4" id="navbar">
        {navBarContent.map((button) =>
          generateNavBarButton(button[0], button[1])
        )}
        <Link
          to="/"
          className="transition duration-500 hover:bg-white h-full pt-2 px-2 mr-1 ml-auto"
          onClick={logout}
        >
          <p className="text-lg font-medium">Logout</p>
        </Link>
      </nav>
      <div>
        <Switch>
          <Route path="/">
            <Profile player={player} />
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
