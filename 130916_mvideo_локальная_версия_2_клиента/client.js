var Client = IgeClass.extend({
	classId: 'Client',
	init: function () {
		//ige.showStats(1);

		// Enabled texture smoothing when scaling textures
		ige.globalSmoothing(false);

                this.__drawBounds = false;
                this.__highlightOccupied = false;


                this.textures_paths = {
                    background: './assets/',
                    objects: './assets/objects/'
                };

		// Load our textures
		var self = this;

                this.locations = [];

                this.locations["Digital"] =  {id: "Digital", component: "LocationDigitalComponent", componentID: "locationDigitalComponent", x:19, y:0, width: 24, height: 25, startx: 31, starty: 15, pan_x:390, pan_y:500};
                this.locations["TV"] =  {id: "TV", component: "LocationTVComponent", componentID: "locationTVComponent", x:0, y:0, width: 17, height: 25, startx: 7, starty: 10, pan_x:-80, pan_y:250};
                this.locations["HOME1"] =  {id: "HOME1", component: "LocationHome1Component", componentID: "locationHome1Component", x:0, y:26, width: 42, height: 15, startx: 22, starty: 31, pan_x:-220, pan_y:640};
                this.locations["HOME2"] =  {id: "HOME2", component: "LocationHome2Component", componentID: "locationHome2Component", x:43, y:12, width: 15, height: 22, startx: 50, starty: 19, pan_x:450, pan_y:840};
                this.locations["HOME3"] =  {id: "HOME3", component: "LocationHome3Component", componentID: "locationHome3Component", x:14, y:16, width: 2, height: 5, startx: 14, starty: 15, pan_x:-80, pan_y:250};
                this.locations["CASHBOX"] =  {id: "CASHBOX", component: "LocationCashBoxComponent", componentID: "locationCashBoxComponent", x:42, y:3, width: 8, height: 16, startx: 43, starty: 7, pan_x:390, pan_y:480};
                this.currentLocation = "Digital";
                this.locationX = 0;
                this.locationY = 0;
                this.locationWidth = 0;
                this.locationHeight = 0;
                this.locationMaxX = 0;
                this.locationMaxY = 0;                
                this.locationStartX = 0;
                this.locationStartY = 0;                
               
                this.pan_X = 0;
                this.pan_Y = 0;
               
                this.scenePositionX = 0;
                this.scenePositionY = 0;
                this.scenePositionWidth = 0;
                this.scenePositionHeight = 0;
            
                this.initCustomerX = 40;
                this.initCustomerWidth = 8;

                this.initCustomerY = 1;
                this.initCustomerHeight = 2;
            
                this._tileWidth = 24;
                this._tileHeight = 24;
                
                this.products = [];
                
                this.bonus_areas = [];
                
                this.gameInDialogMode = false;
                
                this.allowSelectCustomer = false;

                this.box2dSettings = {
                                        type: 'dynamic',
                                        linearDamping: 0.0,
                                        angularDamping: 0.1,
                                        allowSleep: true,
                                        bullet: true,
                                        gravitic: true,
                                        fixedRotation: true,
                                        fixtures: [{
                                                density: 1.0,
                                                friction: 0.5,
                                                restitution: 0.2,
                                                shape: {
                                                        type: 'rectangle',
                                                        data: {
                                                                width: 5,
                                                                height: 5
                                                        }
                                                }
                                        }]
                                };

		this.obj = [];
		this.gameTexture = {};


                this.resumeGameAfterDialog = function(flags){
                    this.gameInDialogMode = false;
                    this.setGameInDialogMode(flags);
                    this.player.playerComponent.freeCustomer();
                };

                this.setGameInDialogMode = function(__g_mode){
                    try{
                        
                        for(var __i = 0; __i < this.customerManager.customersDefinition.length; __i++){
                            var child = this.customerManager.customersDefinition[__i].instance;
                            try{
                                if(child){
                                    child.setGameInDialogMode(__g_mode);
                                }
                            }catch(err){
                                //console.error(err);
                            }
                        }
                    }catch(err){console.error(err);}
                };

                this.gameStatistics = function(__sales, __bonuses, __score, __time){
                    this.customerManager.gameStatistics(__sales, __bonuses, __score, __time);
                };

                this.setAllowSelectCustomer = function(__val){
                    this.allowSelectCustomer = __val;
                    this.customerManager.setAllowSelectCustomer(__val);
                    var objLayer = ige.$('objectLayer');
                    var childArray = objLayer.children(); 
                    try{
                        for(var __i=0; __i < childArray.length; __i++){
                            var child = childArray[__i];
                            try{
                                child.setAllowSelectCustomer(__val);
                            }catch(err){
                                //console.error(err);
                            }
                        }
                    }catch(err){console.error(err);}
                    
                };


                this.gameInDialog = function(){
                    this.gameInDialogMode = true;
                    this.setGameInDialogMode(-10);
                };

                this.implement(ClientObjects);

		// Add physics and setup physics world
                /*
		ige.addComponent(IgeBox2dComponent)
			.box2d.sleep(true)
			.box2d.gravity(0, 0)
			.box2d.createWorld()
			.box2d.start();
                        */
                       
                /*       
                ige.box2d.contactListener(
                        // Listen for when contact's begin
                        function (contact) {
                                //console.log('Contact BEGINS between');
                                //console.log(contact.igeEntityA()._id);
                                //console.log(contact.igeEntityB()._id);
                                //contact.igeEntityA().actionOnContact(contact.igeEntityB());
                        },
                        // Listen for when contact's end
                        function (contact) {
                                //console.log('Contact ENDS between', contact.igeEntityA()._id, 'and', contact.igeEntityB()._id);
                        },
                        // Handle pre-solver events
                        function (contact) {
                            var c_a = contact.igeEntityA();
                            var c_b = contact.igeEntityB();
                            if((c_a.category() === 'CUSTOMER' ||  c_a.category() === 'PLAYER') && (c_b.category() === 'CUSTOMER' ||  c_b.category() === 'PLAYER')){
//                                if(c_a.isPlayer()){
//                                    if(c_b.selected){
//                                        //c_a.playerComponent.startDialogWithCustomer();
//                                        c_b.actionOnContact(c_a);
//                                    }else{
//                                        c_b.actionOnContact(c_a);
//                                    }
//                                }else if(c_b.isPlayer()){
//                                    if(c_a.selected){
//                                        //c_b.playerComponent.startDialogWithCustomer();
//                                        c_a.actionOnContact(c_b);
//                                    }else{
//                                        c_a.actionOnContact(c_b);
//                                    }                                
//                                }else{
//                                    //столькнулись 2 покупателя - останавливаеются и идут по новым путям
//                                    
//                                    c_a.actionOnContact(c_b);
//                                    c_b.actionOnContact(c_a);
//                                    
//                                }
                                
                                  c_a.actionOnContact(c_b);
                                  c_b.actionOnContact(c_a);
                            }
                                if (contact.igeEitherId('ball1') && contact.igeEitherId('square2')) {
                                        //contact.SetEnabled(false);
                                }
                        }                        
                );
                */
                    
		// Wait for our textures to load before continuing
		ige.on('texturesLoaded', function () {
                    self.onTexturesLoaded();
		}); 
                
                self.loadTextures();

                this.log("Client preInitialized", "***", this);
                this.log("Client wait loaded textures", "***", this);

	},
        
        onTexturesLoaded: function(){
            var self = this;
            // Create the HTML canvas
			ige.createFrontBuffer(true);
			ige.viewportDepth(true);

			ige.start(function (success) {
				// Check if the engine started successfully
				if (success) {
					// Create the scene
                                        self.setupScene();					
                                        self.pathFinder = new IgePathFinder().neighbourLimit(1000);                                                                                 
                                        self.initLocation("Digital");
                                        self.setupLayers();                                        
				}
			});            
        },
        
        getLocationInfoForProduct: function(__product){
            var self = this;
            switch (__product){
                case "NOTEBOOK" :
                case "NOTEBOOK_DEMO" :
                case "PAD" :
                case "PHOTO" :
                case "SMARTPHONE" :
                case "SMARTPHONE_DEMO" :
                    return self.locations["Digital"];
                    break;
                case "COFFEE_MACHINE" :
                case "REFRIGERATOR" :               
                    var __goTile = new IgePoint(self.locations["HOME1"].startx, self.locations["HOME1"].starty, 0);
                    self.player.newPath(__goTile);                    
                    self.playerGotoDepartamentStart();
                    return self.locations["HOME1"];
                    break;
                case "VACUUM_CLEANER" :
                case "WACHER" :
                    var __goTile = new IgePoint(self.locations["HOME2"].startx, self.locations["HOME2"].starty, 0);
                    self.player.newPath(__goTile);                    
                    self.playerGotoDepartamentStart();
                    return self.locations["HOME2"];
                    break;
                case "HOME_THEATER" :
                case "MEDIA_CENTER" :
                case "TV_1" :
                case "TV_2" :   
                    return self.locations["TV"];
                    break;
                default :
                    return self.locations["Digital"];
            }
        },
        
        initLocation: function(__location){
            var self = this;
            self.currentLocation = __location;
            self.locationX = self.locations[self.currentLocation].x;
            self.locationY = self.locations[self.currentLocation].y;
            self.locationWidth = self.locations[self.currentLocation].width;
            self.locationHeight = self.locations[self.currentLocation].height;
            
            self.pan_X = self.locations[self.currentLocation].pan_x;
            self.pan_Y = self.locations[self.currentLocation].pan_y;
            
            /*
            self.locationStartX = self.locationX + self.locations[self.currentLocation].startx;
            self.locationStartY = self.locationY + self.locations[self.currentLocation].starty;
            */
            self.locationStartX = self.locations[self.currentLocation].startx;
            self.locationStartY = self.locations[self.currentLocation].starty;
            
            self.locationMaxX = self.locationX + self.locationWidth;
            self.locationMaxY = self.locationY + self.locationHeight;
        }, 
                
         showBonusArea: function(){
             for(var ___key=0; ___key < this.bonus_areas.length; ___key++){
               var __obj = this.bonus_areas[___key];     
                try{
                    __obj.bonusAreaEnabled = true;
                    __obj.imageEntity.texture().applyFilter(IgeFilters.brighten, {value: 30});
                }catch(e){}               
             }
          },
        
         hideBonusArea: function(__area){
             for(var ___key=0; ___key < this.bonus_areas.length; ___key++){
               var __obj = this.bonus_areas[___key];     
                try{
                    if(__area === __obj.params.bonus_area){
                        __obj.bonusAreaEnabled = false;
                        __obj.imageEntity.texture().applyFilter();                    
                    }
                }catch(e){}               
             }
          },        
        
        setProductArea: function(p, area){
            var fx = area.x,
                    fy = area.y,
                    tx = area.x + area.width,
                    ty = area.y + area.height;
            
            var _pobj = {product:p, rect:null, x1:0, y1:0, x2:0, y2:0};
            
            if(Math.abs(fx-tx) > Math.abs(fy-ty)){
                //длина стола по X
                _pobj.x1 = fx;
                _pobj.y1 = fy-1;
                _pobj.x2 = tx;
                _pobj.y2 = ty+1;                
                _pobj.rect = new IgeRect(fx, fy-1, area.width, area.height+2);
            }else{
                //длина стола по Y
                _pobj.x1 = fx-1;
                _pobj.y1 = fy;
                _pobj.x2 = tx+1;
                _pobj.y2 = ty;
                _pobj.rect = new IgeRect(fx-1, fy, area.width+2, area.height);
            }
            this.products.push(_pobj);
        },
        
        setupEntities: function (object_layer, back_layer) {
            var self = this;
            var __i=0;
            var imageScale = 1;
            
            self.locationDigitalComponent.setupEntities(object_layer);
            self.locationTVComponent.setupEntities(object_layer);
            self.locationHome1Component.setupEntities(object_layer);
            self.locationHome2Component.setupEntities(object_layer);
            self.locationHome3Component.setupEntities(object_layer);
            self.locationCashBoxComponent.setupEntities(object_layer);
          
                               
            //self.locationDigitalComponent.showLocationPosition(object_layer);
            //self.locationTVComponent.showLocationPosition(object_layer);
            //self.locationHome1Component.showLocationPosition(object_layer);
            //self.locationHome2Component.showLocationPosition(object_layer);          
            
           var __d_x = 0;
           var __d_y = 0;
           var __d_w = 0;
           var __d_h = 0;
            
            for(var __key in self.locations){
                var __x = self.locations[__key].x;
                var __y = self.locations[__key].y;
                
                if(__x < __d_x) __d_x = __x;
                if(__y < __d_y) __d_y = __y;
                
                var __w = self.locations[__key].width;
                var __h = self.locations[__key].height;                
                
                if(__d_w < (__x + __w)) __d_w = (__x + __w);
                if(__d_h < (__y + __h)) __d_h = (__y + __h);
            }
           
           // установка границ магазина
            object_layer.occupyTile(__d_x, __d_y, 1, __d_h-1, {});
            object_layer.occupyTile(__d_x, __d_y, __d_w, 1, {});

            object_layer.occupyTile(__d_x, (__d_y+__d_h)-1, __d_w+1, 1, {});
            object_layer.occupyTile((__d_x+__d_w), __d_y, 1, __d_h, {});           
             
            self.scenePositionX = __d_x;
            self.scenePositionY = __d_y;
            self.scenePositionWidth = __d_w;
            self.scenePositionHeight = __d_h;            
            
           this.player.initPosition();
           
           this.player.setAllowSelectCustomer(true);
        },
        
        loadTextures: function () {
            var self = this;
            
            //self.gameTexture.background = new IgeTexture(self.textures_paths.background+"bg.png");
            self.gameTexture.background = new IgeTexture(self.textures_paths.background+"bg.jpg");
                       
            
            self.addComponent(LocationDigitalComponent);
            self.locationDigitalComponent.initLocation(self.locations[self.locationDigitalComponent.id]);
            self.locationDigitalComponent.loadTextures();
                      
            self.addComponent(LocationTVComponent);
            self.locationTVComponent.initLocation(self.locations[self.locationTVComponent.id]);
            self.locationTVComponent.loadTextures();           
            
            self.addComponent(LocationHome1Component);
            self.locationHome1Component.initLocation(self.locations[self.locationHome1Component.id]);
            self.locationHome1Component.loadTextures();            
            
            self.addComponent(LocationHome2Component);
            self.locationHome2Component.initLocation(self.locations[self.locationHome2Component.id]);
            self.locationHome2Component.loadTextures();            
           
            self.addComponent(LocationHome3Component);
            self.locationHome3Component.initLocation(self.locations[self.locationHome3Component.id]);
            self.locationHome3Component.loadTextures();           
            
            self.addComponent(LocationCashBoxComponent);
            self.locationCashBoxComponent.initLocation(self.locations[self.locationCashBoxComponent.id]);
            self.locationCashBoxComponent.loadTextures();            
            
        },
                
        setupScene: function () {
            var self = this;
                    self.mainScene = new IgeScene2d()
                            .id('mainScene')
                            .translateTo(0, 0, 0)
                            .drawBounds(self.__drawBounds)
                            .drawBoundsData(false);
                    
					// Create a background scene node and apply
					// a background pattern to it using an isometric
					// tile so we set the 4th argument to true. If
					// using a 2d tile, we would set it to false.
					// The 3rd argument true means that as we pan
					// around the viewport with the mouse, the pattern
					// will "track" the camera as if it was the "floor".
                    
                //self.backgroundScene = new IgeScene2d()
                self.backgroundScene = new IgeTileMap2d()
                    .depth(0)
                    .id('backgroundScene')
                    .translateTo(209, 686, 0)
                    .tileWidth(3390)
                    .tileHeight(1895)         
                    .mount(self.mainScene);  
    
                if(self.gameTexture.background != undefined){
                    self.___bg_ent = new IgeEntity()
				.texture(self.gameTexture.background)
				.drawBounds(false)
				.drawBoundsData(false)
                                .dimensionsFromCell()
				.mount(self.backgroundScene);    
                };
    				
                    self.objectLayer = new IgeTileMap2d()
                            .id('objectLayer')
                            .depth(1)
                            //.layer(2)
                            .isometricMounts(true)
                            .drawBounds(self.__drawBounds)
                            .drawBoundsData(false)
                            .drawGrid(false)
                            .depthSortMode(2) // Set the depth sort mode to 0 - the slowest but most accurate using 3d bounds
                            //.depthSortMode(1) // Set the depth sort mode to 1 - uses 3d bounds but is faster than mode 0 and less accurate
                            //.depthSortMode(2) // Set the depth sort mode to 2 - the fastest, simplest depth sort
                            .drawMouse(false)//iso-квадрат - позиция мыши
                            .tileWidth(self._tileWidth)
                            .tileHeight(self._tileHeight)
                            .highlightOccupied(self.__highlightOccupied)
                            .mount(self.mainScene);
                    
                   

                    // Create the main viewport
                    this.vp1 = new IgeViewport()
                            .id('vp1')
                    
                            
                            //.addComponent(IgeMousePanComponent)
                            //.addComponent(IgeMouseZoomComponent)
                            //.mousePan.enabled(true)
                            //.mouseZoom.enabled(false)
                    
                            .depth(1)
                            .autoSize(true)
                            .scene(self.mainScene)
                            //.drawMouse(true) //координаты мыши
                            .drawBounds(self.__drawBounds)
                            .drawBoundsData(false)
                            .mount(ige);            
        },
           
        startSilvesterDialog: function(__phase){
               var scope = angular.element(document.getElementById('gameSupport')).scope();
               scope.$apply(function(){
                    scope.startSilvesterDialog(__phase);
                });   
        },
          
        engineStarted: function(){
               var scope = angular.element(document.getElementById('gameSupport')).scope();
               scope.$apply(function(){
                    scope.engineStarted();
                });   
        },                   
        
        setGameModeFlag: function(__flag){
            var self = this;
            self.customerManager.setGameModeFlag(__flag);
        },
                   
        //setupLayers: function (layerArray, layersById) {
            setupLayers: function () {
            var self = this;
            var i, destTileX = - 1, destTileY = -1;


            self.player = new CharacterAi(self.objectLayer, null, self.pathFinder)
                    .addComponent(PlayerComponent)
                    //.box2dBody(self.box2dSettings)
                    .id('player')
                    .category('PLAYER')
                    .setType(0)
                    .initTexture('player.png', 0)                    
                    .drawBoundsData(false)
                    .mount(self.objectLayer);


            this.vp1.camera.lookAt(this.player);

            //следим за игроком
            this.vp1.camera.trackTranslate(this.player, 0)

            //передвигаем камеру
            // по умолчанию - отдел Digital
            
            //this.vp1.camera.panTo(new IgePoint(0, 300, 400));
            //self.vp1.camera.panTo(new IgePoint(self.locationX * self._tileWidth, self.locationY * self._tileHeight + 700, 0));
                /*
                self.vp1.camera.panTo(new IgePoint(
                    (self.locationWidth / 2) * self._tileWidth, 
                    (self.locationY + Math.round(self.locationHeight*2/3)) * self._tileHeight, 0));
            */
           
                self.initLocation("Digital");
                 var __toPanPoint =  new IgePoint(self.pan_X, self.pan_Y, 0);            
                 self.vp1.camera.panTo(__toPanPoint);

                self.addComponent(CustomerManagerComponent);
                    self.customerManager.box2dSettings = self.box2dSettings;
                    self.customerManager.objectLayer = self.objectLayer;
                    self.customerManager.collisionMap = self.objectLayer;
                    self.customerManager.player = self.player;
                    self.customerManager.pathFinder = self.pathFinder;
                    //self.customerManager.customersDefinition = customersData.customers;
                    self.customerManager.customers = customersData.customers;
                    

            self.setupEntities(self.objectLayer, self.backScene);
            
            //self.customerManager.start();
            
            //стартовый диалог сильвестра
            //self.startSilvesterDialog(1);
            
            self.engineStarted();
            
            //ige.box2d.staticsFromMap(self.objectLayer);
            
            
            // Listen for the key up event
            ige.input.on('keyUp', function (event, keyCode) { self._keyUp(event, keyCode); });

        } ,
        
        customerManagerStart: function(__dep){
            var self = this;                        
            var __goToDep = true;
            switch (__dep){
                case "TV" :
                    self.initLocation("TV");
                    break;
                case "HOME" :
                    self.initLocation("HOME1");
                    break; 
                case "DIGITAL" :                    
                default :
                    if(self.currentLocation === "Digital")__goToDep = false;
                    self.initLocation("Digital");                    
            }
            var __toPanPoint =  new IgePoint(self.pan_X, self.pan_Y, 0);
            //self.vp1.camera.panTo(__toPanPoint, 20000);
            
            if(__goToDep){
                self.playerGotoDepartamentStart();            
            }else{
                self.playerGotoDepartamentEnd();
            }
            
            var __goTile = new IgePoint(self.locationStartX, self.locationStartY, 0);
            self.player.newPath(__goTile);
            
            self.setAllowSelectCustomer(true);
            self.customerManager.start(__dep);            
        },
        
        playerGotoDepartamentStart: function(){
            var self = this;
            //следим за игроком
            self.player.playerComponent.gotoDepartament = true;
            self.vp1.camera.trackTranslate(self.player, 0);
        },
        
        playerGotoDepartamentEnd: function(){
            var self = this;
            self.player.playerComponent.gotoDepartament = false;
            self.vp1.camera.unTrackTranslate();
        },
        
        addedNewCustomer: function(__customer_data){
               /*var scope = angular.element(document.getElementById('gameSupport')).scope();               
               
                scope.$apply(function(){
                    scope.addedNewCustomer(__customer_data);
                });    
                */
        },
        
                

	_keyUp: function (event, keyCode) {  
            var self = this;
            
            var __dx = 0;
            var __dy = 0;
            
            var __sx = 0;
            var __sy = 0;
            
            var __mult=1;
            if(event.ctrlKey)__mult=10;
            
            switch(keyCode){
                case ige.input.key.left :  
                    __dx = -1*__mult;
                    break;
                case ige.input.key.right :
                    __dx = 1*__mult;
                    break;
                case ige.input.key.up :
                    __dy = -1*__mult;
                    break;                
                case ige.input.key.down :
                    __dy = 1*__mult;
                    break;
                case ige.input.key.pageUp :
                    __sx = 0.01*__mult;
                    __sy = 0.01*__mult;
                    break;
                case ige.input.key.pageDown :
                    __sx = -0.01*__mult;
                    __sy = -0.01*__mult;
                    break;                
            }
           
            if(__dx != 0 || __dy != 0){
                //self.backgroundScene.translateBy(__dx, __dy, 0);
               // console.log("1 CAMERA x="+self.vp1.camera._translate.x + " y="+self.vp1.camera._translate.y);
                var ___dx = self.vp1.camera._translate.x + __dx;
                var ___dy = self.vp1.camera._translate.y + __dy;
                self.vp1.camera.panTo(new IgePoint(___dx, ___dy, 0));
                console.log("2 CAMERA x="+self.vp1.camera._translate.x + " y="+self.vp1.camera._translate.y);
            }
            
            if(__sx != 0 || __sy != 0){
                //self.backgroundScene.scaleBy(__sx, __sy, 0);
            }
            
            
            
            /*console.log("x="+self.backgroundScene.translate().x() + " y="+self.backgroundScene.translate().y());
            console.log("sx="+self.backgroundScene.scale().x() + " sy="+self.backgroundScene.scale().y());               
            */
            
	},
                
                
        
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Client; }