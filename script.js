let lastReset = 0;
const MOVES_PER_SECOND = 5;

let foodData = { column: 0, row: 0 };

let snakeData = [{ column: 11, row: 11 }];

let direction = "right";

let snakeStatus = "hunt";

const gameBoard = document.querySelector("#game-board");

function startGame() {
  initKeyboardEvents();
  console.log("starting game");
  window.requestAnimationFrame(gameEngine);
}

function initKeyboardEvents() {
  document.addEventListener("keydown", (e) => {
    if (e.keyCode == "37") direction = "left";
    else if (e.keyCode == "38") direction = "up";
    else if (e.keyCode == "39") direction = "right";
    else if (e.keyCode == "40") direction = "down";
    else direction = "pause";
  });
}

function gameEngine(timestamp) {
  window.requestAnimationFrame(gameEngine);
  let timeSinceLastUpdate = (timestamp - lastReset) / 1000;
  if (timeSinceLastUpdate < 1 / MOVES_PER_SECOND) return;

  console.log(timestamp);
  lastReset = timestamp;
  update();
  draw();
}

function update() {
  updateFood();
  updateSnake();
  updateSnakeStatus();
}

function updateSnakeStatus() {
  let snakeHead = snakeData[0];
  if (snakeHead.column == foodData.column && snakeHead.row == foodData.row) {
    snakeStatus = "grow";
  }
}

function draw() {
  drawFood();
  drawSnake();
}

function updateFood() {
  let food = document.querySelector(".food");
  if (food) return;
  console.log("create new food");
  foodData.column = getRandom(21);
  foodData.row = getRandom(21);
}

function updateSnake() {
  let nextCell = { }
  nextCell.row = snakeData[0].row;
  nextCell.column = snakeData[0].column;

  switch (direction) {
    case "right":
      nextCell.column++;
      break;
    case "left":
      nextCell.column--;
      break;
    case "up":
      nextCell.row--;
      break;
    case "down":
      nextCell.row++;
      break;
    case "pause":
      console.log("Pause");
      break;
    default:
      console.error("unknown direction " + direction);
  }

  if (snakeStatus == "grow") {
    snakeData.push(nextCell);
    snakeStatus = "hunt"
  } else {
    for (let i = 1; i < snakeData.length; i++) {
      snakeData[i] = snakeData[i - 1];
    }
    snakeData[0] = nextCell;
  }
}

function getRandom(max, min = 0) {
  let range = max - min;
  let randomNum = Math.random() * range;
  return Math.floor(randomNum) + min;
}

function drawFood() {
  let food = document.querySelector(".food");
  if (food) {
    if (snakeStatus == "grow") {
      gameBoard.removeChild(food);
    }
    return;
  }

  food = document.createElement("div");
  food.style.gridRowStart = foodData.row;
  food.style.gridColumnStart = foodData.column;
  food.classList.add("food");

  gameBoard.appendChild(food);
}

function drawSnake() {
  document.querySelectorAll(".snake").forEach((element) => {
    gameBoard.removeChild(element);
  });

  for (let i = 0; i < snakeData.length; i++) {
    let snake = document.createElement("div");
    snake.style.gridRowStart = snakeData[i].row;
    snake.style.gridColumnStart = snakeData[i].column;

    snake.classList.add("snake");
    gameBoard.appendChild(snake);
  }
}

startGame();
