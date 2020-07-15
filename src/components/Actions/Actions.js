import React, { useState, useEffect } from 'react';
import './Actions.css';
import { connect } from 'react-redux';
import AlertBar from '../AlertBar';
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
  const coolDownTime = process.env.NODE_ENV === 'development' ? 2000 : 60000;
  const [timer, setTimer] = useState(
    Number(localStorage.getItem('timer')) || coolDownTime
  );
  useEffect(() => {
    if (timer) {
      const btnList = document.querySelectorAll('.action-button');
      timer > 0 && setTimeout(() => setTimer(timer - 1000), 1000);
      if (!timer) {
        btnList.forEach((btn) => btn.removeAttribute('disabled'));
        localStorage.removeItem('timer');
      }
    }
    localStorage.setItem('timer', String(timer));
  }, [timer, coolDownTime]);

  useEffect(() => {
    const performed = document.querySelector('#performed');
    performed.scrollTop = performed.scrollHeight;
  }, [actionResults]);

  const startCoolDown = () => {
    setTimer(coolDownTime);
    const btnList = document.querySelectorAll('.action-button');
    btnList.forEach((btn) => btn.setAttribute('disabled', ''));
  };

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
        <button
          className="action-button text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-1  px-2 rounded w-5/12 md:w-2/12"
          id="practice"
          onClick={(event) => {
            performAction(event);
            startCoolDown();
          }}
          value={userID}
        >
          Practice
        </button>
        <button
          className="action-button text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded w-5/12 md:w-2/12"
          id="live"
          onClick={(event) => {
            performAction(event);
            startCoolDown();
          }}
          value={userID}
        >
          Live
        </button>
        <button
          className="action-button  bg-blue-500 hover:bg-blue-700 text-white font-bold py-1  md:px-2 rounded w-5/12 mt-2 md:m-0 md:w-2/12"
          id="tsunagari"
          onClick={(event) => {
            performAction(event);
            startCoolDown();
          }}
          value={userID}
        >
          Tsunagari
        </button>
        <button
          className="action-button text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-1  px-2 rounded w-5/12 mt-2 md:m-0 md:w-2/12"
          id="tweet"
          onClick={(event) => {
            performAction(event);
            startCoolDown();
          }}
          value={userID}
        >
          Tweet
        </button>
      </div>

      {timer ? (
        <AlertBar msg={`Cooling down, please wait ${timer / 1000} seconds`} />
      ) : (
        <AlertBar msg={'Press button to perform action'} />
      )}
    </React.Fragment>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Actions);
