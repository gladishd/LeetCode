const grid1 =
  [
    [0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 1],
    [0, 0, 1, 0, 1, 0],
    [0, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 0, 0]
  ];

const grid2 =
  [
    [0, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1],
    [1, 1, 1, 0, 0, 1],
    [1, 1, 1, 0, 0, 1],
    [1, 1, 1, 0, 0, 0]
  ];

const grid3 = // best edge case
  [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];

const canGoRight = (grid, snakeTail) => {
  if (snakeTail[2] === 'horizontal') {
    const snakeHead = [snakeTail[0], snakeTail[1] + 1];
    return (grid[snakeHead[0]][snakeHead[1] + 1] === 0);
  } else {
    const snakeHead = [snakeTail[0] + 1, snakeTail[1]];
    return (grid[snakeTail[0]][snakeTail[1] + 1] === 0 && grid[snakeHead[0]][snakeHead[1] + 1] === 0);
  }
}

const canGoDown = (grid, snakeTail) => {
  if (snakeTail[2] === 'horizontal') {
    const snakeHead = [snakeTail[0], snakeTail[1] + 1];
    return (snakeTail[0] < grid.length - 1 && grid[snakeTail[0] + 1][snakeTail[1]] === 0 && grid[snakeHead[0] + 1][snakeHead[1]] === 0);
  } else {
    const snakeHead = [snakeTail[0] + 1, snakeTail[1]];
    return (snakeHead[0] < grid.length - 1 && grid[snakeHead[0] + 1][snakeHead[1]] === 0
    );
  }
}

const canRotateClockwise = (grid, snakeTail) => {
  if (snakeTail[2] === 'horizontal') {
    const snakeHead = [snakeTail[0], snakeTail[1] + 1];
    return (snakeTail[0] < grid.length - 1 && grid[snakeTail[0] + 1][snakeTail[1]] === 0 && grid[snakeHead[0] + 1][snakeHead[1]] === 0);
  } else { return false; }
}

const canRotateCounterClockwise = (grid, snakeTail) => {
  if (snakeTail[2] === 'vertical') {
    const snakeHead = [snakeTail[0] + 1, snakeTail[1]];
    return (grid[snakeTail[0]][snakeTail[1] + 1] === 0 && grid[snakeHead[0]][snakeHead[1] + 1] === 0);
  } else { return false; }
}

const minimumMoves = (grid) => {
  const visitedLocations = [];
  const choices = {
    current: [],
    next: []
  };
  choices.current.push([0, 0, 'horizontal']);
  let totalMoves = 0;
  while (choices.current.length) {
    choices.next = [];
    for (let i = 0; i < choices.current.length; i++) {
      let ithChoiceAsPrimitive = JSON.stringify(choices.current[i]);
      if (!visitedLocations.includes(ithChoiceAsPrimitive)) {
        visitedLocations.push(ithChoiceAsPrimitive);
        let snakeTail = choices.current[i];
        if (snakeTail[0] === grid.length - 1 && snakeTail[1] === grid.length - 2 && snakeTail[2] === 'horizontal') { return totalMoves; }
        if (canGoRight(grid, snakeTail)) { choices.next.push([snakeTail[0], snakeTail[1] + 1, snakeTail[2]]); }
        if (canGoDown(grid, snakeTail)) { choices.next.push([snakeTail[0] + 1, snakeTail[1], snakeTail[2]]); }
        if (canRotateClockwise(grid, snakeTail)) { choices.next.push([snakeTail[0], snakeTail[1], 'vertical']); }
        if (canRotateCounterClockwise(grid, snakeTail)) { choices.next.push([snakeTail[0], snakeTail[1], 'horizontal']); }
      }
    }
    totalMoves++;
    choices.current = choices.next;
  }
  return -1;
};

console.log(minimumMoves(grid1), minimumMoves(grid2), minimumMoves(grid3))


