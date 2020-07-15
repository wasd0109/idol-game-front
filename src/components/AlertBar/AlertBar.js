import React from 'react';

function AlertBar({ msg }) {
  return (
    <div
      className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3"
      role="alert"
    >
      {msg}
    </div>
  );
}

export default AlertBar;
