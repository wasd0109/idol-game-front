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
  REGISTER_PENDING,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGOUT,
} from './constants';

const backendURL = 'https://idol-game.herokuapp.com';

export const getPlayerStats = (userID) => (dispatch) => {
  dispatch({ type: GET_PLAYER_STATS_PENDING });
  return fetch(`${backendURL}/profile/${userID}`)
    .then((res) => res.json())
    .then((data) =>
      dispatch({ type: GET_PLAYER_STATS_SUCCESS, payload: data[0] })
    )
    .catch(() => dispatch({ type: GET_PLAYER_STATS_FAILED }));
};

export const performAction = (userID, action) => (dispatch) => {
  dispatch({ type: ACTION_PENDING });
  const data = {
    action: action,
    userID: userID,
  };
  return fetch(`${backendURL}/action`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: ACTION_SUCCESS, payload: data });
    })
    .catch(() => dispatch({ type: ACTION_FAILED }));
};

export const login = (username, password) => (dispatch) => {
  if (!username || !password)
    return dispatch({
      type: LOGIN_FAILED,
      payload: 'Please enter all information',
    });
  const data = { username, password };
  dispatch({ type: LOGIN_PENDING });
  return fetch(`${backendURL}/login`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.id) {
        return dispatch({
          type: LOGIN_SUCCESS,
          payload: { username: data.username, userID: data.id, loggedIn: true },
        });
      }
      dispatch({ type: LOGIN_FAILED, payload: 'Wrong username/password' });
    })
    .catch(() =>
      dispatch({ type: LOGIN_FAILED, payload: 'Something went wrong' })
    );
};

export const register = (playerName, username, password) => (dispatch) => {
  if (!playerName || !username || !password)
    return dispatch({
      type: REGISTER_FAILED,
      payload: 'Please enter all information',
    });
  dispatch({ type: REGISTER_PENDING });
  const data = { name: playerName, username, password };
  return fetch(`${backendURL}/register`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      const { id, username } = data[0];
      if (id) {
        return dispatch({
          type: REGISTER_SUCCESS,
          payload: { userID: id, username, loggedIn: true },
        });
      }
      return dispatch({
        type: REGISTER_FAILED,
        payload: 'Username/Player Name already existed',
      });
    })
    .catch((err) => {
      dispatch({ type: REGISTER_FAILED, payload: 'Something went wrong' });
    });
};

export const logout = () => ({
  type: LOGOUT,
});
