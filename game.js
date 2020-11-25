class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();

    }
    car1= createSprite(10,200);
    car1.addImage("carImage/car1.png", car1Image);
    car2= createSprite(300,400);
    car2.addImage("carImage/car2.png", car2Image);
    car3= createSprite(500,600);
    car3.addImage("carImage/car3.png", car3Image);
    car4= createSprite(700,700);
    car4.addImage("carImage/car4.png", car4Image);

    cars=[car1, car2, car3, car4];

  }

  play(){
    form.hide();
   // textSize(30);
    //text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      background(80);
      image(trackImage, 0,-displayHeight*4,displayWidth,displayHeight);
     // var display_position = 130;
     var index=0;
     var x=1;
     var y;
      for(var plr in allPlayers){
        //if (plr === "player" + player.index)
        index=index+1;
       x = x+200;
       y = displayHeight-allPlayers[plr].distance
        
        cars[index-1].x = x; 
        cars[index-1].y = y;
        if(index=== player.index){
          cars[index-1].shapeColor="red";
          camera.position.y=displayHeight/2;
          camera.position.x=cars[index-1].x;
        }
      }
    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance +=10;
      player.update();
    }
    if(player.distance > 3900){
      gameState=2;
    }
    drawSprites();
  }
  end(){
    console.log("Game Ended");
  }
}
