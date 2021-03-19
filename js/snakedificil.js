
// var dificuldade = prompt("Qual o nível de dificiuldade?");

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



// Functions

// if(dificuldade=="dificil"){

init();
function init() {
    
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    
	ctx.fillStyle = "grey";//deixei o fundo cinza para a maça ficar com o plano de fundo igual;
	ctx.fillRect(0, 0, C_WIDTH, C_HEIGHT);

    locateParede();
    loadImages();
    createSnake();
	posicao()
	locateApple1();// 15 apples
	locateApple2();
	locateApple3();
	locateApple4();
	locateApple5();
	
	for(var l=0;l<10;l++){locateObstaculo()}// 15 obstaculos
	
	
    setTimeout("gameCycle()", DELAY);
	
}    

function loadImages() {
    head = new Image();
    head.src = "css/sprites/head.png"; // desenhei no axeprite e deixei o mesmo nome;
	
	headGreen = new Image();
	headGreen.src = "css/sprites/head.png"
	
	headYellow = new Image();
	headYellow.src = "css/sprites/head2.png"
	
	headRed = new Image();
	headRed.src = "css/sprites/head3.png"
	
	headWhite = new Image();
	headWhite.src = "css/sprites/head6.png"
	
	headBlue = new Image();
	headBlue.src = "css/sprites/head4.png"
	
    ball = new Image();
    ball.src = "css/sprites/dot.png"; // desenhei no axeprite e deixei o mesmo nome;
	
	ballGreen = new Image();
	ballGreen.src = "css/sprites/dot.png"
	
	ballYellow = new Image();
	ballYellow.src = "css/sprites/dot2.png"
	
	ballRed = new Image();
	ballRed.src = "css/sprites/dot3.png"
	
	ballWhite = new Image();
	ballWhite.src = "css/sprites/dot6.png"
	
	ballBlue = new Image();
	ballBlue.src = "css/sprites/dot4.png"
    
    apple1 = new Image();
    apple1.src = "css/sprites/apple1.png";// desenhei no axeprite e deixei o mesmo nome, tentei fazer uma maça amarela contudo se transformou um uma bolinha pelo tamanho do pixel;

    apple2 = new Image();
    apple2.src = "css/sprites/appleee.png";
	
	apple3 = new Image();
    apple3.src = "css/sprites/apple3.png";
	
	apple4 = new Image();
    apple4.src = "css/sprites/apple4.png";
	
	apple5 = new Image();
    apple5.src = "css/sprites/apple6.png";

	obstaculo = new Image();// osbtaculo
	obstaculo.src = "css/sprites/obstaculo.png";

    parede = new Image();
	parede.src = "css/sprites/muro.png"
	
	
}

morte.src = "sounds/player-died.mp3"

win.src = "sounds/level-win.mp3"

ponto.src = "sounds/coin.mp3"

dano.src = "sounds/birdo-hit.mp3"

tilt.src = "sounds/Musica Tema.mp3"


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

function locateApple1() {
	for(var z = 0;z<3;z++){
		var r = Math.floor(Math.random() * MAX_RAND)*DOT_SIZE;
		var t = Math.floor(Math.random() * MAX_RAND)*DOT_SIZE;
		apple1_x.push(r);
		apple1_y.push(t);
	}
}    

function locateApple2() {
    for(var z = 0;z<3;z++){
	var u = Math.floor(Math.random() * MAX_RAND)*DOT_SIZE;
	var y = Math.floor(Math.random() * MAX_RAND)*DOT_SIZE;
    apple2_x.push(u);
    apple2_y.push(y);
	}
}    

function locateApple3() {
	for(var z = 0;z<3;z++){
	var i = Math.floor(Math.random() * MAX_RAND)*DOT_SIZE;
	var o = Math.floor(Math.random() * MAX_RAND)*DOT_SIZE;
    apple3_x.push(i);
    apple3_y.push(o);
	}
}    

function locateApple4() {
	for(var z = 0;z<3;z++){
	var p = Math.floor(Math.random() * MAX_RAND)*DOT_SIZE;
	var f = Math.floor(Math.random() * MAX_RAND)*DOT_SIZE;
    apple4_x.push(p);
    apple4_y.push(f);
	}
}    

function locateApple5() {
    for(var z = 0;z<3;z++){
	var h = Math.floor(Math.random() * MAX_RAND)*DOT_SIZE;
	var g = Math.floor(Math.random() * MAX_RAND)*DOT_SIZE;
    apple5_x.push(g);
    apple5_y.push(h);
	}
}    

function locateObstaculo() {

    var u = Math.floor(Math.random() * MAX_RAND);
    obstaculo_x.push (u * DOT_SIZE);

		u = Math.floor(Math.random() * MAX_RAND);
    obstaculo_y.push (u * DOT_SIZE);

}

function locateParede()
{
     paredeX1 = 150;  
    for(var i = 80; i <= 300; i += 10)
        {
            paredeY1.push(i);
        }
     paredeX2 = 400;  
    for(var i = 80; i <= 300; i += 10)
        {
            paredeY2.push(i);
        }
}

function checkParede()  
{
    for(var i = 0; i < 21; i++)
    {
        if(x[0] == paredeX1 && y[0] == paredeY1[i] && pontos != 15)
        {
            setTimeout(gameOver,0);
            dots = 0;
			
        }
        if(x[0] == paredeX2 && y[0] == paredeY2[i] && pontos != 15)
        {
            setTimeout(gameOver,0);
            dots = 0;
        }
    }
}

function gameCycle() {
    if (inGame) {
	    tilt.play();
		tilt.volume = 0.01
        ganhador();
		derrotado();
		checkApple1();
		checkApple2();
		checkApple3();
		checkApple4();
		checkApple5();
        checkCollision();
		checkObstaculo();
		checkParede();
        
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

function checkApple1() {
    for(var i=0;i<3;i++){
if ((x[0] == apple1_x[i]) && (y[0] == apple1_y[i])) {
        if(pontuacao%3==0 && dots<5){dots++}
        pontuacao+=3;
		locateApple1();
		DELAY = DELAY - 10
		head = head
		ball = ball
		apple1_x[i]=1000
		apple1_y[i]=1000
	    ponto.play();
	
    }
  }	
} 
   
   function checkApple2() {
    for(var ii=0;ii<3;ii++){
if ((x[0] == apple2_x[ii]) && (y[0] == apple2_y[ii])) {
        if(pontuacao%3==0 && dots<5){dots++}
        pontuacao+=4;
		locateApple2();
		DELAY = DELAY - 10
		head = headYellow
		ball = ballYellow
		apple2_x[ii]=1000
		apple2_y[ii]=1000
		ponto.play();
	
	
    }
  }	
} 

function checkApple3() {
    for(var iii=0;iii<3;iii++){
if ((x[0] == apple3_x[iii]) && (y[0] == apple3_y[iii])) {
        if(pontuacao%3==0 && dots<5){dots++}
        pontuacao+=5;
		locateApple3();
		DELAY = DELAY - 10
		head = headRed
		ball = ballRed
		apple3_x[iii]=1000
		apple3_y[iii]=1000
		ponto.play();
	
	
    }
  }	
} 

function checkApple4() {
    for(var iiii=0;iiii<3;iiii++){
if ((x[0] == apple4_x[iiii]) && (y[0] == apple4_y[iiii])) {
        if(pontuacao%3==0 && dots<5){dots++}
        pontuacao+=2;
		locateApple4();
		DELAY = DELAY - 10
		head = headBlue
		ball = ballBlue
		apple4_x[iiii]=1000
		apple4_y[iiii]=1000
	    ponto.play();
	
    }
  }	
} 

function checkApple5() {
    for(var iiiii=0;iiiii<3;iiiii++){
if ((x[0] == apple5_x[iiiii]) && (y[0] == apple5_y[iiiii])) {
        if(pontuacao%3==0 && dots<5){dots++}
        pontuacao+=1;
		locateApple5();
		DELAY = DELAY - 10
		head = headWhite
		ball = ballWhite
		apple5_x[iiiii]=1000
		apple5_y[iiiii]=1000
		ponto.play();
	
	
    }
  }	
} 

function checkObstaculo() { 
   for(var ll=0;ll<10;ll++){
if ((x[0] == obstaculo_x[ll]) && (y[0] == obstaculo_y[ll])) {
        dots--
       locateObstaculo();
		obstaculo_x[ll]=1000
		obstaculo_y[ll]=1000
		dano.play();
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
        for(var k=0;k<3;k++)ctx.drawImage(apple1, apple1_x[k], apple1_y[k])
		for(var kk=0;kk<3;kk++)ctx.drawImage(apple2, apple2_x[kk], apple2_y[kk])
		for(var kkk=0;kkk<3;kkk++)ctx.drawImage(apple3, apple3_x[kkk], apple3_y[kkk])
		for(var kkkk=0;kkkk<3;kkkk++)ctx.drawImage(apple4, apple4_x[kkkk], apple4_y[kkkk])
		for(var kkkkk=0;kkkkk<3;kkkkk++)ctx.drawImage(apple5, apple5_x[kkkkk], apple5_y[kkkkk])
		
		
		for(var d=0;d<10;d++)ctx.drawImage(obstaculo, obstaculo_x[d], obstaculo_y[d]);
        
		
		
		for (var z = 0; z < dots; z++) {
            if (z == 0) {
                ctx.drawImage(head, x[z], y[z]);
            } else {
                ctx.drawImage(ball, x[z], y[z]);
            
			}
        }

        for(var z = 0; z < 27; z++)
		{
		    ctx.drawImage(parede, paredeX1, paredeY1[z]);
		}		
		
		for(var z = 0; z < 27; z++)
		{
		    ctx.drawImage(parede, paredeX2, paredeY2[z]);
		} 
		
    } else {
        gameOver();
    }        
}

function gameOver(){
    tilt.pause();
    ctx.fillStyle = "green";
    ctx.textBaseline = "middle"; 
    ctx.textAlign = "center"; 
    ctx.font = "normal bold 35px sans-serif";
    ctx.fillText("sua pontuação foi: " +pontuacao+ " pts", C_WIDTH/2, C_HEIGHT/2);// pontução
    ctx.fillText("O jogo acabou, ate a proxima.", C_WIDTH/2, C_HEIGHT/4)// não tinha outra ideia para colocar no final do game então usei o obvio;
	morte.play();
	
}

function vitoria(){
	inGame = false;
	ctx.fillStyle = "black";
    ctx.textBaseline = "middle"; 
    ctx.textAlign = "center"; 
	ctx.font = "normal bold 35px sans-serif";
	ctx.fillText("sua pontuação foi: " +pontuacao+ " pts", C_WIDTH/2, C_HEIGHT/2);
	ctx.fillText("VOCÊ VENCEU, PARABÉNS", C_WIDTH/2, C_HEIGHT/4);
	count==0;
	win.play();


}

function ganhador(){
	if(pontuacao == 45){
	 
	
	setTimeout(vitoria,0)
	}
}
function derrotado(){
	if(obstaculo == 10){
	
	setTimeout(gameOver,0)
	 
	}
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
