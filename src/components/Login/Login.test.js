import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';

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
    <Router><Provider store={store}><Login /> </Provider></Router>
  );
});

describe('Login component render correctly', () => {
  test('Login component render', () => {
    expect(component).toMatchSnapshot();
  });

  test('Login render error correctly', () => {
    const props = {
      triggerError: {
        isError: true,
        errorMessage: 'Test message',
      },
    };
    const store = mockStore(props);
    const { getByText } = render(

      <Router><Provider store={store}><Login /> </Provider></Router>

    );
    expect(getByText(props.triggerError.errorMessage)).toBeInTheDocument();
  });
});

describe('Login component function correctly', () => {
  test("Link to register functional", () => {
    userEvent.click(screen.getByText("Register"));
    expect(document.URL).toEqual("http://localhost/register");
  })

  test('User input handled correctly', async () => {
    const username = 'Testuser123';
    const password = 'testuser123';
    await userEvent.type(screen.getByLabelText('Username'), username);
    await userEvent.type(screen.getByLabelText('Password'), password);
    expect(screen.getByLabelText('Username').value).toEqual(username);
    expect(screen.getByLabelText('Password').value).toEqual(password);
  });



  test('Login form submit with correct information', async () => {
    expect.assertions(2);
    const username = 'Testuser123';
    const password = 'testuser123';
    // Extremely indirect method
    fetchMock.mockResponse(async (req) => {
      const data = await req.json();
      if (data.username === username && data.password === password) {
        store.dispatch({
          type: 'LOGIN_SUCCESS',
        });
        return Promise.resolve('Success');
      }
      return Promise.reject('Error');
    });
    await userEvent.type(screen.getByLabelText('Username'), username);
    await userEvent.type(screen.getByLabelText('Password'), password);
    userEvent.click(screen.getByText('Login'));
    expect(screen.getByText('Logging in')).toBeInTheDocument();
    waitFor(() => {
      const actions = store.getActions();
      if (actions.length > 1) {
        expect(actions[1].type).toEqual('LOGIN_SUCCESS');
      }
    });
  });
});
