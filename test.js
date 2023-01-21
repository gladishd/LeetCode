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
const minimumMoves = (grid) => {
  let totalMoves = 0;
  let snake =
  {
    'tail': [0, 0], // row 0, column 0
    'head': [0, 1] // row 0, column 1
  };
  while (
    snake.head[0] !== grid.length - 1 && // this is similar to traversing a linked list;
    snake.head[1] !== grid.length - 1 // while the snake hasn't reached the end,
  ) {
    if (
      // regardless of the snake's orientation (horizontal vs. vertical)
      // if at least one of the squares "to the right" has not been visited
      // ("at least" allows a one-square overlap; we just don't want to repeat exact moves)
      (grid[snake.tail[0]][snake.tail[1] + 1] !== 2 || grid[snake.head[0]][snake.head[1] + 1] !== 2)
      && // and
      // if both squares to the right are not blocked
      (grid[snake.tail[0]][snake.tail[1] + 1] !== 1 && grid[snake.head[0]][snake.head[1] + 1] !== 1)
    ) {
      // then move to the right:
      let { tail, head } = snake;
      grid[tail[0]][tail[1]] = 2;
      grid[head[0]][head[1]] = 2;
      snake = {
        'tail': [tail[0], tail[1] + 1],
        'head': [head[0], head[1] + 1]
      };
      totalMoves++;

      // if the snake has reached the end, then break the while loop
      if (snake.head[0] === grid.length - 1 &&
        snake.head[1] === grid.length - 1) { break; }

      debugger;
    }

    if (
      // regardless of the snake's orientation (horizontal vs. vertical)
      // if at least one of the squares "beneath" the snake has not been visited
      (grid[snake.tail[0] + 1][snake.tail[1]] !== 2 || grid[snake.head[0] + 1][snake.head[1]] !== 2)
      && // and
      // if both squares to the right are not blocked
      (grid[snake.tail[0] + 1][snake.tail[1]] !== 1 && grid[snake.head[0] + 1][snake.head[1]] !== 1)
    ) {
      // then move down
      let { tail, head } = snake;
      grid[tail[0]][tail[1]] = 2;
      grid[head[0]][head[1]] = 2;
      snake = {
        'tail': [tail[0] + 1, tail[1]],
        'head': [head[0] + 1, head[1]]
      };
      totalMoves++;

      // if the snake has reached the end, then break the while loop
      if (snake.head[0] === grid.length - 1 &&
        snake.head[1] === grid.length - 1) { break; }

      debugger;
    }

    if (
      // if the snake is oriented horizontally
      snake.tail[0] === snake.head[0]
      && // and
      // if the soon-to-be location of the snake head is not visited and is not blocked
      (grid[snake.tail[0] + 1][snake.tail[1]] === 0)
    ) {
      // then rotate clockwise (the axis of rotation is the snake tail)
      let { tail, head } = snake;
      grid[tail[0]][tail[1]] = 2;
      grid[head[0]][head[1]] = 2;
      snake = {
        'tail': [tail[0], tail[1]],
        'head': [tail[0] + 1, tail[1]]
      };
      totalMoves++;

      // if the snake has reached the end, then break the while loop
      if (snake.head[0] === grid.length - 1 &&
        snake.head[1] === grid.length - 1) { break; }

      debugger;
    }

    if (
      // if the snake is oriented vertically
      snake.tail[1] === snake.head[1]
      && // and
      // if the soon-to-be location of the snake head is not visited and is not blocked
      (grid[snake.tail[0]][snake.tail[1] + 1] === 0)
    ) {
      // then rotate counterclockwise (the axis of rotation is the snake tail)
      let { tail, head } = snake;
      grid[tail[0]][tail[1]] = 2;
      grid[head[0]][head[1]] = 2;
      snake = {
        'tail': [tail[0], tail[1]],
        'head': [tail[0], tail[1] + 1]
      };
      totalMoves++;

      // if the snake has reached the end, then break the while loop
      if (snake.head[0] === grid.length - 1 &&
        snake.head[1] === grid.length - 1) { break; }

      debugger;
    }
  }
  return totalMoves;
};

console.log(
  minimumMoves(grid1),
  minimumMoves(grid2),
  minimumMoves(grid3)
);



