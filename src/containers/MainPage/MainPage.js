import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Navbar from '../../components/Navbar';
import Profile from '../../containers/Profile';
const LazyPlayersList = React.lazy(() =>
  import('../../components/PlayersList')
);

function MainPage({ setLoggedIn, userID }) {
  const onLogout = () => {
    setLoggedIn(false);
  };

  const navBarContent = [
    ['Home', '/'],
    ['Player List', '/players'],
    ['Battle', '/battle'],
    ['Setting', '/setting'],
  ];

  const navBarProps = {
    navBarContent,
    onLogout,
  };

  return (
    <Router>
      <Navbar {...navBarProps} />
      <Suspense
        fallback={
          <div className="flex justify-center mt-24">
            <Loader type="TailSpin" color="#00BFFF" height={200} width={200} />
          </div>
        }
      >
        <Switch>
          <Route path="/players">
            <LazyPlayersList />
          </Route>
          <Route path="/">
            <Profile userID={userID} />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default MainPage;
