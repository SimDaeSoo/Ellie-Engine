import Map from '../src/core/Map';

onmessage = (e) => {
  const {
    data: { buffer },
  } = e;
  const map = new Map();
  map.load(buffer);

  console.log(map.getForeground(0, 0));
  console.log(map.getBackground(0, 0));
  console.log(map.getValue(0, 0));
};
