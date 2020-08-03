import React from 'react';
import { render, waitFor, waitForElementToBeRemoved, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
import { act } from 'react-dom/test-utils';



let component;

const initialProps = {
  onSubmit: jest.fn(),
  error: "",
  resetError: jest.fn(),
};

beforeEach(() => {
  component = render(
    <Router><Login {...initialProps} /></Router>
  );
});

describe('Login component render correctly', () => {
  test('Login component render', () => {
    expect(component).toMatchSnapshot();
  });

  test('Login render error correctly', async () => {
    const props = {
      onSubmit: jest.fn(),
      error: "Error",
      resetError: jest.fn()
    };
    render(
      <Router><Login {...props} /></Router>
    );
    expect(screen.getByText(props.error)).toBeInTheDocument();
  });
});

describe('Login component function correctly', () => {
  test("Link to register functional", () => {
    userEvent.click(screen.getByText("Register"));
    expect(initialProps.resetError).toBeCalled();
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
    await userEvent.type(screen.getByLabelText('Username'), username);
    await userEvent.type(screen.getByLabelText('Password'), password);
    userEvent.click(screen.getByText('Login'));
    expect(screen.getByText("Logging in")).toBeInTheDocument();
    expect(initialProps.onSubmit).toBeCalledWith(username, password)
  });
});
