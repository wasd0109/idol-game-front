import React from 'react';
import { Link } from 'react-router-dom';

const generateNavBarButton = (name, link) => (
  <Link
    key={name}
    to={link}
    className="transition duration-500 hover:bg-white h-full pt-4 pr-2"
  >
    <p className="text-lg font-medium">{name}</p>
  </Link>
);

function Navbar({ logout }) {
  const navBarContent = [
    ['Home', '/'],
    ['Player List', '/players'],
    ['Battle', '/battle'],
    ['Setting', '/setting'],
  ];

  return (

    <nav className="flex flex-wrap bg-blue-300 pl-4" id="navbar">
      {navBarContent.map((button) =>
        generateNavBarButton(button[0], button[1])
      )}
      <Link
        to="/"
        className="transition duration-500 hover:bg-white h-full pt-4 px-2 mr-1 ml-auto"
        onClick={logout}
      >
        <p className="text-lg font-medium">Logout</p>
      </Link>
    </nav>

  );
}

export default Navbar;
