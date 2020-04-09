
class Pacman {
    // Initialization
    constructor() {
      this.canvas = document.getElementById("canvas");
      this.image = resourceManager.getImageSource('pacman');
      
      this.x = 150;
      this.y = 250;
      this.height = 20;
      this.width = 20;
      
    }
    // Movement logic
    move(dt) {
      var dx = 5;
      var dy = 5;
          if (keys[37]) {
              if (this.x - dx <= 10)    
                  this.x = 8;
              this.x = this.x - dx;
          }
          if (keys[39]) {    
              if (this.x > 460)  
                  this.x = this.x - dx;
              this.x = this.x + dx ;
          }
          if (keys[38]) {
              if (this.y + dy <=10 ) 
                  this.y =this.y + dy;
              this.y = this.y - dy ;
          }
          if (keys[40]) {
              if (this.y + dy >=470 )
                  this.y = this.y - dy;
              this.y = this.y + dy;
          };
  
    }
  
    // Render self
    render(ctx) {
      ctx.save()
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
      ctx.restore()
    }
}

class Duch {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('duch');
  
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.dx = Math.random() * 50 - 25
        this.dy = Math.random() * 50 - 25
        this.size = Math.random() + .3
        this.rotation = 0
    }
  
  // Movement logic
    move(dt) {
          const canvas = this.canvas;
          if (this.x > canvas.width) {
          this.x = canvas.width
          this.dx = -Math.abs(this.dx)
          }
          if (this.x < 0) {
              this.x = 0
              this.dx = Math.abs(this.dx)
          }
          if (this.y > canvas.height) {
              this.y = canvas.height
              this.dy = -Math.abs(this.dy)
          }
          if (this.y < 0) {
              this.y = 0
              this.dy = Math.abs(this.dy) * 0.2
          }
  
          // Movement
          this.x += this.dx * dt
          this.y += 0 * dt
          this.rotation +=dt/3
   }
    // Render self
    render(ctx) {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.scale(this.size, this.size)
        ctx.drawImage(this.image, -20, -20, 40, 40)
        ctx.restore()
    }
}

class BackgroundStart {
    constructor(x, y, width, height) {
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('bgStart');
    
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    render(ctx) {
        ctx.save()
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.restore()
    }
}


class Food {
    constructor(x, y, width, height) {
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('food');
    
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    render(ctx) {
        ctx.save()
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.restore()
    }
}