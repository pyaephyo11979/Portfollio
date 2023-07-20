window.addEventListener('load', () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext('2d');
  canvas.width = 1500;
  canvas.height = 500; 
  class InputHandler {
    constructor(game) {
      this.game = game;
      window.addEventListener('keydown', e => {
        if (
          (e.key === 'ArrowUp' || e.key === 'ArrowDown') &&
          this.game.keys.indexOf(e.key) === -1
        ) {
          this.game.keys.push(e.key);
        } else if (e.key === ' ') {
          this.game.player.shootTop();
        }else if(e.key==='d'){
          this.game.debugMode=!this.game.debugMode;
        }else if(e.key==='r'){
          document.location.reload();
        }
      });
      window.addEventListener('keyup', e => {
        const index = this.game.keys.indexOf(e.key);
        if (index > -1) {
          this.game.keys.splice(index, 1);
        }
      });
    }
  }

  class Projectile {
    constructor(game, x, y) {
      this.game = game;
      this.x = x;
      this.y = y;
      this.width = 10;
      this.height = 3;
      this.speed = 3;
      this.markedForDeletion = false;
      this.image=document.getElementById('projectile');
    }
    update() {
      this.x += this.speed;
      if (this.x > this.game.width * 0.8) this.markedForDeletion = true;
    }
    draw(ctx) {
      ctx.drawImage(this.image,this.x,this.y)
    }
  }

  class Particle {
    constructor(game,x,y){
      this.game=game;
      this.x=x;
      this.y=y;
      this.image=document.getElementById('gear');
      this.frameX=Math.floor(Math.random()*3);
      this.frameY=Math.floor(Math.random()*3);
      this.spriteSize=50;
      this.sizeModifier=(Math.random()* 0.5 + 0.5).toFixed(1);
      this.size=this.spriteSize*this.sizeModifier;
      this.speedX=Math.random()*6-3;
      this.speedY=Math.random()* -15;
      this.gravity=0.5;
      this.markedForDeletion=false;
      this.angle=0;
      this.va=Math.random()*0.2-0.1;
      this.bounced=0;
      this.bottomBounceBoundary=Math.random()*80+60;
    }
    update(){
      this.angle+=this.va;
      this.speedY+=this.gravity;
      this.x -= this.speedX+this.game.speed;
      this.y +=this.speedY;
      if(this.y> this.game.height+this.size || this.x<0-this.size) this.markedForDeletion=true;
      if(this.y>this.game.height-this.bottomBounceBoundary && this.bounced<2){
        this.bounced++;
        this.speedY *= -0.5;
      }
    }
    draw(ctx){
      ctx.save();
      ctx.translate(this.x,this.y);
      ctx.rotate(this.angle);
      ctx.drawImage(this.image,this.frameX*this.spriteSize,this.frameY*this.spriteSize,this.spriteSize,this.spriteSize,this.size*-0.5,this.size*-0.5,this.size,this.size)
      ctx.restore();
    }
  }

  class Player {
    constructor(game) {
      this.game = game;
      this.width = 120;
      this.height = 190;
      this.x = 20;
      this.y = 100;
      this.frameX=0;
      this.frameY=0;
      this.maxFrame=37;
      this.speedY = 0;
      this.maxSpeed = 3;
      this.projectiles = [];
      this.image=document.getElementById('player');
      this.powerUp=false;
      this.powerUpTimer=0;
      this.powerUpLimit=10000;
    }
    update(deltaTime) {
      if (this.game.keys.includes('ArrowUp')) {
        this.speedY = -this.maxSpeed;
      } else if (this.game.keys.includes('ArrowDown')) {
        this.speedY = this.maxSpeed;
      } else {
        this.speedY = 0;
      }
      if(this.y > this.game.height - this.height*0.5) this.y = this.game.height - this.height *0.5;
      else if(this.y < -this.height) this.y= -this.height*0.5;
      this.y += this.speedY;
      this.projectiles.forEach(projectile => {
        projectile.update();
      });
      this.projectiles = this.projectiles.filter(
        projectile => !projectile.markedForDeletion
      );
      if(this.frameX<this.maxFrame){
        this.frameX++;
      }else {this.frameX = 0}
      if(this.powerUp){
        if(this.powerUpTimer > this.powerUpLimit){
          this.powerUpTimer=0;
          this.powerUp=false;
          this.frameY=0;
        }else {
          this.powerUpTimer += deltaTime;
          this.frameY=1;
          this.game.ammo +=0.1;
        }
      }
    }
    draw(ctx) {
      this.projectiles.forEach(projectile => {
        projectile.draw(ctx);
      });
      if(this.game.debugMode)ctx.strokeRect(this.x, this.y, this.width, this.height);
      ctx.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x,this.y,this.width,this.height)
    }
    shootTop() {
      if (this.game.ammo > 0) {
        this.projectiles.push(new Projectile(this.game, this.x+80, this.y+30));
        this.game.ammo--;
      }
      if(this.powerUp) this.shootBotton();
    }
    shootBotton(){
      if(this.game.ammo>0){
        this.projectiles.push(new Projectile(this.game,this.x+80,this.y+175))
      }
    }
    enterPowerUp(){
      this.powerUpTimer=0;
      this.powerUp=true;
     if(this.game.ammo<this.game.maxAmmo) this.game.ammo=this.game.maxAmmo;
    }
  }

  class Enemy {
      constructor(game) {
      this.game = game;
      this.x = this.game.width;
      this.speedX = Math.random() * -1.5 - 0.5;
      this.markedForDeletion = false;
      this.width = 0; 
      this.height = 0; 
      this.frameX=0;
      this.frameY=0;
      this.maxFrame=37;
    }
    update() {
      this.x += this.speedX;
      if (this.x + this.width < 0) {
        this.markedForDeletion = true;
      }
      if(this.frameX<this.maxFrame){
        this.frameX++
      }else{
        this.frameX=0;
      }
    }
    draw(ctx) {
      if(this.game.debugMode) {
        ctx.strokeRect(this.x, this.y, this.width, this.height);
      }
      ctx.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x,this.y,this.width,this.height)
    }
  }

  class Angler1 extends Enemy {
    constructor(game) {
      super(game);
      this.width = 228;
      this.height = 169;
      this.lives = 5;
      this.score = 10;
      this.y = Math.random() * (this.game.height * 0.9 - this.height);
      this.image=document.getElementById('angeler1');
      this.frameY=Math.floor(Math.random()*3);
    }
  }
  class Angler2 extends Enemy {
    constructor(game) {
      super(game);
      this.width = 213;
      this.height = 165;
      this.lives = 6;
      this.score = 10;
      this.y = Math.random() * (this.game.height * 0.95 - this.height);
      this.image=document.getElementById('angeler2');
      this.frameY=Math.floor(Math.random()*2);
    }
  }
  class LuckyFish extends Enemy {
    constructor(game) {
      super(game);
      this.width = 99;
      this.height = 95;
      this.lives =  10;
      this.score = 25 ;
      this.y = Math.random() * (this.game.height * 0.95 - this.height);
      this.image=document.getElementById('lucky');
      this.frameY=Math.floor(Math.random()*2);
      this.type='lucky';
    }
  } 
  class HiveWhale extends Enemy {
    constructor(game) {
      super(game);
      this.width = 400;
      this.height = 227;
      this.lives =  20;
      this.score = 35;
      this.y = Math.random() * (this.game.height * 0.95 - this.height);
      this.image=document.getElementById('hivewhale');
      this.frameY=0;
      this.speedX=Math.random()*-1.2 -0.2;
      this.type='hive';
    }
  }
  class Drone extends Enemy {
    constructor(game,x,y) {
      super(game);
      this.width = 115;
      this.height = 95;
      this.lives =  1;
      this.score = this.lives;
      this.x=x;
      this.y=y;
      this.image=document.getElementById('drone');
      this.frameY=Math.floor(Math.random()*2);
      this.speedX=Math.random()*-4.2 -0.5;
      this.type='drone';
    }
  }
  class Layer {
    constructor(game, image, speedModifier) {
      this.game = game;
      this.image = image;
      this.speedModifier = speedModifier;
      this.width = 1768;
      this.height = 500;
      this.x = 0;
      this.y = 0;
    }
    update() {
      if (this.x <= -this.width) this.x = 0;
      this.x -= this.game.speed * this.speedModifier;
    }
    draw(ctx) {
      ctx.drawImage(this.image, this.x, this.y);
      ctx.drawImage(this.image, this.x+this.width, this.y);
    }
  }

  class Background {
    constructor(game) {
      this.game = game;
      this.image1 = document.getElementById('layer1');
      this.image2 = document.getElementById('layer2');
      this.image3 = document.getElementById('layer3');
      this.image4 = document.getElementById('layer4');
      this.layer1 = new Layer(this.game, this.image1, 0.2);
      this.layer2 = new Layer(this.game, this.image2, 0.4);
      this.layer3 = new Layer(this.game, this.image3, 1);
      this.layer4 = new Layer(this.game, this.image4, 1.5);
      this.layers = [this.layer1,this.layer2,this.layer3];
    }
    update() {
      this.layers.forEach(layer => layer.update());
    }
    draw(ctx) {
      this.layers.forEach(layer => layer.draw(ctx));
    }
  }
  class Explosion{
    constructor(game,x,y){
      this.game=game;
      this.x=x;
      this.y=y;
      this.frameX=0;
      this.spriteHeight=200;
      this.spriteWidth=200;
      this.timer=0;
      this.fps=30;
      this.interval=1000/this.fps;
      this.maxFrame=8;
      this.markedForDeletion=false;
      this.width=this.spriteWidth;
      this.height=this.spriteHeight;
      this.x=x - this.width*0.5;
      this.y=y - this.height*0.5;
    }
    update(deltaTime){
      if(this.timer>this.interval){
        this.frameX++;
        this.timer =0;
      }else {this.timer+=deltaTime}
      if(this.frameX>this.maxFrame) this.markedForDeletion=true;
    }
    draw(ctx){
      ctx.drawImage(this.image,this.frameX*this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height);
    }
  }
  class SmokeExplosion extends Explosion{
    constructor(game,x,y){
      super(game,x,y);
      this.image=document.getElementById('smoke');
    }
  }
  class FireExplosion extends Explosion{
    constructor(game,x,y){
      super(game,x,y);
      this.image=document.getElementById('fire');
    }
  }
  class UI {
    constructor(game) {
      this.game = game;
      this.fontSize = 25;
      this.fontFamily = 'Bangers';
      this.color = 'white';
    }
    draw(ctx) {
      ctx.save();
      ctx.fillStyle = this.color;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.shadowColor = 'black';
      ctx.font = this.fontSize + 'px ' + this.fontFamily;
      ctx.fillText('Score: ' + this.game.score, 20, 40);
      const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
      ctx.fillText('Timer:' + formattedTime, 20, 100);
      if (this.game.gameOver) {
        ctx.textAlign = 'center';
        let message1;
        let message2;
        let message3;
        if (this.game.score > this.game.winningScore) {
          message1 = 'Most Wondrous!';
          message2 = 'Well done explorer!';
          message3 = 'Press "R" to restart the game!';
        } else {
          message1 = 'Blaze! ';
          message2 = 'Get My Repair kit and try again!';
          message3 = 'Press "R" to Try Again!';
        }
        ctx.font = '70px ' + this.fontFamily;
        ctx.fillText(message1, this.game.width * 0.5, this.game.height * 0.5 - 20);
        ctx.font = '25px ' + this.fontFamily;
        ctx.fillText(message2, this.game.width * 0.5, this.game.height * 0.5 + 20);
        ctx.font = '20px' +this.fontFamily;
        ctx.fillText(message3,this.game.width * 0.5, this.game.height * 0.5 + 55);
      }
      if(this.game.player.powerUp) ctx.fillStyle='#ffffbd';
      for (let i = 0; i < this.game.ammo; i++) {
        ctx.fillRect(20 + 5 * i, 50, 3, 20);
      }
      ctx.restore();
    }
  }

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.background = new Background(this);
      this.particle=new Particle(this);
      this.Enemy=new Enemy(this)
      this.explosion=new Explosion(this);
      this.ui = new UI(this);
      this.keys = [];
      this.enemies = [];
      this.particles=[];
      this.explosions=[];
      this.enemyTimer = 0;
      this.enemyInterval = 1500;
      this.ammo = 30;
      this.maxAmmo = 50;
      this.ammoTimer = 0;
      this.ammoInterval = 250;
      this.gameOver = false;
      this.winningScore = 200;
      this.score = 0;
      this.gameTime = 0;
      this.timeLimit = 45000;
      this.speed = 1;
      this.debugMode=false;
    }
    update(deltaTime) {
      if (!this.gameOver) this.gameTime += deltaTime;
      if (this.gameTime > this.timeLimit) this.gameOver = true;
      this.background.update();
      this.background.layer4.update()
      this.player.update(deltaTime);
      if (this.ammoTimer > this.ammoInterval) {
        if (this.ammo < this.maxAmmo) {
          this.ammo++;
        }
        this.ammoTimer = 0;
      }else if(this.gameOver){
        this.ammo =0;
      }
       else {
        this.ammoTimer += deltaTime;
      }
      this.particles.forEach(particle=>particle.update())
      this.particles=this.particles.filter(particle=>!particle.markedForDeletion)
      this.explosions.forEach(explosion=>explosion.update(deltaTime))
      this.explosions=this.explosions.filter(explosion=>!explosion.markedForDeletion)
      this.enemies.forEach(enemy => {
        enemy.update();
        if (this.checkCollision(this.player, enemy)) {
          enemy.markedForDeletion = true;
          this.addExplosion(enemy);
          if(enemy.type==='lucky'&&!this.gameOver) this.player.enterPowerUp();
          else if(!this.gameOver) {this.score--;}
          for(let i=0; i<enemy.score; i++){
            this.particles.push(new Particle(this,enemy.x+enemy.width*0.5,enemy.y+enemy.height*0.5));
          }
        }
        if(this.gameOver){
          enemy.markedForDeletion=true;
        }
        this.player.projectiles.forEach(projectile => {
          if (this.checkCollision(projectile, enemy)) {
            enemy.lives--;
            projectile.markedForDeletion = true;
            this.particles.push(new Particle(this,enemy.x+enemy.width*0.5,enemy.y + enemy.height*0.5));
            if (enemy.lives <= 0) {
              for(let i=0; i<enemy.score; i++){
                this.particles.push(new Particle(this,enemy.x+enemy.width*0.5,enemy.y+enemy.height*0.5));
              }
              enemy.markedForDeletion = true;
              this.addExplosion(enemy);
              if(enemy.type ==='hive'){
                for(let i=0; i<5; i++){
                  this.enemies.push(new Drone(this,enemy.x+Math.random()*enemy.width,enemy.y+Math.random()*enemy.height*0.5))
                }
              }
              if (!this.gameOver) this.score += enemy.score;
            }
          }
        });
      });
      this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
      if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
    }
    draw(ctx) {
      this.background.draw(ctx);
      this.ui.draw(ctx);
      this.player.draw(ctx);
      this.particles.forEach(particle=>particle.draw(ctx))
      this.enemies.forEach(enemy => {
        enemy.draw(ctx);
      });
      this.explosions.forEach(explosion => {
        explosion.draw(ctx);
      });
      this.background.layer4.draw(ctx);
      
    }
    addEnemy() {
      const randomize=Math.random();
      if(randomize<0.3)this.enemies.push(new Angler1(this));
      else if(randomize<0.6)this.enemies.push(new Angler2(this));
      else if(randomize<0.7) this.enemies.push(new HiveWhale(this));
      else this.enemies.push(new LuckyFish(this));
    }
    addExplosion(enemy){
      const randomize=Math.random();
      if(randomize < 0.5) {this.explosions.push(new SmokeExplosion(this, enemy.x+enemy.width*0.5, enemy.y+ enemy.height*0.5))}
      else {this.explosions.push(new FireExplosion(this, enemy.x+enemy.width*0.5, enemy.y+ enemy.height*0.5))}
      console.log(this.explosions)
    }
    checkCollision(rec1, rec2) {
      return (
        rec1.x < rec2.x + rec2.width &&
        rec1.x + rec1.width > rec2.x &&
        rec1.y < rec2.y + rec2.height &&
        rec1.height + rec1.y > rec2.y
      );
    }
  }

  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.draw(ctx);
    game.update(deltaTime);
    requestAnimationFrame(animate);
  }
  animate(0);
});
function reload(){
  document.location.reload();
}