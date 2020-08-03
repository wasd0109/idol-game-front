import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { performAction, getPlayerStats } from '../../actions';
import Actions from '../../components/Actions';

const mapStateToProps = (state) => {
  return {
    actionResults: state.receiveActionResults.actionResults,
    userID: state.logUserIn.userID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    performAction: (userID, action) =>
      dispatch(performAction(userID, action))
    ,
    getPlayerStats: (userID) => dispatch(getPlayerStats(userID)),
  };
};

function ActionsContainer(props) {
  const actions = ['Practice', 'Live', 'Tsunagari', 'Tweet'];
  const { actionResults, userID, getPlayerStats } = props;
  useEffect(() => {
    if (actionResults.length !== 0) {
      getPlayerStats(userID)
    }
  }, [actionResults, userID, getPlayerStats])
  return <Actions {...props} actions={actions} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionsContainer);
