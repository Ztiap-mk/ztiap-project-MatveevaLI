const IMAGES = [
  {name: 'pacman', src: 'img/pacman.png'},
  {name: 'duch', src: 'img/red.png'},
  {name: 'cherry', src: 'img/cherry.png'},
  {name: 'fg', src: 'img/fg.png'},
  {name: 'bg', src: 'img/bg.png'},
  
];

var keys ={};
 

class Pacman{
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
        
        if (keys[37]) {
            if (this.x - 5 <= 10)    
                this.x = 8;
            this.x = this.x - 5
        }
        if (keys[39]) {    
            if (this.x > 460)  
                this.x = this.x - 5;
            this.x = this.x + 5 ;
        }
        if (keys[38]) {
            if (this.y + 5 <=10 ) 
                this.y =this.y + 5;
            this.y = this.y - 5 ;
        }
        if (keys[40]) {
            if (this.y + 5 >=470 )
                this.y = this.y - 5;
            this.y = this.y + 5;
        };

  }

  // Render self
  draw(ctx) {
    ctx.save()
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    ctx.restore()
  }
}

class Duch {
   // Initialization
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
    draw(ctx) {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.scale(this.size, this.size)
        ctx.drawImage(this.image, -20, -20, 40, 40)
        ctx.restore()
    }
}

// toto sluzi na inicialne loadnutie vsetkych obrazkov... aby to nebolo ako hidden image v html
class ResourceManager {
  loadedImages = new Map();

  async init() {
      await this.loadImages();
  }

  async loadImages() {
      await Promise.all(
          IMAGES.map(image => this.loadImage(image)),
      )
  }

  // dynamicky vytvorenie Image objectov spolu s tym aby sa nacitali obrazky
  // pouzili sa promise a async/await -> lepsie sa pracuje s asynchronnymi operaciami pri nacitavani obrazkov
  // nejaky tutorial ako to funguje -> 
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
  async loadImage(imgResource) {
      return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = imgResource.src;
          img.onload = () => {
              this.loadedImages.set(imgResource.name, img);
              resolve(img);
          }
          img.onerror = (err) => {
              reject(err);
          }
      });
  }

  // ziskat js object Image, ktory sa posle do canvas
  getImageSource(imageName) {
      const image = this.loadedImages.get(imageName);
      if (image == null) {
          throw new Error(`Image '${imageName}' not found`);
      }
      return image;
  }
}

const resourceManager = new ResourceManager();

window.onkeydown = function(event) {
    keys[event.keyCode] = true;
       
    };
window.onkeyup = function (event)
{
    keys[event.keyCode] = false;
}    

// celu logiku som zabalil do tejto class, riesi inicializaciu ball objektov + riesi rendering + nekonecny loop
class Game {
  time = Date.now();
  
  // Set up canvas for 2D rendering
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  objects = [];

  
  // tato funkcia sa vola v html pri startovani hry
  // inicializuje obrazky + vytvara objekty
  async start() {
      console.log('starting game');
      await resourceManager.init();
      console.log('resouces loaded');

      this.bgImage = resourceManager.getImageSource('bg');
      this.fgImage = resourceManager.getImageSource('fg');
      this.cherryImage = resourceManager.getImageSource('cherry');

      // Create 5 balls
      for (let i = 0; i < 1; i++) {
          this.objects.push(new Pacman());
          this.objects.push(new Duch());
      }

     
      this.startLoop();
  }

  // spusta nekonecnu sluzku
  startLoop() {
      this.time = Date.now();
      this.step();
  }

  // 
  step() {
      // console.log("Step");
    
      // Get time delta
      const now = Date.now();
      const dt = (now - this.time) / 100;
      this.time = now;
    
      this.move(dt);
      this.render();
    
      // tu treba pouzit lambda funkciu -> ktora automaticky nabinduje this pre volanu funkciu
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
      requestAnimationFrame(() => this.step());
  }

  move(dt) {
      this.objects.forEach((object) => {
          object.move(dt);
      });
  }

  // cistenie som presunul do zvlast funkcie
  clearCtx() {
      this.ctx.fillStyle = "white";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // render len zobrazuje a obrazok sa nacita raz pri inicializacii
  render() {
      this.clearCtx();
      this.ctx.drawImage(this.bgImage,0,0,490,490);
      this.ctx.drawImage(this.fgImage,0,0,490,490);
      this.ctx.drawImage(this.cherryImage,400,50,50,50);
      
      // Render all objects in scene
      this.objects.forEach((object) => {
          object.draw(this.ctx);
      });
      
  }
}