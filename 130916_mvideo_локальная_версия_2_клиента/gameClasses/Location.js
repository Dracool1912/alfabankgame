var Location = IgeClass.extend({
        classId: 'Location',
    
	init: function () {
		var self = this;
                IgeClass.prototype.init.call(this);
                
                self.currentLocation = "Digital";
                self.locationX = 0;
                self.locationY = 0;
                self.locationWidth = 0;
                self.locationHeight = 0;
                self.locationMaxX = 0;
                self.locationMaxY = 0;                
                self.locationStartX = 0;
                self.locationStartY = 0;   
                
                self.objects_path = "";    
                
                self.texturesInitialised = false;
        },
                               
        initLocation: function(__location_data){
    
            //{id: "Digital", x:20, y:0, width: 25, height: 25, startx: 23, starty: 15}
    
            var self = this;
            self.currentLocation = __location_data.id;
            self.locationX = __location_data.x;
            self.locationY = __location_data.y;
            self.locationWidth = __location_data.width;
            self.locationHeight = __location_data.height;
            
            self.locationStartX = __location_data.startx;
            self.locationStartY = __location_data.starty;
            
            self.locationMaxX = self.locationX + self.locationWidth;
            self.locationMaxY = self.locationY + self.locationHeight;            
        }, 
        
        showLocationPosition: function(__object_layer){
            var self = this;
            //if(self.showLocationPositionFlag){
                __object_layer.occupyTile(self.locationX, self.locationY, 1, self.locationHeight, {});
                __object_layer.occupyTile(self.locationX, self.locationY, self.locationWidth, 1, {});

                __object_layer.occupyTile(self.locationX, self.locationMaxY-1   , self.locationWidth, 1, {});
                __object_layer.occupyTile(self.locationMaxX-1, self.locationY, 1, self.locationHeight, {});            
           // }
        },
                
        /**
         * закрузка текстур для объекта дизайна
         * __texture_set - массив с текстурами
         * __pref часть пути к файлам
         * __cnt - кол-во тестур
         */
        loadTextureSet: function(__pref, __cnt){
            
            var self = this;
            var __entity = self._entity;
            
            var __texture_set = [];
            
            __pref = self.objects_path + __pref + "/";
            
            for(var __ind=0; __ind < __cnt; __ind++){
                __texture_set[__ind] = new IgeTexture(__entity.textures_paths.objects+__pref+(__ind+1)+'.png');
            }
                                    
            return __texture_set;
        },
                

        /**
         * размещение объекта интерфейса
         * __texture_set - массив с текстурами
         */
        allocateGameObject: function(__object_layer, __id, __texture_set, __startTileX, __startTileY, __tileWidth, __tileHeight, __texture__Map, __img__X, __img__Y, __occupy_delta_X, __occupy_delta_Y, __imageScale, __direct, __correct_images, product, bonus_area){
           var self = this;
           
           if(__texture_set == undefined)return;
            
            var __entity = self._entity;
           
           var __textureMap = __texture__Map.slice();
           
            if(product === undefined)product = "";
            if(bonus_area === undefined)bonus_area = "";
            
            __startTileX -= __occupy_delta_X;
            __startTileY -= __occupy_delta_Y;
            
            __startTileX += self.locationX;
            __startTileY += self.locationY;
            
            var __deltaTileX = 0;
            var __deltaTileY = 0;
            
            if(__tileWidth > 1) __deltaTileX = 1;
            if(__tileHeight > 1)__deltaTileY = 1;
            
            var __currentTileX = __startTileX;
            var __currentTileY = __startTileY;
            
            for(var __map_ind = 0; __map_ind < __textureMap.length; __map_ind++){
                var __map_info = __textureMap[__map_ind];
                
                //{textures_from:6, textures_to:1, delta_X: 1, delta_Y: 0, end_X: 0, end_Y: 0}
                
                var ___ind = __map_info.textures_from;
                var __ind_delta = __map_info.textures_from > __map_info.textures_to ? -1 : 1;
                
                var __exit = false;
                while(!__exit){
                    
                    var __d_ix = 0;
                    var __d_iy = 0;
                    for(var __ind_correct = 0; __ind_correct < __correct_images.length; __ind_correct++){
                        if(__correct_images[__ind_correct].n ===  ___ind){
                            __d_ix = __correct_images[__ind_correct].x;
                            __d_iy = __correct_images[__ind_correct].y;
                        }
                    }                                                                                                  
                    
                    var __ind = ___ind - 1;
                    ___ind += __ind_delta;
                    
                    if(__ind_delta > 0) __exit = ___ind > __map_info.textures_to;
                    else __exit = ___ind < __map_info.textures_to;

                    var __i = __entity.obj.length;
                    
                    var __img__X__ = __img__X + __d_ix;
                    var __img__Y__ = __img__Y + __d_iy;
                                        
                    __entity.obj[__i] = new __entity.GameObject(__object_layer, {
                        texture: __texture_set[__ind],
                        tileX: __currentTileX, tileY: __currentTileY,                     
                        img__X: __img__X__, img__Y: __img__Y__,
                        imageScale: __imageScale,
                        product: product,
                        bonus_area: bonus_area
                    }).id(__id + (__ind+1)); 

                    __currentTileX += __map_info.delta_X;
                    __currentTileY += __map_info.delta_Y;
                    
                    if(bonus_area){
                        __entity.bonus_areas.push(__entity.obj[__i]);
                    }
                }

                __currentTileX = __startTileX +  __map_info.end_X;
                __currentTileY = __startTileY + __map_info.end_Y;

            }
            
            if(product){
                __entity.setProductArea(product, new IgeRect(__startTileX + __occupy_delta_X, __startTileY + __occupy_delta_Y, __tileWidth, __tileHeight));
            }
            
            __object_layer.occupyTile(__startTileX + __occupy_delta_X, __startTileY + __occupy_delta_Y, __tileWidth, __tileHeight, {});           
        }
                
        
});