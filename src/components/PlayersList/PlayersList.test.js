import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlayersList from './PlayersList';
import { act } from 'react-dom/test-utils';

const player = {
  name: 'Ken',
  title: 'rookie',
  level: '47',
  element: 'fire',
  message: 'hello',
};

const players = [];

for (let i = 0; i < 30; i++) {
  players.push({ ...player, id: String(i), name: `Ken${i}` });
}

describe('PlayersList component render correctly', () => {
  test('PlayersList component render', () => {
    let component;
    act(() => {
      component = render(<PlayersList />);
    });
    expect(component).toMatchSnapshot();
  });
});
