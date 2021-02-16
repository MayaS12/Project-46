class Game {
    constructor(){
  
    }
  
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
  
      bunny1 = createSprite(100,200);
      bunny1.addImage(startBunnyImg);
      bunny1.scale = 0.1;
      bunny2 = createSprite(300,200);
      bunny2.addImage(startBunnyImg);
      bunny2.scale = 0.1;
      bunny3 = createSprite(500,200);
      bunny3.addImage(startBunnyImg);
      bunny3.scale = 0.1;
      bunny4 = createSprite(700,200);
      bunny4.addImage(startBunnyImg);
      bunny4.scale = 0.1;
  
      bunnies = [bunny1,bunny2,bunny3,bunny4];
    }
  
    play(){
      background(rgb(144, 176, 22))

      form.hide();
  
      Player.getPlayerInfo();
      
      if(allPlayers !== undefined){
        //var display_position = 100;
        image(backgroundImg,0,-displayHeight,displayWidth,displayHeight*1.3);
        //index of the array
        var index = 0;
  
        //x and y position of the cars
        var x = 0;
        var y;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          //position the cars a little away from each other in x direction
          x = x + 270;
          //use data form the database to display the cars in y direction
          y = displayHeight - allPlayers[plr].distance;
          bunnies[index-1].x = x;
          bunnies[index-1].y = y;
  
          if (index === player.index){
            // fill("blue");
            // stroke(4);
            // ellipse(x,y,70,70);
            bunnies[index - 1].shapeColor = "red";
            camera.position.x = displayWidth/2;
            camera.position.y = bunnies[index-1].y
          }
         
          //textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }
  
      }
  
      if(keyIsDown(UP_ARROW) && player.index !== null && passed===false){
        player.distance +=50
        player.update();
      }

      if(player.distance>4280 && passed===false){
        passed = true;
        Player.updateFinishedPlayers();
        player.rank = finishedPlayers
        player.update();
      }
  
      drawSprites();
    }
  
    end(){
        Player.getPlayerInfo();
        for(var plr in allPlayers){
          textSize(35)
          if(allPlayers[plr].rank===1){
            fill("blue");
            text("First place goes to: "+allPlayers[plr].name,displayWidth/2,200);
          }
          if(allPlayers[plr].rank===2){
            fill("green");
            text("Second place goes to: "+allPlayers[plr].name,displayWidth/2,270);
          }
          if(allPlayers[plr].rank===3){
            fill("yellow")
            text("Third place goes to: "+allPlayers[plr].name,displayWidth/2,340);
          }
          if(allPlayers[plr].rank===4){
            fill("red")
            text("The loser is: "+allPlayers[plr].name,displayWidth/2,410);
          }
        }
      }
  }
  