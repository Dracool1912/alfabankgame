/**
 * 
 * @type @exp;IgeClass@call;extend
 * 
 * CustomerManagerComponent - компонент для управления потоком покупателей в магазине
 */
var CustomerManagerComponent = IgeClass.extend({
	classId: 'CustomerManagerComponent',
	componentId: 'customerManager',

	init: function (entity, options) {
		var self = this;

		// Store the entity that this component has been added to
		this._entity = entity;

		// Store any options that were passed to us
		this._options = options;
                
                this.allowSelectCustomer = false;
                
                this.objectLayer = null;
                this.collisionMap = null;
                this.player  = null;
                this.pathFinder  = null;
                this.box2dSettings = {};
                
                //full game - true
                //demo - false
                this.gameModeFlag = true;
                
                this.totalCustomersPerOneDay = 10;
                
                this.customersInTimeMap = [
                    {time1: 10, time2: 13, limit: 1},
                    {time1: 13, time2: 17, limit: 2},
                    {time1: 17, time2: 21, limit: 5},
                    {time1: 21, time2: 22, limit: 2}
                ];
                
                this.sales = 0;
                this.bonuses = 0;
                this.score = 0;
                this.gameTime = 0;
                
                this.departament = '';
                
                // индекс покупателя добавленного из customersDefinition
                this.currentIdx = 0;
                
                this.notebook_demo_index = 0;
                this.smartphone_demo_index = 0;
                
                this.id_index = 0;
                
                this.customers = [];
                this.customersDefinition = [];
                                
        },// end init()
        
        setDepartament: function(__dep){
            var self = this;
            self.departament = __dep;
            
            self.customersDefinition = [];
            
            for(var i=0; i < self.customers.length; i++){
                var __cust = self.customers[i];
                if(__cust.departament.toUpperCase() === self.departament.toUpperCase()){
                    if(__cust.id.toUpperCase().indexOf("DEMO") > 0){
                        if(__cust.product.toUpperCase() === "NOTEBOOK"){
                            self.notebook_demo_index = i;
                            if(self.sales <= 1) self.customersDefinition.push(__cust);
                        }
                        if(__cust.product.toUpperCase() === "SMARTPHONE"){
                            self.smartphone_demo_index = i;
                            if(self.sales <= 2)self.customersDefinition.push(__cust);
                        }
                        //self.customersDefinition.push(__cust);
                    }else{               
                        self.customersDefinition.push(__cust);
                    }                    
                }
            }
        },
        
        /**
         * начинаем процесс генерации покупателей
         */
        start: function(__dep){
            var self = this;
            //self.currentIdx = 0;
            self.setDepartament(__dep);
            
            //self.customers = [];            
            self.next();
        },
        
        getNextCustomer: function(){
            var self = this;
            if(self.sales == 0)self.currentIdx = self.notebook_demo_index;
            else if(self.sales == 1)self.currentIdx = self.smartphone_demo_index;
            else {
                if(self.gameModeFlag){
                    self.currentIdx = self.findNextCustomer();
                }else{
                    self.currentIdx = -1;    
                }
            }
            //else self.currentIdx = self.findNextCustomer();    
            //else self.currentIdx = -1;    
        },
        
        findNextCustomer: function(){
            var self = this;
            var __free_customers = [];
            for(var __i = 0; __i < self.customersDefinition.length; __i++){
                var __cust = self.customersDefinition[__i];
                if(self.sales == 1 && __cust.id.toUpperCase().indexOf("DEMO") > 0 && __cust.product.toUpperCase() === "NOTEBOOK")continue;
                if(self.sales == 2 && __cust.id.toUpperCase().indexOf("DEMO") > 0 && __cust.product.toUpperCase() === "SMARTPHONE")continue;
                
                var customerAi = __cust.instance;
                if(customerAi === null){
                    __free_customers.push(__i);
                }
            }
            
            if(__free_customers.length > 0){
                var _rndInd = Math.floor((Math.random() * __free_customers.length));
                return _rndInd;
            }else{
                return -1;
            }
        },
                
                /*
        next: function(){
            var self = this;
            if(self.currentIdx < self.customersDefinition.length){
                self.add();
            }else{
                self.currentIdx = 0;
                //self.add();
                //self.gameOver();
                
                
                //сообщение о том что покупатели законяились
                self.queueCustomersEnded();
            }
        },*/
        
        next: function(){
            var self = this;
            self.getNextCustomer();
            if(0 <= self.currentIdx && self.currentIdx < self.customersDefinition.length){
                self.add();
            }else{
                self.currentIdx = 0;
                //сообщение о том что покупатели законяились
                self.queueCustomersEnded();
            }
        },
                
        gameOver: function(){
               var scope = angular.element(document.getElementById('gameSupport')).scope();
               scope.$apply(function(){
                    scope.gameOver();
                });    
        },
        
        queueCustomersEnded: function(){
               var scope = angular.element(document.getElementById('gameSupport')).scope();
               scope.$apply(function(){
                    //scope.queueCustomersEnded();
                });    
        },        
        
        setAllowSelectCustomer: function(__val){
            var self = this;
            self.allowSelectCustomer = __val;
        },
                
                
        // получаем координаты и размер целевой области для категории продуктов
        getTargetArea: function(p_category){
            var self = this;
            for (var p=0; p < ige.client.products.length; p++) {
                if(ige.client.products[p].product == p_category){
                    return ige.client.products[p].rect;
                }
            }
            return null;
        },           
           
        add: function(){
            var self = this;
            
            var __person_data = self.customersDefinition[self.currentIdx];
            
            var __person = self.createGamePerson(__person_data);
            if(__person){
                self.customersDefinition[self.currentIdx].instance = __person;
                if(__person_data.children != undefined){
                    if( __person_data.children == null){                    
                    }else{
                        // содаем ребенка, следующего за родителем                        
                        var __children_data = __person_data.children;            
                        var children = self.createGamePerson(__children_data);
                        children.addComponent(ChildrenComponent);
                        __person.setChildren(children.childrenComponent);                        
                    }
                }
                /*
                if(__person_data.partner != undefined){
                    if( __person_data.partner == null){                    
                    }else{
                        // содаем ребенка, следующего за родителем                        
                        var __children_data = __person_data.children;            
                        var children = self.createGamePerson(__children_data);
                        children.addComponent(ChildrenComponent);
                        __person.setChildren(children.childrenComponent);                        
                    }
                }*/
                
                ige.client.addedNewCustomer(__person_data);
            }            
        },
       
        gameStatistics: function(__sales, __bonuses, __score, __time){
            var self = this;
            self.sales = __sales;
            self.bonuses = __bonuses;
            self.score = __score;    
            self.gameTime = __time;    
        },

        createGamePerson: function(__person_data){
            var self = this;
              var __person = new CharacterAi(self.collisionMap, self.player, self.pathFinder)
                                //.box2dBody(self.box2dSettings)                                                                
                                .category(__person_data.category)
                                .drawBounds(true)
                                .drawBoundsData(false)
                                .mount(self.objectLayer);
                        
            if(__person){                            

                __person.customerManager = self;
                __person.customerManagerIndex = self.currentIdx;

                var ___id = __person_data.category + "_" + ++self.id_index;

                __person.id(___id);

                for(var key  in __person_data){
                    if(key === 'texture'){
                        __person.initTexture(__person_data[key], 1, __person_data['product']);
                    }else{
                        __person.data(key, __person_data[key]);
                    }
                }

                if(__person.data('product') === 'SMARTPHONE'){
                    //потому что блин, нету стола со смартфонами - совмещаеми их с планшетами
                    __person.targetArea = self.getTargetArea("PAD");
                }else{
                    __person.targetArea = self.getTargetArea(__person.data('product'));
                }

                var __location_info = ige.client.getLocationInfoForProduct(__person.data('product'));
                __person.initLocationInfo(__location_info);

                //__person.targetArea = self.getTargetArea(__person.data('product'));
                __person.setAllowSelectCustomer(self.allowSelectCustomer);
                __person.initPosition();

                return __person;
            }
            
            return null;
            
        },
                
        kill: function(customer, __do_next){
            var self = this;
            
            if(__do_next === undefined)
                var __do_next = true;
            
            if(customer.my_children){
                if(customer.my_partner)__do_next = false;
                self.kill(customer.my_children._entity, __do_next);
                __do_next = false;
            }    
            
            if(customer.my_partner){
                self.kill(customer.my_partner._entity, true);
                __do_next = false;
            }                        
            
            if(customer.prevTile)customer.unOccupyTile(customer.prevTile.x, customer.prevTile.y);                        
            customer.prevTile = customer.getCurrentTile();                    
            customer.unOccupyTile(customer.prevTile.x, customer.prevTile.y);            
            
            for(var __i = 0; __i < self.customersDefinition.length; __i++){
                var child = self.customersDefinition[__i].instance;
                if(child && child.id() === customer.id()){
                    self.customersDefinition[__i].instance = null;
                }
            }
                        
            customer.unMount();
            customer.destroy();
            customer = null;
            if(__do_next)
                self.next();
        },
                
        getCustomersLimitInTime: function(){
            var self = this;
            var __limit = 1;
            for (var __i=0; __i < self.customersInTimeMap.length; __i++){
                var __t1 = (self.customersInTimeMap[__i].time1 - 10) * 60 * 60; 
                var __t2 = (self.customersInTimeMap[__i].time2 - 10) * 60 * 60; 
                if(__t1 <= self.gameTime && self.gameTime < __t2){
                    __limit = self.customersInTimeMap[__i].limit;
                }
            }
            
            __limit = __limit * Math.round(this.totalCustomersPerOneDay / 10);
            return __limit;
        },
                
        checkCustomerCounter: function(){
            var self = this;
            var __cnt = 0;
            var __limit = self.getCustomersLimitInTime();
            for(var __i = 0; __i < self.customersDefinition.length; __i++){
                var customerAi = self.customersDefinition[__i].instance;
                if(customerAi != null){
                    __cnt++;
                }
            } 
            
            if(__cnt < __limit){
                self.next();
            }
        },
                
        setGameModeFlag: function(__flag){
            var self = this;
            self.gameModeFlag = !__flag;
        }                
});


if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = CustomerManagerComponent; }