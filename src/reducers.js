import {
  ACTION_PENDING,
  ACTION_SUCCESS,
  ACTION_FAILED,
  GET_PLAYER_STATS_PENDING,
  GET_PLAYER_STATS_SUCCESS,
  GET_PLAYER_STATS_FAILED,
} from './constants';

const initialPlayerStats = {
  player: {
    name: '',
    title: '',
    HP: 0,
    element: '',
    level: 0,
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
    default:
      return state;
  }
};

const initialActionResults = { actionResults: [] };

export const receiveActionResults = (
  state = initialActionResults,
  action = {}
) => {
  switch (action.type) {
    case ACTION_SUCCESS:
      return Object.assign({}, state, {
        actionResults: state.actionResults.concat([action.payload]),
      });
    default:
      return state;
  }
};
