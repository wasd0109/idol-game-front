import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Action from './Actions';
import fetchMock from 'jest-fetch-mock';

let container;
const props = {
  actionResults: [],
  userID: '0',
  performAction: jest.fn(),
};

beforeEach(() => {
  container = render(<Action {...props} />);
});

const actions = ['Practice', 'Live', 'Tsunagari', 'Tweet'];

describe('Action component render as expected', () => {
  test('render Action component', () => {
    expect(container).toMatchSnapshot();
  });
  test('Render action results as expected', () => {
    const props = {
      actionResults: ['Test 1', 'Test 2', 'Test 3'],
      userID: '0',
      performAction: jest.fn(),
    };
    const container = render(<Action {...props} />);
    expect(container.getByText('Test 1'));
    expect(container.getByText('Test 2'));
    expect(container.getByText('Test 3'));
  });
});

describe('Action component function as expected', () => {
  test('Pressing action button results in action', () => {
    const actionType = 'Practice';
    const actionBtn = screen.getByRole(actionType);
    fireEvent.click(actionBtn);
    expect(props.performAction).toBeCalled();
  });
  test.each(actions)('Action to be called with %s type', (action) => {
    const actionBtn = screen.getByRole(action);
    fireEvent.click(actionBtn);
    expect(props.performAction).toBeCalledWith(props.userID, action);
  });
  test('Triggering action results in cool down', () => {
    const actionType = 'Practice';
    const actionBtn = screen.getByRole(actionType);
    fireEvent.click(actionBtn);
    expect(screen.getByText(/Cooling down/i));
    expect(screen.getByRole(actionType)).toHaveAttribute('disabled');
  });
  test('Cool down end after timer run out', () => {
    const actionType = 'Practice';
    const actionBtn = screen.getByRole(actionType);
    fireEvent.click(actionBtn);
    screen.findByText('Press button to perform action');
  });
});
