var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameOverImg,restartImg;
var gameOver,restart;
var jumpSound , checkpointSound , dieSound





function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");
  jumpSound = loadSound("jump.mp3");
  checkpointSound = loadSound("checkpoint.mp3");
  dieSound = loadSound("die.mp3");
  
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 1.5;
  gameOver.visible=false;


  
  



  restart = createSprite(300,130);
  restart.addImage(restartImg)
  restart.scale = 0.5;
  restart.visible=false;


 
  

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  
  
  score = 0;
trex.setCollider("circle",0,0,40);
 // trex.debug=true;
  
}

function draw() {
  background(180);
  text("Score: "+ score, 500,50);
  
  

  
  if(gameState === PLAY){
       
    ground.velocityX = -(4+score/100);
    
   
    score = score + Math.round(frameCount/60);
    score=score+Math.round(getFrameRate()/60);
    if(score>0 && score%100 === 0 ){ 
      checkpointSound.play();
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
   
    if(keyDown("space")&& trex.y >= 150) {
        trex.velocityY = -13;
     jumpSound.play();

    }


    
  
    trex.velocityY = trex.velocityY + 0.8
  
  
    spawnClouds();
  
   
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
        dieSound.play();
    }
  }
   else if (gameState === END) {
       
      ground.velocityX = 0;
      trex.velocityY = 0;

     trex.changeAnimation("collided",trex_collided);
     
     obstaclesGroup.setLifetimeEach(-1);
     cloudsGroup.setLifetimeEach(-1);

     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
     gameOver.visible=true;
     restart.visible=true;

     if(mousePressedOver(restart)) {
      reset();
      }
   }
  
 

    trex.collide(invisibleGround);
  
   

  
    drawSprites();
}
   function reset(){
   gameState = PLAY;
   gameOver.visible = false; 
   restart.visible = false;
   obstaclesGroup.destroyEach();
   cloudsGroup.destroyEach();
   trex.changeAnimation("running",trex_running);
   score = 0;


   }

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -(6+score/100);
   
   
    var rand = Math.round(random(1,6));
   
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
   if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    cloud.lifetime = 134;
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
   cloudsGroup.add(cloud);
    }
}
