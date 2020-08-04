const player = {
  name: 'Ken',
  title: 'rookie',
  level: '47',
  element: 'fire',
  message: 'hello',
};

const players = [];

for (let i = 0; i < 30; i++) {
  console.log(i);
  players.push({ ...player, id: String(i), name: `Ken${i}` });
}

export default players;
