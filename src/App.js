import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Profile from './containers/Profile';

import { getPlayerStats } from './actions';

import './output.css';
import './App.css';

const mapStateToProps = (state) => {
  return { player: state.setPlayerStats.player };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPlayerStats: () => dispatch(getPlayerStats()),
  };
};

function App(props) {
  const { getPlayerStats, player } = props;
  useEffect(() => {
    getPlayerStats();
  }, []);
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
