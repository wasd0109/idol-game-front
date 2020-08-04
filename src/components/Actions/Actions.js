import React, { useState, useEffect } from 'react';
import './Actions.css';
import AlertBar from '../AlertBar';

function Actions({ actionResults, performAction, userID, actions }) {

  const coolDownTime =
    (process.env.NODE_ENV === 'development' ||
      process.env.JEST_WORKER_ID !== undefined)
      ? 2000
      : 60000;

  const [timer, setTimer] = useState(
    Number(localStorage.getItem('timer')) || 0
  );

  const [isCoolDown, setIsCoolDown] = useState(false);

  useEffect(() => {
    const btnList = document.querySelectorAll('.action-button');
    isCoolDown ?
      btnList.forEach((btn) => btn.setAttribute('disabled', '')) :
      btnList.forEach((btn) => btn.removeAttribute('disabled'));
  }, [isCoolDown]);

  useEffect(() => {
    timer > 0 ?
      setTimeout(() => setTimer(timer - 1000), 1000) :
      setIsCoolDown(false);
    localStorage.removeItem('timer');
    localStorage.setItem('timer', String(timer));
  }, [timer])

  useEffect(() => {
    const performed = document.querySelector('#performed');
    performed.scrollTop = performed.scrollHeight;
  }, [actionResults]);

  const startCoolDown = () => {
    setTimer(coolDownTime);
    setIsCoolDown(true);
  }

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
        {actions.map((action) => (
          <button
            key={action}
            className="action-button bg-blue-500 my-2 md:m-0 hover:bg-blue-400 p-2 rounded w-5/12 md:w-2/12"
            id={action}
            onClick={() => {
              performAction(userID);
              startCoolDown();
            }}
          >
            <p className="text-white font-bold">{action}</p>
          </button>
        ))}
      </div>
      <AlertBar msg={timer ? `Cooling down, please wait for ${timer / 1000} seconds` : 'Press button to perform action'} />
    </React.Fragment>
  );
}

export default Actions;
