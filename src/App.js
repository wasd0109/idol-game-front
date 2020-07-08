import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Profile from './containers/Profile';
import './output.css';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <div id="navbar">
          <nav className="flex flex-wrap bg-blue-300 p-6">
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
            <Profile />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
