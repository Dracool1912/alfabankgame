var PlayerComponent = IgeClass.extend({
	classId: 'PlayerComponent',
	componentId: 'playerComponent',

	init: function (entity, options) {
		var self = this;

                var completePathMethod;

		// Store the entity that this component has been added to
		this._entity = entity;

		// Store any options that were passed to us
		this._options = options;

                this.customer = null;

                this.goTileAfterDialog = null;

                this.gotoDepartament = false;

		// Setup the control system
                /*
		ige.input.mapAction('walkLeft', ige.input.key.left);
		ige.input.mapAction('walkRight', ige.input.key.right);
		ige.input.mapAction('walkUp', ige.input.key.up);
		ige.input.mapAction('walkDown', ige.input.key.down);
                */
               
               
		// Listen for the key up event
		//ige.input.on('keyUp', function (event, keyCode) { self._keyUp(event, keyCode); });

		// Listen for the mouse up event
		ige.input.on('mouseUp', function (event, x, y, button) { 
                    self._mouseUp(event, x, y, button); 
                });

		// Add the playerComponent behaviour to the entity
		//this._entity.addBehaviour('playerComponent_behaviour', this._behaviour);
                
                completePathMethod = function(){
                    //this.imageEntity.animation.select('W');
                    self._entity.imageEntity.animation.stop();
                    //self.startDialogWithCustomer();
                };
                
                this._entity.path.on('traversalComplete', completePathMethod); 
                
	},

        selectCustomer: function(customer, ___x, ___y){
            var self = this;
            self.customer = customer;
            
            var __product = self.customer.data("product");
            var __data = self.customer._data;

           var scope = angular.element(document.getElementById('gameSupport')).scope();
           scope.$apply(function(){
                scope.startDialog(__data, ___x, ___y);
            })                                            
            
            ige.client.gameInDialog();
            self.gotoCustomer();
        },

        freeCustomer: function(){
            var self = this;
            if(self.customer)self.customer.freeCustomer();
            self.customer = null;  
            
            if(self.goTileAfterDialog){
                var playerTile = self._entity.getCurrentTile();
                var path = [];
                path = self._entity.findPath(playerTile, self.goTileAfterDialog);
                self._entity.setPath(path);                
            }
        },

/**
 * игрок идет на тайл с покупателем
 * на подходе к тайлу произойдет столкновение 
 * и начнется диалог если к тому времени покупатель будет еще выбран
 * @param 
 * @return 
 */        
        gotoCustomer: function(){
            var self = this;
            var path = [];
            
            //var playerTile = self._entity._parent.pointToTile(self._entity._translate.toIso());
            //var customerTile = self._entity._parent.pointToTile(self.customer._translate.toIso());

            if(self.customer){
                var playerTile = self._entity.getCurrentTile();
                var customerTile = self.customer.getCurrentTile();

                self.goTileAfterDialog = playerTile;

                //self.customer.unOccupyTile(customerTile.x, customerTile.y);
                
                var __targetTile = self.getFreeTile(customerTile);
                
                if(__targetTile){
                    path = self._entity.findPath(playerTile, __targetTile);
                    self._entity.setPath(path);
                }
                //self.customer.occupyTile(customerTile.x, customerTile.y);
            }
        },
                
        openDialog: function(){
            var self = this;
            
            if(self.customer && self.customer.data("product")){
               var __product = self.customer.data("product");
               var __data = self.customer._data;
               var scope = angular.element(document.getElementById('gameSupport')).scope();
               scope.$apply(function(){
                    //scope.startDialog(__product);
                    scope.startDialog(__data);
                });                
            }
        },
        
        /*       
        resetIdleTimer: function(){
               var scope = angular.element(document.getElementById('gameSupport')).scope();
               scope.$apply(function(){
                    scope.resetIdleTimer();
                })    
        },    
       */

/**
 * начинаем диалог с покупателем
 * разворачиваем игрока и покупатля друг к другу
 * __dir - направление игрока
  * @param {String=} __dir
 * @return 
 */        
        startDialogWith: function(__dir){
            var self = this;
            self._entity.path.clear();
            if(self.customer){
                //покупатель в направлении __dir
                self._entity.imageEntity.animation.select('_'+__dir);
                self.openDialog();
                return true;
            }else{
                return false;
            }                    
        },

/**
 * проверить контакт с покупателем (это игрок)
 * ищем рядом покупателя, если он найден
 * начинаем диалог
 * если не найден - освобождаем покупателя
 * @param
 * @return 
 */        
        
        startDialogWithCustomer: function(){  
            var self = this;
            var currentTile = self._entity.getCurrentTile();
            var __dir = self.getNearGameObject(currentTile);
            //console.log(currentTile);
            if(__dir){
                console.log("startDialogWithCustomer "+__dir);
                   if(self.customer && self.customer.selected){
                        //if(self.startDialogWith(this.customer, __dir)){
                        if(self.startDialogWith(__dir)){
                            var customer_dir = self._entity.crossDirection(__dir);                
                            self.customer.lockCustomer(customer_dir);

                        }else{
                            self.leaveCustomersFromDialog();
                        }
                   }
            }else{
                //покупателя рядом нет
                //чешем репу
                //console.log("startDialogWithCustomer "+__dir);
                self.leaveCustomersFromDialog();
            }            
        },

/**
 * освобождаем всех покупателей
 * @param
 * @return 
 */        
        leaveCustomersFromDialog: function(){
            //return;
            this.customer = null;
    
            var objLayer = ige.$('objectLayer');
            var childArray = objLayer.children(); 
            try{
                for(var __i=0; __i < childArray.length; __i++){
                    var child = childArray[__i];
                    try{
                        child.freeCustomer();
                    }catch(err){
                        //console.error(err);
                    }
                }
            }catch(err){console.error(err);}
        },

/**
 * ищем вокруг тайла __tile объект
 * возвращаем направление на объект
 * @param {IgePoint}
 * @param {String=} 
 */        
        getNearGameObject: function(__tile) {
            var objLayer = ige.$('objectLayer');
            var childArray = objLayer.children();
           
            var tileChecker = function (childTile, tileX, tileY) {  
                if(childTile.x === tileX && childTile.y === tileY)
                    return true;                
                else
                    return false;
            };       

            this.customer = null;

            try{
                for(var __i=0; __i < childArray.length; __i++){
                    var child = childArray[__i];
                    try{
                    if(child.imageEntity._characterType > 0){    //is customer
                        var childTile = this._entity._parent.pointToTile(child._translate.toIso());

                        for(var ___i=0; ___i < this._entity.senseData.length; ___i++){
                            var __dxyo = this._entity.senseData[___i];
                            if (tileChecker(childTile, __tile.x + __dxyo.dx,__tile.y + __dxyo.dy)) {
                                this.customer = child;
                                return  __dxyo.dir;
                            }
                        }
                    }
                    }catch(err){
                        //console.error("111");
                    }
                }
            }catch(err){
                //console.error(err);
            }
            return "";
            
        },

/**
 * ищем вокруг тайла __tile свободный тайл
 * @param {IgePoint}
 * @param {IgePoint=} 
 */        
        getFreeTile: function(__tile) {
            var objLayer = ige.$('objectLayer');
           
            var tileChecker = function (tileX, tileY) {  
                if(objLayer.isTileOccupied(tileX, tileY))
                    return false;                
                else
                    return true;
            };       

            try{
                        for(var ___i=0; ___i < this._entity.senseData.length; ___i++){
                            var __dxyo = this._entity.senseData[___i];
                            if (tileChecker(__tile.x + __dxyo.dx, __tile.y + __dxyo.dy)) {
                                return  new IgePoint(__tile.x + __dxyo.dx, __tile.y + __dxyo.dy);
                            }
                        }
            }catch(err){
                //console.error(err);
            }
            return null;
            
        },

	_keyUp: function (event, keyCode) {
		if (keyCode === ige.input.key.space) {
			// Change the character
			this._entity._characterType++;

			if (this._entity._characterType > 7) {
				this._entity._characterType = 0;
			}

			this._entity.setType(this._entity._characterType);
		}
	},

	/**
	 * поднялась кнопка мыши
	 * @param event
	 * @private
	 */
	_mouseUp: function (event, x, y, button) {
                //this.resetIdleTimer();
		// координаты тайла в котором кликнули мышкой
		var endTile = ige.$('objectLayer').mouseToTile(),
			currentPosition = this._entity._translate,
			startTile,
			newPath,
			endPoint = this._entity.path.endPoint();
                
                if(endTile){
                    if(ige.client.scenePositionX < endTile.x && endTile.x <  (ige.client.scenePositionX + ige.client.scenePositionWidth)){
                        if(ige.client.scenePositionY < endTile.y && endTile.y <  (ige.client.scenePositionY + ige.client.scenePositionHeight)){  
                            if(ige.$('objectLayer').isTileOccupied(endTile.x, endTile.y)){
                                return;
                            }
                        }else{
                            return;
                        }
                    }else{
                        return;
                    }
                }
                
		// если существует незаконченный путь
		if (endPoint) {
			// Use the end point of the existing path as the
			// start point of the new path
			startTile = endPoint;
		} else {
			// т
			if (this._entity._parent.isometricMounts()) {
				startTile = this._entity._parent.pointToTile(currentPosition.toIso());
			} else {
				startTile = this._entity._parent.pointToTile(currentPosition);
			}
		}

                console.log("PLAYER new path: x="+endTile.x+" y="+endTile.y);

                this._entity.newPath(endTile);

                this.leaveCustomersFromDialog();
	},
        
	_behaviour: function (ctx) {
		var vel = 6,
			xVel, yVel,
			direction = '',
			iso = (this._parent && this._parent.isometricMounts() === true);

		if (ige.input.actionState('walkUp')) {
			direction += 'N';
		}

		if (ige.input.actionState('walkDown')) {
			direction += 'S';
		}

		if (ige.input.actionState('walkLeft')) {
			direction += 'W';
		}

		if (ige.input.actionState('walkRight')) {
			direction += 'E';
		}

		switch (direction) {
			case 'N':
				if (iso) {
					vel /= 1.4;
					xVel = -vel;
					yVel = -vel;
				} else {
					xVel = 0;
					yVel = -vel;
				}
				//this.imageEntity.animation.select('walkUp');
                                this.imageEntity.animation.select('N');
				break;

			case 'S':
				if (iso) {
					vel /= 1.4;
					xVel = vel;
					yVel = vel;
				} else {
					xVel = 0;
					yVel = vel;
				}
				this._box2dBody.SetLinearVelocity(new IgePoint(0, vel, 0));
				this._box2dBody.SetAwake(true);
				//this.imageEntity.animation.select('walkDown');
                                this.imageEntity.animation.select('S');
				break;

			case 'E':
				if (iso) {
					vel /= 2;
					xVel = vel;
					yVel = -vel;
				} else {
					xVel = vel;
					yVel = 0;
				}
				this._box2dBody.SetLinearVelocity(new IgePoint(vel, 0, 0));
				this._box2dBody.SetAwake(true);
				//this.imageEntity.animation.select('walkRight');
                                this.imageEntity.animation.select('E');
				break;

			case 'W':
				if (iso) {
					vel /= 2;
					xVel = -vel;
					yVel = vel;
				} else {
					xVel = -vel;
					yVel = 0;
				}
				this._box2dBody.SetLinearVelocity(new IgePoint(-vel, 0, 0));
				this._box2dBody.SetAwake(true);
				//this.imageEntity.animation.select('walkLeft');
                                this.imageEntity.animation.select('W');
				break;

			case 'NE':
				if (iso) {
					xVel = 0;
					yVel = -vel;
				} else {
					xVel = vel;
					yVel = -vel;
				}
				this._box2dBody.SetLinearVelocity(new IgePoint(vel, -vel, 0));
				this._box2dBody.SetAwake(true);
				//this.imageEntity.animation.select('walkRight');
                                this.imageEntity.animation.select('E');
				break;

			case 'NW':
				if (iso) {
					xVel = -vel;
					yVel = 0;
				} else {
					xVel = -vel;
					yVel = -vel;
				}
				this._box2dBody.SetLinearVelocity(new IgePoint(-vel, -vel, 0));
				this._box2dBody.SetAwake(true);
				//this.imageEntity.animation.select('walkLeft');
                                this.imageEntity.animation.select('W');
				break;

			case 'SE':
				if (iso) {
					xVel = vel;
					yVel = 0;
				} else {
					xVel = vel;
					yVel = vel;
				}
				this._box2dBody.SetLinearVelocity(new IgePoint(vel, vel, 0));
				this._box2dBody.SetAwake(true);
				//this.imageEntity.animation.select('walkRight');
                                this.imageEntity.animation.select('E');
				break;

			case 'SW':
				if (iso) {
					xVel = 0;
					yVel = vel;
				} else {
					xVel = -vel;
					yVel = vel;
				}
				this._box2dBody.SetLinearVelocity(new IgePoint(-vel, vel, 0));
				this._box2dBody.SetAwake(true);
				//this.imageEntity.animation.select('walkLeft');
                                this.imageEntity.animation.select('W');
				break;

			default:
				this.imageEntity.animation.stop();
				break;
		}

		this._box2dBody.SetLinearVelocity(new IgePoint(xVel, yVel, 0));
		this._box2dBody.SetAwake(true);
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = PlayerComponent; }