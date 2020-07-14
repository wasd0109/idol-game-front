import React, { useState, useEffect } from 'react';
import './Actions.css';
import { connect } from 'react-redux';

import { performAction } from '../../actions';

const mapStateToProps = (state) => {
  return {
    actionResults: state.receiveActionResults.actionResults,
    userID: state.logUserIn.userID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    performAction: (event) => {
      dispatch(performAction(event));
    },
  };
};

function Actions(props) {
  const { actionResults, performAction, userID } = props;
  const countdownSecond = process.env.NODE_ENV === 'development' ? 2000 : 60000;
  const [coolDown, setCoolDown] = useState(
    Boolean(Number(localStorage.getItem('cooldown'))) || false
  );
  const [timer, setTimer] = useState(
    Number(localStorage.getItem('timer')) || countdownSecond
  );
  useEffect(() => {
    if (coolDown) {
      const btnList = document.querySelectorAll('.action-button');
      btnList.forEach((btn) => btn.setAttribute('disabled', ''));
      timer > 0 && setTimeout(() => setTimer(timer - 1000), 1000);
      if (!timer) {
        setCoolDown(false);
        setTimer(countdownSecond);
        btnList.forEach((btn) => btn.removeAttribute('disabled'));
        localStorage.setItem('timer', String(timer));
        localStorage.setItem('cooldown', String(Number(coolDown)));
      }
    }
    localStorage.setItem('timer', String(timer));
    localStorage.setItem('cooldown', String(Number(coolDown)));
  }, [timer, coolDown, countdownSecond]);

  const coolDownTimer = () => {
    setCoolDown(true);
  };

  return (
    <div className="w-full my-2 md:my-0 md:w-7/12 m-auto">
      <div id="performed" className="border-2 p-2 overflow-y-scroll capitalize">
        {actionResults.map((action, i) => {
          return action.split('\n').map((line, j) => {
            return (
              <h1 key={i + j} className="">
                {line}
              </h1>
            );
          });
        })}
      </div>
      <div id="actions" className="flex justify-evenly my-2">
        <button
          className="action-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-1  px-2 rounded w-2/12"
          id="practice"
          onClick={(event) => {
            performAction(event);
            coolDownTimer();
          }}
          value={userID}
        >
          Practice
        </button>
        <button
          className="action-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded w-2/12"
          id="live"
          onClick={(event) => {
            performAction(event);
            coolDownTimer();
          }}
          value={userID}
        >
          Live
        </button>
        <button
          className="action-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-1  px-2 rounded w-2/12"
          id="tsunagari"
          onClick={(event) => {
            performAction(event);
            coolDownTimer();
          }}
          value={userID}
        >
          Tsunagari
        </button>
        <button
          className="action-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-1  px-2 rounded w-2/12"
          id="tweet"
          onClick={(event) => {
            performAction(event);
            coolDownTimer();
          }}
          value={userID}
        >
          Tweet
        </button>
      </div>
      {coolDown ? (
        <div
          className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3"
          role="alert"
        >
          <p>Cooling down, please wait {timer / 1000} seconds</p>
        </div>
      ) : null}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Actions);
