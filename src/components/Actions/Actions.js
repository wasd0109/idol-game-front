import React from 'react';
import './Actions.css';
import { connect } from 'react-redux';

import { performAction } from '../../actions';

const mapStateToProps = (state) => {
  console.log(state.receiveActionResults.actionResults);
  return {
    actionResults: state.receiveActionResults.actionResults,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    performAction: (event) => dispatch(performAction()),
  };
};

function Actions(props) {
  const { actionResults, performAction } = props;
  return (
    <div className="w-7/12 m-auto">
      <div id="performed" className="border-2 p-2 overflow-y-scroll">
        {actionResults.map((action, i) => {
          return (
            <h1 key={i} className="">
              {action}
            </h1>
          );
        })}
      </div>
      <div id="actions" className="flex justify-evenly my-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1  px-2 rounded w-2/12"
          id="practice"
          onClick={performAction}
        >
          Practice
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded w-2/12"
          id="live"
        >
          Live
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1  px-2 rounded w-2/12"
          id="tsunagari"
        >
          Tsunagari
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1  px-2 rounded w-2/12"
          id="tweet"
        >
          Tweet
        </button>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Actions);
