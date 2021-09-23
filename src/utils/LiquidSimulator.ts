const MIN_LIQUID_VALUE = 0.005;
const MAX_LIQUID_VALUE = 1.0;
const MAX_COMPRESSION = 0.25;
const MIN_FLOW = 0.005;
const MAX_FLOW = 4;
const FLOW_SPEED = 1;

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

function nextStep(grid: Array<Array<[Uint8Array, Float64Array]>>): void {
  let flow = 0;
  const tileDatas = new Array(grid.length)
    .fill(true)
    .map(() =>
      new Array(grid[0].length)
        .fill(true)
        .map(() => ({ diff: 0, settled: false, settleCount: 0 }))
    );

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const cell = grid[y][x];

      if (cell[0][0]) {
        cell[1][0] = 0;
        continue;
      }
      if (cell[1][0] === 0) continue;
      if (tileDatas[y][x].settled) continue;
      if (cell[1][0] < MIN_LIQUID_VALUE) {
        cell[1][0] = 0;
        continue;
      }

      let startValue = cell[1][0];
      let remainingValue = cell[1][0];
      flow = 0;

      if (y < grid.length - 1 && !grid[y + 1][x][0][0]) {
        flow =
          calculateVerticalFlowValue(cell[1][0], grid[y + 1][x]) -
          grid[y + 1][x][1][0];

        if (grid[y + 1][x][1][0] > 0 && flow > MIN_FLOW) {
          flow *= FLOW_SPEED;
        }

        flow = Math.max(flow, 0);
        if (flow > Math.min(MAX_FLOW, cell[1][0])) {
          flow = Math.min(MAX_FLOW, cell[1][0]);
        }
        if (flow !== 0) {
          remainingValue -= flow;
          tileDatas[y][x].diff -= flow;
          tileDatas[y + 1][x].diff += flow;
          tileDatas[y + 1][x].settled = false;
        }
      }

      if (remainingValue < MIN_LIQUID_VALUE) {
        tileDatas[y][x].diff -= remainingValue;
        continue;
      }

      if (x > 0 && !grid[y][x - 1][0][0]) {
        flow = (remainingValue - grid[y][x - 1][1][0]) / 4;

        if (flow > MIN_FLOW) {
          flow *= FLOW_SPEED;
        }

        flow = Math.max(flow, 0);
        if (flow > Math.min(MAX_FLOW, remainingValue)) {
          flow = Math.min(MAX_FLOW, remainingValue);
        }

        if (flow !== 0) {
          remainingValue -= flow;
          tileDatas[y][x].diff -= flow;
          tileDatas[y][x - 1].diff += flow;
          tileDatas[y][x - 1].settled = false;
        }
      }

      if (remainingValue < MIN_LIQUID_VALUE) {
        tileDatas[y][x].diff -= remainingValue;
        continue;
      }

      if (x < grid[y].length - 1 && !grid[y][x + 1][0][0]) {
        flow = (remainingValue - grid[y][x + 1][1][0]) / 3;
        if (flow > MIN_FLOW) {
          flow *= FLOW_SPEED;
        }

        flow = Math.max(flow, 0);
        if (flow > Math.min(MAX_FLOW, remainingValue)) {
          flow = Math.min(MAX_FLOW, remainingValue);
        }

        if (flow !== 0) {
          remainingValue -= flow;
          tileDatas[y][x].diff -= flow;
          tileDatas[y][x + 1].diff += flow;
          tileDatas[y][x + 1].settled = false;
        }
      }

      if (remainingValue < MIN_LIQUID_VALUE) {
        tileDatas[y][x].diff -= remainingValue;
        continue;
      }

      if (y > 0 && !grid[y - 1][x][0][0]) {
        flow =
          remainingValue -
          calculateVerticalFlowValue(remainingValue, grid[y - 1][x]);
        if (flow > MIN_FLOW) {
          flow *= FLOW_SPEED;
        }

        flow = Math.max(flow, 0);
        if (flow > Math.min(MAX_FLOW, remainingValue)) {
          flow = Math.min(MAX_FLOW, remainingValue);
        }

        if (flow !== 0) {
          remainingValue -= flow;
          tileDatas[y][x].diff -= flow;
          tileDatas[y - 1][x].diff += flow;
          tileDatas[y - 1][x].settled = false;
        }
      }

      if (remainingValue < MIN_LIQUID_VALUE) {
        tileDatas[y][x].diff -= remainingValue;
        continue;
      }

      if (startValue === remainingValue) {
        tileDatas[y][x].settleCount++;
        if (tileDatas[y][x].settleCount >= 10) {
          tileDatas[y][x].settled = true;
        }
      } else {
        if (y > 0 && grid[y - 1][x]) tileDatas[y - 1][x].settled = false;
        if (y < grid.length - 1 && grid[y + 1][x])
          tileDatas[y + 1][x].settled = false;
        if (x > 0 && grid[y][x - 1]) tileDatas[y][x - 1].settled = false;
        if (x < grid[0].length - 1 && grid[y][x + 1])
          tileDatas[y][x + 1].settled = false;
      }
    }
  }

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      grid[y][x][1][0] += tileDatas[y][x].diff;
      if (grid[y][x][1][0] < MIN_LIQUID_VALUE) {
        grid[y][x][1][0] = 0;
      }
    }
  }
}

export { nextStep };
