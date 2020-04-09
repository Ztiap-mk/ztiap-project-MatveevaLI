const STATES = {
    GAME: 'gameState',
    MAIN_MENU:'mainMenu',
    INFO:'info',
    CONTROLS:'controls',
    //PAUSED
}

class StateManager {
    states = {};
    //изначальное состояние
    currentState = null;

    constructor(resourseManager, ctx) {
        this.resourseManager = resourseManager;
        this.ctx = ctx;
    }
    //содержит все изображения
     
    init() {
        const ctx = this.ctx;
        this.states = {
            gameState: new GameState(this, ctx),   
            info: new InfoState(this, ctx),
            controls: new ControlsState(this, ctx),
            mainMenu: new MainMenu(this, ctx),
               
        };this.currentState = this.states.mainMenu;
    }
    changeState(state) {
        const newState = this.states[state];
        if (!newState) {
            //объект ошибкиб тип new Error,  используется для генерации исключения.
            throw new Error (`State '${state}' not found`)
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
        this.objects.forEach(object => object.render(this.ctx));
    }

    update(dt){

    }
    handleEvent(ev){

    }
}

class MainMenu extends BaseState {
    constructor(manager, ctx) {
        //вызов родительского конструктора
        super(manager, ctx);
        const canvas = document.getElementById("canvas");
        
        const soundOffButton = new ImageButton (450,450,30,30, resourceManager.getImageSource('soundOff'));
        soundOffButton.onClick((ev) => {
            //sound.start.pause();
        });

        const startGameButton = new TextButton (140,270, 200, 40, 40, 'New game');
        startGameButton.onClick((ev) => {
            this.stateManager.changeState(STATES.GAME);
        });

        const infoButton = new TextButton (190, 320, 200, 40, 40, 'Info');
        infoButton.onClick((ev) => {
            this.stateManager.changeState(STATES.INFO);
        });


        const controlsButton = new TextButton (155, 370, 200, 40, 40, 'Controls');
        controlsButton.onClick((ev) => {
            this.stateManager.changeState(STATES.CONTROLS);
        });

        this.objects = [
            //new BackgroundStart(0, 0, 490, 490),
            infoButton,
            controlsButton,
            soundOffButton,
            startGameButton,
        ];
    }
    
    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });

 
        if (isKeyPressEvent(ev) && ev.key === 'p') {
 
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

        const backButton = new TextButton (500, 320, 200, 40, 40, 'Info');
        backButton.onClick((ev) => {
            this.stateManager.changeState(MAIN_MENU);
        });
       

         //  duch a pacman
        for (let i = 0; i < 1; i++) {
        this.objects.push(new Pacman());
        this.objects.push(new Duch());
        }

        /*this.objects = [
            backButton,
        ]; */
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
    }    

class InfoState extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);
        //const canvas = document.getElementById("canvas");
        this.objects = [
             
            new TextButton(100, 100, 200, 40, 40, 'Info'),
           
        ];
    }

    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });
        if (isKeyPressEvent(ev) && ev.key === 'p') {
            this.stateManager.changeState(STATES.GAME);
        }
    }
}


class ControlsState extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);
        //const canvas = document.getElementById("canvas");
        this.objects = [
           
            new TextButton(100, 100, 200, 30, 30, 'P - PAUSE GAME'),
            new TextButton(100, 150, 200, 30, 30, 'Q - QUIT GAME'),
        ];
    }

    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });
    }
}