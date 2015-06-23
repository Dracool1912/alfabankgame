/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var ChildrenComponent = IgeClass.extend({
	classId: 'ChildrenComponent',
	componentId: 'childrenComponent',

	init: function (entity, options) {
		var self = this;

		// Store the entity that this component has been added to
		self._entity = entity;

		// Store any options that were passed to us
		self._options = options;
                
                //родитель этого ребенка
                self.my_parent = null;
        },
                
        setParent: function(___parent){
            var self = this;
            self.my_parent  = ___parent;
        },
                
        goToSurroundingsTile: function(___tile){
            var self = this;
            var objLayer = ige.$('objectLayer');
            
            var __ready = false;
            var __found = false;
            var __cycleCnt = 0;
            var tx = 3 * Math.random() | 0;
            var ty = 3 * Math.random() | 0;            
            while(!__ready){
                tx += ___tile.x - 1;
                ty += ___tile.y - 1;
                if(tx !== ___tile.x && ty !== ___tile.y && !objLayer.isTileOccupied(tx, ty)){
                        __ready = true;
                        __found = true;
                }else{
                    tx = 3 * Math.random() | 0;
                    ty = 3 * Math.random() | 0;                    
                }
                __cycleCnt++;
                if(__cycleCnt > 12){
                    __ready = true;                    
                }
            }

            if(__found){
                var destTile = new IgePoint(tx, ty, 0);
                var currentTile = self._entity.getCurrentTile();
                var path = self._entity.findPath(currentTile, destTile);
                self._entity.setPath(path);
            }

            /*
            for(var tx = ___tile.x-1; ___tile.x+1; tx++){
                for(var ty = ___tile.y-1; ___tile.y+1; ty++){
                    if(tx !== ___tile.x && ty !== ___tile.y){
                        if(!objLayer.isTileOccupied(tx, ty)){
                            var destTile = new IgePoint(tx, ty, 0);
                            var currentTile = self._entity.getCurrentTile();
                            var path = self._entity.findPath(currentTile, destTile);
                            self._entity.setPath(path);
                            return;
                        }
                    }
                }
            }
            */
        },
        
        kill: function(){
    
        }        
});

