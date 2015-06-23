var LocationTVComponent = Location.extend({
	classId: 'LocationTVComponent',
	componentId: 'locationTVComponent',

    init: function (entity, options) {
            var self = this;

            // Store the entity that this component has been added to
            self._entity = entity;

            // Store any options that were passed to us
            self._options = options;

            self.id = "TV";
            self.objects_path = "tv/";

    },

    loadTextures: function () {
        var self = this;
        var __entity = self._entity;

        __entity.gameTexture.a_tv_left = self.loadTextureSet("tv_left", 18); 
        __entity.gameTexture.a_tv_right = self.loadTextureSet("tv_right", 13);        
        __entity.gameTexture.a_tv_table = self.loadTextureSet("tv_table", 7);        
        __entity.gameTexture.a_home_tv = self.loadTextureSet("home_tv", 9);        
        __entity.gameTexture.a_disk_table = self.loadTextureSet("disk_table", 4);        
        __entity.gameTexture.a_video_reg_table = self.loadTextureSet("video_reg_table", 4);
        __entity.gameTexture.a_pillar_tv = self.loadTextureSet("pillar", 1);
        __entity.gameTexture.a_dynamics_table = self.loadTextureSet("dynamics_table", 5);

        self.texturesInitialised = true;
    },

    setupEntities: function (object_layer) {
        var self = this;
        
        if(!self.texturesInitialised)return;
        
        var __entity = self._entity;

        var __i=0;
        var imageScale = 1;

            var __dx = -2;
            var __dy = 1;
            var __ddx = -2;
            var __ddy = 1;   
            var __n = 18;
            var __deltas = [{n:__n, x:__dx, y:__dy}];
            for(var __in=__n-1; __in >= 1; __in--){
                if(__in === 14 || __in === 4 || __in === 13 || __in === 3){
                    __dx -= 2;  
                    __dy += 1;
                }
                __deltas.push({n:__in, x:(__dx+=__ddx), y:(__dy+=__ddy)});
            }            
            self.allocateGameObject(
                object_layer,   // уровень
                'tv_left_', // ID шалон
                __entity.gameTexture.a_tv_left,     //текстура
                1, 1,     //старт
                1, 23,       // ширина высота
                [
                    {textures_from:18, textures_to:1, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}
                ],                
                10, 0,      // смещение текстур
                1, 0,       // смещение блокировки тайлов
                imageScale,          // scale
                "Y",             //направление
                __deltas,
                "TV",
                "TV"
            );
                
             
        
             __dx = 2;
             __dy = 1;
             __ddx = 2;
             __ddy = 1;  
             __n = 2;
             __deltas = [{n:__n, x:__dx, y:__dy}];
            for(var __in=__n+1; __in <= 13; __in++){
                if(__in === 7 || __in === 8 || __in === 4 || __in === 5){
                    __dx += 2;  
                    __dy += 1;                    
                }
                __deltas.push({n:__in, x:(__dx+=__ddx), y:(__dy+=__ddy)});
            }
            self.allocateGameObject(
                object_layer,   // уровень
                'tv_right_', // ID шалон
                __entity.gameTexture.a_tv_right,     //текстура
                1, 1,     //старт
                16, 1,       // ширина высота
                [
                    {textures_from:1, textures_to:13, delta_X: 1, delta_Y: 0, end_X: 0, end_Y: 0}
                ],                
                -48, 10,      // смещение текстур
                0, 2,       // смещение блокировки тайлов
                imageScale,          // scale
                "X",             //направление
                __deltas,
                "TV",
                "TV"
            );     
            
       
             
             __dx = 2;
             __dy = 1;
             __ddx = 2;
             __ddy = 1;  
             __n = 1;
             __deltas = [{n:__n, x:__dx, y:__dy}];
            for(var __in=__n+1; __in <= 6; __in++){
                if(__in === 2 || __in === 3  || __in === 6 ){
                    __dx += 2;  
                    __dy += 1;                    
                }                
                __deltas.push({n:__in, x:(__dx+=__ddx), y:(__dy+=__ddy)});
            }                    
            __deltas.push({n:7, x:(5), y:(1)});
            self.allocateGameObject(
                object_layer,   // уровень
                'tv_table_1_', // ID шалон
                __entity.gameTexture.a_tv_table,     //текстура
                3, 4,     //старт
                7, 2,       // ширина высота
                [
                    {textures_from:1, textures_to:7, delta_X: 1, delta_Y: 0, end_X: 0, end_Y: 0}
                ],                
                5, 10,      // смещение текстур
                1, 0,       // смещение блокировки тайлов
                imageScale,          // scale
                "X",             //направление
                __deltas,
                "TV",
                "TV"
            );
                
            self.allocateGameObject(
                object_layer,   // уровень
                'tv_table_2_', // ID шалон
                __entity.gameTexture.a_tv_table,     //текстура
                3, 8,     //старт
                7, 2,       // ширина высота
                [
                    {textures_from:1, textures_to:7, delta_X: 1, delta_Y: 0, end_X: 0, end_Y: 0}
                ],                
                5, 10,      // смещение текстур
                1, 0,       // смещение блокировки тайлов
                imageScale,          // scale
                "X",             //направление
                __deltas,
                "TV",
                "TV"
            );
              
            self.allocateGameObject(
                object_layer,   // уровень
                'tv_table_3_', // ID шалон
                __entity.gameTexture.a_tv_table,     //текстура
                3, 12,     //старт
                7, 2,       // ширина высота
                [
                    {textures_from:1, textures_to:7, delta_X: 1, delta_Y: 0, end_X: 0, end_Y: 0}
                ],                
                5, 10,      // смещение текстур
                1, 0,       // смещение блокировки тайлов
                imageScale,          // scale
                "X",             //направление
                __deltas,
                "TV",
                "TV"
            ); 
                
            
        
             __dx = 0;
             __dy = 0;
             __ddx = -4;
             __ddy = 2;  
             __n = 9;
            
             __deltas = [{n:__n, x:__dx, y:__dy}];
            for(var __in=__n-1; __in >= 2; __in--){
                __deltas.push({n:__in, x:(__dx+=__ddx), y:(__dy+=__ddy)});
            }
            __deltas.push({n:__in, x:(__dx+=__ddx), y:(__dy-=26)});
            self.allocateGameObject(
                object_layer,                           // уровень
                'home_tv',                            // ID шаблон
                __entity.gameTexture.a_home_tv,     //текстура
                12, 4,                                  //старт
                3, 10,                                   // ширина высота
                [
                    {textures_from:9, textures_to:1, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}
                    //{textures_from:8, textures_to:1, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}                    
                ],
                30, -10,                                // смещение текстур  40, -20,
                0, 0,                                   // смещение блокировки тайлов
                imageScale,                                    // scale
                "Y",                                    //направление 
                __deltas,
                "HOME_THEATER",
                "HOME_THEATER"
            );                
             
            
             __dx = 0;
             __dy = 0;
             __ddx = -4;
             __ddy = 2;  
             __n = 4;
            
             __deltas = [{n:__n, x:(__dx+5), y:__dy-1}];             
            for(var __in=__n-1; __in >= 1; __in--){
                __deltas.push({n:__in, x:(__dx+=__ddx), y:(__dy+=__ddy)});
            }
            
            self.allocateGameObject(
                object_layer,                           // уровень
                'disk_table_1_',                            // ID шаблон
                __entity.gameTexture.a_disk_table,     //текстура
                3, 16,                                  //старт
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
                
            self.allocateGameObject(
                object_layer,                           // уровень
                'disk_table_2_',                            // ID шаблон
                __entity.gameTexture.a_disk_table,     //текстура
                7, 16,                                  //старт
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
                
            self.allocateGameObject(
                object_layer,                           // уровень
                'disk_table_3_',                            // ID шаблон
                __entity.gameTexture.a_disk_table,     //текстура
                11, 16,                                  //старт
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
                
             __dx = 2;
             __dy = 1;
             __ddx = 2;
             __ddy = 1;  
             __n = 2;
             __deltas = [{n:__n, x:__dx, y:__dy}];
            for(var __in=__n+1; __in <= 4; __in++){
                __deltas.push({n:__in, x:(__dx+=__ddx), y:(__dy+=__ddy)});
            }                    

            self.allocateGameObject(
                object_layer,   // уровень
                'video_reg_table_', // ID шалон
                __entity.gameTexture.a_video_reg_table,     //текстура
                5, 23,     //старт
                5, 2,       // ширина высота
                [
                    {textures_from:1, textures_to:4, delta_X: 1, delta_Y: 0, end_X: 0, end_Y: 0}
                ],                
                0, 0,      // смещение текстур
                1, 0,       // смещение блокировки тайлов
                imageScale,          // scale
                "X",             //направление
                __deltas 
            );
                
                
            self.allocateGameObject(
                object_layer,   // уровень
                'pillar_tv_', // ID шалон
                __entity.gameTexture.a_pillar_tv,     //текстура
                10, 24,     //старт
                1, 1,       // ширина высота
                [
                    {textures_from:1, textures_to:1, delta_X: 1, delta_Y: 0, end_X: 0, end_Y: 0}
                ],                
                -8, -30,      // смещение текстур
                0, 0,       // смещение блокировки тайлов
                1,          // scale
                "X",             //направление
                []
            );
                
             __dx = 2;
             __dy = 1;
             __ddx = 2;
             __ddy = 1;  
             __n = 2;
             __deltas = [{n:__n, x:__dx, y:__dy}];
            for(var __in=__n+1; __in <= 4; __in++){
                __deltas.push({n:__in, x:(__dx+=__ddx), y:(__dy+=__ddy)});
            }                    

            self.allocateGameObject(
                object_layer,   // уровень
                'dynamics_table_', // ID шалон
                __entity.gameTexture.a_dynamics_table,     //текстура
                11, 23,     //старт
                5, 2,       // ширина высота
                [
                    {textures_from:1, textures_to:5, delta_X: 1, delta_Y: 0, end_X: 0, end_Y: 0}
                ],                
                0, 0,      // смещение текстур
                1, 0,       // смещение блокировки тайлов
                imageScale,          // scale
                "X",             //направление
                __deltas,
                "MEDIA_CENTER",
                "MEDIA_CENTER"
            );                
    }

});



