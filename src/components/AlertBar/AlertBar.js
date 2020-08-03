import React from 'react';

function AlertBar({ msg }) {
  return (
    <div
      className="items-center bg-blue-500 text-white font-semibold px-4 py-3 rounded"
      role="alert"
    >
      {msg}
    </div>
  );
}

export default AlertBar;
