import {
  ACTION_PENDING,
  ACTION_SUCCESS,
  ACTION_FAILED,
  GET_PLAYER_STATS_PENDING,
  GET_PLAYER_STATS_SUCCESS,
  GET_PLAYER_STATS_FAILED,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
} from './constants';

export const getPlayerStats = (userID) => (dispatch) => {
  console.log(userID);
  dispatch({ type: GET_PLAYER_STATS_PENDING });
  if (Number(userID) === 0) {
    const player = {
      name: 'Pekorin',
      title: 'center',
      HP: '100',
      level: '0',
      attack: '23',
      defense: '30',
      magic_attack: '30',
      magic_defense: '15',
      element: 'fire',
      agility: '10',
      luck: '5',
    };
    dispatch({ type: GET_PLAYER_STATS_SUCCESS, payload: player });
  } else {
    dispatch({ type: GET_PLAYER_STATS_FAILED });
  }
};

export const performAction = (event) => (dispatch) => {
  dispatch({ type: ACTION_PENDING });
  console.log(event.target.id);
  const player = {
    name: 'Pekorin',
    title: 'center',
    HP: '100',
    level: '1',
    attack: '23',
    defense: '40',
    magic_attack: '50',
    magic_defense: '15',
    element: 'fire',
    agility: '10',
    luck: '5',
  };
  const results = `Practice for live 1 level up`;
  dispatch({ type: GET_PLAYER_STATS_SUCCESS, payload: player });
  dispatch({ type: ACTION_SUCCESS, payload: results });
};

export const login = (username, password) => (dispatch) => {
  dispatch({ type: LOGIN_PENDING });
  if (username === 'wasd0109' && password === '123456') {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { username: 'wasd0109', userID: 0, loggedIn: true },
    });
    dispatch(getPlayerStats(0));
  } else {
    dispatch({ type: LOGIN_FAILED });
  }
};

export const logout = () => ({
  type: LOGOUT,
  payload: false,
});
