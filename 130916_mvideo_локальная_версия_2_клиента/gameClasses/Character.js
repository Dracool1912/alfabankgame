// Define our player character classes
//var Character = IgeEntityBox2d.extend({
var Character = IgeEntity.extend({
	classId: 'Character',

	init: function () {
		var self = this;
                //IgeEntityBox2d.prototype.init.call(this);
                IgeEntity.prototype.init.call(this);

                self.__drawBounds = false;

		// Setup the entity
                self.isometric(true);
                self.depth(1);
                self.drawBounds(self.__drawBounds);
		self.size3d(10, 10, 25);  
                self.originTo(0.5, 0.5, 0);
                
                self.product = '';
                
                self.my_texture = '';
                
                self.drawBounds(self.__drawBounds);
                
                //определение положения персонажа
                self.senseData = [                    
                    //to RIGHT - E - east восток
                    {dx:0, dy:-1, dir:"SE", player_dir:"NW"},
                    {dx:1, dy:-1, dir:"SE", player_dir:"NW"},
                    {dx:1, dy:0,  dir:"SE", player_dir:"NW"},
                    
                     //to LEFT - W - west - запад
                    {dx:-1, dy:0, dir:"SW", player_dir:"NE"},
                    {dx:-1, dy:1, dir:"SW", player_dir:"NE"},
                    {dx:0, dy:1,  dir:"SW", player_dir:"NE"},
                    
                    //to DOWN - S sout юг
                    {dx:1, dy:1,  dir:"SE", player_dir:"NW"},
                    
                    //to UP - N - nord сервер
                    {dx:-1, dy:-1, dir:"NW", player_dir:"SE"},
//-----------------------------------------
                    //to RIGHT - E - east восток
                    {dx:0, dy:-1, dir:"E", player_dir:"W"},
                    {dx:1, dy:-1, dir:"E", player_dir:"W"},
                    {dx:1, dy:0,  dir:"E", player_dir:"W"},
                    
                     //to LEFT - W - west - запад
                    {dx:-1, dy:0, dir:"W", player_dir:"E"},
                    {dx:-1, dy:1, dir:"W", player_dir:"E"},
                    {dx:0, dy:1,  dir:"W", player_dir:"E"},
                    
                    //to DOWN - S sout юг
                    {dx:1, dy:1,  dir:"S", player_dir:"N"},
                    
                    //to UP - N - nord сервер
                    {dx:-1, dy:-1, dir:"N", player_dir:"S"}                    
                ];                                
                
                
		self.imageEntity = new IgeEntity()
			.addComponent(IgeAnimationComponent);
                
                self.checkIcon = new IgeEntity();

	},
        

        initTexture: function(__texture, type, product){
           var self = this;
           self.my_texture = __texture;
           self.product = product;
           //self.__initTexture('./assets/person/'+self.product, true);
           //self.__initTexture('./assets/person/normal/', true);
             
            if(self.imageEntity._characterType == 0){
                self.__initTexture('./assets/person/', true);
            }else{
                self.__initTexture('./assets/person/'+self.product+'/', true);
            }
            
           self.setType(type);             
             
           return self;
        },

        setSaleOkMark: function(){
            var self = this;
                       if(self.imageEntity._characterType > 0){
                            self._check_person_texture = new IgeTexture('./assets/person/sale_ok_person_status.png');
                            self._check_person_texture.on('loaded', function () {
                                    self.checkIcon
                                            .id(self.id() + '_check_icon')
                                            .drawBounds(self.__drawBounds)
                                            .drawBoundsData(false)
                                            .scaleTo(1, 1, 1)
                                            .texture(self._check_person_texture)
                                            .translateTo(0, -60, 0)
                                            //.originTo(0, 0, 0)
                                            .dimensionsFromCell()
                                            .mount(self);
                            });                             
                       }    
        },

        initGlowTexture: function(){
            var self = this;
            //self.__initTexture('./assets/person/glow/', false);
            if(self.imageEntity._characterType == 0){
                self.__initTexture('./assets/person/', true);
            }else{
                self.__initTexture('./assets/person/'+self.product+'/', true);
            }
        },

        initNormalTexture: function(){
            var self = this;
            //self.__initTexture('./assets/person/normal/', false);
            if(self.imageEntity._characterType == 0){
                self.__initTexture('./assets/person/', true);
            }else{
                self.__initTexture('./assets/person/'+self.product+'/', true);
            }
            //self.setSaleOkMark();
        },
                
        __initTexture: function(__texture_path, __mount){
            var self = this;
                       
                       self._characterTexture = new IgeCellSheet(__texture_path + self.my_texture, 5, 4);
                                                
			// Wait for the texture to load
			self._characterTexture.on('loaded', function () {
				self.imageEntity
					.drawBounds(self.__drawBounds)
					.drawBoundsData(false)
					//.originTo(0, 0, 0)
					.texture(self._characterTexture)
                                        .translateTo(0, -15, 0)
					.dimensionsFromCell();
			}, false, true);
                        
                        if(__mount){
                            self.imageEntity
                                    .id(self.id() + '_image')
                                    .mount(self);
                        }
        },
                
        crossDirection: function(dir){
            switch (dir){
                case 'N' :
                    return "S";
                case 'S' :
                    return "N";
                case 'W' :
                    return "E";                    
                case 'E' :
                    return "W";  
                case 'SW' :
                    return 'NE';
                case 'SE' :
                    return 'NW';
                    
                case 'NW' :
                    return 'SE';
                case 'NE' :
                    return 'SW';
                    
                default :
                    return "";
            }            
        },

	/**
	 * Sets the type of character which determines the character's
	 * animation sequences and appearance.
	 * @param {Number} type From 0 to 7, determines the character's
	 * appearance.
	 * @return {*}
	 */

	setType: function (type) {
            var self = this;
            
            var _sw_ = 0;
            var _ne_ = 5;
            var _se_ = 10;
            var _nw_ = 15;            
                        
            var _xx_ = _sw_;
            self.imageEntity.animation.define('SW', [1+_xx_, 2+_xx_, 3+_xx_, 1+_xx_, 4+_xx_, 5+_xx_, 1+_xx_], 8, -1);
            self.imageEntity.animation.define('_SW', [1+_xx_], 1, 1);
            _xx_ = _se_;
            self.imageEntity.animation.define('SE', [1+_xx_, 2+_xx_, 3+_xx_, 1+_xx_, 4+_xx_, 5+_xx_, 1+_xx_], 8, -1);
            self.imageEntity.animation.define('_SE', [5+_xx_], 1, 1);
            _xx_ = _nw_;
            self.imageEntity.animation.define('NW', [1+_xx_, 2+_xx_, 3+_xx_, 1+_xx_, 4+_xx_, 5+_xx_, 1+_xx_], 8, -1);
            self.imageEntity.animation.define('_NW', [5+_xx_], 1, 1);
            _xx_ = _ne_;
            self.imageEntity.animation.define('NE', [1+_xx_, 2+_xx_, 3+_xx_, 1+_xx_, 4+_xx_, 5+_xx_, 1+_xx_], 8, -1);
            self.imageEntity.animation.define('_NE', [1+_xx_], 1, 1);

/*
            var _xx_ = _sw_;
            self.imageEntity.animation.define('_SW', [1+_xx_], 1, 1);
            _xx_ = _se_;
            self.imageEntity.animation.define('_SE', [5+_xx_], 1, 1);
            _xx_ = _nw_;
            self.imageEntity.animation.define('_NW', [5+_xx_], 1, 1);
            _xx_ = _ne_;
            self.imageEntity.animation.define('_NE', [1+_xx_], 1, 1);
  */          
            self.imageEntity.cell(1);
                                
/*            
				this.imageEntity.animation.define('SW', [1, 2, 3, 1, 4, 5, 4], 8, -1)
					.animation.define('W', [13, 14, 15, 14], 8, -1)
					.animation.define('E', [25, 26, 27, 26], 8, -1)
					.animation.define('N', [37, 38, 39, 38], 8, -1)
					.cell(1);
*/
/*
				this.imageEntity.animation.define('_S', [1], 1, 1)
					.animation.define('_W', [13], 1, 1)
					.animation.define('_E', [25], 1, 1)
					.animation.define('_N', [37], 1, 1)
					.cell(1);
*/
		
                self._restCell = 1;
                
                self.imageEntity._characterType = type;
		return this;
        },
/*
	__setType: function (type) {
		switch (type) {
			case 0:
				this.imageEntity.animation.define('S', [1, 2, 3, 2], 8, -1)
					.animation.define('W', [13, 14, 15, 14], 8, -1)
					.animation.define('E', [25, 26, 27, 26], 8, -1)
					.animation.define('N', [37, 38, 39, 38], 8, -1)
					.cell(1);

				this.imageEntity.animation.define('_S', [1], 1, 1)
					.animation.define('_W', [13], 1, 1)
					.animation.define('_E', [25], 1, 1)
					.animation.define('_N', [37], 1, 1)
					.cell(1);

				this._restCell = 1;
				break;

			case 1:
				this.imageEntity.animation.define('S', [4, 5, 6, 5], 8, -1)
					.animation.define('W', [16, 17, 18, 17], 8, -1)
					.animation.define('E', [28, 29, 30, 29], 8, -1)
					.animation.define('N', [40, 41, 42, 41], 8, -1)
					.cell(4);
                                
				this.imageEntity.animation.define('_S', [4], 1, 1)
					.animation.define('_W', [16], 1, 1)
					.animation.define('_E', [28], 1, 1)
					.animation.define('_N', [40], 1, 1)
					.cell(4);
                                

				this._restCell = 4;
				break;

			case 2:
				this.imageEntity.animation.define('S', [7, 8, 9, 8], 8, -1)
					.animation.define('W', [19, 20, 21, 20], 8, -1)
					.animation.define('E', [31, 32, 33, 32], 8, -1)
					.animation.define('N', [43, 44, 45, 44], 8, -1)
					.cell(7);

				this.imageEntity.animation.define('_S', [7], 1, 1)
					.animation.define('_W', [19], 1, 1)
					.animation.define('_E', [31], 1, 1)
					.animation.define('_N', [43], 1, 1)
					.cell(7);

				this._restCell = 7;
				break;

			case 3:
				this.imageEntity.animation.define('S', [10, 11, 12, 11], 8, -1)
					.animation.define('W', [22, 23, 24, 23], 8, -1)
					.animation.define('E', [34, 35, 36, 35], 8, -1)
					.animation.define('N', [46, 47, 48, 47], 8, -1)
					.cell(10);

				this.imageEntity.animation.define('_S', [10], 1, 1)
					.animation.define('_W', [22], 1, 1)
					.animation.define('_E', [34], 1, 1)
					.animation.define('_N', [46], 1, 1)
					.cell(10);

				this._restCell = 10;
				break;

			case 4:
				this.imageEntity.animation.define('S', [49, 50, 51, 50], 8, -1)
					.animation.define('W', [61, 62, 63, 62], 8, -1)
					.animation.define('E', [73, 74, 75, 74], 8, -1)
					.animation.define('N', [85, 86, 87, 86], 8, -1)
					.cell(49);

				this.imageEntity.animation.define('_S', [49], 1, 1)
					.animation.define('_W', [61], 1, 1)
					.animation.define('_E', [73], 1, 1)
					.animation.define('_N', [85], 1, 1)
					.cell(49);

				this._restCell = 49;
				break;

			case 5:
				this.imageEntity.animation.define('S', [52, 53, 54, 53], 8, -1)
					.animation.define('W', [64, 65, 66, 65], 8, -1)
					.animation.define('E', [76, 77, 78, 77], 8, -1)
					.animation.define('N', [88, 89, 90, 89], 8, -1)
					.cell(52);

				this.imageEntity.animation.define('_S', [52], 1, 1)
					.animation.define('_W', [64], 1, 1)
					.animation.define('_E', [76], 1, 1)
					.animation.define('_N', [88], 1, 1)
					.cell(52);

				this._restCell = 52;
				break;

			case 6:
				this.imageEntity.animation.define('S', [55, 56, 57, 56], 8, -1)
					.animation.define('W', [67, 68, 69, 68], 8, -1)
					.animation.define('E', [79, 80, 81, 80], 8, -1)
					.animation.define('N', [91, 92, 93, 92], 8, -1)
					.cell(55);

				this.imageEntity.animation.define('_S', [55], 1, 1)
					.animation.define('_W', [67], 1, 1)
					.animation.define('_E', [79], 1, 1)
					.animation.define('_N', [91], 1, 1)
					.cell(55);

				this._restCell = 55;
				break;

			case 7:
				this.imageEntity.animation.define('S', [58, 59, 60, 59], 8, -1)
					.animation.define('W', [70, 71, 72, 71], 8, -1)
					.animation.define('E', [82, 83, 84, 83], 8, -1)
					.animation.define('N', [94, 95, 96, 95], 8, -1)
					.cell(58);

				this.imageEntity.animation.define('_S', [58], 1, 1)
					.animation.define('_W', [70], 1, 1)
					.animation.define('_E', [82], 1, 1)
					.animation.define('_N', [94], 1, 1)
					.cell(58);

				this._restCell = 58;
				break;
		}
                
                this.imageEntity._characterType = type;
		return this;
	},
                */

/**
	 * Tweens the character to the specified world co-ordinates.
	 * @param x
	 * @param y
	 * @return {*}
	 */
        /*
	walkTo: function (x, y) {
		var self = this,
			distX = x - this.imageEntity.translate().x(),
			distY = y - this.imageEntity.translate().y(),
			distance = Math.distance(
				this.imageEntity.translate().x(),
				this.imageEntity.translate().y(),
				x,
				y
			),
			speed = 0.1,
			time = (distance / speed);

		// Set the animation based on direction
		if (Math.abs(distX) > Math.abs(distY)) {
			// Moving horizontal
			if (distX < 0) {
				// Moving left
				this.imageEntity.animation.select('W');
			} else {
				// Moving right
				this.imageEntity.animation.select('E');
			}
		} else {
			// Moving vertical
			if (distY < 0) {
				// Moving up
				this.imageEntity.animation.select('N');
			} else {
				// Moving down
				this.imageEntity.animation.select('S');
			}
		}

		// Start tweening the little person to their destination
		this._translate.tween()
			.stopAll()
			.properties({x: x, y: y})
			.duration(time)
			.afterTween(function () {
				self.animation.stop();
				// And you could make him reset back
				// to his original animation frame with:
				//self.cell(10);
			})
			.start();

		return this;
	},
            */    
	update: function (ctx) {
		// Set the depth to the y co-ordinate which basically
		// makes the entity appear further in the foreground
		// the closer they become to the bottom of the screen
		this.depth(this._translate.y);
		
                //IgeEntityBox2d.prototype.update.call(this, ctx);
                IgeEntity.prototype.update.call(this, ctx);
	},
                
	destroy: function () {
		// Destroy the texture object
		if (this._characterTexture) {
			this._characterTexture.destroy();
		}

		// Call the super class
                //IgeEntityBox2d.prototype.destroy.call(this);
                IgeEntity.prototype.destroy.call(this);
	}
                
    
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = Character; }