import React from 'react';

function ErrorBar({ msg }) {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 my-2 rounded relative"
      role="alert"
    >
      <span className="block sm:inline">{msg}</span>
    </div>
  );
}

export default ErrorBar;
