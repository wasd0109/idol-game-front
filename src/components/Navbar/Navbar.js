import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const generateNavBarButton = (name, link, currentLocation) => (
  <Link
    key={name}
    to={link}
    className={`transition duration-500 hover:bg-white h-full pt-4 pr-2 ${
      currentLocation === link ? 'bg-white' : ''
    }`}
    id={link}
  >
    <p className="text-lg font-medium">{name}</p>
  </Link>
);

function Navbar({ onLogout, navBarContent }) {
  const location = useLocation();
  return (
    <nav className="flex flex-wrap bg-blue-300 pl-4" id="navbar">
      {navBarContent.map((button) =>
        generateNavBarButton(button[0], button[1], location.pathname)
      )}
      <Link
        to="/"
        className="transition duration-500 hover:bg-white h-full pt-4 px-2 mr-1 ml-auto"
        onClick={onLogout}
      >
        <p className="text-lg font-medium">Logout</p>
      </Link>
    </nav>
  );
}

export default Navbar;
