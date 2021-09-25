import { Line } from '../interfaces';

function lineIntersection(lineA: Line, lineB: Line): number {
  const det =
    (lineA[1][0] - lineA[0][0]) * (lineB[1][1] - lineB[0][1]) -
    (lineB[1][0] - lineB[0][0]) * (lineA[1][1] - lineA[0][1]);

  if (det === 0) {
    return -1;
  } else {
    const t1 =
      ((lineB[1][1] - lineB[0][1]) * (lineB[1][0] - lineA[0][0]) +
        (lineB[0][0] - lineB[1][0]) * (lineB[1][1] - lineA[0][1])) /
      det;
    const t2 =
      ((lineA[0][1] - lineA[1][1]) * (lineB[1][0] - lineA[0][0]) +
        (lineA[1][0] - lineA[0][0]) * (lineB[1][1] - lineA[0][1])) /
      det;

    return 0 <= t1 && t1 <= 1 && 0 <= t2 && t2 <= 1 ? t1 : -1;
  }
}

export { lineIntersection };
