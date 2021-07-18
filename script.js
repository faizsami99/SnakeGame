
let borad = document.querySelector('.gameScreen');
let direction = {x:0, y:0};

let snakePosition = [
    {x:14, y:14}
];

let foodPostion = {x:10, y:10};
let giveFrametime = 0;
let speed = 1;

function game(frameTime) {
    window.requestAnimationFrame(game);
    if((frameTime - giveFrametime)/100 < 1/speed){
        return;
    }
    giveFrametime = frameTime;
    getGame();
}

function isCollide(){
    for (let i = 1; i < snakePosition.length; i++) {
        if(snakePosition[i].x === snakePosition[0].x && snakePosition[i].y === snakePosition[0].y){
            return true;
        }
    }
    if(snakePosition[0].x >= 18 || snakePosition[0].x <=0 || snakePosition[0].y >= 18 || snakePosition[0].y <=0){
        return true;
    }

    return false;
}

function getGame(){

    // gameOver


    if(isCollide()){
        snakePosition = [
            {x:14, y:14}
        ];
        direction = {x:0, y:0};

    };

    // Snake eat food

    if(snakePosition[0].y === foodPostion.y && snakePosition[0].x ===foodPostion.x){
        snakePosition.unshift({x: snakePosition[0].x + direction.x, y: snakePosition[0].y + direction.y});
        let a = 2;
        let b = 16;
        foodPostion = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Creating food and snake;

    for (let i = snakePosition.length - 2; i>=0; i--) { 
        snakePosition[i+1] = {...snakePosition[i]};
    }

    snakePosition[0].x += direction.x;
    snakePosition[0].y += direction.y;

    borad.innerHTML = "";
    // snake
    snakePosition.forEach((e, index) => {
        let snake = document.createElement('div');
        snake.style.gridRowStart = e.y;
        snake.style.gridColumnStart = e.x;
        snake.style.borderRadius = "30%"
        if(index === 0){
            snake.classList.add('head');
        }
        else{
            snake.classList.add('tail');
        }

        borad.appendChild(snake);
        
        //food

        let food = document.createElement('div');
        food.style.gridRowStart = foodPostion.y;
        food.style.gridColumnStart = foodPostion.x;
        food.style.borderRadius = "100%"
        food.classList.add('food');
        borad.appendChild(food);

    });
}

window.requestAnimationFrame(game);
window.addEventListener('keydown', (e) => {
    console.log(e.key);
    if(e.key == "ArrowUp"){
        direction = {x: 0 , y : -1};
    }
    if(e.key == "ArrowDown"){
        direction = {x: 0 , y : 1};
    }
    if(e.key == "ArrowLeft"){
        direction = {x: -1 , y : 0};
    }
    if(e.key == "ArrowRight"){
        direction = {x: 1 , y : 0};
    }
});


