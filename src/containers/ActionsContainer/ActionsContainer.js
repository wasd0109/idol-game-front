// import React, { useEffect } from 'react';
// import { connect } from 'react-redux';
// import { getPlayerStats } from '../../actions';
// import Actions from '../../components/Actions';

// const mapStateToProps = (state) => {
//   return {
//     userID: state.logUserIn.userID,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getPlayerStats: (userID) => dispatch(getPlayerStats(userID)),
//   };
// };



// function ActionsContainer(props) {

//   const { actionResults, userID, getPlayerStats } = props;


//   useEffect(() => {
//     if (actionResults.length !== 0) {
//       getPlayerStats(userID)
//     }
//   }, [actionResults, userID, getPlayerStats])
//   return <Actions {...props} actions={actions} />;
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ActionsContainer);
