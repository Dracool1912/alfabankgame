var LocationDigitalComponent = Location.extend({
	classId: 'LocationDigitalComponent',
	componentId: 'locationDigitalComponent',

	init: function (entity, options) {
		var self = this;

		// Store the entity that this component has been added to
		self._entity = entity;

		// Store any options that were passed to us
		self._options = options;
                
                self.id = "Digital";
                self.objects_path = "digital/";
                
        },
                       
        loadTextures: function () {
            var self = this;
            var __entity = self._entity;

            __entity.gameTexture.a_apple_table = self.loadTextureSet("apple_table", 1);            
            __entity.gameTexture.a_pillar = self.loadTextureSet("pillar2", 1);
            __entity.gameTexture.a_video_table = self.loadTextureSet("video_table", 6);
            __entity.gameTexture.a_monoblock_table = self.loadTextureSet( "monoblock_table", 8);
            __entity.gameTexture.a_mfu_table = self.loadTextureSet("mfu_table", 8);
            __entity.gameTexture.a_tablet_table = self.loadTextureSet("tablet_table", 8);
            __entity.gameTexture.a_printers_table = self.loadTextureSet("printers_table", 8);
            __entity.gameTexture.a_notebooks_table = self.loadTextureSet("notebooks_table", 8);
            __entity.gameTexture.a_photos_table = self.loadTextureSet("photos_table", 7);
            __entity.gameTexture.a_flashs_table = self.loadTextureSet("flashs_table", 7);
            
            __entity.gameTexture.a_systems_wall = self.loadTextureSet("systems_wall", 15);
            
            __entity.gameTexture.a_pc_wall_1 = self.loadTextureSet("pc_wall_1", 8);
            __entity.gameTexture.a_pc_wall_2 = self.loadTextureSet("pc_wall_2", 7);
            
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
            var __ddx = -2;
            var __ddy = 1;   
            var __n = 8;
            var __deltas = [{n:__n, x:1, y:-1}];
            for(var __in=__n-1; __in >= 2; __in--){
                __deltas.push({n:__in, x:(__dx+=__ddx), y:(__dy+=__ddy)});
            }                        
            __deltas.push({n:1, x:(__dx+=__ddx-2), y:(__dy+=__ddy-3)});
            self.allocateGameObject(
                object_layer,                           // уровень
                'notebooks_1_table',                            // ID шаблон
                __entity.gameTexture.a_notebooks_table,     //текстура
                3, 3,                                  //старт
                2, 9,                                   // ширина высота
                [
                    {textures_from:8, textures_to:1, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}
                    
                ],
                20, 0,                                // смещение текстур  40, -20,
                0, -1,                                   // смещение блокировки тайлов
                imageScale,                                    // scale
                "Y",                                    //направление 
                __deltas,
                "NOTEBOOK",
                "NOTEBOOK"                
            );       
            
            self.allocateGameObject(
                object_layer,                           // уровень
                'notebooks_2_table',                            // ID шаблон
                __entity.gameTexture.a_notebooks_table,     //текстура
                7, 3,                                  //старт
                2, 9,                                   // ширина высота
                [
                    {textures_from:8, textures_to:1, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}
                    
                ],
                20, 0,                                // смещение текстур  40, -20,
                0, -1,                                   // смещение блокировки тайлов
                imageScale,                                    // scale
                "Y",                                    //направление 
                __deltas,
                "NOTEBOOK",
                "NOTEBOOK"
            );       
                   
            
             __dx = 0;
             __dy = 0;
             __ddx = -2;
             __ddy = 1;   
             __n = 8;
             __deltas = [{n:__n, x:2, y:-1}];
            for(var __in=__n-1; __in >= 2; __in--){
                __deltas.push({n:__in, x:(__dx+=__ddx), y:(__dy+=__ddy)});
            }                        
            __deltas.push({n:1, x:(__dx+=__ddx-3), y:(__dy+=__ddy-3)});            
            self.allocateGameObject(
                object_layer,                           // уровень
                'monoblock_table',                      // ID шаблон
                __entity.gameTexture.a_monoblock_table,     //текстура
                11, 3,                                  //старт
                2, 9,                                   // ширина высота
                [
                    {textures_from:8, textures_to:1, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}
                ],
                20, 0,                                // смещение текстур
                0, -1,                                   // смещение блокировки тайлов
                imageScale,                                    // scale
                "Y",                                    //направление 
                __deltas
            );       

            self.allocateGameObject(
                object_layer,                           // уровень
                'printers_table',                            // ID шаблон
                __entity.gameTexture.a_printers_table,     //текстура
                15, 3,                                  //старт
                2, 9,                                   // ширина высота
                [
                    {textures_from:8, textures_to:1, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}
                ],
                20, 0,                                // смещение текстур  40, -20,
                0, -1,                                   // смещение блокировки тайлов
                imageScale,                                    // scale
                "Y",                                    //направление 
                __deltas
            );
           
             __dx = 0;
             __dy = 0;
             __ddx = -2;
             __ddy = 1;   
             __n = 8;
             __deltas = [{n:__n, x:2, y:-1}];
            for(var __in=__n-1; __in >= 2; __in--){
                __deltas.push({n:__in, x:(__dx+=__ddx), y:(__dy+=__ddy)});
            }                        
            __deltas.push({n:1, x:(__dx+=__ddx-3), y:(__dy+=__ddy-7)});           
            self.allocateGameObject(
                object_layer,                           // уровень
                'mfu_table',                            // ID шаблон
                __entity.gameTexture.a_mfu_table,     //текстура
                19, 3,                                  //старт
                2, 9,                                   // ширина высота
                [
                    {textures_from:8, textures_to:1, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}
                ],
                20, 0,                                // смещение текстур
                0, -1,                                   // смещение блокировки тайлов
                imageScale,                                    // scale
                "Y",                                    //направление 
                __deltas
            );       

            self.allocateGameObject(
                object_layer,   // уровень
                'pillar_dg_1_', // ID шалон
                __entity.gameTexture.a_pillar,     //текстура
                7, 16,     //старт
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
                'pillar_dg_2_', // ID шалон
                __entity.gameTexture.a_pillar,     //текстура
                9, 16,     //старт
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
                'pillar_dg_3_', // ID шалон
                __entity.gameTexture.a_pillar,     //текстура
                11, 16,     //старт
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

             __dx = 0;
             __dy = 0;
             __ddx = -2;
             __ddy = 1;   
             __n = 8;
             __deltas = [{n:__n, x:1, y:-1}];
            for(var __in=__n-1; __in >= 2; __in--){
                __deltas.push({n:__in, x:(__dx+=__ddx), y:(__dy+=__ddy)});
            }                        
            __deltas.push({n:1, x:(__dx+=__ddx-2), y:(__dy+=__ddy-3)});
            self.allocateGameObject(
                object_layer,                           // уровень
                'tablet_table',                            // ID шаблон
                __entity.gameTexture.a_tablet_table,     //текстура
                3, 15,                                  //старт
                2, 9,                                   // ширина высота
                [
                    {textures_from:8, textures_to:1, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}
                ],
                20, 0,                                // смещение текстур
                0, -1,                                   // смещение блокировки тайлов
                imageScale,                                    // scale
                "Y",                                    //направление 
                __deltas,
                "PAD",
                "PAD"
            );       
            
            
            self.allocateGameObject(
                object_layer,   // уровень
                'apple_table_', // ID шалон
                __entity.gameTexture.a_apple_table,     //текстура
                7, 19,     //старт
                5, 5,       // ширина высота
                [
                    {textures_from:1, textures_to:1, delta_X: 1, delta_Y: 0, end_X: 0, end_Y: 0}
                ],                
                -8, 32,      // смещение текстур
                0, 0,       // смещение блокировки тайлов
                imageScale,          // scale
                "X",             //направление
                []
            );            
           
            self.allocateGameObject(
                object_layer,   // уровень
                'flashs_table_', // ID шалон
                __entity.gameTexture.a_flashs_table,     //текстура
                14, 16,     //старт
                7, 1,       // ширина высота
                [
                    {textures_from:7, textures_to:1, delta_X: 1, delta_Y: 0, end_X: 0, end_Y: 0}
                ],                
                0, -4,      // смещение текстур
                0, 0,       // смещение блокировки тайлов
                imageScale,          // scale
                "X",             //направление
                []
            );  
            
             
            self.allocateGameObject(
                object_layer,   // уровень
                'photos_table_', // ID шалон
                __entity.gameTexture.a_photos_table,     //текстура
                14, 19,     //старт
                7, 1,       // ширина высота
                [
                    {textures_from:7, textures_to:1, delta_X: 1, delta_Y: 0, end_X: 0, end_Y: 0}
                ],                
                0, -4,      // смещение текстур
                0, 0,       // смещение блокировки тайлов
                imageScale,          // scale
                "X",             //направление
                [],
                "PHOTO",
                "PHOTO"
            );  
           
            self.allocateGameObject(
                object_layer,   // уровень
                'video_table_', // ID шалон
                __entity.gameTexture.a_video_table,     //текстура
                14, 23,     //старт
                6, 1,       // ширина высота
                [
                    {textures_from:6, textures_to:1, delta_X: 1, delta_Y: 0, end_X: 0, end_Y: 0}
                ],                
                0, -4,      // смещение текстур
                0, 0,       // смещение блокировки тайлов
                imageScale,          // scale
                "X",             //направление
                []
            );                           

            var __dx = 2;
            var __dy = 1;
            var __ddx = 2;
            var __ddy = 1;                        
            self.allocateGameObject(
                object_layer,   // уровень
                'systems_wall_', // ID шалон
                __entity.gameTexture.a_systems_wall,     //текстура
                2, 1,     //старт
                16, 1,       // ширина высота
                [
                    {textures_from:1, textures_to:15, delta_X: 1, delta_Y: 0, end_X: 0, end_Y: 0}
                ],                
                -48, 2,      // смещение текстур
                0, 2,       // смещение блокировки тайлов
                imageScale,          // scale
                "X",             //направление
                [
                    {n:2, x:__dx, y:__dy}, {n:3, x:(__dx+=__ddx), y:(__dy+=__ddy)}, {n:4, x:(__dx+=__ddx), y:(__dy+=__ddy)}, {n:5, x:(__dx+=__ddx), y:(__dy+=__ddy)},
                    {n:6, x:(__dx+=__ddx), y:(__dy+=__ddy)}, {n:7, x:(__dx+=__ddx), y:(__dy+=__ddy)}, {n:8, x:(__dx+=__ddx), y:(__dy+=__ddy)}, {n:9, x:(__dx+=__ddx), y:(__dy+=__ddy)},
                    {n:10, x:(__dx+=__ddx), y:(__dy+=__ddy)}, {n:11, x:(__dx+=__ddx), y:(__dy+=__ddy)}, {n:12, x:(__dx+=__ddx), y:(__dy+=__ddy)}, {n:13, x:(__dx+=__ddx), y:(__dy+=__ddy)},
                    {n:14, x:(__dx+=__ddx), y:(__dy+=__ddy)}, {n:15, x:(__dx+=__ddx), y:(__dy+=__ddy)}

                ]
            );             
                
            var __dx = -2;
            var __dy = 1;
            var __ddx = -2;
            var __ddy = 1;            
            self.allocateGameObject(
                object_layer,   // уровень
                'pc_wall_1_', // ID шалон
                __entity.gameTexture.a_pc_wall_1,     //текстура
                -1, 15,     //старт
                2, 9,       // ширина высота
                [
                    {textures_from:8, textures_to:1, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}
                ],                
                0, 0,      // смещение текстур
                0, 0,       // смещение блокировки тайлов
                imageScale,          // scale
                "Y",             //направление
                [
                    {n:7, x:__dx, y:__dy}, {n:6, x:(__dx+=__ddx), y:(__dy+=__ddy)}, {n:5, x:(__dx+=__ddx), y:(__dy+=__ddy)}, {n:4, x:(__dx+=__ddx), y:(__dy+=__ddy)},
                    {n:3, x:(__dx+=__ddx), y:(__dy+=__ddy)}, {n:2, x:(__dx+=__ddx), y:(__dy+=__ddy)}, {n:1, x:(__dx+=__ddx), y:(__dy+=__ddy)}

                ]
            );                
        
            var __dx = -2;
            var __dy = 1;
            var __ddx = -2;
            var __ddy = 1;            
            self.allocateGameObject(
                object_layer,   // уровень
                'pc_wall_2_', // ID шалон
                __entity.gameTexture.a_pc_wall_2,     //текстура
                -1, 3,     //старт
                2, 9,       // ширина высота
                [
                    {textures_from:7, textures_to:1, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}
                ],                
                0, 0,      // смещение текстур
                0, 0,       // смещение блокировки тайлов
                imageScale,          // scale
                "Y",             //направление
                [
                    {n:6, x:__dx, y:__dy}, {n:5, x:(__dx+=__ddx), y:(__dy+=__ddy)}, {n:4, x:(__dx+=__ddx), y:(__dy+=__ddy)}, {n:3, x:(__dx+=__ddx), y:(__dy+=__ddy)},
                    {n:2, x:(__dx+=__ddx), y:(__dy+=__ddy)}, {n:1, x:(__dx+=__ddx), y:(__dy+=__ddy)}

                ]
            );        
    }

});



