import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Register from './Register';

let component;

const initialProps = {
  onRegister: jest.fn(),
  error: '',
  isLoggingIn: false,
  resetError: jest.fn(),
};

beforeEach(() => {
  component = render(
    <Router>
      <Register {...initialProps} />
    </Router>
  );
});

describe('Register component render correctly', () => {
  test('Register component render', () => {
    expect(component).toMatchSnapshot();
  });

  test('Register render error correctly', () => {
    const props = {
      onSubmit: jest.fn(),
      error: 'Error',
      isLoggingIn: false,
      resetError: jest.fn(),
    };
    const { getByText } = render(
      <Router>
        <Register {...props} />
      </Router>
    );
    expect(getByText(props.error)).toBeInTheDocument();
  });
});

describe('Register component function correctly', () => {
  test('Link to login functional', () => {
    userEvent.click(screen.getByText('Login'));
    expect(initialProps.resetError).toBeCalled();
    expect(document.URL).toEqual('http://localhost/login');
  });

  test('User input handled correctly', async () => {
    const playerName = 'Testuser123';
    const email = 'Testuser123@gmail.com';
    const password = 'testuser123';
    const confirmPassword = 'testuser123';
    await userEvent.type(screen.getByText('Player Name'), playerName);
    await userEvent.type(screen.getByLabelText('Email'), email);
    await userEvent.type(screen.getByLabelText('Password'), password);
    await userEvent.type(screen.getByRole('ConfirmPassword'), confirmPassword);
    expect(screen.getByLabelText('Player Name').value).toEqual(playerName);
    expect(screen.getByLabelText('Email').value).toEqual(email);
    expect(screen.getByLabelText('Password').value).toEqual(password);
    expect(screen.getByLabelText('Confirm Password').value).toEqual(
      confirmPassword
    );
  });

  test('Register form submit with correct information', async () => {
    expect.assertions(1);
    const playerName = 'Testuser123';
    const email = 'Testuser123@gmail.com';
    const password = 'testuser123';
    const confirmPassword = 'testuser123';
    await userEvent.type(screen.getByText('Player Name'), playerName);
    await userEvent.type(screen.getByLabelText('Email'), email);
    await userEvent.type(screen.getByLabelText('Password'), password);
    await userEvent.type(screen.getByRole('ConfirmPassword'), confirmPassword);
    userEvent.click(screen.getByText('Register'));
    expect(initialProps.onRegister).toBeCalledWith(
      email,
      password,
      confirmPassword,
      playerName
    );
  });
  test('Register handle incorrect confirmed password properly', async () => {});
});
