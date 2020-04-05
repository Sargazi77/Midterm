

let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let ballRadius = 10;
let paddleHeight = 10;
let paddleWidth = 75;
let paddle2Height = 10;
let paddle2Width = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddle2X = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let rightPressed2 = false;
let leftPressed2 = false;
let score = 0
score.font = "45px Change one"; 



function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD"; //color of ball
  ctx.fill();
  ctx.closePath();
}
//Draws the bottom paddle
function drawPaddle1() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD"; //color of paddle
  ctx.fill();
  ctx.closePath();
}
//Draws the top paddle
function drawPaddle2() {
  ctx.beginPath();
  ctx.rect(paddle2X, 0, paddle2Width, paddle2Height);
  ctx.fillStyle = "#0095DD"; //color of paddle
  ctx.fill();
  ctx.closePath();
}


function draw() {
  //Checks collison for left and right
  if (x + dx > canvas.width || x + dx < 0) {
    dx = -dx;
  }

  //Paddle collison for top and down "still fixing"
if (y + dy < ballRadius || y + dy < 0) {
  if (x > paddle2X && x < paddle2X + paddleWidth) {
    dy = -dy;
  } else {
    alert("Game Over. Your score is: " + score + " Congrats!")
    window.location.reload();
  }
  score++
  document.getElementById("text").innerHTML = score

} else if (y + dy > canvas.height - ballRadius) {
  if (x > paddleX && x < paddleX + paddleWidth) {
    dy = -dy;
  } else {
    alert("Game Over. Your score is: " + score + " Congrats!")
    window.location.reload();
  }
  score++
  document.getElementById("text").innerHTML = score
}

  //Clears canvas so the ball won't leave a trail
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall(); //Draws the ball
  //Draws the paddle
  drawPaddle1();
  drawPaddle2();
  //Makes the ball move
  x += dx;
  y += dy;

  //Moves the paddle
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  } else if (rightPressed2 && paddle2X < canvas.width - paddleWidth) {
    paddle2X += 7;
  } else if (leftPressed2 && paddle2X > 0) {
    paddle2X -= 7;
  }
}

//Handles the keyboard commands
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  } else if (e.keyCode == 68) {
    rightPressed2 = true;
  } else if (e.keyCode == 37) {
    leftPressed = true;
  } else if (e.keyCode == 65) {
    leftPressed2 = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 68) {
    rightPressed2 = false;
  } else if (e.keyCode == 37) {
    leftPressed = false;
  } else if (e.keyCode == 65) {
    leftPressed2 = false;
  }
}



//Refreshes screen every 10 seconds
setInterval(draw, 10);