var player,ground,bg,player_run,player_jump;
var bground_img;
var obstacle,obstacleGroup,o1,o2,o3,o4;
var gameState;
var coin,coinGroup,coin_image;
function preload(){
ground_img=loadImage("ground.png");
player_run=loadAnimation("Running/0.png","Running/1.png","Running/2.png","Running/3.png","Running/4.png","Running/5.png","Running/6.png","Running/7.png","Running/8.png");
o1=loadImage("Obstacles/o1.png");
o2=loadImage("Obstacles/o2.png");
o3=loadImage("Obstacles/o3.png");
coin_image=loadImage("coins.png");
}

function setup() {
  createCanvas(800,400);

  bg=createSprite(400,200);
  bg.addImage(ground_img);
  bg.scale=1.2;
  bg.x=bg.width/2;
  player=createSprite(50, 360, 20, 50);
  player.addAnimation("running",player_run);
 
  player.scale=0.8;
  player.width=100;
  
  ground=createSprite(400, 392, 1600, 20);
  ground.visible=false;

  obstacleGroup=new Group();
  coinGroup=new Group();
  gameState="play"
}

function draw() {
  background(255,255,255);  


  if(gameState==="play"){

    bg.velocityX=-6;
    if(bg.x<0){
      bg.x=bg.width/2;
    }
    
    if(keyDown("space")&&player.y>=315.2){
      player.velocityY=-12;
      
    }
    player.velocityY+=0.8;

    spawnObstacle();
    spawnCoins();

    if(obstacleGroup.isTouching(player)){
      gameState="end";
    }

  }

else if(gameState==="end"){

  bg.velocityX=0;
  player.velocityY=0;

  obstacleGroup.setVelocityXEach(0);
  obstacleGroup.setLifetimeEach(-1);
  coinGroup.setVelocityXEach(0);
  coinGroup.setLifetimeEach(-1);

}

player.collide(ground);

console.log(player.y);




  drawSprites();
}

function spawnObstacle(){
  if(frameCount%80===0){
    obstacle=createSprite(800,345,20,50);
    obstacle.velocityX=bg.velocityX;
    obstacle.lifetime=Math.round(800/obstacle.velocityX);
    obstacleGroup.add(obstacle);
    var rand=Math.round(random(1,3));
    switch (rand){
      case 1:obstacle.addImage(o1);
      break;
      case 2:obstacle.addImage(o2);
      break;
      case 3:obstacle.addImage(o3);
      break;
      default:break;
    }
    obstacle.scale=0.3;
  }
}

function spawnCoins(){
  if(frameCount%60===0){
    coin=createSprite(800,250,20,50);
    coin.addImage(coin_image);
    coin.velocityX=bg.velocityX;
    coin.lifetime=Math.round(800/coin.velocityX);
    coinGroup.add(coin);
    var rand=Math.round(random(150,250));
    coin.y=rand
    coin.scale=0.2;
  }
}