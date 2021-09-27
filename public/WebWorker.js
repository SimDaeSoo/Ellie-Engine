onmessage = (e) => {
  const { data } = e;
  console.log(data);
}

postMessage('init');