// Define our AI character classes
var CharacterAi = Character.extend({
	classId: 'CharacterAi',

	init: function (collisionMap, player, pathFinder) {
		var self = this,
			newPathMethod,
                        completePathMethod;

                Character.prototype.init.call(this);

                this.player = player;   
                
                this.gameInDialogMode = false;

                this.occupyTileOnPointComplete = true;

                this.locationInfo = null;

		this.pathFinder = pathFinder;                
		this.collisionMap = collisionMap;
                this.prevPathFindResult = 0;
                this.prevPathFindIterationCount = 0;
                //this.personMap = personMap;

                this.currentPathIndex = -1;

                this.maxTileX = 24;
                this.maxTileY = 24;
                
                //this.constantTimeWait = 15;
                this.constantTimeWait = 5;
                
                this.waitTicks = 0;
                this.allowWalk = false;
                this.oneTickTime = 20;
                
                // ребенок, должен управляться родителем
                this.my_children = null;
                
                // партнер покупателя, должен управляться родителем
                this.my_partner = null;                
                
                // активность сценария покупателя
                this.screenplay_enabled = true;
                
                this.allowSelectCustomer = false;
                
                //покупатель выбран
                // он подсвечен, его сценарий остановлен
                this.selected = false;
                
                //покупатель в режиме диалога
                this.customer_in_dialog = false;
                
                //персонаж идет
                this.walk = false;
                
                //куда смотрел покупатель перед переходом в диалог
                this.last_direction = '';
                
                this.prevTile = null;
                
                //тайл в котором родился покупатель
                //сюда он уйдет по окончании своей покупки
                //или когда ему надоест ждать
                this.firstTile = null;
                
                //проверить положение в конце пути
                // 0 - создан
                // 1 - вошел в магазин
                // 2 - покупает
                // 3 - должен умереть
                this.lifeState = 0;
                                
                this.walkTimeout = null;   
                
                //менеджер покапателй
                this.customerManager = null;
                this.customerManagerIndex = 0;
                
                //кол-во выполненных случайных перемещений перед
                // переходом в целевую область
                this.random_path_counter = 0;
                this.counters = {
                    before: 0,
                    area: 0,
                    after: 0,
                    kill:0
                };

                // целевая область по категории продуктов
                this.targetArea = null;

		// Choose a random character type
                // type == 0 - is player
		//this.setType(Math.random() * 8 | 0);
                //this.setType((Math.random() * 7 | 0) + 1);

		// Add pathing capabilities
		this.addComponent(IgePathComponent)
			.path.drawPath(false)
                        .path.autoStop(true)
                        .path.clear();
                        //.path.drawPathText(true);

                if(self.isPlayer()){
                    //кликаем покупателя - выбираем его для диалога и топаем к нему
                    self.mouseUp(function (event, control) {
                        if(this.isCustomer()){                            
                            if(this.allowSelectCustomer)
                                this.imageEntity.highlight(true);
                        }

                        control.stopPropagation();
                        ige.input.stopPropagation();                                                
                    });
                };
                 
                completePointMethod = function(){
                    self.walk = true;
                    
                    //блокируем текуший тайл
                    if(self.occupyTileOnPointComplete){
                        if(self.prevTile)self.unOccupyTile(self.prevTile.x, self.prevTile.y);

                        self.prevTile = self.getCurrentTile();                    
                        self.occupyTile(self.prevTile.x, self.prevTile.y);
                    }
                    
                    /*if(self.player.gotoDepartament){
                        self.player.gotoDepartament = false;
                        //ige.client.playerGotoDepartamentEnd();
                    }*/
                    
                    //currentPathIndex++;
                    /* следующая точка
                     * +2 т.к. событие вызывается ПЕРЕД увеличением _targetCellIndex
                     * т.о. тут _targetCellIndex - где мы были
                     * _targetCellIndex+1 - точка куда сейчас попали
                     * _targetCellIndex+2 - следующая точка
                     */
                    if(self.path._targetCellIndex === 1){
                        self.doChildrenAction();
                    }
                    
                    var __nextPathIndex = self.path._targetCellIndex + 2;
                    var __pathPoints = self.path._paths[self.path.current()];
                    //проверяем следующюю точку                        
                    if(-1 < __nextPathIndex && __nextPathIndex < __pathPoints.lenght){                            
                        var __nextTilePoint = __pathPoints[__nextPathIndex];
                        if(self.collisionMap.isTileOccupied(__nextTilePoint.x, __nextTilePoint.y)){
                            //следующая точка занята - вычисляем новый путь
                            self.path.stop();
                            self.path.clear();
                            if(self.path.endPoint()){
                                self.newPath(self.path.endPoint());
                            }
                        }else{
                            //следующая точка свободна - продолжаем
                        }
                    }else{
                        //путь закончен
                    }
                    
                };
                
                completePathMethod = function(){
                    self.walk = false;
                    
                    if(self.lifeState < 4){
                        if(self.prevTile)self.unOccupyTile(self.prevTile.x, self.prevTile.y);                        
                        self.prevTile = self.getCurrentTile();                    
                        self.occupyTile(self.prevTile.x, self.prevTile.y);
                    }
                   
                    self.rotateToStall();
                    
                    if(self.isPlayer()){
                        if(self.playerComponent.gotoDepartament){
                            ige.client.playerGotoDepartamentEnd();
                        }
                    }
                    
                    if(self.isCustomer()){                        
                        if(self.gameInDialogMode){
                        }else{
                            self.calculateNextTarget();
                        }
                    }
                };
                

                // Register some event listeners for the path
		this.path.on('traversalComplete', completePathMethod);                 
                this.path.on('pointComplete',     completePointMethod);
                
                /*
                this.path.on('started', function () { console.log('Pathing started...'); });
                this.path.on('stopped', function () { console.log('Pathing stopped.'); });
                this.path.on('cleared', function () { console.log('Path data cleared.'); });
                this.path.on('pointComplete', function () { console.log('Path point reached...'); });
                this.path.on('pathComplete', function () { console.log('Path completed...'); });
                */
                //this.path.on('traversalComplete', function () { this._entity.character.animation.stop(); console.log('Traversal of all paths completed.'); });


		// Hook when we get mounted
                
		this.on('mounted', function (parent) {
                    if(self.isPlayer()){    //is player                        
			self.pathNextTick = false;                        
                    }else{                  //persones
                        // Start the first path!
			self.pathNextTick = false;
                        //self.startCustomerWalk();
                        self.goNextPosition();
                    }
		});

                // выбираем покупателя - подсвечиваем
                // запрещаем ему ходить
                // и подходим к нему для диалога
                this.mouseUp(function (event, control) {
                    //if(self.isCustomer() && !self.walk){
                    if(self.isCustomer()){
                        self.freeAllCustomers();
                        if(this.allowSelectCustomer){
                            self.selectCustomer(event.x, event.y);
                        }
                    }
                    
                    control.stopPropagation();
                    ige.input.stopPropagation();                                        
                    
                });
                
                //для покупателей - выбрать  покупателя 
                this.mouseOver(function (event, control) {
                    if(self.isCustomer() && !self.walk)
                        if(this.allowSelectCustomer){
                            self.imageEntity.highlight(true);
                        }
                    
                    control.stopPropagation();
                    ige.input.stopPropagation();
                });
                
                //для покупателей - отменить выбор покупателя продавцом                
                this.mouseOut(function (event, control) {                    
                    if(self.isCustomer())
                        if(self.selected){
                            
                        }else{
                            self.imageEntity.highlight(false);
                        }
                    
                    ige.input.stopPropagation();
                });                
                
	}, // end init()

        calculateNextTarget: function(){
            var self = this;
                switch (self.lifeState){
                    case 0 :    // новый покупатель - только что зашел
                       self.lifeState = 1;
                       self.goNextPosition();
                       break;
                    case 1 :    //осмотр локации перед покупкой                                
                        if(++self.counters.before >= self.data("before")){
                            self.lifeState = 2;
                            self.counters.area = 0;
                        }
                        self.goNextPosition();
                        break;
                    case 2 :    //осмотр целевого товара    

                        ++self.counters.area;

                        if(self.counters.area === 1){
                            self.customerInTargetArea();
                        }                                            

                        self.goNextPosition();
                        break;
                    case 3 :    // болтаемся немного по залу и ...
                        if(++self.counters.after >= self.data("after")){
                            self.lifeState = 4;                                    
                        }                      
                        self.goNextPosition();
                        break;
                    case 4 :    // ... и уходит на стартовую точку
                           if(self.walkTimeout)clearTimeout(self.walkTimeout);
                            self.customerManager.kill(self, true);
                } 

                if(self.lifeState != 4){
                    self.customerManager.checkCustomerCounter();
                }            
        },

        setChildren: function(__children){
            var self = this;
            self.my_children = __children;
        },
          
        setPartner: function(__partner){
            var self = this;
            self.my_partner = __partner;
        },                
                

        setAllowSelectCustomer: function(__val){
            var self = this;
            self.allowSelectCustomer = __val;
            if(self.allowSelectCustomer){
                self.initGlowTexture();
            }else{
                self.initNormalTexture();
            }
        },

        setGameInDialogMode: function(__g_mode){
            var self = this;
                                    
            if(self.isCustomer()){
                if(__g_mode === -10){
                    self.gameInDialogMode = true;
                }else if(__g_mode === 0){
                    //вышли из диалога - уходим                    
                    self.gameInDialogMode = false;
                    if(ige.client.player.playerComponent.customer != null && self.id() === ige.client.player.playerComponent.customer.id()){
                        self.lifeState = 4;
                        self.setSaleOkMark();
                        self.allowSelectCustomer = false;
                    }                    
                }else{
                    //диалог прерван
                    self.gameInDialogMode = false;
                }
            }
        },

        customerInTargetArea: function(){
            var self = this;
               var scope = angular.element(document.getElementById('gameSupport')).scope();
               scope.$apply(function(){
                    scope.customerInTargetArea({
                        id:self.data('id'), 
                        type:self.data('type'), 
                        sex:self.data('sex'), 
                        product:self.data("product")
                    });
                });            
        },

        startWaitToWalk: function(){
            var self = this;
            self.allowWalk = false;
            self.pathNextTick = false;
            if(self.lifeState === 4){
                this.waitTicks = 30;
            }else{
                this.waitTicks = Math.ceil((self.constantTimeWait + Math.random()*self.constantTimeWait) * self.oneTickTime);
            }
        },

        goNextPosition: function(){
            var self = this;
            //self.rotateToStall();
            if(self.lifeState === 0){
                self.invokeNewPath();
            }else{                
                self.startWaitToWalk();
            }
        },

        newPathMethod: function () {
            var self = this;
            if(self.isCustomer()){    //is player 
                self.newPath();
            }
        },
                
       /**
        * покупатели все свободны
        */         
       freeAllCustomers: function() {
            var self = this;
            var objLayer = ige.$('objectLayer');
            var childArray = objLayer.children();
            try{
                for(var __i=0; __i < childArray.length; __i++){
                    var child = childArray[__i];
                        if(child.freeCustomer)child.freeCustomer();
                }
            }catch(err){console.error(err);}            
       },
                
        /**
         * освобидить выбранного покупателя
         */
        freeCustomer: function(){
            var self = this;
            if(self.isCustomer()){
                self.customer_in_dialog = false;  
                self.selected = false;
                if(this.last_direction) this.imageEntity.animation.select(this.last_direction);                
                self.imageEntity.highlight(false);
                self.startCustomerWalk();
            }
        },

        /**
         * захватить покупателя для диалога
         */
        selectCustomer: function(___x, ___y){
            var self = this;
            self.customer_in_dialog = false;
            self.selected = true;
            self.imageEntity.highlight(true);
            
            self.player.playerComponent.selectCustomer(self, ___x, ___y);
        },

        /**
         * захватить покупателя для диалога
         */
        lockCustomer: function(__dir){
            var self = this;
            self.path.clear();
            if(__dir)self.imageEntity.animation.select("_"+__dir);
            self.customer_in_dialog = true;
            self.selected = true;
        },

        /**
         * проверить есть рядом продавец или нет
         */
        findPayer: function(){
            var self = this;
            var currentTile = self.getCurrentTile();
            var playerTile = self.player.getCurrentTile();
            
            var tileChecker = function (childTile, tileX, tileY) {  
                if(childTile.x === tileX && childTile.y === tileY)
                    return true;                
                else
                    return false;
            };       
            
            try{                
                for(var ii=0; self.senseData.length; ii++){
                    var __dxyo = self.senseData[ii];
                    if (tileChecker(currentTile, playerTile.x+__dxyo.dx, playerTile.y+__dxyo.dy)) {
                        return  __dxyo.dir;
                    }
                }
            }catch(err){}
            
            return '';
        },
        
        /**
        *повернуть покупатели к витрине
        */
        rotateToStall: function(){
            var self = this;
            //var currentTile = self.getCurrentTile();
                                    
            //var __dir = self.getDirectionToNearObject(self.collisionMap.map, currentTile);            
            //self.imageEntity.animation.stop();
            if(self._currentDir){
                if(self.isPlayer())
                    console.log("_"+self._currentDir);
                //self.imageEntity.animation.stop();
                self.imageEntity.animation.select("_"+self._currentDir);                
                self.last_direction = "_"+self._currentDir;
                //this.imageEntity.animation.stop();
                //return;
            
            /*}else{
                self.imageEntity.animation.stop();
                */
            }
        },

        getDirectionToNearObject:function(__map, __tile){
            var self = this;
            var tileChecker = function (tileData, tileX, tileY) {
		return tileData;
            };       
            
            try{                
                for(var ii=0; self.senseData.length; ii++){
                    var __dxyo = self.senseData[ii];
                    if (tileChecker(__map._mapData[__tile.y+__dxyo.dy][__tile.x+__dxyo.dx])) {
                        return  __dxyo.dir;
                    }
                }
            }catch(err){}
            return "";
        },

        testPointInLocationArea: function(destTileX, destTileY){
            self = this;
            if (destTileX <= self.locationInfo.locationX || destTileY <= self.locationInfo.locationY) {
                return false;
            //}else if (destTileX > self.maxTileX || destTileY > self.maxTileY) {
            }else if (destTileX > self.locationInfo.locationMaxX || destTileY > self.locationInfo.locationMaxY) {
                return false;
            }else{
                return true;
            }
        },

        testPointInGameArea: function(destTileX, destTileY){
            self = this;
            if (destTileX <= ige.client.scenePositionX || destTileY <= ige.client.scenePositionY) {
                return false;
            //}else if (destTileX > self.maxTileX || destTileY > self.maxTileY) {
            }else if (destTileX > ige.client.scenePositionX + ige.client.scenePositionWidth || destTileY > ige.client.scenePositionY + ige.client.scenePositionHeight) {
                return false;
            }else{
                return true;
            }
        },
                
        initPosition: function (){
                var self = this;
                var destTileX = - 1, destTileY = -1,
                    tileChecker = function (tileData, tileX, tileY) {
                        return !tileData;
                    };

                if(self.isPlayer()){
                    destTileX = ige.client.locationStartX;
                    destTileY = ige.client.locationStartY; 
                }else{
                    //помещаем человечка за пределы карты, чтобы он зашел через дверь                                
                    destTileX = -1;
                    destTileY = -1;                           

                    while (destTileX < 0 || destTileY < 0 || self.collisionMap.isTileOccupied(destTileX, destTileY)){
                            destTileX = Math.random() * ige.client.initCustomerWidth | 0;
                            destTileY = Math.random() * ige.client.initCustomerHeight | 0;
                            destTileX += ige.client.initCustomerX;
                            destTileY += ige.client.initCustomerY;
                    }
                    
                    self.lifeState = 2;
                    self.counters.area = 0;
                }
                
                self.firstTile = new IgePoint(destTileX, destTileY, 0);
                
                self.translateToTile(destTileX, destTileY, 0); 
                self.prevTile = self.getCurrentTile();                    
                self.occupyTile(self.prevTile.x, self.prevTile.y);                
        },

/**
 * уходим туда, откуда пришли
 */
/*        goOut: function() {
            var self = this;
            var currentTile = self.getCurrentTile();
            var path = self.findPath(currentTile, self.firstTile);
            self.lifeState = 2;
            self.setPath(path);
        },*/

        startCustomerWalk: function () {
            var self = this;
            self.pathNextTick = false;
                
            if(self.isCustomer()){                  //persones                    
                self.startWaitToWalk();
            }
        },

        invokeNewPath: function (endTile) {
            var self = this;
            if(self.isPlayer()){    //is player
                self.pathNextTick = false;                        
            }else{                  //persones
                if(self.customer_in_dialog || self.selected){//покупатель в диалоге с продавцом  или выбран для диалога
                    self.pathNextTick = false; 
                }else {// Start the first path!
                    if(self.allowWalk && self.screenplay_enabled)
                        self.pathNextTick = true;
                }
            }    
        },

        getCurrentTile: function() {
            var self = this;
            var currentTile = self._parent.pointToTile(this._translate.toIso());
            return currentTile;
        },

	newPath: function (endTile) {
		var self = this,
			currentTile,
			destTileX,
			destTileY,
			destTile,
			path = [],
			tileChecker = function (tileData, tileX, tileY) {
				// If the map tile data is set, don't path along it
				return !tileData;
			};
                
                
		// Calculate which tile our character is currently "over"
		currentTile = self.getCurrentTile();

		// Pick a random destination tile
                if(endTile === undefined){
                   
                        switch (self.lifeState){
                            case 0 :    // новый покупатель - только что зашел
                                destTileX = ((Math.random() * self.locationInfo.locationWidth | 0));
                                destTileY = ((Math.random() * self.locationInfo.locationHeight | 0));                                
                                destTileX += self.locationInfo.locationX;
                                destTileY += self.locationInfo.locationY;
                               break;
                            case 1 :    //осмотр локации перед покупкой                                
                                destTileX = ((Math.random() * self.locationInfo.locationWidth | 0));
                                destTileY = ((Math.random() * self.locationInfo.locationHeight | 0));                                
                                destTileX += self.locationInfo.locationX;
                                destTileY += self.locationInfo.locationY;                                
                                break;
                            case 2 :    //осмотр целевого товара    
                                if(self.targetArea){
                                    //идем в целевую область
                                    destTileX = self.targetArea.x + Math.ceil(((Math.random() * self.targetArea.width | 0)));
                                    destTileY = self.targetArea.y + Math.ceil(((Math.random() * self.targetArea.height | 0)));
                                }else{
                                    // идем в случайное место
                                    destTileX = ((Math.random() * self.locationInfo.locationWidth | 0));
                                    destTileY = ((Math.random() * self.locationInfo.locationHeight | 0)); 
                                    destTileX += self.locationInfo.locationX;
                                    destTileY += self.locationInfo.locationY;                                    
                                }                                
                                break;
                            case 3 :    // болтаемся немного по залу перед тем как выйти
                                destTileX = ((Math.random() * self.locationInfo.locationWidth | 0));
                                destTileY = ((Math.random() * self.locationInfo.locationHeight | 0));   
                                destTileX += self.locationInfo.locationX;
                                destTileY += self.locationInfo.locationY;                                
                                break;
                            case 4 :
                                //должен уйти Откуда пришел                                
                                destTileX = self.firstTile.x;
                                destTileY = self.firstTile.y;
                                break;
                        }                   
                   
                }else{
                    destTileX = endTile.x;
                    destTileY = endTile.y;
                }

                if(self.isPlayer()){
                    if(self.testPointInGameArea(destTileX, destTileY)){                        
                        // новый путь в пределах локации - продолжаем
                    }else{
                        // запрещаем выбранный путь
                        self.pathNextTick = false;
                        // TODO -не забыть раскомментировать
                        //return;                    
                        
                        //для проверки - разрешаем идди куда угодно
                        self.pathNextTick = true;
                    }
                }else{  // is customer
                    if(self.lifeState < 4){
                        if(self.testPointInLocationArea(destTileX, destTileY)){                            
                            // новый путь в пределах локации - продолжаем
                        }else{
                            // ищем новый путь или запрещаем выбранный
                            self.pathNextTick = true;
                            return;                                                    
                        }
                    }else{
                        // клиент уходит из локации - выпускаем
                    }                    
                }
                
/*
                if(testPointInLocationArea(destTileX, destTileY)){
                    // новый путь в пределах локации - продолжаем
                }else{
                    if(self.lifeState < 4){
                        if(self.isPlayer()){
                            // запрещаем выбранный путь
                            self.pathNextTick = false;
                            return;                                                    
                        }else{
                            // ищем новый путь или запрещаем выбранный
                            self.pathNextTick = true;
                            return;                        
                        }
                    }else{
                        // клиент уходит из локации - выпускаем
                    }
                }
*/

//проверить координаты верхних тайлов !!!
/*
		if (destTileX < 0 || destTileY < 0) {
                    if(endTile){
                        
                    }else{
			self.pathNextTick = true;
			return;
                    }
		}
*/
/*
                if(self.lifeState < 4){
                //проверить координаты тайлов на выход из карты!!!
                    if (destTileX > self.maxTileX || destTileY > self.maxTileY) {
                        if(endTile){

                        }else{
                                self.pathNextTick = true;
                                return;
                        }
                    }
                }
*/
                if (self.collisionMap.isTileOccupied(destTileX, destTileY)){
		//if (!this.collisionMap.map._mapData[destTileY] || !tileChecker(this.collisionMap.map._mapData[destTileY][destTileX])) {
                    if(endTile){
                        
                    }else{
                        self.pathNextTick = true;
			return;
                    }
		}

		destTile = new IgePoint(destTileX, destTileY, 0);
		//path = self.pathFinder.aStar(self.collisionMap, currentTile, destTile, tileChecker, true, false);
                //console.log(self.id() + ' START newPath-findPath lifeState:'+self.lifeState + ' destTileX='+destTileX+' destTileY'+destTileX);
                self.prevPathFindIterationCount++;
                path = self.findPath(currentTile, destTile);
                //console.log(self.id() + ' STOP newPath-findPath '+path.length);
                //path = self.pathFinder.aStar(self.collisionMap, currentTile, destTile, tileChecker, true, true);

		//if (path.length && self.checkNewPath(path)) {                    
                //if (self.checkNewPath(path)) {  
                
                if (path.length){
			// Assign the path to the player and start it
                        
                        if(self.prevTile)self.unOccupyTile(self.prevTile.x, self.prevTile.y);                        
                        
                        //console.log(self.id() + ' 1 newPath  path.start');
                        self.currentPathIndex = -1;
			self.path.clear()
                            .path.add(path)
                            .path.start();
                            
                        self.walk = true;

			self.pathNextTick = false;
                       
                       //self.doChildrenAction();
                        /*
                        if(self.my_children){
                            self.my_children.goToSurroundingsTile(destTile);
                        }
                        */
                        //console.log(self.id() + ' 2 newPath  path.start');
		} else {
                    if(endTile){                        
                    }else{ 
                        
                        if(self.prevPathFindResult === 0 && self.prevPathFindIterationCount > 3){
                            //console.log(self.id() + ' NEXT lifeState !!!!!!!!!!!!!!!!');
                            self.lifeState++;
                        }
                        
			self.pathNextTick = true;
                    }
		}
                
                self.prevPathFindResult = path.length;
                
                //console.log(self.id() + ' END newPath');
	},
       
       doChildrenAction: function(){
            var self = this;
            if(self.my_children){
                if(self.path.endPoint()){
                    self.my_children.goToSurroundingsTile(self.path.endPoint());
                }
            }
            
            if(self.my_partner){
                if(self.path.endPoint()){
                    self.my_partner.goToSurroundingsTile(self.path.endPoint());
                }
            }            
            
       },
       
       findPath: function(currentTile, destTile){
            var self = this;
            var tileChecker = function (tileData, tileX, tileY) {
				// If the map tile data is set, don't path along it
				return !tileData;
			};
            var path = [];
            
            path = self.pathFinder.aStar(self.collisionMap, currentTile, destTile, tileChecker, true, false);
            
            return path;
       },
       
       addPath: function(path){
            var self = this;
           if (path.length){
                // Assign the path to the player and start it
                self.path.add(path)
                    .path.start();

                self.walk = true;
                self.pathNextTick = false;
           }
       },

       setPath: function(path){
            var self = this;
           if (path.length){
                // Assign the path to the player and start it
                self.currentPathIndex = -1;
                self.path.clear()
                    .path.add(path)
                    .path.start();

                self.walk = true;
                self.pathNextTick = false;
           }
       },
               
       isPlayer: function(){
            var self = this;
            return self.category() === 'PLAYER';
            //return self.characterType() ===  0;
       },

       isCustomer: function(){
            var self = this;
            return self.category() === "CUSTOMER";
            //return self.characterType() >  0;
       },

       characterType: function(){
            var self = this;
            return self.imageEntity._characterType;
       },
       
                     
       actionOnContact: function(contactEntity) {
            var self = this;
            if(self.path){
                self.path.stop();
                self.path.clear();
            }         
            
          self.imageEntity.animation.stop();
          if(self.last_direction)
                self.imageEntity.animation.select(this.last_direction);

           self.startCustomerWalk();
       },
       
       initLocationInfo: function(__linfo){
            var self = this;
            self.locationInfo = __linfo;
            self.locationInfo["locationX"] = __linfo.x;
            self.locationInfo["locationY"] = __linfo.y;
            self.locationInfo["locationWidth"] = __linfo.width;
            self.locationInfo["locationHeight"] = __linfo.height;
            
            self.locationInfo["locationStartX"] = self.locationInfo["locationX"] + __linfo.startx;
            self.locationInfo["locationStartY"] = self.locationInfo["locationY"] + __linfo.starty;
            
            self.locationInfo["locationMaxX"] = self.locationInfo["locationX"] + self.locationInfo["locationWidth"];
            self.locationInfo["locationMaxY"] = self.locationInfo["locationY"] + self.locationInfo["locationHeight"];            
       },
               
	tick: function (ctx) {
                var self = this;
    
                if(this.waitTicks > 0){
                    self.waitTicks--;
                    self.allowWalk = false;
                }else if(this.waitTicks === 0){
                    self.waitTicks = -1;
                    self.allowWalk = true;
                    self.invokeNewPath();
                }else{
                    
                }
    
		if (self.pathNextTick) {
			self.newPath();
		}

                Character.prototype.tick.call(this, ctx);
	},
                
                
	update: function (ctx) {
            var self = this;
                        
		// Set the depth to the y co-ordinate which basically
		// makes the entity appear further in the foreground
		// the closer they become to the bottom of the screen
		self.depth(self._translate.y);
		
		// Make sure the character is animating in the correct
		// direction
		var dir = self.path.currentDirection();
                //if(self.isPlayer())console.info(dir);                
		if (dir && (dir !== self._currentDir || !self.imageEntity.animation.playing())) {
                //if (dir && (dir !== self._currentDir || !this.imageEntity.animation.playing())) {
                //if (dir) {
                    
			self._currentDir = dir;
			
			// The characters we are using only have four directions
			// so convert the NW, SE, NE, SW to N, S, E, W
                        // s - юг w - запад n - север e - восток
			switch (dir) {
				case 'SW':
					//dir = 'W';
					break;
				
				case 'SE':
					//dir = 'E';
					break;
				
				case 'NW':
					//dir = 'W';
					break;
				
				case 'NE':
					//dir = 'E';
					break;
			}
			
                       // console.info(dir);
                        
                       self.imageEntity.animation.start(dir);
		}
		
                Character.prototype.update.call(this, ctx);
	}
                
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = CharacterAi; }