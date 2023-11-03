document.addEventListener("DOMContentLoaded", () => {
    const bird = document.querySelector(".bird");
    const gameDisplay = document.querySelector(".game-container");
    const ground = document.querySelector(".ground");

    let birdLeft = 220;
    let birdBottom = 100;
    let gravity = 2;
    let isGameOver = false;
    let gap = 450;

    function startGame(){
        birdBottom -= gravity;
        bird.style.left = birdLeft + 'px';
        bird.style.bottom = birdBottom + 'px';
    }
    let timerId = setInterval(startGame, 20);

    function control(e){
        if (e.keyCode === 32) {
            jump();
        }
    }

    function jump(){
        if (birdBottom < 500) birdBottom += 50;
        bird.style.bottom = birdBottom + 'px';
    }

    document.addEventListener("keyup", control);

    function genearateObstacle(){
        let obstacleLeft = 500;
        let randomHeight = Math.random() * 60;
        let obstacleBottom = 150;
        const obstacle = document.createElement("div");
        const topobstacle = document.createElement("div");

        if (!isGameOver) {
            topobstacle.classList.add( 'topobstacle');
            obstacle.classList.add( 'obstacle');
        }
        gameDisplay.appendChild(obstacle);
        gameDisplay.appendChild(topobstacle);
        obstacle.style.left = obstacleLeft + 'px';
        topobstacle.style.left = obstacleLeft + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';
        topobstacle.style.bottom = obstacleBottom + gap + 'px';
        

        function moveObstacle(){
            obstacleLeft -= 2;
            obstacle.style.left = obstacleLeft + 'px';
            topobstacle.style.left = obstacleLeft + 'px';

            if (obstacleLeft === -60) {
                clearInterval(timerId);
                gameDisplay.removeChild(obstacle);
            }

            if (obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 && (
                birdBottom < obstacleBottom + 150 || birdBottom > obstacleBottom + gap - 200) || birdBottom === 0) {
                gamerOver();
                clearInterval(timerId);
            }
        }
        let timerId = setInterval(moveObstacle, 20);
        if (!isGameOver) setTimeout(genearateObstacle, 3000);
    }
    genearateObstacle();

    function gameOver(){
        clearInterval(gameTimerId);
        isGameOver = true;
        document.removeEventListener('keyup', control )
    }
})