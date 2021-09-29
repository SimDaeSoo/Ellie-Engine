import Map from '../src/core/Map';

onmessage = (e) => {
  const {
    data: { buffer },
  } = e;
  const map = new Map();
  map.load(buffer);

  console.log('worker get buffer:', buffer);
};
