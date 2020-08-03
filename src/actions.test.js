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

import * as actions from './actions';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();

const mockStore = configureMockStore([thunkMiddleware]);

let store;

beforeEach(() => {
    fetchMock.doMock();
    store = mockStore();
});

describe("getPlayerStats", () => {
    test("Dispatch GET_PLAYER_STATS_PENDING action", () => {
        actions.getPlayerStats()(store.dispatch);
        const expectedAction = [{ type: GET_PLAYER_STATS_PENDING }];
        expect(store.getActions()).toEqual(expectedAction);
    })

    test("Dispatch GET_PLAYER_STATS_SUCCESS action", () => {
        expect.assertions(1);
        const payload = "123456"
        fetchMock.mockResponseOnce(JSON.stringify([payload]));
        const expectedActions = [{ type: GET_PLAYER_STATS_PENDING }, { type: GET_PLAYER_STATS_SUCCESS, payload: payload }];
        return store.dispatch(actions.getPlayerStats()).then(() => expect(store.getActions()).toEqual(expectedActions))
    })

    test("Dispatch GET_PLAYER_STATS_FAILED action", () => {
        expect.assertions(1);
        fetchMock.mockRejectOnce((req) => Promise.reject('404 not found'));
        const expectedActions = [{ type: GET_PLAYER_STATS_PENDING }, { type: GET_PLAYER_STATS_FAILED }];
        return store.dispatch(actions.getPlayerStats()).then(() => expect(store.getActions()).toEqual(expectedActions))
    })
})

// describe("performAction", () => {
//     const userID = 1;
//     const action = "practice"
//     test("Dispatch ACTION_PENDING action", () => {
//         expect.assertions(1);
//         actions.performAction(userID, action)(store.dispatch);
//         const expectedActions = [{ type: ACTION_PENDING }];
//         expect(store.getActions()).toEqual(expectedActions);
//     })

//     test("Dispatch ACTION_SUCCESS action", () => {
//         expect.assertions(1);
//         const payload = "123456"
//         fetchMock.mockResponseOnce(JSON.stringify(payload));
//         const expectedActions = [{ type: ACTION_PENDING }, { type: ACTION_SUCCESS, payload: payload }];
//         return store.dispatch(actions.performAction()).then(() => expect(store.getActions()).toEqual(expectedActions))
//     })

//     test("Dispatch ACTION_FAILED action", () => {
//         expect.assertions(1);
//         fetchMock.mockRejectOnce((req) => Promise.reject('404 not found'));
//         const expectedActions = [{ type: ACTION_PENDING }, { type: ACTION_FAILED }];
//         return store.dispatch(actions.performAction()).then(() => expect(store.getActions()).toEqual(expectedActions))
//     })
// })

describe("login", () => {
    const username = "TestUser123";
    const password = "testuser123"
    test("Dispatch LOGIN_FAILED if username or password not provided", () => {
        expect.assertions(1);
        const errorMessage = 'Please enter all information'
        const expectedActions = [{ type: LOGIN_FAILED, payload: errorMessage }, { type: LOGIN_FAILED, payload: errorMessage }]
        actions.login(undefined, password)(store.dispatch);
        actions.login(username, undefined)(store.dispatch);
        expect(store.getActions()).toEqual(expectedActions);
    })

    test("Dispatch LOGIN_PENDING action", () => {
        expect.assertions(1);
        actions.login(username, password)(store.dispatch);
        const expectedActions = [{ type: LOGIN_PENDING }];
        expect(store.getActions()).toEqual(expectedActions);
    })

    test("Dispatch LOGIN_SUCCESS action", () => {
        expect.assertions(1);
        const payload = { userID: 1, username: username, loggedIn: true };
        fetchMock.mockResponseOnce(JSON.stringify({ ...payload, id: 1 }));
        const expectedActions = [{ type: LOGIN_PENDING }, { type: LOGIN_SUCCESS, payload: payload }];
        return store.dispatch(actions.login(username, password)).then(() => expect(store.getActions()).toEqual(expectedActions))
    })

    test("Dispatch LOGIN_FAILED action if user not found", () => {
        expect.assertions(1);
        fetchMock.mockResponseOnce(JSON.stringify("123456"));
        const errorMessage = 'Wrong username/password';
        const expectedActions = [{ type: LOGIN_PENDING }, { type: LOGIN_FAILED, payload: errorMessage }];
        return store.dispatch(actions.login(username, password)).then(() => expect(store.getActions()).toEqual(expectedActions))
    })

    test("Dispatch LOGIN_FAILED action", () => {
        expect.assertions(1);
        fetchMock.mockRejectOnce((req) => Promise.reject('404 not found'));
        const errorMessage = 'Something went wrong';
        const expectedActions = [{ type: LOGIN_PENDING }, { type: LOGIN_FAILED, payload: errorMessage }];
        return store.dispatch(actions.login(username, password)).then(() => expect(store.getActions()).toEqual(expectedActions))
    })
})

describe("register", () => {
    const playerName = "TESTUSER123";
    const username = "TestUser123";
    const password = "testuser123"

    test("Dispatch REGISTER_FAILED if username/password/playerName not provided", () => {
        expect.assertions(1);
        const errorMessage = 'Please enter all information'
        const expectedActions = [{ type: REGISTER_FAILED, payload: errorMessage }, { type: REGISTER_FAILED, payload: errorMessage }, { type: REGISTER_FAILED, payload: errorMessage }]
        actions.register(undefined, playerName, password,)(store.dispatch);
        actions.register(playerName, undefined, password,)(store.dispatch);
        actions.register(playerName, username, undefined)(store.dispatch);
        expect(store.getActions()).toEqual(expectedActions);
    })

    test("Dispatch REGISTER_PENDING action", () => {
        expect.assertions(1);
        actions.register(playerName, username, password)(store.dispatch);
        const expectedActions = [{ type: REGISTER_PENDING }];
        expect(store.getActions()).toEqual(expectedActions);
    })

    test("Dispatch REGISTER_SUCCESS action", () => {
        expect.assertions(1);
        const payload = { userID: 1, username: username, loggedIn: true };
        fetchMock.mockResponseOnce(JSON.stringify([{ ...payload, id: 1 }]));
        const expectedActions = [{ type: REGISTER_PENDING }, { type: REGISTER_SUCCESS, payload: payload }];
        return store.dispatch(actions.register(playerName, username, password)).then(() => expect(store.getActions()).toEqual(expectedActions))
    })

    test("Dispatch REGISTER_FAILED action if user already existed", () => {
        expect.assertions(1);
        fetchMock.mockResponseOnce(JSON.stringify("123456"));
        const errorMessage = 'Username/Player Name already existed';
        const expectedActions = [{ type: REGISTER_PENDING }, { type: REGISTER_FAILED, payload: errorMessage }];
        return store.dispatch(actions.register(playerName, username, password)).then(() => expect(store.getActions()).toEqual(expectedActions))
    })

    test("Dispatch REGISTER_FAILED action", () => {
        expect.assertions(1);
        fetchMock.mockRejectOnce((req) => Promise.reject('404 not found'));
        const errorMessage = 'Something went wrong';
        const expectedActions = [{ type: REGISTER_PENDING }, { type: REGISTER_FAILED, payload: errorMessage }];
        return store.dispatch(actions.register(playerName, username, password)).then(() => expect(store.getActions()).toEqual(expectedActions))
    })
})

describe("logout", () => {
    test("Dispatch logout action", () => {
        const expectedActions = [{ type: LOGOUT }];
        store.dispatch(actions.logout());
        expect(store.getActions()).toEqual(expectedActions)
    })
})