import {
  // ACTION_PENDING,
  ACTION_SUCCESS,
  // ACTION_FAILED,
  // GET_PLAYER_STATS_PENDING,
  GET_PLAYER_STATS_SUCCESS,
  // GET_PLAYER_STATS_FAILED,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  REGISTER_PENDING,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from './constants';

const initialPlayerStats = {
  player: {
    name: '',
    title: '',
    HP: 0,
    level: 0,
    element: '',
    exp: 0,
    attack: 0,
    defense: 0,
    magic_attack: 0,
    magic_defense: 0,
    agility: 0,
    luck: 0,
  },
};

export const setPlayerStats = (state = initialPlayerStats, action = {}) => {
  switch (action.type) {
    case GET_PLAYER_STATS_SUCCESS:
      return Object.assign({}, state, { player: action.payload });
    case LOGOUT:
      return Object.assign({}, state, {});
    default:
      return state;
  }
};

const initialActionResults = {
  actionResults: localStorage.getItem('actionList')
    ? localStorage.getItem('actionList').split(',')
    : [],
};

export const receiveActionResults = (
  state = initialActionResults,
  action = {}
) => {
  switch (action.type) {
    case ACTION_SUCCESS:
      if (state.actionResults.length > 15) {
        state.actionResults.shift();
      }
      return Object.assign({}, state, {
        actionResults: state.actionResults.concat([action.payload]),
      });
    default:
      return state;
  }
};

const initialUser = {
  username: localStorage.getItem('username')
    ? localStorage.getItem('username')
    : '',
  userID: localStorage.getItem('userID') ? localStorage.getItem('userID') : 0,
  loggedIn: localStorage.getItem('loggedIn')
    ? localStorage.getItem('loggedIn')
    : false,
};

export const logUserIn = (state = initialUser, action = {}) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return Object.assign({}, state, {
        username: action.payload.username,
        userID: action.payload.userID,
        loggedIn: action.payload.loggedIn,
      });
    case LOGOUT:
      return Object.assign({}, state, { loggedIn: false });
    default:
      return state;
  }
};

const initialError = {
  isError: false,
  errorMessage: '',
};

export const triggerError = (state = initialError, action = {}) => {
  switch (action.type) {
    case LOGIN_FAILED:
    case REGISTER_FAILED:
      return Object.assign({}, state, {
        isError: true,
        errorMessage: action.payload,
      });
    case LOGIN_PENDING:
    case REGISTER_PENDING:
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return { ...state, isError: false };
    default:
      return state;
  }
};
