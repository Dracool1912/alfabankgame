var ClientObjects = {
    
	GameObject: IgeEntity.extend({
		classId: 'GameObject',

		init: function (parent, params) {
			IgeEntity.prototype.init.call(this);
			var self = this;
                        
                        if(params.depth === undefined )params.depth = 0;
                        
                        if(params.product === undefined )params.product = "";
                        
                        if(params.bonus_area === undefined )params.bonus_area = "";
                        
                        if(params.dtileX === undefined)params.dtileX = 0;
                        if(params.dtileY === undefined)params.dtileY = 0;
                        
                        if(params.img__X === undefined)params.img__X = 0;
                        if(params.img__Y === undefined )params.img__Y = 0;
                        
                        if(params.x3d === undefined)params.x3d = 1;
                        if(params.y3d === undefined )params.y3d = 1;                  
                        
                        if(params.height3d === undefined )params.height3d = 30;
                        
                        if(params.width_occupy === undefined)params.width_occupy = Math.round(params.x3d);
                        if(params.height_occupy === undefined)params.height_occupy = Math.round(params.y3d);
                        
                        self.params = params;
                        
                        self.bonusAreaEnabled = false;
                        self.bonusAreaEnabled = true;
                        /* !!!!
                        var _tileWidth = 40;
                        var _tileHeight = 40;
                        */

                        var _tileWidth = 20;
                        var _tileHeight = 20;                    
                    
                        _tileWidth = parent._tileWidth;
                        _tileHeight = parent._tileHeight;
                        
//                        try{
//                            self.widthByTile(params.width_occupy, true);
//                        }catch(err){}
//                        try{
//                            self.heightByTile(params.height_occupy, true);
//                        }catch(err){}
                        
			self.isometric(true)
				.mount(parent)
				.size3d(params.x3d * _tileWidth, params.y3d * _tileHeight, params.height3d)
                                .translateToTile(params.tileX+params.dtileX, params.tileY+params.dtileY, 0)
				.mouseOver(function () { 
                                    if(self.params.bonus_area && self.bonusAreaEnabled){
                                        document.body.style.cursor='pointer';
                                    }                            
                                    self.drawBounds(true); self.drawBoundsData(true);
                                })
				.mouseOut(function () { 
                                    document.body.style.cursor='auto';
                                    self.drawBounds(false); self.drawBoundsData(false); 
                                })
                                .mouseUp(function (event, control) { 
                                    
                                    if(self.params.bonus_area && self.bonusAreaEnabled){
                                       var scope = angular.element(document.getElementById('gameSupport')).scope();
                                       scope.$apply(function(){
                                            scope.selectBonusActions(self.params.bonus_area, event.x, event.y);
                                        })                                            
                                    }
                                    
                                })
				.drawBounds(false)
				.drawBoundsData(false)
                                .depth(params.depth);
				//.occupyTile(params.tileX, params.tileY, params.width_occupy, params.height_occupy);



                        //this.originTo(0, 0.7, 0.2)
                        if(params.texture != undefined && params.texture){
			self.imageEntity = new IgeEntity()
				.texture(params.texture)
				//.dimensionsFromCell()
				.scaleTo(params.imageScale, params.imageScale, 1)
                                //.scaleTo(1, 1, 1)
                                //.scaleTo(0.9, 0.9, 0.9)
                                //.originTo(0.1, 0.6, 0)
				.drawBounds(false)
				.drawBoundsData(false)
                                //.originTo(params.img__X, params.img__Y, 0)
				.translateTo(params.img__X, params.img__Y, 0)
                                //.translateTo(0, 0, 100)
				.mount(this)
                                .dimensionsFromCell();
                        }else{
                            console.log("*** EMPTY TEXTURE !!!");
                        }
                        
                        
                        try{
                           //self.widthByTile(params.width_occupy, true);
                        }catch(err){}
                        try{
                           //self.heightByTile(params.height_occupy, true);
                        }catch(err){}
                        
		},
                        
                getProductArea: function(){
                    var self = this;
                    return new IgeRect(Math.floor(self.params.tileX), Math.floor(self.params.tileY), self.params.width_occupy, self.params.height_occupy);
                }
	})    // GameObject
    /*
	TableNotebook: IgeEntity.extend({
		classId: 'TableNotebook',

		init: function (parent, tileX, tileY, texture) {
			IgeEntity.prototype.init.call(this);
			var self = this;
                        
			this.isometric(true)
				.mount(parent)
				.size3d(2 * parent._tileWidth, 8 * parent._tileHeight, 50)
                                .translateToTile(tileX+0.5, tileY+3.6, 0)
				.mouseOver(function () { this.drawBounds(true); this.drawBoundsData(true); })
				.mouseOut(function () { this.drawBounds(false); this.drawBoundsData(false); })
				.drawBounds(false)
				.drawBoundsData(false)
				.occupyTile(tileX, tileY, 2, 8);

			var	imageScale = 0.25;

			this.imageEntity = new IgeEntity()
				.texture(texture)
				.dimensionsFromCell()
				.scaleTo(imageScale, imageScale, 1)
				.drawBounds(false)
				.drawBoundsData(false)
				.translateTo(0, 0, 0)
				.mount(this);
		}
	}),    // TableNotebook
        
	TableMFU: IgeEntity.extend({
		classId: 'TableMFU',

		init: function (parent, tileX, tileY, texture) {
			IgeEntity.prototype.init.call(this);
			var self = this;
                        
			this.isometric(true)
				.mount(parent)
				.size3d(2 * parent._tileWidth, 8 * parent._tileHeight, 50)
                                .translateToTile(tileX+0.5, tileY+3.5, 0)
				.mouseOver(function () { this.drawBounds(true); this.drawBoundsData(true); })
				.mouseOut(function () { this.drawBounds(false); this.drawBoundsData(false); })
				.drawBounds(false)
				.drawBoundsData(false)
				.occupyTile(tileX, tileY, 2, 8);

                        var	imageScale = 0.25;

			this.imageEntity = new IgeEntity()
				.texture(texture)
				.dimensionsFromCell()
				.scaleTo(imageScale, imageScale, 1)
				.drawBounds(false)
				.drawBoundsData(false)
                                .translateTo(0, 0, 0)
				.mount(this)
                                ;
		}
	}),    // TableMFU
        
	Pillar: IgeEntity.extend({
		classId: 'Pillar',

		init: function (parent, tileX, tileY, texture) {
			IgeEntity.prototype.init.call(this);
			var self = this;
                        
			this.isometric(true)
				.mount(parent)
				.size3d(1 * parent._tileWidth, 1 * parent._tileHeight, 50)
                                .translateToTile(tileX, tileY, 0)
				.mouseOver(function () { this.drawBounds(true); this.drawBoundsData(true); })
				.mouseOut(function () { this.drawBounds(false); this.drawBoundsData(false); })
				.drawBounds(false)
				.drawBoundsData(false)
				.occupyTile(tileX, tileY);

                        var	imageScale = 0.25;
                        
			this.imageEntity = new IgeEntity()
				.texture(texture)
				.dimensionsFromCell()
				.scaleTo(imageScale, imageScale, 1)
				.drawBounds(false)
				.drawBoundsData(false)
				.translateTo(0, 0, 0)
				.mount(this);
		}
	})    // Pillar
        */
};

