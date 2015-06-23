var LocationHome2Component = Location.extend({
	classId: 'LocationHome2Component',
	componentId: 'locationHome2Component',

    init: function (entity, options) {
            var self = this;

            // Store the entity that this component has been added to
            self._entity = entity;

            // Store any options that were passed to us
            self._options = options;

            self.id = "HOME2";
            self.objects_path = "home/";

    },

    loadTextures: function () {
        var self = this;
        var __entity = self._entity;

        __entity.gameTexture.a_hairdryer = self.loadTextureSet("hairdryer", 10);         
        __entity.gameTexture.a_pillar_ads = self.loadTextureSet("pillar_ads", 1);
        __entity.gameTexture.a_box_season = self.loadTextureSet("box_season", 1);
        
        __entity.gameTexture.a_vacuum_cleaner = self.loadTextureSet("vacuum_cleaner", 10); 
        
        __entity.gameTexture.a_washing_machine_2 = self.loadTextureSet("washing_machine_2", 9); 
        __entity.gameTexture.a_washing_machine_1 = self.loadTextureSet("washing_machine_1", 9); 
        
        __entity.gameTexture.a_washing_machine_vert = self.loadTextureSet("washing_machine_vert", 5); 
        
        __entity.gameTexture.a_pillar = self.loadTextureSet("pillar2", 1);
        
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
        var  __n = 10;
        var  __deltas = [{n:__n, x:__dx, y:__dy}];
            for(var __in=__n-1; __in >= 2; __in--){
                __deltas.push({n:__in, x:(__dx+=__ddx), y:(__dy+=__ddy)});
            }             
            __deltas.push({n:1, x:(__dx+=__ddx), y:(__dy+=7)});

            self.allocateGameObject(
                object_layer,   // уровень
                'hairdryer_', // ID шалон
                __entity.gameTexture.a_hairdryer,     //текстура
                0, 2,     //старт
                2, 12,       // ширина высота
                [
                    {textures_from:10, textures_to:1, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}
                ],                
                -5, 0,      // смещение текстур
                0, 0,       // смещение блокировки тайлов
                imageScale,          // scale
                "Y",             //направление
                __deltas                
            );
                
                
            self.allocateGameObject(
                object_layer,   // уровень
                'pillar_ads_home2_1_', // ID шалон
                __entity.gameTexture.a_pillar_ads,     //текстура
                6, 2,     //старт
                1, 1,       // ширина высота
                [
                    {textures_from:1, textures_to:1, delta_X: 1, delta_Y: 0, end_X: 0, end_Y: 0}
                ],                
                0, -9,      // смещение текстур
                0, 0,       // смещение блокировки тайлов
                imageScale,          // scale
                "X",             //направление
                []
            );
                
            self.allocateGameObject(
                object_layer,   // уровень
                'box_season_home2_1_', // ID шалон
                __entity.gameTexture.a_box_season,     //текстура
                8, 2,     //старт
                1, 1,       // ширина высота
                [
                    {textures_from:1, textures_to:1, delta_X: 1, delta_Y: 0, end_X: 0, end_Y: 0}
                ],                
                0, -9,      // смещение текстур
                0, 0,       // смещение блокировки тайлов
                imageScale,          // scale
                "X",             //направление
                []
            );
                
            self.allocateGameObject(
                object_layer,   // уровень
                'box_season_home2_2_', // ID шалон
                __entity.gameTexture.a_box_season,     //текстура
                10, 2,     //старт
                1, 1,       // ширина высота
                [
                    {textures_from:1, textures_to:1, delta_X: 1, delta_Y: 0, end_X: 0, end_Y: 0}
                ],                
                0, -9,      // смещение текстур
                0, 0,       // смещение блокировки тайлов
                imageScale,          // scale
                "X",             //направление
                []
            );                
                
                
                
             __dx = 2;
             __dy = 1;
             __ddx = 2;
             __ddy = 1;  
             __n = 1;
             __deltas = [{n:__n, x:__dx, y:__dy}];
            for(var __in=__n+1; __in <= 10; __in++){
                if(__in === 2 || __in === 3  || __in === 6 ){
                    __dx += 2;  
                    __dy += 1;                    
                }                
                if(__in === 10){
                    __dx += 1;  
                    __dy -= 27;                    
                }                
                __deltas.push({n:__in, x:(__dx+=__ddx), y:(__dy+=__ddy)});
            }                    
            self.allocateGameObject(
                object_layer,   // уровень
                'vacuum_cleaner_1_', // ID шалон
                __entity.gameTexture.a_vacuum_cleaner,     //текстура
                4, 5,     //старт
                10, 2,       // ширина высота
                [
                    {textures_from:1, textures_to:10, delta_X: 1, delta_Y: 0, end_X: 0, end_Y: 0}
                ],                
                0, 5,      // смещение текстур
                1, 0,       // смещение блокировки тайлов
                imageScale,          // scale
                "X",             //направление
                __deltas,
                "VACUUM_CLEANER",
                "VACUUM_CLEANER"
            );                
                
            self.allocateGameObject(
                object_layer,   // уровень
                'vacuum_cleaner_2_', // ID шалон
                __entity.gameTexture.a_vacuum_cleaner,     //текстура
                4, 9,     //старт
                10, 2,       // ширина высота
                [
                    {textures_from:1, textures_to:10, delta_X: 1, delta_Y: 0, end_X: 0, end_Y: 0}
                ],                
                0, 5,      // смещение текстур
                1, 0,       // смещение блокировки тайлов
                imageScale,          // scale
                "X",             //направление
                __deltas,
                "VACUUM_CLEANER",
                "VACUUM_CLEANER"
            );  
                
                
                
             __dx = 2;
             __dy = 1;
             __ddx = 4;
             __ddy = 2;  
             __n = 1;
             __deltas = [{n:__n, x:__dx, y:__dy}];
            for(var __in=__n+1; __in <= 9; __in++){
                __deltas.push({n:__in, x:(__dx+=__ddx), y:(__dy+=__ddy)});
            } 
            
            self.allocateGameObject(
                object_layer,   // уровень
                'washing_machine_2_', // ID шалон
                __entity.gameTexture.a_washing_machine_2,     //текстура
                4, 13,     //старт
                10, 2,       // ширина высота
                [
                    {textures_from:1, textures_to:9, delta_X: 1, delta_Y: 0, end_X: 0, end_Y: 0}
                ],                
                0, -5,      // смещение текстур
                1, 0,       // смещение блокировки тайлов
                imageScale,          // scale
                "X",             //направление
                __deltas,
                "WACHER",
                "WACHER"
            );                
                
            self.allocateGameObject(
                object_layer,   // уровень
                'washing_machine_1_', // ID шалон
                __entity.gameTexture.a_washing_machine_1,     //текстура
                4, 14,     //старт
                10, 2,       // ширина высота
                [
                    {textures_from:1, textures_to:9, delta_X: 1, delta_Y: 0, end_X: 0, end_Y: 0}
                ],                
                -5, 0,      // смещение текстур
                1, 0,       // смещение блокировки тайлов
                imageScale,          // scale
                "X",             //направление
                __deltas,
                "WACHER",
                "WACHER"
            );                
                
                
            self.allocateGameObject(
                object_layer,   // уровень
                'pillar_ads_home2_2_', // ID шалон
                __entity.gameTexture.a_pillar_ads,     //текстура
                0, 14,     //старт
                1, 1,       // ширина высота
                [
                    {textures_from:1, textures_to:1, delta_X: 1, delta_Y: 0, end_X: 0, end_Y: 0}
                ],                
                0, -20,      // смещение текстур
                0, 0,       // смещение блокировки тайлов
                imageScale,          // scale
                "X",             //направление
                []
            );                
            
        
            self.allocateGameObject(
                object_layer,   // уровень
                'pillar_home2_1_', // ID шалон
                __entity.gameTexture.a_pillar,     //текстура
                4, 18,     //старт
                1, 1,       // ширина высота
                [
                    {textures_from:1, textures_to:1, delta_X: 1, delta_Y: 0, end_X: 0, end_Y: 0}
                ],                
                0, -9,      // смещение текстур
                0, 0,       // смещение блокировки тайлов
                imageScale,          // scale
                "X",             //направление
                []
            );
                
                
             __dx = 2;
             __dy = 1;
             __ddx = 4;
             __ddy = 2;  
             __n = 1;
             __deltas = [{n:__n, x:__dx, y:__dy}];
            for(var __in=__n+1; __in <= 5; __in++){
                __deltas.push({n:__in, x:(__dx+=__ddx), y:(__dy+=__ddy)});
            } 
                                   
            self.allocateGameObject(
                object_layer,   // уровень
                'washing_machine_vert_', // ID шалон
                __entity.gameTexture.a_washing_machine_vert,     //текстура
                7, 18,     //старт
                6, 2,       // ширина высота
                [
                    {textures_from:1, textures_to:5, delta_X: 1, delta_Y: 0, end_X: 0, end_Y: 0}
                ],                
                0, 0,      // смещение текстур
                1, 0,       // смещение блокировки тайлов
                imageScale,          // scale
                "X",             //направление
                __deltas,
                "WACHER",
                "WACHER"
            );                
    }

});



