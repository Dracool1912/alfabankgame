var LocationHome3Component = Location.extend({
	classId: 'LocationHome3Component',
	componentId: 'locationHome3Component',

    init: function (entity, options) {
            var self = this;

            // Store the entity that this component has been added to
            self._entity = entity;

            // Store any options that were passed to us
            self._options = options;

            self.id = "HOME3";
            self.objects_path = "home/";

    },

    loadTextures: function () {
        var self = this;
        var __entity = self._entity;

        __entity.gameTexture.a_scales = self.loadTextureSet("scales", 4); 
        
        self.texturesInitialised = true;
    },

    setupEntities: function (object_layer) {
        var self = this;
        if(!self.texturesInitialised)return;
        
        var __entity = self._entity;

        var __i=0;
        var imageScale = 1;
        
           var  __dx = 0;
           var  __dy = 0;
           var  __ddx = -4;
           var  __ddy = 2;  
           var  __n = 4;
            
           var  __deltas = [{n:__n, x:(__dx+5), y:__dy-1}];             
            for(var __in=__n-1; __in >= 1; __in--){
                __deltas.push({n:__in, x:(__dx+=__ddx), y:(__dy+=__ddy)});
            }
            
            self.allocateGameObject(
                object_layer,                           // уровень
                'scales1_',                            // ID шаблон
                __entity.gameTexture.a_scales,     //текстура
                0, 0,                                  //старт
                2, 5,                                   // ширина высота
                [
                    {textures_from:4, textures_to:1, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}                    
                ],
                0, 0,                                // смещение текстур  40, -20,
                0, 0,                                   // смещение блокировки тайлов
                imageScale,                                    // scale
                "Y",                                    //направление 
                __deltas
            );        

    }

});



