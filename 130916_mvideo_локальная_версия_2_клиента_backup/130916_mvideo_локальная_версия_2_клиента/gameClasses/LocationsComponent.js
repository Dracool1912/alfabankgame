var LocationDigitalComponent = Location.extend({
	classId: 'LocationDigitalComponent',
	componentId: 'locationDigitalComponent',

	init: function (entity, options) {
		var self = this;

		// Store the entity that this component has been added to
		self._entity = entity;

		// Store any options that were passed to us
		self._options = options;
                
        },
                       
        loadTextures: function () {
            var self = this;
            var __entity = self._entity;
            
            __entity.gameTexture.wall_right = new IgeTexture(__entity.textures_paths.objects+'wall_right.png');
            __entity.gameTexture.wall_left_down = new IgeTexture(__entity.textures_paths.objects+'wall_left_down.png');
            __entity.gameTexture.wall_left_up = new IgeTexture(__entity.textures_paths.objects+'wall_left_up.png');
           
            //**********************************************
            // DIGITAL
            __entity.gameTexture.apple_table = new IgeTexture(__entity.textures_paths.objects+'digital/apple_table.png');
            __entity.gameTexture.a_pillar = self.loadTextureSet("digital/pillar/", 1);                        
            __entity.gameTexture.a_video_table = self.loadTextureSet("digital/video_table/", 6);
            __entity.gameTexture.a_monoblock_table = self.loadTextureSet( "digital/monoblock_table/", 8);
            __entity.gameTexture.a_mfu_table = self.loadTextureSet("digital/mfu_table/", 8);
            __entity.gameTexture.a_tablet_table = self.loadTextureSet("digital/tablet_table/", 8);
            __entity.gameTexture.a_printers_table = self.loadTextureSet("digital/printers_table/", 8);
            __entity.gameTexture.a_notebooks_table = self.loadTextureSet("digital/notebooks_table/", 8);
            __entity.gameTexture.a_photos_table = self.loadTextureSet("digital/photos_table/", 7);
            __entity.gameTexture.a_flashs_table = self.loadTextureSet("digital/flashs_table/", 7);
           //**********************************************           
                
        },
                
        setupEntities: function (object_layer, back_layer) {
            var self = this;
            var __entity = self._entity;
            
            var __i=0;
            var imageScale = 1;
                        
            self.allocateGameObject(
                object_layer,                           // уровень
                'notebooks_1_table',                            // ID шаблон
                __entity.gameTexture.a_notebooks_table,     //текстура
                3, 3,                                  //старт
                2, 9,                                   // ширина высота
                [
                    {textures_from:8, textures_to:1, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}
                    
                ],
                40, -20,                                // смещение текстур  40, -20,
                0, -1,                                   // смещение блокировки тайлов
                0.4,                                    // scale
                "Y",                                    //направление 
                [
                    {n:8, x:1, y:1}, {n:7, x:-8, y:4}, {n:6, x:-16, y:8}, {n:5, x:-24, y:12}, {n:4, x:-32, y:16}, {n:3, x:-40, y:20}, {n:2, x:-48, y:24}, {n:1, x:-56, y:21}
                ],
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
                40, -20,                                // смещение текстур  40, -20,
                0, -1,                                   // смещение блокировки тайлов
                0.4,                                    // scale
                "Y",                                    //направление 
                [
                    {n:8, x:0, y:1}, {n:7, x:-8, y:4}, {n:6, x:-16, y:8}, {n:5, x:-24, y:12}, {n:4, x:-32, y:16}, {n:3, x:-40, y:20}, {n:2, x:-48, y:24}, {n:1, x:-56, y:21}
                ],
                "",
                ""
            );       
                                  
            self.allocateGameObject(
                object_layer,                           // уровень
                'monoblock_table',                      // ID шаблон
                __entity.gameTexture.a_monoblock_table,     //текстура
                11, 3,                                  //старт
                2, 9,                                   // ширина высота
                [
                    {textures_from:8, textures_to:1, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}
                ],
                40, -20,                                // смещение текстур
                0, -1,                                   // смещение блокировки тайлов
                0.4,                                    // scale
                "Y",                                    //направление 
                [
                    {n:8, x:0, y:1}, {n:7, x:-8, y:4}, {n:6, x:-16, y:8}, {n:5, x:-24, y:12}, {n:4, x:-32, y:16}, {n:3, x:-40, y:20}, {n:2, x:-48, y:24}, {n:1, x:-56, y:22}
                ]
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
                40, -20,                                // смещение текстур  40, -20,
                0, -1,                                   // смещение блокировки тайлов
                0.4,                                    // scale
                "Y",                                    //направление 
                [
                    {n:8, x:0, y:1}, {n:7, x:-8, y:4}, {n:6, x:-16, y:8}, {n:5, x:-24, y:12}, {n:4, x:-32, y:16}, {n:3, x:-40, y:20}, {n:2, x:-48, y:24}, {n:1, x:-56, y:21}
                ]
            );
           
            self.allocateGameObject(
                object_layer,                           // уровень
                'mfu_table',                            // ID шаблон
                __entity.gameTexture.a_mfu_table,     //текстура
                19, 3,                                  //старт
                2, 9,                                   // ширина высота
                [
                    {textures_from:8, textures_to:1, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}
                ],
                40, -20,                                // смещение текстур
                0, -1,                                   // смещение блокировки тайлов
                0.4,                                    // scale
                "Y",                                    //направление 
                [
                    {n:8, x:0, y:1}, {n:7, x:-8, y:4}, {n:6, x:-16, y:8}, {n:5, x:-24, y:12}, {n:4, x:-32, y:16}, {n:3, x:-40, y:20}, {n:2, x:-48, y:24}, {n:1, x:-58, y:15}
                ]
            );       

            self.allocateGameObject(
                object_layer,   // уровень
                'pillar_1_', // ID шалон
                __entity.gameTexture.a_pillar,     //текстура
                7, 16,     //старт
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
            
            self.allocateGameObject(
                object_layer,   // уровень
                'pillar_2_', // ID шалон
                __entity.gameTexture.a_pillar,     //текстура
                9, 16,     //старт
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
            
            self.allocateGameObject(
                object_layer,   // уровень
                'pillar_3_', // ID шалон
                __entity.gameTexture.a_pillar,     //текстура
                11, 16,     //старт
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


            self.allocateGameObject(
                object_layer,                           // уровень
                'tablet_table',                            // ID шаблон
                __entity.gameTexture.a_tablet_table,     //текстура
                3, 15,                                  //старт
                2, 9,                                   // ширина высота
                [
                    {textures_from:8, textures_to:1, delta_X: 0, delta_Y: 1, end_X: 0, end_Y: 0}
                ],
                40, -20,                                // смещение текстур
                0, -1,                                   // смещение блокировки тайлов
                0.4,                                    // scale
                "Y",                                    //направление 
                [
                    {n:8, x:0, y:1}, {n:7, x:-8, y:4}, {n:6, x:-16, y:8}, {n:5, x:-24, y:12}, {n:4, x:-32, y:16}, {n:3, x:-40, y:20}, {n:2, x:-48, y:24}, {n:1, x:-56, y:21}
                ],
                "SMARTPHONE",
                "SMARTPHONE"
            );       
            
            __entity.obj[__i++] = new __entity.GameObject(object_layer, {
                texture: __entity.gameTexture.apple_table,
                tileX: 7 + __entity.locationX, tileY: 20 + __entity.locationY, 
                //dtileX: 0.8, dtileY: 0.8, 
                dtileX: 1, dtileY: 1, 
                x3d: 4, y3d: 4, 
                height3d: 80, 
                imageScale:imageScale
            }).id('apple_table');            
            object_layer.occupyTile(7+__entity.locationX, 20+__entity.locationY, 4, 4, {});
            
           
            self.allocateGameObject(
                object_layer,   // уровень
                'flashs_table_', // ID шалон
                __entity.gameTexture.a_flashs_table,     //текстура
                14, 16,     //старт
                7, 1,       // ширина высота
                [
                    {textures_from:7, textures_to:1, delta_X: 1, delta_Y: 0, end_X: 0, end_Y: 0}
                ],                
                -5, -23,      // смещение текстур
                0, 0,       // смещение блокировки тайлов
                0.4,          // scale
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
                -5, -23,      // смещение текстур
                0, 0,       // смещение блокировки тайлов
                0.4,          // scale
                "X",             //направление
                []
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
                -5, -23,      // смещение текстур
                0, 0,       // смещение блокировки тайлов
                0.4,          // scale
                "X",             //направление
                []
            );                           
           
        }                

});



