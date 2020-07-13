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

export const getPlayerStats = (userID) => (dispatch) => {
  dispatch({ type: GET_PLAYER_STATS_PENDING });
  fetch(`http://localhost:3002/profile/${userID}`)
    .then((res) => res.json())
    .then((data) =>
      dispatch({ type: GET_PLAYER_STATS_SUCCESS, payload: data[0] })
    )
    .catch(() => dispatch({ type: GET_PLAYER_STATS_FAILED }));
};

export const performAction = (event) => (dispatch) => {
  // dispatch({ type: ACTION_PENDING });
  // console.log(event.target.id);
  // const player = {
  //   name: 'Pekorin',
  //   title: 'center',
  //   HP: '100',
  //   level: '1',
  //   attack: '23',
  //   defense: '40',
  //   magic_attack: '50',
  //   magic_defense: '15',
  //   element: 'fire',
  //   agility: '10',
  //   luck: '5',
  // };
  // const results = `Practice for live 1 level up`;
  // dispatch({ type: GET_PLAYER_STATS_SUCCESS, payload: player });
  // dispatch({ type: ACTION_SUCCESS, payload: results });
};

export const login = (username, password) => (dispatch) => {
  const data = { username, password };
  dispatch({ type: LOGIN_PENDING });
  fetch('http://localhost:3002/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.id) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { username: data.username, userID: data.id, loggedIn: true },
        });
      }
    })
    .catch(dispatch({ type: LOGIN_FAILED }));
};

export const register = (playerName, username, password) => (dispatch) => {
  dispatch({ type: REGISTER_PENDING });
  const data = { name: playerName, username, password };
  fetch('http://localhost:3002/register', {
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
        dispatch({
          type: REGISTER_SUCCESS,
          payload: { userID: id, username, loggedIn: true },
        });
      }
    })
    .catch((err) => {
      dispatch({ type: REGISTER_FAILED, payload: err });
    });
};

export const logout = () => ({
  type: LOGOUT,
});
