var canvas;
var ctx;

var head;
var headRed;
var headWhite;
var headBlue;
var headYellow;
var apple1;
var apple2;
var apple3;
var apple4;
var apple5;
var ball;
var ballRed;
var ballWhite;
var ballBlue;
var ballYellow;
var parede;
var obstaculo;
var pontuacao=0;
var count = new Number;
var count = 80;


var dots;
var apple1_x=[];
var apple1_y=[];
var apple2_x=[];
var apple2_y=[];
var apple3_x=[];
var apple3_y=[];
var apple4_x=[];
var apple4_y=[];
var apple5_x=[];
var apple5_y=[];
var paredeX1=[];
var paredeX2=[];
var paredeY1=[];
var paredeY2=[];
var apple_x=[];
var apple_y=[];
var obstaculo_x=[];
var obstaculo_y=[];
var DELAY = 60;


var leftDirection = false;
var rightDirection = false;
var upDirection = false;
var downDirection = false;
var inGame = true;    

const DOT_SIZE =10;
const MAX_RAND = 49;// calculei a média para a maçã aparecer em todo o mapa;
const C_HEIGHT = 500;// aumentei 200 pixeis para que o jogo não crie uma barra de rolagem ;
const C_WIDTH = 600; // aumentei 200 pixeis para que o jogo não crie uma barra de rolagem ;
const C_UIDTH = 200;
const C_RAIGHT = 500;
const morte = new Audio();
const ponto = new Audio();
const dano = new Audio();
const win = new Audio();
const tilt = new Audio();

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

var x = [];
var y = [];



    init();
    function init() {
        
        canvas = document.getElementById("myCanvas");
        ctx = canvas.getContext("2d");
    
        ctx.fillStyle = "grey";//deixei o fundo cinza para a maça ficar com o plano de fundo igual;
        ctx.fillRect(0, 0, C_WIDTH, C_HEIGHT);
    
        loadImages();
        createSnake();
        locateApple();
        setTimeout("gameCycle()", DELAY);
    }    
    
    function loadImages() {
        head = new Image();
        head.src = "css/sprites/head.png"; // desenhei no axeprite e deixei o mesmo nome;
        
        ball = new Image();
        ball.src = "css/sprites/dot.png"; // desenhei no axeprite e deixei o mesmo nome;
        
        apple1 = new Image();
        apple1.src = "css/sprites/apple1.png"; // desenhei no axeprite e deixei o mesmo nome, tentei fazer uma maça amarela contudo se transformou um uma bolinha pelo tamanho do pixel;
    }
    
    tilt.src = "sounds/Musica Tema.mp3"
    
    ponto.src = "sounds/coin.mp3"
    
    morte.src = "sounds/player-died.mp3"
    
    function createSnake() {
        dots = 1
        for (var z = 0; z < dots; z++) {
            x[z] = 50 - z * 10;
            y[z] = 50;
        }
    }
    
    function start(){
    if((count - 1) >= 0){
        count=count - 1;
        tempo.innerText=count;
        setTimeout('start();',1000);
        }
    }
    
    function locateApple() {
        var r = Math.floor(Math.random() * MAX_RAND);
        apple1_x = r * DOT_SIZE;
    
        r = Math.floor(Math.random() * MAX_RAND);
        apple1_y = r * DOT_SIZE;
    }    
    
    function gameCycle() {
        if (inGame) {
            tilt.play()
            checkApple();
            checkCollision();
            move();
            doDrawing();
            setTimeout("gameCycle()", DELAY);
        }
    }
    
    if (count==0) {
         inGame = false;
         fimTempo ()
         }
    
    function checkApple() {
        if ((x[0] == apple1_x) && (y[0] == apple1_y)) {
            dots++;
            ponto.play();
            locateApple();
        }
    }    
    
    function checkCollision() {
        for (var z = dots; z > 0; z--) {
            if ((z > 4) && (x[0] == x[z]) && (y[0] == y[z])) {
                inGame = false;
            }
        }
    
        if (y[0] >= C_HEIGHT) {
            inGame = false;
        }
    
        if (y[0] < 0) {
           inGame = false;
        }
    
        if (x[0] >= C_WIDTH) {
          inGame = false;
        }
    
        if (x[0] < 0) {
          inGame = false;
        }
    }
    
    function move() {
        for (var z = dots; z > 0; z--) {
            x[z] = x[z-1];
            y[z] = y[z-1];
        }
    
        if (leftDirection) {
            x[0] -= DOT_SIZE;
        }
    
        if (rightDirection) {
            x[0] += DOT_SIZE;
        }
    
        if (upDirection) {
            y[0] -= DOT_SIZE;
        }
    
        if (downDirection) {
            y[0] += DOT_SIZE;
        }
    }    
    
    function doDrawing() {
        ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);
        ctx.fillRect(0, 0, C_WIDTH, C_HEIGHT);
        
        if (inGame) {
            ctx.drawImage(apple1, apple1_x, apple1_y);
            
            for (var z = 0; z < dots; z++) {
                if (z == 0) {
                    ctx.drawImage(head, x[z], y[z]);
                } else {
                    ctx.drawImage(ball, x[z], y[z]);
                }
            }    
        } else {
            gameOver();
        }        
    }
    
    function gameOver() {
        inGame = false;
        morte.play();
        ctx.fillStyle = "green";
        ctx.textBaseline = "middle"; 
        ctx.textAlign = "center"; 
        ctx.font = "normal bold 50px sans-serif";
        ctx.fillText("A cobrinha bateu", C_WIDTH/2, C_HEIGHT/2);// não tinha outra ideia para colocar no final do game então usei o obvio;
    }
    
    function fimTempo (){
        inGame = false;
        ctx.fillStyle = "black";
        ctx.textBaseline = "middle"; 
        ctx.textAlign = "center"; 
        ctx.font = "normal bold 35px sans-serif";
        ctx.fillText("sua pontuação foi: " +pontuacao+ " pts", C_WIDTH/2, C_HEIGHT/2);
        ctx.fillText("Você perdeu, ate a proxima.", C_WIDTH/2, C_HEIGHT/4);
        morte.play();
    }
    
    onkeydown = function(e) {
        var key = e.keyCode;
    
        if ((key == LEFT_KEY) && (!rightDirection)) {
            leftDirection = true;
            upDirection = false;
            downDirection = false;
        }
    
        if ((key == RIGHT_KEY) && (!leftDirection)) {
            rightDirection = true;
            upDirection = false;
            downDirection = false;
        }
    
        if ((key == UP_KEY) && (!downDirection)) {
            upDirection = true;
            rightDirection = false;
            leftDirection = false;
        }
    
        if ((key == DOWN_KEY) && (!upDirection)) {
            downDirection = true;
            rightDirection = false;
            leftDirection = false;
        }        
    };

