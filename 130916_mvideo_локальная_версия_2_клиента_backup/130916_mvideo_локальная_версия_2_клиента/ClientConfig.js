var igeClientConfig = {
	include: [
		/* Your custom game JS scripts */
		//'./maps/example.js',
                //'./maps/isometric_grass_and_water__1.js',
                
                './maps/mv_1.js',
                //'./maps/map2.js',
		
                './gameClasses/ClientNetworkEvents.js',
                './gameClasses/CustomerManagerComponent.js',
		'./gameClasses/Character.js',
                './gameClasses/Location.js',
		
                './gameClasses/PlayerComponent.js',
                './gameClasses/ChildrenComponent.js',
                
                './gameClasses/LocationDigitalComponent.js',  
                './gameClasses/LocationTVComponent.js',
                './gameClasses/LocationHome1Component.js',
                './gameClasses/LocationHome2Component.js',
                './gameClasses/LocationHome3Component.js',
                './gameClasses/LocationCashBoxComponent.js',
                  
                  //покупатели
                './gameData/customers.js',
                 /*               
                  //данные помощника
                  "./gameData/silvester.js",

                  //локация ноутбуки - демо
                  "./gameData/location_notebooks_demo.js",
                  //локация смартфоны - демо
                  "./gameData/location_smartphone_demo.js",

                  //описание бонусов
                  "./gameData/bonuses.js",

                  //структура технологии продаж
                  "./gameData/phases.js",
                   */
                  
		'./gameClasses/CharacterAi.js',
                './gameClasses/ClientObjects.js',
		/* Standard game scripts */
		'./client.js',
		'./game.js'
	]
};

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = igeClientConfig; }