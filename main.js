var myCanvas = document.getElementById('myCanvas');
var score = document.getElementById("score");
var highScore = document.getElementById("highScore");
var logoimg = document.getElementById("logoimg");
var ctx = myCanvas.getContext('2d');
var canvasWidth = myCanvas.width;
var canvasHeight = myCanvas.height;

var gridSteps = 10;


var snake = {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    xSnakeSteps: gridSteps,
    ySnakeSteps: 0,
    snakeBodyBalls: [],
    ballsArrCount: 2
};
var redPoint = {
    x: canvasWidth / 2,
    y: canvasHeight / 2
};
var score = 2;
var highScore = [];


var imgSnake = new Image();
imgSnake.src = "snakeBall.png";
imgSnake.onload = () => {
    // console.log('hello5');
    setInterval(() => {
        render();
        //console.log('test');
    }, 100);


}
var imgRedPoint = new Image();
imgRedPoint.src = "redPoint.png";
imgRedPoint.onload = function() {
    setInterval(() => {
        render();
        //console.log('test2');
    }, 200);

}





function render() {
    let snakeBodyBalls = [];
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    snake.x += snake.xSnakeSteps;
    snake.y += snake.ySnakeSteps;

    if (snake.x >= canvasWidth) {
        snake.x = 0;

    } else if (snake.x < 0) {
        snake.x = canvasWidth;
    }
    if (snake.y >= canvasHeight) {
        snake.y = 0;
    } else if (snake.y < 0) {
        snake.y = canvasHeight;
    }
    snake.snakeBodyBalls.unshift({ x: snake.x, y: snake.y });
    for (var i = 0; i < snake.snakeBodyBalls.length; i++) {
        console.log(snake.snakeBodyBalls[i]);
        ctx.drawImage(imgSnake, snake.snakeBodyBalls[i].x, snake.snakeBodyBalls[i].y, gridSteps, gridSteps);
        if (snake.snakeBodyBalls.length > snake.ballsArrCount) {
            snake.snakeBodyBalls.pop();
        }
    }
    //console.log(i);
    redPointCrash();
    document.getElementById("score").value = score;
    document.getElementById("highScore").value = highScore;
    scoreCounting();

}

function redPointCrash() {
    console.log(score);

    for (var i = 0; i < snake.snakeBodyBalls.length; i++) {
        // console.log(snake.snakeBodyBalls);
        ctx.drawImage(imgSnake, snake.snakeBodyBalls[i].x, snake.snakeBodyBalls[i].y, gridSteps, gridSteps);
        if (snake.snakeBodyBalls[i].x == redPoint.x && snake.snakeBodyBalls[i].y == redPoint.y) {
            snake.ballsArrCount++;
            score = score + 1;
            redPoint.x = getRandomInt(0, 50) * gridSteps;
            redPoint.y = getRandomInt(0, 50) * gridSteps;

        }
        ctx.drawImage(imgRedPoint, redPoint.x, redPoint.y, gridSteps, gridSteps);

        for (var j = i + 1; j < snake.snakeBodyBalls.length; j++) {
            if (snake.snakeBodyBalls[i].x == snake.snakeBodyBalls[j].x && snake.snakeBodyBalls[i].y == snake.snakeBodyBalls[j].y) {

                alert("Game over!");

                snake.snakeBodyBalls = [];
                snake.ballsArrCount = 2;
                snake.x = canvasWidth / 2;
                snake.y = canvasHeight / 2;
                redPoint.x = canvasWidth / 2;
                redPoint.y = canvasHeight / 2;
                score = 2;
                scoreCounting();
            }
        }
    }
}

function scoreCounting() {
    if (highScore <= score) {
        highScore = score;
    }

}



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min));
}

document.body.onkeydown = (ev) => {
    // console.log(ev);
    // 40 - down
    // 39 - right
    // 38 - up
    // 37 - left

    //ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    switch (ev.keyCode) {
        case 37:
            // console.log("left");
            snake.xSnakeSteps = -gridSteps;
            snake.ySnakeSteps = 0;

            break;
        case 38:
            // console.log("up");
            snake.ySnakeSteps = -gridSteps;
            snake.xSnakeSteps = 0;

            break;
        case 39:
            // console.log("right");
            snake.xSnakeSteps = gridSteps;
            snake.ySnakeSteps = 0;

            break;
        case 40:
            // console.log("down");
            snake.ySnakeSteps = gridSteps;
            snake.xSnakeSteps = 0;

            break;
        default:
            break;
    }
};