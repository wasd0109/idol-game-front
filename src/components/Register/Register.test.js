import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import Register from './Register';
import { REGISTER_SUCCESS } from "../../constants";

const mockStore = configureStore([thunk]);

let component;
let store;

const initialProps = {
    triggerError: {
        isError: false,
        errorMessage: '',
    },
    onSubmit: jest.fn(),
};

beforeEach(() => {
    store = mockStore(initialProps);
    component = render(
        <Router><Provider store={store}>
            <Register />
        </Provider></Router>
    );
});

describe('Register component render correctly', () => {
    test('Register component render', () => {
        expect(component).toMatchSnapshot();
    });

    test('Register render error correctly', () => {
        const props = {
            triggerError: {
                isError: true,
                errorMessage: 'Test message',
            },
        };
        const store = mockStore(props);
        const { getByText } = render(
            <Router><Provider store={store}>
                <Register />
            </Provider></Router>
        );
        expect(getByText(props.triggerError.errorMessage)).toBeInTheDocument();
    });
});

describe('Register component function correctly', () => {
    test("Link to login functional", () => {
        userEvent.click(screen.getByText("Login"));
        expect(document.URL).toEqual("http://localhost/");
    })

    test('User input handled correctly', async () => {
        const playerName = "Testuser123";
        const username = 'Testuser123';
        const password = 'testuser123';
        await userEvent.type(screen.getByText("Player Name"), playerName)
        await userEvent.type(screen.getByLabelText('Username'), username);
        await userEvent.type(screen.getByLabelText('Password'), password);
        expect(screen.getByLabelText('Player Name').value).toEqual(playerName);
        expect(screen.getByLabelText('Username').value).toEqual(username);
        expect(screen.getByLabelText('Password').value).toEqual(password);
    });

    test('Register form submit with correct information', async () => {
        expect.assertions(1);
        const playerName = "Testuser123";
        const username = 'Testuser123';
        const password = 'testuser123';
        // Extremely indirect method
        fetchMock.mockResponse(async (req) => {
            const data = await req.json();
            if (data.name === playerName && data.username === username && data.password === password) {
                store.dispatch({
                    type: REGISTER_SUCCESS,
                });
                return Promise.resolve('Success');
            }
            return Promise.reject('Error');
        });
        await userEvent.type(screen.getByText("Player Name"), playerName)
        await userEvent.type(screen.getByLabelText('Username'), username);
        await userEvent.type(screen.getByLabelText('Password'), password);
        userEvent.click(screen.getByText('Register'));
        waitFor(() => {
            const actions = store.getActions();
            if (actions.length > 1) {
                expect(actions[1].type).toEqual(REGISTER_SUCCESS);
            }
        });
    });
});