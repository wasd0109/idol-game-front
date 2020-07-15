import React from 'react';

function ErrorBar({ msg }) {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <p className="block sm:inline">{msg}</p>
    </div>
  );
}

export default ErrorBar;
