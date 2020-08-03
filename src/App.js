import React, { Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { getPlayerStats, logout } from './actions';
import Profile from './containers/Profile';
import Login from './components/Login';
import Loader from 'react-loader-spinner';
import Navbar from './components/Navbar';
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
    if (!loggedIn) {
      localStorage.clear();
    }
  }, [userID, loggedIn, username, getPlayerStats]);

  return loggedIn ? (
    <Router>
      <Navbar logout={logout} />
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
