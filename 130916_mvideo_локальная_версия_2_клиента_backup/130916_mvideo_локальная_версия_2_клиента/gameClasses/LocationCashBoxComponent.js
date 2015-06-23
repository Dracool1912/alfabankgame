var LocationCashBoxComponent = Location.extend({
	classId: 'LocationCashBoxComponent',
	componentId: 'locationCashBoxComponent',

    init: function (entity, options) {
            var self = this;

            // Store the entity that this component has been added to
            self._entity = entity;

            // Store any options that were passed to us
            self._options = options;

            self.id = "CASHBOX";
            self.objects_path = "cashbox/";

    },

    loadTextures: function () {
        var self = this;
        var __entity = self._entity;

        __entity.gameTexture.a_cashbox = self.loadTextureSet("cashbox", 3); 
        
        self.texturesInitialised = true;
    },

    setupEntities: function (object_layer) {
        var self = this;
        if(!self.texturesInitialised)return;
        
        var __entity = self._entity;

        var __i=0;
        var imageScale = 1;
        
            __deltas  = [];
            self.allocateGameObject(
                object_layer,                           // уровень
                'cashbox_1_',                            // ID шаблон
                __entity.gameTexture.a_cashbox,     //текстура
                0, 0,                                  //старт
                3, 4,                                   // ширина высота
                [
                    {textures_from:3, textures_to:1, delta_X: 0, delta_Y: 1, end_X: 1, end_Y: 0}
                ],
                0, 0,                                // смещение текстур  40, -20,
                -1, 0,                                   // смещение блокировки тайлов
                imageScale,                                    // scale
                "Y",                                    //направление 
                __deltas
            );        

            self.allocateGameObject(
                object_layer,                           // уровень
                'cashbox_2_',                            // ID шаблон
                __entity.gameTexture.a_cashbox,     //текстура
                2, 5,                                  //старт
                3, 4,                                   // ширина высота
                [
                    {textures_from:3, textures_to:1, delta_X: 0, delta_Y: 1, end_X: 1, end_Y: 0}
                ],
                0, 0,                                // смещение текстур  40, -20,
                -1, 0,                                   // смещение блокировки тайлов
                imageScale,                                    // scale
                "Y",                                    //направление 
                __deltas
            );
    }

});



