const STATES = {
    GAME: 'gameState',
    MAIN_MENU:'mainMenu',
    INFO:'info',
    CONTROLS:'controls',
    PAUSE: 'pause',
    GAMEOVER: 'gameover',
}

class StateManager {
    states = {};
    //povodny stav
    currentState = null;

    constructor(resourceManager, ctx) {
        this.resourceManager = resourceManager;
        this.ctx = ctx;
    }
    //obsahuje vsetky obrazky
     
    init() {
        const ctx = this.ctx;
        this.states = {
             
            info: new InfoState(this, ctx),
            controls: new ControlsState(this, ctx),
            gameState: new GameState(this, ctx),  
            mainMenu: new MainMenu(this, ctx),
            pause: new Pause(this, ctx),
            gameover: new GameOver(this,ctx),
        };
        this.currentState = this.states.mainMenu;
    }

    changeState(state) {
        const newState = this.states[state];
        if (!newState) {
            throw new Error(`State '${state}' not found`)
        }
        this.currentState = newState;
    }

    update(dt) {
        this.currentState.update(dt);
    }

    handleEvent(ev) {
        this.currentState.handleEvent(ev);
    }

    render() {
        this.currentState.render(this.ctx);
    }
}

class BaseState {

    objects = [];

    constructor(stateManager, ctx) {
        this.stateManager = stateManager;
        this.ctx = ctx;
    }

    render() {
        // TODO pridat logiku pre zoradovanie objektov, ktory sa ma prvy zobrazit
        this.objects.forEach(object => object.render(this.ctx));
    }

    update(dt) {

    }

    handleEvent(ev) {

    }
}

class MainMenu extends BaseState {
    constructor(manager, ctx) {
        //consrtuctor rodica
        super(manager, ctx);
         

        this.bgStartImage = resourceManager.getImageSource('bgStart');
        //this.startSound = resourceManager.getSoundSource('start');

        const soundOffButton = new ImageButton (450,500,30,30, resourceManager.getImageSource('soundOff'));
        soundOffButton.onClick((ev) => {
        //    start.pause();  
        });

        const startGameButton = new TextButton (140,270, 200, 40, 40, 'New game');
        startGameButton.onClick((ev) => {
            this.stateManager.changeState(STATES.GAME);
        });

        const infoButton = new TextButton (190, 330, 200, 40, 40, 'Info');
        infoButton.onClick((ev) => {
            this.stateManager.changeState(STATES.INFO);
        });


        const controlsButton = new TextButton (155, 390, 200, 40, 40, 'Controls');
        controlsButton.onClick((ev) => {
            this.stateManager.changeState(STATES.CONTROLS);
        }); 

        const pauseButton = new TextButton (155, 460, 200, 40, 40, 'Pause');
        pauseButton.onClick((ev) => {
            this.stateManager.changeState(STATES.PAUSE);
        }); 

        const gameoverButton = new TextButton (155, 510, 200, 40, 40, 'Game Over');
        gameoverButton.onClick((ev) => {
            this.stateManager.changeState(STATES.GAMEOVER);
        }); 
      
        this.objects = [
            infoButton,
            controlsButton,
            soundOffButton,
            startGameButton, 
            pauseButton,
            gameoverButton,       
        ];

    }
   
    render(ctx) {
        this.ctx.drawImage(this.bgStartImage,0,0,490,550);
        this.objects.forEach(object => object.render(this.ctx));
    }
    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });

        if (isKeyPressEvent(ev) && ev.key === 'g') {
            this.stateManager.changeState(STATES.GAME);
        }
    }
    
}

class GameState extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);
 
        this.bgImage = resourceManager.getImageSource('bg');
        this.fgImage = resourceManager.getImageSource('fg');
        this.cherryImage = resourceManager.getImageSource('cherry');
        this.foodImage = resourceManager.getImageSource('food');
               
        const backButton = new TextButton (30, 520, 200, 40, 40, 'back');
        backButton.onClick((ev) => {
            this.stateManager.changeState(MAIN_MENU);
        });
       

        // duch a pacman
       
        this.objects.push(new Pacman()),
        this.objects.push(new Duch())    
        this.objects.push.backButton
    }
   update(dt) {
        this.objects.forEach((object) => {
            object.move(dt);
        });
    }
    
    render(ctx) {
     
        this.ctx.drawImage(this.bgImage,0,0,490,490);
        this.ctx.drawImage(this.fgImage,0,0,490,490);
        
        //food
       
        // 1 line 
        this.ctx.drawImage(this.foodImage,10,10,10,10);     
        this.ctx.drawImage(this.foodImage,63,10,10,10);         
        this.ctx.drawImage(this.foodImage,115,10,10,10);    
        this.ctx.drawImage(this.foodImage,168,10,10,10);  
        this.ctx.drawImage(this.foodImage,220,10,10,10); 
        
        this.ctx.drawImage(this.foodImage,260,10,10,10); 
        this.ctx.drawImage(this.foodImage,312,10,10,10); 
        this.ctx.drawImage(this.foodImage,365,10,10,10);          
        this.ctx.drawImage(this.foodImage,417,10,10,10); 
        this.ctx.drawImage(this.foodImage,470,10,10,10); 
        
        //2 line 
        this.ctx.drawImage(this.foodImage,10,45,10,10);      
        this.ctx.drawImage(this.foodImage,115,45,10,10);    
        this.ctx.drawImage(this.foodImage,220,45,10,10);

        this.ctx.drawImage(this.foodImage,260,45,10,10); 
        this.ctx.drawImage(this.foodImage,365,45,10,10);          
        this.ctx.drawImage(this.foodImage,470,45,10,10);     
        
        //3 line     
        this.ctx.drawImage(this.foodImage,10,80,10,10);     
        this.ctx.drawImage(this.foodImage,63,80,10,10);         
        this.ctx.drawImage(this.foodImage,115,80,10,10);    
        this.ctx.drawImage(this.foodImage,168,80,10,10);  
        this.ctx.drawImage(this.foodImage,220,80,10,10); 
        
        this.ctx.drawImage(this.foodImage,260,80,10,10); 
        this.ctx.drawImage(this.foodImage,312,80,10,10); 
        this.ctx.drawImage(this.foodImage,365,80,10,10);          
        this.ctx.drawImage(this.foodImage,417,80,10,10); 
        this.ctx.drawImage(this.foodImage,470,80,10,10); 
       
        //4 line     
        this.ctx.drawImage(this.foodImage,10,115,10,10);     
        this.ctx.drawImage(this.foodImage,63,115,10,10);         
        this.ctx.drawImage(this.foodImage,115,115,10,10);    
        this.ctx.drawImage(this.foodImage,168,115,10,10);  
        this.ctx.drawImage(this.foodImage,220,115,10,10); 
        
        this.ctx.drawImage(this.foodImage,260,115,10,10); 
        this.ctx.drawImage(this.foodImage,312,115,10,10); 
        this.ctx.drawImage(this.foodImage,365,115,10,10);          
        this.ctx.drawImage(this.foodImage,417,115,10,10); 
        this.ctx.drawImage(this.foodImage,470,115,10,10); 
       
        //5 line     
        this.ctx.drawImage(this.foodImage,10,150,10,10);         
        this.ctx.drawImage(this.foodImage,115,150,10,10);    
        this.ctx.drawImage(this.foodImage,168,150,10,10);  
        this.ctx.drawImage(this.foodImage,220,150,10,10); 
        
        this.ctx.drawImage(this.foodImage,260,150,10,10); 
        this.ctx.drawImage(this.foodImage,312,150,10,10); 
        this.ctx.drawImage(this.foodImage,365,150,10,10);              
        this.ctx.drawImage(this.foodImage,470,150,10,10);
       
        //6 line     
        this.ctx.drawImage(this.foodImage,10,185,10,10);     
        this.ctx.drawImage(this.foodImage,63,185,10,10);         
        this.ctx.drawImage(this.foodImage,115,185,10,10);    
   
        this.ctx.drawImage(this.foodImage,365,185,10,10);          
        this.ctx.drawImage(this.foodImage,417,185,10,10); 
        this.ctx.drawImage(this.foodImage,470,185,10,10); 
       
        //7 line
        this.ctx.drawImage(this.foodImage,10,225,10,10);          
        this.ctx.drawImage(this.foodImage,115,225,10,10);    
        this.ctx.drawImage(this.foodImage,63,225,10,10);  
         
        this.ctx.drawImage(this.foodImage,417,225,10,10); 
        this.ctx.drawImage(this.foodImage,365,225,10,10);          
        this.ctx.drawImage(this.foodImage,470,225,10,10); 
       
        //8 line 
        this.ctx.drawImage(this.foodImage,10,260,10,10);     
        this.ctx.drawImage(this.foodImage,63,260,10,10);         
        this.ctx.drawImage(this.foodImage,115,260,10,10);    
        this.ctx.drawImage(this.foodImage,168,260,10,10);  
        this.ctx.drawImage(this.foodImage,220,260,10,10); 
        
        this.ctx.drawImage(this.foodImage,260,260,10,10); 
        this.ctx.drawImage(this.foodImage,312,260,10,10); 
        this.ctx.drawImage(this.foodImage,365,260,10,10);          
        this.ctx.drawImage(this.foodImage,417,260,10,10); 
        this.ctx.drawImage(this.foodImage,470,260,10,10); 
        
        //9 line
        this.ctx.drawImage(this.foodImage,10,295,10,10);     
        this.ctx.drawImage(this.foodImage,63,295,10,10);         
        this.ctx.drawImage(this.foodImage,115,295,10,10);    
        this.ctx.drawImage(this.foodImage,168,295,10,10);  
        this.ctx.drawImage(this.foodImage,220,295,10,10); 
        
        this.ctx.drawImage(this.foodImage,260,295,10,10); 
        this.ctx.drawImage(this.foodImage,312,295,10,10); 
        this.ctx.drawImage(this.foodImage,365,295,10,10);          
        this.ctx.drawImage(this.foodImage,417,295,10,10); 
        this.ctx.drawImage(this.foodImage,470,295,10,10); 

        //10 line
        this.ctx.drawImage(this.foodImage,10,330,10,10);     
        this.ctx.drawImage(this.foodImage,63,330,10,10);         
        this.ctx.drawImage(this.foodImage,115,330,10,10);    
        this.ctx.drawImage(this.foodImage,220,330,10,10); 
               
        this.ctx.drawImage(this.foodImage,260,330,10,10);    
        this.ctx.drawImage(this.foodImage,365,330,10,10);          
        this.ctx.drawImage(this.foodImage,417,330,10,10); 
        this.ctx.drawImage(this.foodImage,470,330,10,10); 

        //11 line
        this.ctx.drawImage(this.foodImage,10,365,10,10);     
        this.ctx.drawImage(this.foodImage,63,365,10,10);         
        this.ctx.drawImage(this.foodImage,115,365,10,10);    
        this.ctx.drawImage(this.foodImage,168,365,10,10);  
        this.ctx.drawImage(this.foodImage,220,365,10,10); 
        
        this.ctx.drawImage(this.foodImage,260,365,10,10); 
        this.ctx.drawImage(this.foodImage,312,365,10,10); 
        this.ctx.drawImage(this.foodImage,365,365,10,10);          
        this.ctx.drawImage(this.foodImage,417,365,10,10); 
        this.ctx.drawImage(this.foodImage,470,365,10,10);

        //12 line
        this.ctx.drawImage(this.foodImage,10,435,10,10);     
        this.ctx.drawImage(this.foodImage,63,435,10,10);         
        this.ctx.drawImage(this.foodImage,115,435,10,10);    
        this.ctx.drawImage(this.foodImage,168,435,10,10);  
        this.ctx.drawImage(this.foodImage,220,435,10,10); 
        
        this.ctx.drawImage(this.foodImage,260,435,10,10); 
        this.ctx.drawImage(this.foodImage,312,435,10,10); 
        this.ctx.drawImage(this.foodImage,365,435,10,10);          
        this.ctx.drawImage(this.foodImage,417,435,10,10); 
        this.ctx.drawImage(this.foodImage,470,435,10,10);

        //13 line
        this.ctx.drawImage(this.foodImage,10,400,10,10);        
        this.ctx.drawImage(this.foodImage,115,400,10,10);    
        this.ctx.drawImage(this.foodImage,168,400,10,10);  
        this.ctx.drawImage(this.foodImage,220,400,10,10); 
        
        this.ctx.drawImage(this.foodImage,260,400,10,10); 
        this.ctx.drawImage(this.foodImage,312,400,10,10); 
        this.ctx.drawImage(this.foodImage,365,400,10,10);           
        this.ctx.drawImage(this.foodImage,470,400,10,10); 
        
        //14 line
        this.ctx.drawImage(this.foodImage,10,470,10,10);     
        this.ctx.drawImage(this.foodImage,63,470,10,10);         
        this.ctx.drawImage(this.foodImage,115,470,10,10);    
        this.ctx.drawImage(this.foodImage,168,470,10,10);  
        this.ctx.drawImage(this.foodImage,220,470,10,10); 
        
        this.ctx.drawImage(this.foodImage,260,470,10,10); 
        this.ctx.drawImage(this.foodImage,312,470,10,10); 
        this.ctx.drawImage(this.foodImage,365,470,10,10);          
        this.ctx.drawImage(this.foodImage,417,470,10,10); 
        this.ctx.drawImage(this.foodImage,470,470,10,10); 


        
        this.objects.forEach(object => object.render(this.ctx));

        }

    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });
    
        if (isKeyPressEvent(ev) && ev.key === 'q') {
            this.stateManager.changeState(STATES.MAIN_MENU);
        }
        
        if (isKeyPressEvent(ev) && ev.key === 'p') {
            this.stateManager.changeState(STATES.PAUSE);
        }
    }
}    

class InfoState extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);
        this.infoImage = resourceManager.getImageSource('info');
       
        const backButton = new TextButton (180, 500, 200, 40, 40, 'Back');
        backButton.onClick((ev) => {
            this.stateManager.changeState(STATES.MAIN_MENU);
        });


        this.objects = [   
            backButton,
        ];
    }

    render(ctx) {
        this.ctx.drawImage(this.infoImage,0,0,490,550);
        this.objects.forEach(object => object.render(this.ctx));
    }
    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });
        if (isKeyPressEvent(ev) && ev.key === 'g') {
            this.stateManager.changeState(STATES.MAIN_MENU);
        }
    }
}


class ControlsState extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);
        this.controlsImage = resourceManager.getImageSource('controls');
        const backButton = new TextButton (180, 500, 200, 40, 40, 'Back');
        backButton.onClick((ev) => {
            this.stateManager.changeState(STATES.MAIN_MENU);
        });


        this.objects = [   
            backButton,
        ];
    
    }
    render(ctx) {
        this.ctx.drawImage(this.controlsImage,0,0,490,550);
        this.objects.forEach(object => object.render(this.ctx));
    }

    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });
        if (isKeyPressEvent(ev) && ev.key === 'g') {
            this.stateManager.changeState(STATES.MAIN_MENU);
        }
    }
}

class Pause extends BaseState {
    constructor(manager, ctx) 
    {
        super(manager, ctx);

        this.pauseImage = resourceManager.getImageSource('bgpause');

        const continueButton = new TextButton (140, 300, 200, 40, 40, 'continue');
        continueButton.onClick((ev) => {
            this.stateManager.changeState(STATES.GAME);
        });

        this.objects = [   
            continueButton,
        ];
    
    }
    render(ctx) {
        this.ctx.drawImage(this.pauseImage,0,0,490,550);
        this.objects.forEach(object => object.render(this.ctx));
    }

    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });
        if (isKeyPressEvent(ev) && ev.key === 'c') {
            this.stateManager.changeState(STATES.GAME);
        }
    }
}

class GameOver extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);

        this.GameOver = resourceManager.getImageSource('gameover');
    }
        update(dt) {
            this.objects.forEach((object) => {
                object.move(dt);
            });
        }
    
        render(ctx) {
            this.ctx.drawImage(this.GameOver,0,0,490,550);
        }
    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });

        if (isKeyPressEvent(ev) && ev.key === 'm') {
            this.stateManager.changeState(STATES.MAIN_MENU);
        }
    }
}