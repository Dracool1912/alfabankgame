var LocationHome1Component = Location.extend({
	classId: 'LocationHome1Component',
	componentId: 'locationHome1Component',

    init: function (entity, options) {
            var self = this;

            // Store the entity that this component has been added to
            self._entity = entity;

            // Store any options that were passed to us
            self._options = options;

            self.id = "HOME1";
            self.objects_path = "home/";

    },

    loadTextures: function () {
        var self = this;
        var __entity = self._entity;

        __entity.gameTexture.a_refrigerator_3 = self.loadTextureSet("refrigerator_3", 20);
        __entity.gameTexture.a_refrigerator_2 = self.loadTextureSet("refrigerator_2_1", 8);
        __entity.gameTexture.a_refrigerator_1 = self.loadTextureSet("refrigerator_1_1", 8);
        
        __entity.gameTexture.a_gas_cookers = self.loadTextureSet("gas_cookers", 10);
        __entity.gameTexture.a_food_processor = self.loadTextureSet("food_processor", 10);
        __entity.gameTexture.a_coffee_machine = self.loadTextureSet("coffee_machine", 10); 
        __entity.gameTexture.a_toaster = self.loadTextureSet("toaster", 10);
        __entity.gameTexture.a_grill = self.loadTextureSet("grill", 10);         
        
        __entity.gameTexture.a_pillar = self.loadTextureSet("pillar", 1);
        
        self.texturesInitialised = true;
    },

    setupEntities: function (object_layer) {
        var self = this;
        if(!self.texturesInitialised)return;
        
        var __entity = self._entity;

        var __i=0;
        var imageScale = 1;


            var __dx = 0;
            var __dy = 0;
            var __ddx = -4;
            var __ddy = 2;   
            var __n = 10;
            var __deltas = [{n:__n, x:__dx, y:__dy}];
            for(var __in=__n-1; __in >= 1; __in--){
                __deltas.push({n:__in, x:(__dx+=__ddx), y:(__dy+=__ddy)});
            }  

            __n = 20;
            __dx += 12; 
            __dy -= 58;
            __deltas.push({n:__n, x:__dx, y:__dy});
            for(var __in=__n-1; __in >= 11; __in--){
                __deltas.push({n:__in, x:(__dx+=__ddx), y:(__dy+=__ddy)});
            }
                        
            self.allocateGameObject(
                object_layer,   // уровень
                'refrigerator_3_1_', // ID шалон
                __entity.gameTexture.a_refrigerator_3,     //текстура
                1, 1,     //старт
                2, 12,       // ширина высота
                [
                    {textures_from:10, textures_to:1, delta_X: 0, delta_Y: 1, end_X: 1, end_Y: 0}
                    ,{textures_from:20, textures_to:11, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}
                ],                
                10, 0,      // смещение текстур
                0, 0,       // смещение блокировки тайлов
                imageScale,          // scale
                "Y",             //направление
                __deltas,
                "REFRIGERATOR",
                "REFRIGERATOR"
            );
            self.allocateGameObject(
                object_layer,   // уровень
                'refrigerator_3_2_', // ID шалон
                __entity.gameTexture.a_refrigerator_3,     //текстура
                2, 1,     //старт
                2, 12,       // ширина высота
                [
                    {textures_from:10, textures_to:1, delta_X: 0, delta_Y: 1, end_X: 1, end_Y: 0}
                    ,{textures_from:20, textures_to:11, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}
                ],                
                10, 0,      // смещение текстур
                0, 0,       // смещение блокировки тайлов
                imageScale,          // scale
                "Y",             //направление
                __deltas,
                "REFRIGERATOR",
                "REFRIGERATOR"
            );  
                
                
                
             __dx = 0;
             __dy = 0;
             __ddx = -4;
             __ddy = 2;   
             __n = 8;
             __deltas = [{n:__n, x:__dx, y:__dy}];
            for(var __in=__n-1; __in >= 1; __in--){
                __deltas.push({n:__in, x:(__dx+=__ddx), y:(__dy+=__ddy)});
            }  

            __n = 16;
            __dx += 4; 
            __dy -= 38;
            __deltas.push({n:__n, x:__dx, y:__dy});
            for(var __in=__n-1; __in >= 9; __in--){
                __deltas.push({n:__in, x:(__dx+=__ddx), y:(__dy+=__ddy)});
            }

            self.allocateGameObject(
                object_layer,   // уровень
                'refrigerator_2_1_', // ID шалон
                __entity.gameTexture.a_refrigerator_2,     //текстура
                6, 3,     //старт
                2, 10,       // ширина высота
                [
                    {textures_from:8, textures_to:1, delta_X: 0, delta_Y: 1, end_X: 1, end_Y: 0}
                    //,{textures_from:16, textures_to:9, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}
                ],                
                4, -6,      // смещение текстур
                0, 0,       // смещение блокировки тайлов
                imageScale,          // scale
                "Y",             //направление
                __deltas,
                "REFRIGERATOR",
                "REFRIGERATOR"
            ); 
                
                
             __dx = 0;
             __dy = 0;
             __ddx = -4;
             __ddy = 2;   
             __n = 8;
             __deltas = [{n:__n, x:__dx, y:__dy}];
            for(var __in=__n-1; __in >= 1; __in--){
                __deltas.push({n:__in, x:(__dx+=__ddx), y:(__dy+=__ddy)});
            } 
            
            self.allocateGameObject(
                object_layer,   // уровень
                'refrigerator_1_1_', // ID шалон
                __entity.gameTexture.a_refrigerator_1,     //текстура
                7, 3,     //старт
                2, 10,       // ширина высота
                [
                    {textures_from:8, textures_to:1, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}
                    //,{textures_from:16, textures_to:9, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}
                ],                
                4, -6,      // смещение текстур
                0, 0,       // смещение блокировки тайлов
                imageScale,          // scale
                "Y",             //направление
                __deltas,
                "REFRIGERATOR",
                "REFRIGERATOR"
            );

        
        
             __dx = 0;
             __dy = 0;
             __ddx = -4;
             __ddy = 2;   
             __n = 8;
             __deltas = [{n:__n, x:__dx, y:__dy}];
            for(var __in=__n-1; __in >= 1; __in--){
                __deltas.push({n:__in, x:(__dx+=__ddx), y:(__dy+=__ddy)});
            }  

            __n = 16;
            __dx += 4; 
            __dy -= 38;
            __deltas.push({n:__n, x:__dx, y:__dy});
            for(var __in=__n-1; __in >= 9; __in--){
                __deltas.push({n:__in, x:(__dx+=__ddx), y:(__dy+=__ddy)});
            }

            self.allocateGameObject(
                object_layer,   // уровень
                'refrigerator_2_2_', // ID шалон
                __entity.gameTexture.a_refrigerator_2,     //текстура
                11, 3,     //старт
                2, 10,       // ширина высота
                [
                    {textures_from:8, textures_to:1, delta_X: 0, delta_Y: 1, end_X: 1, end_Y: 0}
                    //,{textures_from:16, textures_to:9, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}
                ],                
                4, -6,      // смещение текстур
                0, 0,       // смещение блокировки тайлов
                imageScale,          // scale
                "Y",             //направление
                __deltas,
                "REFRIGERATOR",
                "REFRIGERATOR"
            ); 
                
                
             __dx = 0;
             __dy = 0;
             __ddx = -4;
             __ddy = 2;   
             __n = 8;
             __deltas = [{n:__n, x:__dx, y:__dy}];
            for(var __in=__n-1; __in >= 1; __in--){
                __deltas.push({n:__in, x:(__dx+=__ddx), y:(__dy+=__ddy)});
            } 
            
            self.allocateGameObject(
                object_layer,   // уровень
                'refrigerator_1_2_', // ID шалон
                __entity.gameTexture.a_refrigerator_1,     //текстура
                12, 3,     //старт
                2, 10,       // ширина высота
                [
                    {textures_from:8, textures_to:1, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}
                    //,{textures_from:16, textures_to:9, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}
                ],                
                4, -6,      // смещение текстур
                0, 0,       // смещение блокировки тайлов
                imageScale,          // scale
                "Y",             //направление
                __deltas,
                "REFRIGERATOR",
                "REFRIGERATOR"
            );
        
        
        
             __dx = 0;
             __dy = 0;
             __ddx = -4;
             __ddy = 2;   
             __n = 10;
             __deltas = [{n:__n, x:__dx, y:__dy}];
            for(var __in=__n-1; __in >= 1; __in--){
                __deltas.push({n:__in, x:(__dx+=__ddx), y:(__dy+=__ddy)});
            } 

            self.allocateGameObject(
                object_layer,   // уровень
                'gas_cookers_1_', // ID шалон
                __entity.gameTexture.a_gas_cookers,     //текстура
                16, 1,     //старт
                2, 12,       // ширина высота
                [
                    {textures_from:10, textures_to:1, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}
                    //,{textures_from:16, textures_to:9, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}
                ],                
                12, -6,      // смещение текстур
                0, 0,       // смещение блокировки тайлов
                imageScale,          // scale
                "Y",             //направление
                __deltas                
            );        
                
            self.allocateGameObject(
                object_layer,   // уровень
                'gas_cookers_2_', // ID шалон
                __entity.gameTexture.a_gas_cookers,     //текстура
                20, 1,     //старт
                2, 12,       // ширина высота
                [
                    {textures_from:10, textures_to:1, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}
                    //,{textures_from:16, textures_to:9, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}
                ],                
                12, -6,      // смещение текстур
                0, 0,       // смещение блокировки тайлов
                imageScale,          // scale
                "Y",             //направление
                __deltas                
            );  
                
                
                
             __dx = 0;
             __dy = 0;
             __ddx = -4;
             __ddy = 2;   
             __n = 10;
             __deltas = [{n:__n, x:__dx, y:__dy}];
            for(var __in=__n-1; __in >= 2; __in--){
                __deltas.push({n:__in, x:(__dx+=__ddx), y:(__dy+=__ddy)});
            }             
            __deltas.push({n:__in, x:(__dx+=__ddx), y:(__dy-=26)});


            self.allocateGameObject(
                object_layer,   // уровень
                'food_processor_', // ID шалон
                __entity.gameTexture.a_food_processor,     //текстура
                24, 2,     //старт
                2, 11,       // ширина высота
                [
                    {textures_from:10, textures_to:1, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}
                    //,{textures_from:16, textures_to:9, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}
                ],                
                0, -6,      // смещение текстур
                0, 0,       // смещение блокировки тайлов
                imageScale,          // scale
                "Y",             //направление
                __deltas                
            );        
              
        
             __dx = 0;
             __dy = 0;
             __ddx = -4;
             __ddy = 2;   
             __n = 10;
             __deltas = [{n:__n, x:__dx, y:__dy}];
            for(var __in=__n-1; __in >= 2; __in--){
                __deltas.push({n:__in, x:(__dx+=__ddx), y:(__dy+=__ddy)});
            }             
            __deltas.push({n:__in, x:(__dx+=__ddx), y:(__dy-=26)});

            self.allocateGameObject(
                object_layer,   // уровень
                'coffee_machine_', // ID шалон
                __entity.gameTexture.a_coffee_machine,     //текстура
                28, 2,     //старт
                2, 11,       // ширина высота
                [
                    {textures_from:10, textures_to:1, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}
                    //,{textures_from:16, textures_to:9, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}
                ],                
                0, -6,      // смещение текстур
                0, 0,       // смещение блокировки тайлов
                imageScale,          // scale
                "Y",             //направление
                __deltas,
                "COFFEE_MACHINE",
                "COFFEE_MACHINE"
            );        
                
                
             __dx = 0;
             __dy = 0;
             __ddx = -4;
             __ddy = 2;   
             __n = 10;
             __deltas = [{n:__n, x:__dx, y:__dy}];
            for(var __in=__n-1; __in >= 2; __in--){
                __deltas.push({n:__in, x:(__dx+=__ddx), y:(__dy+=__ddy)});
            }             
            __deltas.push({n:__in, x:(__dx+=__ddx), y:(__dy-=26)});

            self.allocateGameObject(
                object_layer,   // уровень
                'toaster_', // ID шалон
                __entity.gameTexture.a_toaster,     //текстура
                32, 2,     //старт
                2, 11,       // ширина высота
                [
                    {textures_from:10, textures_to:1, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}
                    //,{textures_from:16, textures_to:9, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}
                ],                
                0, -6,      // смещение текстур
                0, 0,       // смещение блокировки тайлов
                imageScale,          // scale
                "Y",             //направление
                __deltas                
            );                        
                
             __dx = 0;
             __dy = 0;
             __ddx = -4;
             __ddy = 2;   
             __n = 10;
             __deltas = [{n:__n, x:__dx, y:__dy}];
            for(var __in=__n-1; __in >= 2; __in--){
                __deltas.push({n:__in, x:(__dx+=__ddx), y:(__dy+=__ddy)});
            }             
            __deltas.push({n:__in, x:(__dx+=__ddx), y:(__dy-=26)});
            self.allocateGameObject(
                object_layer,   // уровень
                'grill_', // ID шалон
                __entity.gameTexture.a_grill,     //текстура
                37, 2,     //старт
                2, 11,       // ширина высота
                [
                    {textures_from:10, textures_to:1, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}
                ],                
                0, -6,      // смещение текстур
                0, 0,       // смещение блокировки тайлов
                imageScale,          // scale
                "Y",             //направление
                __deltas                
            );                
              
        
        
            self.allocateGameObject(
                object_layer,   // уровень
                'pillar_home1_1_', // ID шалон
                __entity.gameTexture.a_pillar,     //текстура
                34, 0,     //старт
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
    }

});



