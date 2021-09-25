import { TileProperties } from '../interfaces';

const MIN_LIQUID_VALUE = 0.005;
const MAX_LIQUID_VALUE = 1.0;
const MAX_COMPRESSION = 0.125;
const MIN_FLOW = 0.005;
const MAX_FLOW = 4;
const FLOW_SPEED = 0.5;

function calculateVerticalFlowValue(
  remainingLiquid: number,
  destination: [Uint8Array, Float64Array]
): number {
  const sum = remainingLiquid + destination[1][0];

  if (sum <= MAX_LIQUID_VALUE) {
    return MAX_LIQUID_VALUE;
  } else if (sum < 2 * MAX_LIQUID_VALUE + MAX_COMPRESSION) {
    return (
      (MAX_LIQUID_VALUE * MAX_LIQUID_VALUE + sum * MAX_COMPRESSION) /
      (MAX_LIQUID_VALUE + MAX_COMPRESSION)
    );
  } else {
    return (sum + MAX_COMPRESSION) / 2;
  }
}

function* liquidSimulateGenerator(
  tileGrid: Array<Array<[Uint8Array, Float64Array]>>,
  tileGridProperties: Array<Array<TileProperties>>,
  limitDuration: number
) {
  let begin = Date.now();
  let startValue: number;
  let remainingValue: number;
  let flow: number = 0;
  let tile: [Uint8Array, Float64Array];

  for (let y = 0; y < tileGridProperties.length; y++) {
    for (let x = 0; x < tileGridProperties[0].length; x++) {
      tileGridProperties[y][x].diff = 0;
    }
  }

  for (let y = 0; y < tileGrid.length; y++) {
    for (let x = 0; x < tileGrid[y].length; x++) {
      tile = tileGrid[y][x];
      startValue = tile[1][0];
      remainingValue = tile[1][0];
      flow = 0;

      if (tile[0][0]) continue;
      if (tile[1][0] === 0) continue;
      if (tileGridProperties[y][x].isStable) continue;
      if (tile[1][0] < MIN_LIQUID_VALUE) {
        tile[1][0] = 0;
        continue;
      }

      if (y < tileGrid.length - 1 && !tileGrid[y + 1][x][0][0]) {
        flow =
          calculateVerticalFlowValue(tile[1][0], tileGrid[y + 1][x]) -
          tileGrid[y + 1][x][1][0];

        if (tileGrid[y + 1][x][1][0] > 0 && flow > MIN_FLOW) flow *= FLOW_SPEED;

        flow = Math.max(flow, 0);
        if (flow > Math.min(MAX_FLOW, tile[1][0]))
          flow = Math.min(MAX_FLOW, tile[1][0]);
        if (flow !== 0) {
          remainingValue -= flow;
          tileGridProperties[y][x].diff -= flow;
          tileGridProperties[y + 1][x].diff += flow;
          tileGridProperties[y + 1][x].isStable = false;
        }
      }

      if (remainingValue < MIN_LIQUID_VALUE) {
        tileGridProperties[y][x].diff -= remainingValue;
        continue;
      }

      if (x > 0 && !tileGrid[y][x - 1][0][0]) {
        flow = (remainingValue - tileGrid[y][x - 1][1][0]) / 4;

        if (flow > MIN_FLOW) flow *= FLOW_SPEED;

        flow = Math.max(flow, 0);
        if (flow > Math.min(MAX_FLOW, remainingValue))
          flow = Math.min(MAX_FLOW, remainingValue);

        if (flow !== 0) {
          remainingValue -= flow;
          tileGridProperties[y][x].diff -= flow;
          tileGridProperties[y][x - 1].diff += flow;
          tileGridProperties[y][x - 1].isStable = false;
        }
      }

      if (remainingValue < MIN_LIQUID_VALUE) {
        tileGridProperties[y][x].diff -= remainingValue;
        continue;
      }

      if (x < tileGrid[y].length - 1 && !tileGrid[y][x + 1][0][0]) {
        flow = (remainingValue - tileGrid[y][x + 1][1][0]) / 3;
        if (flow > MIN_FLOW) flow *= FLOW_SPEED;

        flow = Math.max(flow, 0);
        if (flow > Math.min(MAX_FLOW, remainingValue))
          flow = Math.min(MAX_FLOW, remainingValue);

        if (flow !== 0) {
          remainingValue -= flow;
          tileGridProperties[y][x].diff -= flow;
          tileGridProperties[y][x + 1].diff += flow;
          tileGridProperties[y][x + 1].isStable = false;
        }
      }

      if (remainingValue < MIN_LIQUID_VALUE) {
        tileGridProperties[y][x].diff -= remainingValue;
        continue;
      }

      if (y > 0 && !tileGrid[y - 1][x][0][0]) {
        flow =
          remainingValue -
          calculateVerticalFlowValue(remainingValue, tileGrid[y - 1][x]);
        if (flow > MIN_FLOW) flow *= FLOW_SPEED;

        flow = Math.max(flow, 0);
        if (flow > Math.min(MAX_FLOW, remainingValue))
          flow = Math.min(MAX_FLOW, remainingValue);

        if (flow !== 0) {
          remainingValue -= flow;
          tileGridProperties[y][x].diff -= flow;
          tileGridProperties[y - 1][x].diff += flow;
          tileGridProperties[y - 1][x].isStable = false;
        }
      }

      if (remainingValue < MIN_LIQUID_VALUE) {
        tileGridProperties[y][x].diff -= remainingValue;
        continue;
      }

      if (
        startValue === remainingValue &&
        ++tileGridProperties[y][x].stableLevel >= 10
      ) {
        tileGridProperties[y][x].isStable = true;
      } else {
        if (y > 0 && tileGrid[y - 1][x])
          tileGridProperties[y - 1][x].isStable = false;
        if (y < tileGrid.length - 1 && tileGrid[y + 1][x])
          tileGridProperties[y + 1][x].isStable = false;
        if (x > 0 && tileGrid[y][x - 1])
          tileGridProperties[y][x - 1].isStable = false;
        if (x < tileGrid[0].length - 1 && tileGrid[y][x + 1])
          tileGridProperties[y][x + 1].isStable = false;
      }

      if (Date.now() - begin >= limitDuration) {
        begin = yield;
      }
    }
  }

  for (let y = 0; y < tileGrid.length; y++) {
    for (let x = 0; x < tileGrid[y].length; x++) {
      tileGrid[y][x][1][0] += tileGridProperties[y][x].diff;
      if (tileGrid[y][x][1][0] < MIN_LIQUID_VALUE) {
        tileGrid[y][x][1][0] = 0;
      }

      if (Date.now() - begin >= limitDuration) {
        begin = yield;
      }
    }
  }

  return;
}

function* stepGenerator(
  tileGrid: Array<Array<[Uint8Array, Float64Array]>>,
  tileGridProperties: Array<Array<TileProperties>>,
  limitDuration: number = 3
) {
  let step = liquidSimulateGenerator(
    tileGrid,
    tileGridProperties,
    limitDuration
  );

  while (true) {
    if (step.next(Date.now()).done)
      step = liquidSimulateGenerator(
        tileGrid,
        tileGridProperties,
        limitDuration
      );
    yield;
  }
}

export { stepGenerator };
