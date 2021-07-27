var dog;
var happyDsog;
var database;
var foodS;
var foodStock;
var saddog;
var lastFed;
var fedTime;
var feed, addFood;
var foodObj;


function preload()
{
  saddog = loadImage("dogImg.png");
	happyDog = loadImage("dogImg1.png");
}

function setup() {

  createCanvas(1000, 400);

  database = firebase.database();

  foodObj = new Food();

  dog = createSprite(300, 200, 150, 150);
  dog.addImage(saddog);
  dog.scale = 0.15;
  
  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);
  


}


function draw() {  
background(46, 139, 87);
 
foodObj.display();
fedTime = database.ref('FeedTime');
fedTime.on("value", function(data){
  lastFed= data.val();
});
  fill(255,255,254);  
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastfed%12 + " PM", 350, 30);
  } else if(lastFed===0){
    text("Last FFeed : 12 AM", 350, 30);
  }else {
    text("Last Feed : "+ lastFed + "AM", 3550, 30);
  }

  
  drawSprites();
}
function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage("happy", happyDog);

  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }

  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour()
  })

}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}