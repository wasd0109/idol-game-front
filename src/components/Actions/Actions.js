import React, { useState, useEffect } from 'react';
import './Actions.css';
import AlertBar from '../AlertBar';

function Actions({ actionResults, performAction, userID, actions }) {
  const coolDownTime =
    process.env.NODE_ENV === 'development' ||
      process.env.JEST_WORKER_ID !== undefined
      ? 2000
      : 60000;
  const [timer, setTimer] = useState(
    Number(localStorage.getItem('timer')) || 0
  );
  useEffect(() => {
    const btnList = document.querySelectorAll('.action-button');
    if (timer) {
      timer > 0 && setTimeout(() => setTimer(timer - 1000), 1000);
      btnList.forEach((btn) => btn.setAttribute('disabled', ''));
    } else {
      btnList.forEach((btn) => btn.removeAttribute('disabled'));
    }
    localStorage.removeItem('timer');
    localStorage.setItem('timer', String(timer));
  }, [timer, coolDownTime]);

  useEffect(() => {
    const performed = document.querySelector('#performed');
    performed.scrollTop = performed.scrollHeight;
  }, [actionResults]);

  const startCoolDown = () => {
    setTimer(coolDownTime);
  };

  const actionBar = actions.map((action) => (

    <button
      key={action}
      className="action-button bg-blue-500 my-2 md:m-0 hover:bg-blue-400 p-2 rounded w-5/12 md:w-2/12"
      id={action}
      onClick={(event) => {
        performAction(event.currentTarget.value);
        startCoolDown();
      }}
      value={userID}
    >
      <p className="text-white font-bold">{action}</p>
    </button>
  ));

  return (
    <React.Fragment>
      <div id="performed" className="border-2 p-2 overflow-y-scroll capitalize">
        {actionResults.map((action, i) => {
          return action.split('\n').map((line, j) => {
            return <h1 key={i + j}>{line}</h1>;
          });
        })}
      </div>
      <div
        id="actions"
        className="flex justify-evenly my-2 flex-wrap md:no-wrap"
      >
        {actionBar}
      </div>
      {timer ? (
        <AlertBar msg={`Cooling down, please wait ${timer / 1000} seconds`} />
      ) : (
          <AlertBar msg={'Press button to perform action'} />
        )}
    </React.Fragment>
  );
}

export default Actions;
