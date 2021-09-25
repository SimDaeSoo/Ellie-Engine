import { useEffect } from 'react';

function* stepGenerator(limitDuration: number) {
  let begin = Date.now();
  let sum = 0;

  for (let i = 0; i < 100000; i++) {
    sum += i;

    if (Date.now() - begin >= limitDuration) {
      begin = yield sum;
    }
  }

  return sum;
}

function* stepLoopGenerator() {
  let step = stepGenerator(2);

  while (true) {
    const { value, done } = step.next(Date.now());
    console.log(value, done);
    if (done) step = stepGenerator(2);
    yield;
  }
}

const LineIntersection = () => {
  useEffect(() => {
    const step = stepLoopGenerator();
    step.next();
    step.next();
    step.next();
    step.next();
    step.next();
    step.next();
    step.next();
    step.next();
    step.next();
    step.next();
    step.next();
    step.next();
    step.next();
    step.next();
    step.next();
    step.next();
    step.next();
    step.next();
    step.next();
    step.next();
    step.next();
    step.next();
    step.next();
    step.next();
    step.next();
    step.next();
    step.next();
    step.next();
    step.next();
    step.next();
    step.next();
    step.next();
    step.next();
    step.next();
    step.next();
    step.next();
    step.next();
    step.next();
    step.next();
  }, []);

  return <></>;
};

export default LineIntersection;
