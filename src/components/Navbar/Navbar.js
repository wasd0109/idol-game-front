import React from 'react';

function Navbar({ logout, Link }) {
  return (
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
  );
}

export default Navbar;
