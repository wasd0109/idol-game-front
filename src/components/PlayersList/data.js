const player = {
  name: 'Ken',
  title: 'rookie',
  level: '47',
  element: 'fire',
  message: 'hello',
};

const players = [];

for (let i = 0; i < 30; i++) {
  players.push({ ...player, id: String(i) });
}

export default players;
