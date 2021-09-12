const Engine=Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;


const Constraint = Matter.Constraint;
const Body = Matter.Body; 
const Composites = Matter.Composites;
const Composite = Matter.Composite;


let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;


var bg_img;
var food;
var rabbit;

var button,button2;
var bunny;
var blink,eat;


function preload(){
  backgroundImg=loadImage("background.png");
  bunnyImg=loadImage("Rabbit-01.png");
  melonImg=loadImage("melon.png");
  buttonImg=loadImage("cut_btn.png");

  blink=loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat=loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png");

  bubbleImg=loadImage("bubble.png");
 
}

function setup() {
  createCanvas(800,900);
  engine = Engine.create();
  world = engine.world;

  bunny=createSprite(480,150,50,70);
  bunny.scale=0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.changeAnimation('blinking');

  rope = new Rope(6,{x:100,y:300});
  rope2 = new Rope(5,{x:370,y:350});
  roof= new Ground(500,220,120,20);
  button = createImg('cut_btn.png');
  button.position(90,290);
  button.size(50,50);
  button.mouseClicked(drop);

  button2=createImg('cut_btn.png');
  button2.position(350,340);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  bubble=createSprite(320,600,20,20);
  bubble.addImage(bubbleImg);
  bubble.scale=0.2

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2=new Link(rope2,fruit);

 // var options={
 //   isStatic:true
 // }
 // bubble=Bodies.circle(500,550,30,options);
  
  World.add(world,bubble);


  rectMode(CENTER);
  ellipseMode(RADIUS);

  
 

}

function draw() {
  background(800,900);  
  image(backgroundImg,0,0,width,height);
  Engine.update(engine);
  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(melonImg,fruit.position.x,fruit.position.y,70,70);
  }
 //image(bubbleImg,bubble.position.x,bubble.position.y,70,70);
  pop();
  rope.show();
  rope2.show();
  roof.show();

  if(collide(fruit,bunny,80)===true)
  {
   drop2();
    bubble.visible=true;
    World.remove(world,fruit);
    fruit=null;
    bunny.changeAnimation('eating');
  }
  if(collide(fruit,bunny,40)===true)
  {
    world.gravity.y=-1;
bubble.position.x=fruit.position.x;
bubble.position.y=fruit.position.y;
  }
  
  drawSprites();
}

function drop()
{
  
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function drop2(){
  rope2.break();
  fruit_con_2.detach();
  fruit_con_2=null;
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}