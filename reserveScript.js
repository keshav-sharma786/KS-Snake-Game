console.log("Namaste Javascript");

// Game constants and variables

// here i am denoting the snake's direction as an object
// initially when the game is not being started,snake is stopped, it's not moving
const inputDir = {
  x: 0,
  y: 0,
};

// now initialising all the audios
const foodSound = new Audio("food.mp3");
const gameOverSound = new Audio("gameover.mp3");
const moveSound = new Audio("move.mp3");
const musicSound = new Audio("music.mp3");
const speed = 2;
let score = 0;
let lastPaintTime = 0;
const snakeArr = [
  {
    x: 13,
    y: 15,
  },
];
// making the food object
let food = {
  x: 6,
  y: 7,
};
const board = document.querySelector(".board");

// Game Functions
function main(ctime) {
  // making main function as game loop
  // this function will call itself again and again as a loop
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    // no need to repaint the screen
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
  // console.log(ctime);
}
// making isCollide function
function isCollide(snakeArr) {
  return false;
}

function gameEngine() {
  // Part 1: Updating the snake array & food
  // so what if the snake collides with wall
  if (isCollide(snakeArr)) {
    // playing gameOver sound
    gameOverSound.play();
    musicSound.pause();
    // resetting the inputDir Object as well
    inputDir = {
      x: 0,
      y: 0,
    };
    alert("Game Over. Press any key to play again");
    // resetting the snakeArr to it's original position which means resetting the game again
    snakeArr = [
      {
        x: 13,
        y: 15,
      },
    ];
    musicSound.play();
    score = 0;
  }
  // if the snake has eaten the food, increment the score and regenerate the food at some diff. location
  // food will be considered being eaten by the snake when the snake's head and foodElement will collide
  if (snakeArr[0] === food.y && snakeArr[0].x === food.x) {
    // means you have eaten the food
    // you will append one more snake's element in the snake's body
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
        x: Math.random(a + (b - a) * Math.random()),
        y: Math.random(a + (b - a) * Math.random()),

    }
  }
  // moving the snake
  for(let i = snakeArr.length - 2; i >= 0; i--) {
    const element = snakeArr[i];
    snakeArr[i + 1] = {...snakeArr[i]};
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Part 2: Display the snake
  // because i do'not want multiple snakes in my board
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    // snakeElement.classList.add('snake');
    if (index === 0) {
      // if index is 0 then i have to add only the snake's head, not it's whole body
      snakeElement.classList.add("head");
    } else {
      // if index != 0, it means that snake's head is already being created and added, now i want to continuously keep increasing the snake's body as snake is eating food. So i will add snake class
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  // Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// Main logic starts here
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  // adding the event listener if the person presses any means any key of the keyboard then what should happen, this arrow callback function should run
  // game would be started if the player presses any key of the keyboard
  // start
  const inputDir = {
    x: 0,
    y: 1,
  };
  // along with that moveSound will also be played
  moveSound.play();
  // now here i will also check that which keyboard key has been pressed, for this purpose I will be using switch case statements
  switch (e.key) {
    // if upArrow has been pressed by the user
    case "ArrowUp":
      console.log("ArrowUp");
      // if up arrow is being pressed then I want my snake to go up
      // which means snake should go up in the y-direction
      // so snake's x-direction has to be zero
      // because at one time snake can only move in the one direction, not in the both x and y directions
      // to move snake up i have to reduce the y-direction, that's why -1
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
