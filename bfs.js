let grid1 =
  [
    [0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 1],
    [0, 0, 1, 0, 1, 0],
    [0, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 0, 0]
  ];

let grid2 =
  [
    [0, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1],
    [1, 1, 1, 0, 0, 1],
    [1, 1, 1, 0, 0, 1],
    [1, 1, 1, 0, 0, 0]
  ];

let grid3 = // best edge case
  [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];

/* 0: empty
 * 1: blocked
 * 2: visited */
const canGoRight = (grid, snake) => {
  if (snake[2] === true) { // if horizontal
    let snakeHead = [
      snake[0], snake[1] + 1
    ];
    return (
      grid[snakeHead[0]][snakeHead[1] + 1] === 0
    );
  } else { // if vertical
    let snakeHead = [
      snake[0] + 1, snake[1]
    ];
    return (
      grid[snake[0]][snake[1] + 1] === 0 && grid[snakeHead[0]][snakeHead[1] + 1] === 0
    );
  }
}

const canGoDown = (grid, snake) => {
  if (snake[2] === true) { // if horizontal
    let snakeHead = [
      snake[0], snake[1] + 1
    ];
    return (
      snake[0] < grid.length - 1 &&
      grid[snake[0] + 1][snake[1]] === 0 && grid[snakeHead[0] + 1][snakeHead[1]] === 0
    );
  } else { // if vertical
    let snakeHead = [
      snake[0] + 1, snake[1]
    ];
    return (
      snakeHead[0] < grid.length - 1 &&
      grid[snakeHead[0] + 1][snakeHead[1]] === 0
    );
  }
}

const canRotateClockwise = (grid, snake) => {
  if (snake[2] === true) { // if horizontal
    let snakeHead = [
      snake[0], snake[1] + 1
    ];
    return (
      snake[0] < grid.length - 1 &&
      grid[snake[0] + 1][snake[1]] === 0 && grid[snakeHead[0] + 1][snakeHead[1]] === 0
    );
  } else {
    return false;
  }
}

const canRotateCounterClockwise = (grid, snake) => {
  if (snake[2] === false) { // if vertical
    let snakeHead = [
      snake[0] + 1, snake[1]
    ];
    return (
      grid[snake[0]][snake[1] + 1] === 0 && grid[snakeHead[0]][snakeHead[1] + 1] === 0
    );
  } else {
    return false;
  }
}

const minimumMoves = (grid) => {
  let queue = [];
  let visited = [];
  let totalMoves = 0;
  let snake = [0, 0, true];
  queue.push(snake);
  while (queue.length > 0) {
    snake = queue.pop();
    debugger;
    if (snake[0] === grid.length - 1 && snake[1] === grid.length - 2 && snake[2] === true) {
      return totalMoves;
    }
    if (canGoRight(grid, snake)) {
      // then add the new position to the queue.
      snake = [
        snake[0], snake[1] + 1, snake[2]
      ];
      visited.push(snake);
      totalMoves++;
      queue.push(snake);
    }
    if (canGoDown(grid, snake)) {
      snake = [
        snake[0] + 1, snake[1], snake[2]
      ];
      visited.push(snake);
      totalMoves++;
      queue.push(snake);
    }
    if (canRotateClockwise(grid, snake)) {
      snake = [
        snake[0], snake[1], !snake[2]
      ];
      if (visited.some(a => snake.every((v, i) => v === a[i]))) {
        totalMoves--;
      } else {
        totalMoves++;
      }
      visited.push(snake);
      queue.push(snake)
    }
    if (canRotateCounterClockwise(grid, snake)) {
      snake = [
        snake[0], snake[1], !snake[2]
      ];
      if (visited.some(a => snake.every((v, i) => v === a[i]))) {
        totalMoves--;
      } else {
        totalMoves++;
      }
      visited.push(snake);
      queue.push(snake);
    }
    console.log(queue)
  }
  return;
};

console.log(
  minimumMoves(grid3)
);


