import React from 'react';
import { render, screen } from '@testing-library/react';
import PlayerCard from './PlayerCard';

const initialProps = {
  player: {
    id: 0,
    name: 'Ken',
    title: 'rookie',
    level: '47',
    element: 'fire',
    message: 'hello',
  },
};

describe('PlayerCard component render correctly', () => {
  test('PlayerCard component render', () => {
    expect(render(<PlayerCard {...initialProps} />)).toMatchSnapshot();
  });
});
