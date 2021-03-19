
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
        posicao();
        locateApple();
        for(var i=0;i<15;i++){locateApple()}// 15 apples
        for(var l=0;l<10;l++){locateObstaculo()}// 15 obstaculos
        
        setTimeout("gameCycle()", DELAY);
    }    
    
    function loadImages() {
        head = new Image();
        head.src = "css/sprites/head.png"; // desenhei no axeprite e deixei o mesmo nome;
        
        ball = new Image();
        ball.src = "css/sprites/dot.png"; // desenhei no axeprite e deixei o mesmo nome;
        
        apple1 = new Image();
        apple1.src = "css/sprites/apple1.png"; // desenhei no axeprite e deixei o mesmo nome, tentei fazer uma maça amarela contudo se transformou um uma bolinha pelo tamanho do pixel;
    
        obstaculo = new Image();// osbtaculo
        obstaculo.src = "css/sprites/obstaculo.png";
    }
    
    tilt.src = "sounds/Musica Tema.mp3"
    
    ponto.src = "sounds/coin.mp3"
    
    morte.src = "sounds/player-died.mp3"
    
    dano.src = "sounds/birdo-hit.mp3"
    
    win.src = "sounds/level-win.mp3"
    
    function start(){
     if((count - 1) >= 0){
         count=count - 1;
         tempo.innerText=count;
         setTimeout('start();',1000);
         
      }
     }
    
    function createSnake() {
        dots = 5;// a cobrinha vai começar so com a cabeça para que quando eu colocar um contador de pontos, ele começe do zero;
        
        for (var z = 0; z < dots; z++) {
            x[z] = 50 - z * 10;
            y[z] = 50;
        }
    }
    
    function locateApple() {
    
        var g = Math.floor(Math.random() * MAX_RAND);
        apple1_x.push (g * DOT_SIZE);
    
            g = Math.floor(Math.random() * MAX_RAND);
        apple1_y.push (g * DOT_SIZE);
    
    }
    function locateObstaculo() {
    
        var u = Math.floor(Math.random() * MAX_RAND);
        obstaculo_x.push (u * DOT_SIZE);
    
            u = Math.floor(Math.random() * MAX_RAND);
        obstaculo_y.push (u * DOT_SIZE);
    
    }
    
    function gameCycle() {
        if (inGame) {
            tilt.play();
            ganhador();
            derrotado();
            checkApple();
            checkCollision();
            checkObstaculo();
            
            move();
            doDrawing();
            setTimeout("gameCycle()", DELAY);
        }
        
        if (dots==0) {
        inGame = false;
         count=0
         fimTempo ()
         }
         
         if (count==0) {
         inGame = false;
         fimTempo ()
         }
         
         if(pontuacao==15){
         inGame = false;
         ganhador();
         count=10
         }
         
    }
    
    function checkApple() {
        for(var ii=0;ii<15;ii++){
    if ((x[0] == apple1_x[ii]) && (y[0] == apple1_y[ii])) {
            if(pontuacao%3==0 && dots<5){dots++}
            pontuacao++;
            locateApple();
            ponto.play();
            apple1_x[ii]=1000
            apple1_y[ii]=1000
        
        
    }
        
        }
        
        
    } 
       
    function checkObstaculo() { 
       for(var ll=0;ll<10;ll++){
    if ((x[0] == obstaculo_x[ll]) && (y[0] == obstaculo_y[ll])) {
            dots--
            dano.play();
           locateObstaculo();
            obstaculo_x[ll]=1000
            obstaculo_y[ll]=1000
        }
     
    
     }
     
      
     
    }
    
    function checkCollision() // consegui fazer a cobrinha reaparecer do outro lado.
    {
        
    
         if (y[0] >=C_HEIGHT) {
            
            y[0]=((y[0]*(-1))+C_HEIGHT)
        }
    
        if (y[0] < 0) {
           
           y[0]=(y[0]+C_HEIGHT)
        }
    
        if (x[0] >= C_WIDTH) {
          
            x[0]=((x[0]*(-1))+C_WIDTH)
        }
    
        if (x[0] < 0) {
          
          x[0]=(x[0]+C_WIDTH)
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
            for(var kk=0;kk<15;kk++)ctx.drawImage(apple1, apple1_x[kk], apple1_y[kk])
            
            
            for(var d=0;d<10;d++)ctx.drawImage(obstaculo, obstaculo_x[d], obstaculo_y[d]);
            
            
            
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
        morte.play();
        ctx.fillStyle = "green";
        ctx.textBaseline = "middle"; 
        ctx.textAlign = "center"; 
        ctx.font = "normal bold 35px sans-serif";
        ctx.fillText("sua pontuação foi: " +pontuacao+ " pts", C_WIDTH/2, C_HEIGHT/2);// pontução
        ctx.fillText("O jogo acabou, ate a proxima.", C_WIDTH/2, C_HEIGHT/4)// não tinha outra ideia para colocar no final do game então usei o obvio;
    }
    
    function vitoria (){
        win.play();
        inGame = false;
        ctx.fillStyle = "black";
        ctx.textBaseline = "middle"; 
        ctx.textAlign = "center"; 
        ctx.font = "normal bold 35px sans-serif";
        ctx.fillText("sua pontuação foi: " +pontuacao+ " pts", C_WIDTH/2, C_HEIGHT/2);
        ctx.fillText("VOCÊ VENCEU, PARABÉNS", C_WIDTH/2, C_HEIGHT/4);
    
    }
    
    function ganhador(){
        if(pontuacao == 15){
        
        setTimeout(vitoria,0)
        }
    }
    function derrotado(){
        if(obstaculo == 10){
        
        setTimeout(gameOver,0)
        }
    }
    
    function fimTempo (){ //chamando essa função quando me mato nas caveiras
        morte.play();
        inGame = false;
        ctx.fillStyle = "black";
        ctx.textBaseline = "middle"; 
        ctx.textAlign = "center"; 
        ctx.font = "normal bold 35px sans-serif";
        ctx.fillText("sua aaaa foi: " +pontuacao+ " pts", C_WIDTH/2, C_HEIGHT/2);
        ctx.fillText("Você perdeu, ate a proxima.", C_WIDTH/2, C_HEIGHT/4);
    
    }
    
    function posicao()	{
        var posicaocobra = Math.trunc(Math.random()*4)
        if(posicaocobra == 0)	{
            leftDirection = true
        }
        
        if(posicaocobra == 1)	{
            rightDirection = true
        }
        
        if(posicaocobra == 2)	{
            upDirection = true
        }
        
        if(posicaocobra == 3)	{
            downDirection = true
        }
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
    
    