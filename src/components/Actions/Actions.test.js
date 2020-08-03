import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Actions from './Actions';

let component;
const initialProps = {
  actionResults: [],
  userID: '0',
  performAction: jest.fn(),
  actions: ['Practice', 'Live', 'Tsunagari', 'Tweet'],
};

beforeEach(() => {
  component = render(<Actions {...initialProps} />);
});

const actions = ['Practice', 'Live', 'Tsunagari', 'Tweet'];

describe('Action component render as expected', () => {
  test('render Action component', () => {
    expect(component).toMatchSnapshot();
  });
  test('Render action results as expected', () => {
    const props = {
      actionResults: ['Test 1', 'Test 2', 'Test 3'],
      userID: '0',
      performAction: jest.fn(),
    };
    const component = render(<Actions {...props} actions={actions} />);
    expect(component.getByText('Test 1')).toBeInTheDocument();
    expect(component.getByText('Test 2')).toBeInTheDocument();
    expect(component.getByText('Test 3')).toBeInTheDocument();
  });
});

describe('Action component function as expected', () => {
  test('Pressing action button results in action', () => {
    const actionType = 'Practice';
    const actionBtn = screen.getByText(actionType);
    fireEvent.click(actionBtn);
    expect(initialProps.performAction).toBeCalled();
  });
  test.each(actions)('Action to be called with %s type', (action) => {
    const actionBtn = screen.getByText(action);
    fireEvent.click(actionBtn);
    expect(initialProps.performAction).toBeCalledWith(
      initialProps.userID,
    );
  });
  test('Triggering action results in cool down', () => {
    const actionType = 'Practice';
    const actionBtn = screen.getByText(actionType);
    fireEvent.click(actionBtn);
    expect(screen.getByText(/Cooling down/i));

    expect(screen.getByText(actionType).parentElement).toHaveAttribute('disabled');
  });
  test('Cool down end after timer run out', () => {
    const actionType = 'Practice';
    const actionBtn = screen.getByText(actionType);
    fireEvent.click(actionBtn);
    screen.findByText('Press button to perform action');
  });
});
