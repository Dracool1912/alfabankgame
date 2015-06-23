'use strict';

/* Controllers */
function ApplicationCtrl($scope) {    
};

function GameSupportCtrl($scope, $timeout, $localStorage, game, silvester, locationData, bonuses, phases, map, customers) {
     
    $scope.version = '11.09.2013';
    
    //ОЧИТСКА СОХРАНЕННЫХ РЕЗУЛЬТАТОВ
    //ДЛЯ ДЕМО-РЕЖИМА (ТОЛЬКО 2 ПЕРВЫХ ПОКУПАТЕЛЯ)
    //full game = !__clearLocalStorage !!!
    var __clearLocalStorage = true;
    
    $scope.game = game;
    $scope.locationData = locationData;
    $scope.customers = customers;
    
    var _higlightElementTime = 10 * 1000;
    
    var _idleTimeout = 10 * 1000;
    var idleTimer ;
    var selectBonusTimer;
    var startBonusTimer;
    var confirmStartDialogTimer;
    
    var _bonusActionSelectionTimeout = 10 * 1000;
    var _bonusShowTimeout = 30 * 1000;
    var _bonusShowCycleCount = 1; 
        
    //эмоция покупатела для фазы продажи
    var __phase_emotion = 'neutral';
    
    $scope.higlightElements = [];
    
    /**
     * MAP
     */
    
    $scope.map = map;
    
    /**
     * Helper
     */
    
    $scope.helperFinallyPhrase = false;
    
    var __helper_path = "assets/helper/";
    
    $scope.helper_id = 1;
    
    $scope.last_question_type = 0;
    
    $scope.helper_path = "";
    
    $scope.helper_img_up = "";
    $scope.helper_img_down = "";
    $scope.helper_img_wings = "";
    $scope.helper_img_body = "";

    $scope.helper_img_down_visible = false;
    $scope.helper_img_up_visible = false;

    $scope.helper_arrow_class = "";
    $scope.customer_arrow_class = "";
    
    var __helper_animantion_time = 150;
    var __helper_fly_animantion_time = 1000;
    var __helper_animantion_timer = null;    
    var __helper_body_animantion_count_skip = 0;
    var __helper_body_animantion_count_max = __helper_fly_animantion_time / __helper_animantion_time;
    var __helper_body_animantion_count = __helper_body_animantion_count_max;
    var __helper_body_animantion_direction = 1;
    
    var __helper_body_animantion_complete = true;
    var __helperBalloonAnimationData = {"bottom":"0px", "left":"0px"} ;
    
    $scope.logText = '';
    $scope.log = function(text, type, obj){
        if(text.indexOf("loaded successfully") >= 0){
            
        }else{
            $scope.logText += type + ': '+text + "<br>";
        }
    };
    
    var __correctHelperBalloonSize = function(){
        var __balloon = silvester.getAnimationInfo("balloon");
        var __left = __balloon["left"]; 
        var __width = "250px";
            if($scope.helperDialogText.length < 50){
                __left = parseFloat(__left) + 100 + "px"; 
                __width = "150px";
            }        
            $("#helper_balloon_ID").css({"max-width": __width, "min-width": __width, "width": __width, "bottom": __balloon["bottom"], "left": __left});
    };
    
    $scope.selectHelper = function(__helper_id, __forced_position){
        
        $scope.helper_id = __helper_id;
        
        if(__helper_id > 0){            
            silvester.setCurrentHelperId(__helper_id);
            
            var __helper = silvester.getAnimationInfo("helper_dir");
            
            /*if(__helper === null)
                return;
            */
           
            $scope.helper_path = __helper_path + __helper + "/";

            $scope.helper_img_up = $scope.helper_path + "w_up.png";
            $scope.helper_img_wings = $scope.helper_path + "w_anim.gif";
            $scope.helper_img_down = $scope.helper_path + "w_down.png";
            $scope.helper_img_body = $scope.helper_path + "body.png";

            
            //if(silvester.selvesterType() === "SILVESTER" || $scope.silvesterDialogActive || $scope.helperFinallyPhrase || $scope.silvesterDialogNextButtonVisible){
            if(silvester.selvesterType() === "SILVESTER" || $scope.silvesterDialogActive || $scope.helperFinallyPhrase){
                $scope.silvesterDialogVisible = true;
            }else{
                /*
                if($scope.gameInDialog){
                    if($scope.salesCounter === 0){
                        $scope.silvesterDialogVisible = true;
                    }else{
                    }
                }else{
                    $scope.silvesterDialogVisible = true;
                }
                */
               
               $scope.silvesterModalMaskVisible = false;
               
                if($scope.gameInDialog){
                    if(silvester.selvesterType() === "HELPER" && $scope.helperDialogText){
                        $scope.silvesterDialogVisible = true;
                        $scope.silvesterModalMaskVisible = true;
                    }
                }else{
                    $scope.silvesterDialogVisible = true;
                }               
            }
            
            /*
            if($scope.silvesterDialogVisible){
                if(silvester.selvesterType() === "HELPER") $scope.silvesterModalMaskVisible = true;
                else $scope.silvesterModalMaskVisible = true;
            }else{
                $scope.silvesterModalMaskVisible = false;
            }
            */
            
           //$scope.silvesterDialogVisible = true;
            
           $scope.helper_img_down_visible = false; 
           $scope.helper_img_up_visible = false;                    
            
            
            var __saved_position = silvester.getHelperPosition();
            
            var __wings = silvester.getAnimationInfo("wings");
            
            var __wing_up = silvester.getAnimationInfo("wing_up");
            var __wing_down = silvester.getAnimationInfo("wing_down");
            //var __balloon = silvester.getAnimationInfo("balloon");
            var __body = silvester.getAnimationInfo("body");
            var __arrow = silvester.getAnimationInfo("arrow");
            var __position = silvester.getAnimationInfo("position");
            var __wings_back = silvester.getAnimationInfo("wings_back");

            if(__forced_position != undefined && __forced_position){
                __position = __forced_position;
            }else{
                if(__saved_position) __position = __saved_position;
            }
            
            var __z_index_style = {"z-index": ""};
            if(!__wings_back){
                __z_index_style = {"z-index": "1"};
            }
            
            
            $("#helper_img_down").css(__z_index_style);
            $("#helper_img_up").css(__z_index_style);
                            
            $("#helper_img_up").css(__wing_up);
            $("#helper_img_down").css(__wing_down);
            
            $("#helper_img_wings").css(__wings);
             $("#helper_img_wings").css(__z_index_style);
             
            $("#helper_img_body").css(__body);
            //$("#helper_balloon_ID").css(__balloon);
            __correctHelperBalloonSize();
            $("#helperID").css(__position);

            if(silvester.selvesterType() === "HELPER"){
                $scope.preparePosHelperBaloon();        
                if($scope.posScreenHelper){                    
                    $("#helperID").css($scope.posScreenHelper);
                }
            }
                    
            $scope.helper_arrow_class = __arrow;
                       
        }else{
            $scope.silvesterDialogVisible = false;
            $scope.silvesterModalMaskVisible = false;
            if(__helper_animantion_timer)$timeout.cancel(__helper_animantion_timer);
        }
                        
    };

    var _animationHelperBodyElement = function(__element, __complete){
                    var __elem = $("#"+__element);
                    if(__elem){
                       
                        var __top = __elem.css("top");
                        __top = parseFloat(__top);
                        __top += __helper_body_animantion_direction * 3;
                        __top += "px";
                        console.log(__element + " = " + __top);
                        if(__complete){
                            __elem.animate({top: __top}, __helper_fly_animantion_time, "easeInOutSine", function() {
                                __helper_body_animantion_complete = true;
                            });
                        }else{
                            __elem.animate({top: __top}, __helper_fly_animantion_time, "easeInOutSine");
                        }
                    }        
    };

    //*************************************
    
    $scope.window_width = 0;
    $scope.window_height = 0;          
    
    silvester.setData(silvesterDialog);
    
    bonuses.setData(bonusesData);
    bonuses.setGame($scope, _bonusShowCycleCount);
    
    
    phases.setData(phasesList);
    $scope.phasesList = phases.getPhases();
    $scope.phasesListInDialog = phases.getPhasesInDialog();
            
    //отображаемый текст диалогов:
    $scope.salesmanDialog = [];
    $scope.customerDialog = [];
    
    $scope.locationID = null;
    
    $scope.startDialogPopup = false;
    
    //выбранный вопрос
    $scope.selectedQuestion = -1;

    //выбранный ответ
    $scope.selectedAnswer = '';
    
    $scope.salesmanDialogVisible = false;
    
    $scope.helperDialogVisible = false;
    $scope.helperDialogText = "";
    
    $scope.phaseImage = '';
    $scope.phaseImageVisible = false;
    
    $scope.showGameStatisticsDisplay = false;
    $scope.showGameStructureDisplay = false;
    $scope.infoDialogVisible = false;
    //$scope.mapDialogVisible = true;
    
    $scope.customerDialogVisible = false;
    $scope.customerDialogAnswerButtonVisible = false;
    
    $scope.leaveDialogVisible = false;
    
    $scope.gameOverDialogVisible = false;
    
    $scope.boughtDialogVisible = false;
    
    $scope.currentBonus = null;
    
    $scope.lastGamePhase = 0;
    
    $scope.lastDialogResult = -1;
    
    //состояние игры 
    $scope.gameInDialog = false;
    
    $scope.selectionBonus = false;
    $scope.gameInBonus = false;
    
    //$scope.maxSales = 40;
    $scope.maxSales = 2;
    $scope.maxBonus = 2;
    
    $scope.salesAllowedBonus = 2;
    
    $scope.bonusEnabled = false;
    
    
                
    if(__clearLocalStorage){
        $localStorage.mvideo_bonus = 0;
        $localStorage.mvideo_sales = 0;
        $localStorage.mvideo_score = 0;
        $localStorage.mvideo_time = 0;
    }
                
    if($localStorage.mvideo_bonus == undefined)$scope.bonusCounter = 0; 
    else $scope.bonusCounter = $localStorage.mvideo_bonus;
    
    if($localStorage.mvideo_sales == undefined)$scope.salesCounter = 0;
    else $scope.salesCounter = $localStorage.mvideo_sales;
        
    $scope.salesTextMarginLeft = "14px";
    $scope.bonusTextMarginLeft = "14px";
    $scope.scoreTextMarginLeftDbl = "28px";
    
    if($localStorage.mvideo_score == undefined)$scope.scoreCounter = 0;
    else $scope.scoreCounter = $localStorage.mvideo_score;
    
    if($localStorage.mvideo_time != undefined) game.setNumTimeTicks($localStorage.mvideo_time);
    
                
    $scope.failsCounter = 0;
   
    $scope.bonusText = "бонусов";
    $scope.salesText = "продаж";                
    $scope.scoreText = "баллов";
                
    $scope.locationBackground = '';
    $scope.locationBackgroundVisible = false;
    
    $scope.locationBackImageVisible = false;
    $scope.locationCustomerVisible = false;
    $scope.locationBeforeImageVisible = false;
    
    $scope.locationBackImage = '';
    $scope.locationCustomerImage = '';
    $scope.locationBeforeImage = '';
    
    $scope.posScreenHelper = null;
    $scope.arrowScreenHelper = null;

    $scope.posScreenCustomer = null;
    $scope.arrowScreenCustomer = null;

    $scope.gameStructureImage = "assets/scheme.png";
    
    $scope.allowSelectCustomer = false;
    
    $scope.silvesterDialogVisible = false;
    $scope.silvesterModalMaskVisible = false;
    $scope.silvesterDialogActive = true;
    $scope.silvesterDialogFooterVisible = false;
    $scope.silvesterImageVisible = false;
    $scope.silvesterDialogNextButtonVisible = true;
    $scope.silvesterDialogCloseButtonVisible = false;
    $scope.silvesterDialogNextButtonAction = "";
    $scope.silvesterDialogText = "";
    $scope.sivester_main_img = 'assets/dialog/silvester_d_l_1.png';
    
    $scope.gameProgressInfo = game.getGameProgressInfo();    
    $scope.time = $scope.gameProgressInfo.time;
    
    $scope.scale_bg = 1;
   
    var __saveScopeCounter = function(__score, __metod){     
        try{
            //SetObjectiveScore("c1", "flash", "replace", $scope.scoreCounter);
            //SetObjectiveScore("score", "mvideogame", "sum", __score);
            SetObjectiveScore("score", "mvideogame", __metod, __score);
        }catch(err){}
    };
    /*
    $scope.$watch('scoreCounter', function(newValue, oldValue){
        var __delta = newValue - oldValue;
        __saveScopeCounter(__delta, "sum");
    });
    */

    var __soundVolumeShowTimer = null;
    $scope.soundVolumeIndicator = 'assets/sound_1.png';
    $scope.soundVolumeChange = function(__event, __target){
        var __new_val = game.sound_volume;
        var __top_height = $(".sound-level-slider-top").css("height");
        var __bottom_height = $(".sound-level-slider-bottom").css("height");
        __top_height = parseFloat(__top_height);
        __bottom_height = parseFloat(__bottom_height);
        switch(__target){
            case 'top':
                __new_val = __bottom_height + __top_height - __event.offsetY;
                break;
            case 'bottom':
                __new_val = __bottom_height - __event.offsetY;
                break;                
        }
        __new_val = __new_val / (__top_height + __bottom_height);
        if(__new_val < 0.1)__new_val = 0;
        if(__new_val > 0.9)__new_val = 1;
        $scope.setSoundVolume(__new_val);
    };
    $scope.setSoundVolume = function(__new_val){
        $localStorage.mvideo_sound_volume  = __new_val;
        game.sound_volume = __new_val;
        __new_val = Math.round(__new_val * 100);
        
        if(__new_val == 0){
            $(".sound-level-slider-bottom").removeClass("sound-level-slider-bottom-top");
            $(".sound-level-slider-top").addClass("sound-level-slider-top-bottom");
        }else if(__new_val == 100){
            $(".sound-level-slider-bottom").addClass("sound-level-slider-bottom-top");
            $(".sound-level-slider-top").removeClass("sound-level-slider-top-bottom");
        }else{
            $(".sound-level-slider-bottom").removeClass("sound-level-slider-bottom-top");
            $(".sound-level-slider-top").removeClass("sound-level-slider-top-bottom");
        }
        
        $(".sound-level-slider-bottom").animate({"height": __new_val+"%"}, 500, "easeOutSine");
        __new_val = 100 - __new_val;
        $(".sound-level-slider-top").animate({"height": __new_val+"%"}, 500, "easeOutSine");        
        
            if(__soundVolumeShowTimer)$timeout.cancel(__soundVolumeShowTimer);
            __soundVolumeShowTimer = $timeout(function(){
                $("#soundLevelSlider").animate({"bottom": -100}, 1000, "easeInSine");
            }, 10000);        
    };
    $scope.soundVolumeSlider = function(__event){
        //__event.offsetX
        var __bbb = $("#soundLevelSlider").css("bottom");
        __bbb = parseFloat(__bbb);
        if(__bbb === -100){
            var __www = $("#soundLevelSlider").css("width");
            var __left = Math.round(__event.pageX - parseFloat(__www) / 2) + 'px';
            $("#soundLevelSlider").css({"left":__left});
            $("#soundLevelSlider").animate({"bottom": 40}, 1000, "easeOutSine");
            if(__soundVolumeShowTimer)$timeout.cancel(__soundVolumeShowTimer);
            __soundVolumeShowTimer = $timeout(function(){
                $("#soundLevelSlider").animate({"bottom": -100}, 1000, "easeInSine");
            }, 10000);
        }else if(__bbb === 40){
            if(__soundVolumeShowTimer)$timeout.cancel(__soundVolumeShowTimer);
            $("#soundLevelSlider").animate({"bottom": -100}, 1000, "easeInSine");
        }else{
            
        }
    };
    $scope.$watch('game.sound_volume', function(newValue, oldValue){
         if(newValue == 0){
             $scope.soundVolumeIndicator = 'assets/sound_0.png';
         }else if(0 < newValue && newValue <= 0.4){
             $scope.soundVolumeIndicator = 'assets/sound_1.png';
         }else if(0.4 < newValue && newValue <= 0.7){
             $scope.soundVolumeIndicator = 'assets/sound_2.png';
         }else{
             $scope.soundVolumeIndicator = 'assets/sound_3.png';
         }
    });
    
    $scope.$watch('map.selectedDepartment', function(newValue, oldValue){
        if(newValue === 'NONE'){            
        }else{
            initDepartament(newValue);
        }
    });
    
    var initDepartament = function(__dep){
            //показываем помшника
            //$scope.startSilvesterDialog(1);
            if($scope.salesCounter < 3){
                $scope.startSilvesterDialog(1);
            }else{
                $scope.allowSelectCustomer = true;
                $scope.silvesterDialogNextButtonAction = "";
                if(ige && ige.client)ige.client.setAllowSelectCustomer(true);                
            }
            try{
                if(ige && ige.client)ige.client.gameStatistics($scope.salesCounter, $scope.bonusCounter, $scope.scoreCounter, game.getNumTimeTicks());
                if(ige && ige.client)ige.client.customerManagerStart(__dep);
            }catch(err){}        
    };
    
    $scope.$watch('time', function(){
        $timeout(function(){
            $scope.gameProgressInfo = game.getGameProgressInfo();
            $scope.time = $scope.gameProgressInfo.time;            
        },game.timerInterval);
    });
     
    $scope.$watch('salesCounter', function(){
        _displaySalesCounter(); 
        $localStorage.mvideo_sales = $scope.salesCounter;
        $localStorage.mvideo_time = game.getNumTimeTicks();
        
        if($scope.salesCounter >= $scope.salesAllowedBonus)  $scope.bonusEnabled = true;
        
        try{
            if(ige && ige.client)ige.client.gameStatistics($scope.salesCounter, $scope.bonusCounter, $scope.scoreCounter, game.getNumTimeTicks());
        }catch(err){}
    });    
    
    $scope.$watch('bonusCounter', function(){
        _displayBonusCounter(); 
        $localStorage.mvideo_bonus = $scope.bonusCounter;
        $localStorage.mvideo_time = game.getNumTimeTicks();
        
        try{
            if(ige && ige.client)ige.client.gameStatistics($scope.salesCounter, $scope.bonusCounter, $scope.scoreCounter, game.getNumTimeTicks());
        }catch(err){}
    });    
    
    $scope.$watch('scoreCounter', function(){
        $localStorage.mvideo_score = $scope.scoreCounter;
        $scope.scoreText = _displayCounterTextScore($scope.scoreCounter);
        try{
            if(ige && ige.client)ige.client.gameStatistics($scope.salesCounter, $scope.bonusCounter, $scope.scoreCounter, game.getNumTimeTicks());
        }catch(err){}
    });    
   
    //location DEMO data
    $scope.$watch("locationData.location_demo_ready", function(newValue, oldValue){
        if(newValue){
            if($scope.startSilvesterDialog(2)){
                //диалог не закончен - меню продавца после чтения диалога помошника
                $scope.showSalesmanDialog(1, false);
            }else{
                $scope.showSalesmanDialog(1, true);
            }
            $scope.gameInDialog = true;
            $scope.helperFinallyPhrase = false;            
            if(ige && ige.client)ige.client.gameInDialog();            
        }
    });   
    //location data
    $scope.$watch("locationData.location_ready", function(newValue, oldValue){
        if(newValue){
            $scope.locationData.loadDialogs();
        }
    });
    $scope.$watch("locationData.location_error", function(newValue, oldValue){
        if(newValue){
            console.log("*** Location data error loading: " + $scope.locationData.try_location_data);
        }        
    });    
    $scope.$watch("locationData.dialog_ready", function(newValue, oldValue){
        if(newValue){
            $scope.locationData.loadTraectory($scope.customers.customer);
        }
    });
    $scope.$watch("locationData.dialog_error", function(newValue, oldValue){
        if(newValue){
            console.log("*** Dialogs data error loading: " + $scope.locationData.try_product_data);
        }        
    });
    $scope.$watch("locationData.traectory_ready", function(newValue, oldValue){
        if(newValue){
            //$scope.locationData.initGameDialog();
            $scope.gameInDialog = true;
            $scope.helperFinallyPhrase = false;
            $scope.showSalesmanDialog(1, true);
            if(ige && ige.client)ige.client.gameInDialog();        
        }else{
            $scope.doCancelGameDialogMode();
        }
    });
    $scope.$watch("locationData.traectory_error", function(newValue, oldValue){
        if(newValue){
            console.log("*** Traectory error loading: " + $scope.locationData.customer.id);
        }
    });
    
    var __position_location_bg_image = function(){
        var __img_h = $scope.window_height - 40 - 40;
        var __img_w = Math.round(__img_h * (1024/668));
        var __img_scale = __img_h / 668;
        
        var __ww = ($scope.window_width - __img_w) / 2;        
        var __left = 0;
        if(__ww > 0){
            __left = Math.round(__ww);
        }
                
        $("#dialogPanel").css({"height": __img_h+"px", "width": __img_w+"px", "left":__left+"px", "top": "40px"});
        
        var __location_customer_selector = ".location_customer";
        var __customer_info = customers.getEmotionScreenInfo();
                
        __left = (__customer_info["x"] - __customer_info["dx"]) * (__img_h / 668);
        var __top = (__customer_info["y"] - __customer_info["dy"]) * (__img_h / 668);
        
        __top = Math.round(__top)+"px";
        __left = Math.round(__left)+"px";                    

        $("#customerAnswerModalDialogContayner").css({"left": __left, "top": __top, "height": __img_h+"px", "width": __img_w+"px"});

    };
           
    
    $scope.$watch('window_width', function(){
        var __img_h = $scope.window_height - 40 - 40;
        $scope.scale_bg = __img_h / 668;
        
        if($scope.gameInDialog){
            __position_location_bg_image();
        }
              
        $scope.preparePosHelperBaloon();        
        if($scope.posScreenHelper){                    
            $("#helperID").css($scope.posScreenHelper);
        }

        $scope.preparePosCustomerBaloon();
        if($scope.posScreenCustomer){                    
            $("#customerAnswerModalDialog").css($scope.posScreenCustomer);
        }
        
    });

    $scope.$watch('window_height', function(){
        var __img_h = $scope.window_height - 40 - 40;
        $scope.scale_bg = __img_h / 668;
        
        if($scope.gameInDialog){
            __position_location_bg_image();
        }
        
        $scope.preparePosHelperBaloon();        
        if($scope.posScreenHelper){                    
            $("#helperID").css($scope.posScreenHelper);
        }

        $scope.preparePosCustomerBaloon();
        if($scope.posScreenCustomer){                    
            $("#customerAnswerModalDialog").css($scope.posScreenCustomer);
        }
        
    });
    
    
   
    var __tooltype_options = {delay: { show: 500, hide: 100}, placement: "bottom"};
    $('#sales_counter_highlight').tooltip(__tooltype_options);
    $('#bonus_counter_highlight').tooltip(__tooltype_options);
    //$('#game_time_progress').tooltip(__tooltype_options);
    $('#game_time_left').tooltip(__tooltype_options);
    $('#game_time_right').tooltip(__tooltype_options);
    $('#game_time_progress_bar_border_id').tooltip(__tooltype_options);    
    $('#statisticsButtonImg').tooltip(__tooltype_options);
    $('#exitButtonId').tooltip({delay: { show: 500, hide: 100}, placement: "left"});
    
    
    __tooltype_options = {delay: { show: 500, hide: 100}, placement: "top"};
    $('#MVideo_logo').tooltip(__tooltype_options);
    $('#structure_btn').tooltip(__tooltype_options);
    $('#sound_btn').tooltip(__tooltype_options);
    $('#helper_btn').tooltip(__tooltype_options);
    $('#info_btn').tooltip(__tooltype_options);
    
       
    $scope.engineStarted = function(){
        
        if(ige && ige.client)ige.client.setGameModeFlag(__clearLocalStorage);
        
        customers.setData(customersData);                
        
        if($scope.salesCounter < 2 ){
            map.setSelectDepartment('DIGITAL');
        }else{
            $scope.showInfoPopup('MAP');
        }
        
        game.play_background_sound = true;
    };
       
    $scope.customerInTargetArea  = function(__customer_info){
        if(__customer_info.type === "active"){
            
        }
    };                            
       
    $scope.addedNewCustomer = function(__customer_data){
        // *******************
        //__checkPossibilityOfBonus();
    };
    
    $scope.queueCustomersEnded = function(){
        __checkPossibilityOfBonus();
    };
    
    var __checkPossibilityOfBonus = function(){
        // *******************
        if($scope.salesCounter >= $scope.salesAllowedBonus){
        //if($scope.salesCounter >= 0){
            $scope.bonusEnabled = true;
            $scope.lastGamePhase = silvester.setPhase(5);
            $scope.startSilvesterDialog($scope.lastGamePhase);
        }        
    };
    
    $scope.closeSilvesterDialog = function(){
        $scope.silvesterDialogVisible = false;
    };
    
    $scope.invokeSilvester = function(){        
        if($scope.silvesterDialogVisible){
          //$scope.showHelper("");
          $scope.silvesterDialogVisible = false;
        }else{
           
           if( $scope.gameInDialog || $scope.gameInBonus){
               if($scope.helperDialogText){
                    $scope.silvesterDialogVisible = true;
               }
           }else{
               
               if($scope.bonusEnabled){
                   $scope.lastGamePhase = silvester.setPhase(5);
               }else{

                    $scope.lastGamePhase = silvester.setPhase(1);            
                    if(silvester.phaseComplete()){

                        if($scope.salesCounter >= $scope.salesAllowedBonus){
                            $scope.lastGamePhase = silvester.setPhase(5);
                        }else{
                            $scope.lastGamePhase = silvester.setPhase(0);
                        }
                        if(silvester.phaseComplete()){
                            $scope.lastGamePhase = silvester.setPhase(0);
                        }
                    }

                    $scope.startSilvesterDialog($scope.lastGamePhase);                
               }
               

           }
        }
    }
    
    $scope.startSilvesterDialog = function(__phase){
        
        if($scope.lastGamePhase === 15){
            //  GAME OVER
            return false;
        }
        
        if($scope.salesCounter > 2){
           if(__phase === 1 || __phase === 2 || __phase === 5 || __phase === 6 || (7 <= __phase && __phase <= 13)){
               return false;
           }
        }
        
        if($scope.gameInDialog && $scope.lastGamePhase === 5){
            // $scope.lastGamePhase === 5 - напроминание про бонусы
            // в игре игнорируем
            return;
        }
        
        silvester.setPhase(__phase);
        if(silvester.phaseComplete()){
            return false;
        }

        $scope.lastGamePhase = __phase;            
        silvester.selvesterType("SILVESTER");
        $scope.nextSilvesterDialog(true);
        
        return true;
    };
    
    $scope.initSalesmanDialogPosition = function(){
        var __hhh = $("#salesmanDialogID").css("height");
        //var __dh = $scope.window_height - 40 - __hhh.substr(0, __hhh.length-2);
        var __dh = $scope.window_height - __hhh.substr(0, __hhh.length-2);
        var __hhh = $("#salesmanDialogID").css({"top": __dh+"px", "bottom": ''});        
    };
    
    $scope.okGameOver = function(){
        document.location.replace("index.html");
    };
    
    $scope.higlightElement = function(__dialog_elem, __val){
      /*
       * TODO - сделать подсветку элемента
       */  
      
      var __elem = $("#"+__dialog_elem);
      if(__elem){
          if(__val){
              __elem.addClass('highlight');
              
                $scope.higlightElements.push(__dialog_elem);
              
                $timeout(function(){
                    if($scope.higlightElements.length > 0){
                        $scope.higlightElement($scope.higlightElements[0], false);
                        $scope.higlightElements.splice(0, 1);
                    }
                },_higlightElementTime);
          }else{
              __elem.removeClass('highlight');
          }
      }
    };
    
    $scope.nextSilvesterDialog = function(__ignore_actions){
        //следующий текст диалога
        
        if(!__ignore_actions && $scope.silvesterDialogNextButtonAction){
            switch($scope.silvesterDialogNextButtonAction){
                case "start_customer_dialog" :
                    $scope.silvesterDialogNextButtonAction = "";
                    $scope.showHelper("");
                    __show_salesman_dialog_panel();
                    break;
                case "allow_customer_selection" :
                    $scope.allowSelectCustomer = true;
                    $scope.silvesterDialogNextButtonAction = "";                    
                    if(ige && ige.client)ige.client.setAllowSelectCustomer(true);
                    //if(ige && ige.client)ige.client.customerManagerStart($scope.map.selectedDepartment);
                    var __dialog_text = silvester.nextState();
                    $scope.showHelper(__dialog_text);
                    break;
                case "close_dialog_mode" :
                    $scope.exitFromDialogMode();                    
                    $scope.silvesterDialogNextButtonAction = "";
                    $scope.showHelper(""); 
                    //__testGameOver();
                    break;              
                case "close_dialog_mode_and_show_bonus_dialog" :
                    $scope.exitFromDialogMode();                    
                    $scope.silvesterDialogNextButtonAction = "";
                    $scope.showHelper(""); 
                    
                    $scope.bonusEnabled = true;
                    $scope.lastGamePhase = silvester.setPhase(5);
                    $scope.startSilvesterDialog($scope.lastGamePhase);                    
                    break;                
                case "show_bonus_area" :
                    if(ige && ige.client)ige.client.showBonusArea();
                    $scope.silvesterDialogNextButtonAction = "";
                    $scope.showHelper("");                    
                    break;
                case "close_bonus" :
                    $scope.silvesterDialogNextButtonAction = "";
                    $scope.stopBonusDialog();
                    if(bonuses.usedBonuses() === 1){
                        //следующие бонусы
                        $scope.startSilvesterDialog(10);
                    }
                    __testGameOver();
                    break;
                case "check_bonus_counter" :
                    $scope.silvesterDialogNextButtonAction = "";
                    $scope.stopBonusDialog();
                    __testGameOver();
                    break;                
                case "game_over" :
                    $scope.okGameOver();
                    $scope.silvesterDialogNextButtonAction = "";
                    $scope.showHelper("");                    
                    break;
                case "analyze_customer_answer" :
                    $scope.silvesterDialogNextButtonAction = "";
                    $scope.showHelper(""); 
                    $scope.analyzeCustomerAnswer();
                    break;                
                case locationData.BOUGHT_ACTION :
                    $scope.silvesterDialogNextButtonAction = "";
                    $scope.stopDialog(locationData.BOUGHT);
                    break;
                case locationData.LEAVE_ACTION :
                    $scope.silvesterDialogNextButtonAction = "";
                    $scope.stopDialog(locationData.LEAVE);
                    break;
            }

        }else{
        
            var __dialog_text = silvester.nextState();
            
            if(__dialog_text.indexOf("Digital") > 0){
                var __d1 = __dialog_text.indexOf("Digital");
                var __d2 = String("Digital").length;
                var __nn = "Digital";
                switch(map.selectedDepartment){
                    case 'TV' :
                        __nn = "Теле и видео аппаратуры";
                        break;
                    case 'HOME' :
                        __nn = "Бытовой техники";
                        break;                    
                    default :
                        __nn = "";
                }
                if(__nn){
                    var __s1 = __dialog_text.substr(0, __d1);
                    var __s2 = __dialog_text.substr(__d1 + __d2);
                    __dialog_text = __s1 + __nn + __s2;
                }
            }
            
            $scope.showHelper(__dialog_text, "");
        }
    };
     
    $scope.showInfoPopup = function(__popup_id){
        $scope.showGameStatisticsDisplay = false;
        $scope.showGameStructureDisplay = false;
        $scope.infoDialogVisible = false;
        //$scope.mapDialogVisible = false;      
        $scope.map.visible = false;
        switch (__popup_id){
            case "STATISTIC":
                $scope.showGameStatisticsDisplay = true;
                break;
            case "STRUCTURE" :
                $scope.showGameStructureDisplay = true;
                break;
            case "INFO" :
                $scope.infoDialogVisible = true;
                break;
            case "MAP" :
                //$scope.mapDialogVisible = true; 
                $scope.map.visible = true;
                break;                
        }
    }
    
    $scope.startDialog = function(__data, __x, __y){  
        
        $scope.locationID = __data["product"];
        
        customers.setCurrent(__data["id"]);
        customers.location = $scope.locationID;
        
        $scope.startDialogPopup = true;
         
        $scope.silvesterDialogNextButtonAction = "";
        
         //__x = __x - 40;
         
        $("#startDialogPopupID").draggable();
        
         var elem_w = $("#startDialogPopupID").width();
         var elem_h = $("#startDialogPopupID").height();
                           
        if(__x < 0)__x = 0;        
        if(__x > $scope.window_width)__x = $scope.window_width - elem_w;

        //__y = __y - (197 + 40);
        __y = __y - elem_h;

        if(__y < 32)__y = 32;
        if(__y > ($scope.window_height - 40 - elem_h))__y = $scope.window_height - 40 - elem_h;
                
        __test_helper_position_on_screen(__x, __y);
                
        $("#startDialogPopupID").css({
            'top': __y,
            'left': __x                
        });        
            
        if(confirmStartDialogTimer)$timeout.cancel(confirmStartDialogTimer);            
        /*
        confirmStartDialogTimer = $timeout(function(){
            //$scope.cancelStartDialog();
        }, _bonusActionSelectionTimeout);
        */  
    };
    
    $scope.cancelStartDialog = function(){
         $scope.startDialogPopup = false;
         if($scope.gameInDialog){
             
         }else{
            if(ige && ige.client)ige.client.resumeGameAfterDialog(-1);
         }
    };
    
    $scope.confimStartDialog = function(){
        
        $scope.startDialogPopup = false;
        $scope.silvesterDialogNextButtonAction = "";
        
        switch($scope.locationID){
            /*
            case "NOTEBOOK_DEMO" :
                locationData.setData(locationNotebookDemo);
                break;
            case "SMARTPHONE_DEMO" :
                locationData.setData(locationSmartphoneDemo);
                break;
            */
            case "NOTEBOOK" :
                if(customers.customer["id"].toUpperCase().indexOf("DEMO") > 0){
                    //locationData.setData(locationNotebookDemo);
                    if(locationNotebookDemo == undefined)
                        locationData.loadLocation("notebook_demo");
                    else
                        locationData.setData(locationNotebookDemo);
                }else{
                    //locationData.loadLocation("notebook_demo");
                    locationData.loadLocation($scope.locationID);
                }
                break;
            case "SMARTPHONE" :
                if(customers.customer["id"].toUpperCase().indexOf("DEMO") > 0){
                    //locationData.setData(locationSmartphoneDemo);
                    if(locationSmartphoneDemo == undefined)
                        locationData.loadLocation("smartphone_demo");
                    else
                        locationData.setData(locationSmartphoneDemo);                    
                }else{
                    locationData.loadLocation($scope.locationID);
                }
                break;                
            default:
                locationData.loadLocation($scope.locationID);
                //return;
        }
        $scope.lastDialogResult = -1;
        
        $scope.stopBonusDialog();
        
        $scope.gameInDialog = true;
        $scope.helperFinallyPhrase = false;
        
        
        if($scope.salesCounter === 0){
            $scope.silvesterDialogActive = true;
        }else{
            $scope.silvesterDialogActive = false;
        }

        
        //диалог в игре запускается после загрузки данных локации и диалогов
        // locationData.traectory_ready - здесь
        if(locationData.dialog_type === locationData.DEMO_DIALOG){
            /*
            if($scope.startSilvesterDialog(2)){
                //диалог не закончен - меню продавца после чтения диалога помошника
                $scope.showSalesmanDialog(1, false);
            }else{
                $scope.showSalesmanDialog(1, true);
            }
            $scope.gameInDialog = true;
            $scope.helperFinallyPhrase = false;            
            if(ige && ige.client)ige.client.gameInDialog();
            */
        }else{
            //ждем загрузки данных локации и далогов
            //и вызываем этот код: 
            //$scope.showSalesmanDialog(1, true);
            //if(ige && ige.client)ige.client.gameInDialog();
        }        
        
        //if(ige && ige.client)ige.client.gameInDialog();
        
    };
    
    $scope.stopDialog = function(dialog_rezult, __helper_text){
        
        locationData.location_demo_ready = false;
        
        $scope.salesmanDialogVisible = false;        
        $scope.customerDialogVisible = false;        
        $scope.leaveDialogVisible = false;        
        $scope.boughtDialogVisible = false;
        
        $scope.silvesterDialogNextButtonAction = "";
        $scope.lastGamePhase = silvester.setPhase(0);
                
        if(dialog_rezult === locationData.LEAVE){
            $scope.lastDialogResult = -1;
            $scope.startSilvesterDialog(4);            
        }
        
        if(dialog_rezult === locationData.BOUGHT){ 
            $scope.lastDialogResult = 0;
            
            if($scope.salesCounter <= 1){
                //первая продажа
                $scope.startSilvesterDialog(3);
            }else{
                //следующая продажа
                $scope.startSilvesterDialog(16);
            }
        }
        
        __testGameOver();
                
    };
    
    var __testGameOver = function(){
        //if(bonuses.usedBonuses() < 1){
        //if($scope.salesCounter >= $scope.maxSales && $scope.bonusCounter >= $scope.maxBonus){
        if($scope.salesCounter >= $scope.maxSales && ($scope.bonusCounter >= $scope.maxBonus || bonuses.usedBonuses() >= bonuses.totalBonuses())){
        //if(($scope.bonusCounter >= $scope.maxBonus || bonuses.usedBonuses() >= bonuses.totalBonuses())){
            $scope.gameOver();
        }else{
        }        
    };
    
    $scope.doExit = function(){
        if($scope.gameInDialog){
            $scope.exitFromDialogMode();
        }else if($scope.gameInBonus){
            $scope.stopBonusDialog();
        }else{
            $scope.gameOver();
        }        
    };

    $scope.doCancelGameDialogMode = function(){
        if($scope.gameInDialog){
            $scope.exitFromDialogMode();
        }else if($scope.gameInBonus){
            $scope.stopBonusDialog();
        }else{
        }        
    };
    
    $scope.gameOver = function(){
        $scope.startSilvesterDialog(15); 
    };
    
    $scope.exitFromDialogMode = function(){
        $scope.gameInDialog = false;
        $scope.lastGamePhase = 1;
        $scope.silvesterDialogNextButtonAction = "";        
        silvester.setPhase(0);
        $scope.invokeSilvester();
        if(ige && ige.client)ige.client.resumeGameAfterDialog($scope.lastDialogResult);        
    }; 
    
    $scope.startPlayerIdleTimer = function(){
    };
    
    $scope.stopIdleTimer = function(){
        if(idleTimer)$timeout.cancel(idleTimer);
    };
    
    $scope.resetIdleTimer = function(){
    };
    
    $scope.resetDialog = function(){
        
        locationData.reset();
        
        $scope.gameInDialog = false;
        $scope.salesmanDialogVisible = false;        
        $scope.customerDialogVisible = false;        
        $scope.leaveDialogVisible = false;        
        $scope.boughtDialogVisible = false;
        
        $scope.silvesterDialogNextButtonAction = "";
    };    

    $scope.showPhase = function(__phase){      
        if(!__phase)__phase = 1;
        phases.setPhase(__phase);
        __phase_emotion = phases.getPhaseEmotion();
        $scope.phasesListInDialog = phases.getPhasesInDialog();
    };


    $scope.showPhaseImage = function(__img){      
        if(__img){
            $scope.phaseImage = __img;
            $scope.phaseImageVisible = true;
        }else{        
            $scope.phaseImageVisible = false;
            $scope.phaseImage = "";
        }
    };
    
    $scope.preparePosHelperBaloon = function (){
        var __obj = locationData.getPosHelperScreenFile();
        var __style = {"left": "", "top":""};
        if(__obj){
                var __delta = $scope.window_height / 668;
                
                if(__obj["x"] > 512 ){
                     __style["left"] = __obj["x"] - 512;
                 }else{
                     __style["left"] = -1 * (512 - __obj["x"]);
                 }
                                                   
                 __style["left"] = Math.round(__style["left"] * __delta);
                 __style["left"] = __style["left"] + $scope.window_width / 2;
                 __style["left"] = __style["left"] + "px";
            
                 __style["top"] = Math.round((__obj["y"]) * __delta);
                 __style["top"] = __style["top"] + "px";                 
            
                $scope.posScreenHelper = __style;
            
        }
        var __arrow = locationData.getArrowHelperScreenFile();
        if(__arrow)$scope.arrowScreenHelper = __arrow;        
    }

    $scope.preparePosCustomerBaloon = function (){      
        var __img_h = $scope.window_height - 40 - 40;
        var __img_w = Math.round(__img_h * (1024/668));
        var __img_scale = __img_h / 668;
        
        var __customer_info = customers.getEmotionScreenInfo();
        
        if(!__customer_info)return;
        
        var __obj = {x:0, y:0};
        var __arrow = __customer_info.arrow;
        
        var __style = {"left": "", "top":"", "right":"", "bottom":""};
        if(__obj && __arrow){

            if(__customer_info["balloon"] != undefined){
                __obj["x"] = __customer_info["balloon"]["x"];
                __obj["y"] = __customer_info["balloon"]["y"];
            }
            
             var __img_out = 0;

             if(__arrow.indexOf("left") >= 0){ 
                 
                 __style["left"] = __img_out + Math.round(__obj["x"] * __img_scale);
                 __style["left"] +=  60;
                 __style["left"] = __style["left"] + "px";
                 
             }else if(__arrow.indexOf("right") >= 0){
                 __style["right"] = __img_out + Math.round((1024 - __obj["x"]) * __img_scale);
                 __style["right"] +=  60;
                 __style["right"] = __style["right"] + "px";
             }

             if(__arrow.indexOf("down") >= 0){
                 __style["bottom"] = Math.round((668 - __obj["y"]) * __img_scale);
                 //__style["bottom"] = __style["bottom"] + 40 + 40;
                 __style["bottom"] = __style["bottom"] + "px";
                                  
             }else if(__arrow.indexOf("up") >= 0){
                __style["top"] = Math.round((__obj["y"]) * __img_scale);
                __style["top"] = __style["top"] - 25;
                __style["top"] = __style["top"] + "px";                 
             }
                                    
            $scope.posScreenCustomer = __style;
            /*console.log("balloon           " + __customer_info["balloon"]["x"] + ' ' + __customer_info["balloon"]["y"] + ' ' + __img_scale);
            console.log("posScreenCustomer " + __style["left"] + ' ' + __style["top"]);
            */
        }
        
        if(__arrow)$scope.arrowScreenCustomer = __arrow;        
    }
        
    $scope.showScreen = function(__screen, __customer_visible){
            //console.log("showScreen "+__screen);           
            
            if(__customer_visible === undefined) __customer_visible = true;
            
            if(__screen === 0){
                //экран не меняется
            }else{                
                if(__screen === -1){
                // -1 экран берется из свойств покупателя
                    if(customers.customer.screen !== undefined){
                        var __scrn = parseInt(customers.customer.screen);
                        if(__scrn > 0){
                            __screen = __scrn;
                        }
                    }
                }
                //ориентация покупателя - справа / слева
                customers.dialog_position = locationData.getDialogPos(__screen);
                customers.screen = __screen;
                                
                var __sl = locationData.getScreenLeayersInfo(__screen);
                                
                if(__sl.before && __sl.back){
                    customers.ignore_emotions = false;
                    
                    $scope.locationBackground = '';
                    $scope.locationBackImage = locationData.getScreenFile(__screen, "back");
                    $scope.locationBeforeImage = locationData.getScreenFile(__screen, "before");
                    
                    $scope.locationBackImageVisible = true;
                    $scope.locationCustomerVisible = __customer_visible;
                    $scope.locationBeforeImageVisible = true;
                    
                    $scope.locationBackgroundVisible = false;
                    
                }else{
                    customers.ignore_emotions = true;
                    var __customer_background = locationData.getScreenFile(__screen);
                    if(__customer_background){                        
                        $scope.locationBackground = __customer_background;
                        
                        $scope.locationBackImageVisible = false;
                        $scope.locationCustomerVisible = false;
                        $scope.locationBeforeImageVisible = false;
                    
                        $scope.locationBackgroundVisible = true;
                    }
                }  
            }
            
            __position_location_bg_image();
            
            $scope.preparePosHelperBaloon();
            if($scope.posScreenHelper){                    
               $("#helperID").css($scope.posScreenHelper);
            }            
            $scope.preparePosCustomerBaloon();
            if($scope.posScreenCustomer){  
                $("#customerAnswerModalDialog").css($scope.posScreenCustomer);
            }
            if($scope.arrowScreenCustomer){
                $scope.customer_arrow_class = $scope.arrowScreenCustomer;
            }            
                        
            var __customer_info = customers.getEmotionScreenInfo();
            $scope.locationCustomerImage = __customer_info["image"];            
    };
    

/**
 * 
 * Управление помошником
 */

    $scope.fixHelperPosition = function(__position){
        silvester.fixHelperPosition(__position);
    };

    $scope.showHelper = function(__text, __force_action, __silvester_helper){
        
        $('#helperID').draggable(
            {
                drag: function(){
                    var offset = $(this).offset();
                    $scope.fixHelperPosition({"top":offset.top+"px", "left":offset.left+"px"});
                }
            });       
              
       
       if(__text){
           
           var __silvesterHelperId = 0;
           var __forced_position = null;
           
            if($scope.gameInDialog){
                if(silvester.selvesterType() === "SILVESTER"){
                    __silvesterHelperId = silvester.getHelperId();
                }else{
                    __silvesterHelperId = locationData.getHelperId();
                   $scope.preparePosHelperBaloon();               
                   __forced_position = $scope.posScreenHelper;                    
                }
                              
           }else if($scope.gameInBonus){               
               __silvesterHelperId = 4;
           }else{
               silvester.selvesterType("SILVESTER");
               __silvesterHelperId = silvester.getHelperId();
           }
                           
           $scope.helperDialogText = __text;
           $scope.selectHelper(__silvesterHelperId, __forced_position);                      
            
       }else{
           $scope.helperDialogText = __text;
           $scope.selectHelper(0);
           return;
       }
        
       
       $scope.silvesterDialogNextButtonVisible = silvester.existNextState(); 
       
       if(__force_action === undefined)__force_action = "";
       
       if(__force_action){
            $scope.silvesterDialogNextButtonAction = __force_action;
       }else{
           $scope.silvesterDialogNextButtonAction = silvester.getStateAction();
       }
       
       if($scope.silvesterDialogNextButtonAction){
            $scope.silvesterDialogNextButtonVisible = true;
       }
       
       if($scope.silvesterDialogNextButtonVisible){
           $("#helperDialogBody").css("padding-bottom", "12px");
       }else{
           $("#helperDialogBody").css("padding-bottom", "24px");
       }
        
        //новый экран (если есть)
        var __dialog_screen = silvester.getStateScreen();
        //подсветка элемента (если есть)
        var __dialog_elem = silvester.getStateElement();
        //кнопка - закрыть диалог
        var __dialog_close_button= silvester.getStateCloseButton();
        
        if(__dialog_screen){
            switch(__dialog_screen){
                case "sale_ok":
                    $scope.showScreen(locationData.SALE_OK_SCREEN_ID(), false);
                    //$scope.locationBackgroundVisible = true;
                    //$scope.locationBackground = locationData.SALE_OK_SCREEN();
                    break;
                case "sale_fail":
                    $scope.showScreen(locationData.SALE_FAIL_SCREEN_ID(), false);
                    //$scope.locationBackgroundVisible = true;
                    //$scope.locationBackground = locationData.SALE_FAIL_SCREEN();
                    break;
            }
        }
        
        if(__dialog_elem){
            $scope.higlightElement(__dialog_elem, true);
        }
       
        if(__dialog_close_button == "1"){
            $scope.silvesterDialogCloseButtonVisible = true;
        }else{
            $scope.silvesterDialogCloseButtonVisible = false;
            //$scope.silvesterDialogCloseButtonVisible = true;
        }
        
    };

//**********************************************************************

/**
 * 
 * управление диалогом продавец - покупатель
 */

    $scope.showSalesmanDialog  = function(__next_id, __show_salesman_menu){
        
        if(__next_id === undefined) __next_id = 1;
        if(__show_salesman_menu === undefined) __show_salesman_menu = true;
        
        $scope.salesmanDialog = locationData.getDialogByID(__next_id);
        
        if($scope.salesmanDialog.description == "Оформление кредита, шаг 2"){
            console.log($scope.salesmanDialog.description+" **********");
        }
        
        $scope.showPhase($scope.salesmanDialog.phase);
        
       if(!customers.emotion)customers.emotion = phases.getPhaseEmotion();
       $scope.showScreen($scope.salesmanDialog.screen);
        
        __position_location_bg_image();
        
        if(__show_salesman_menu) 
            if($scope.salesmanDialog.helper){
                $scope.silvesterDialogNextButtonAction = false;
                silvester.selvesterType("HELPER");
                $scope.showHelper($scope.salesmanDialog.helper);
            }
        
        $scope.selectedQuestion = -1;
        
        $scope.salesmanDialogVisible = true;       
        $scope.customerDialogVisible = false;         
        $scope.leaveDialogVisible = false;        
        $scope.boughtDialogVisible = false;        
        
        if(__show_salesman_menu){
            //анимация появления плашки
            __show_salesman_dialog_panel();
        }else{
            __hide_salesman_dialog_panel(true);
        }
        
        //console.log($scope.salesmanDialog.description);
        
        var __showCustomerQuestion = false;
        if ($scope.salesmanDialog.customer !== undefined && $scope.salesmanDialog.customer !== null){
            if($scope.last_question_type === 1 && $scope.salesmanDialog.customer.positive){
                customers.emotion = "joy";
                $scope.customerDialog["text"] = $scope.salesmanDialog.customer.positive;
                $scope.customerDialog["type"] = 1;    
                __showCustomerQuestion = true;
            }else if($scope.last_question_type === 0 && $scope.salesmanDialog.customer.negative){
                customers.emotion = "negative";
                $scope.customerDialog["text"] = $scope.salesmanDialog.customer.negative;                
                $scope.customerDialog["type"] = 0;
                __showCustomerQuestion = true;            
            }else{
                
            }        
            $scope.customerDialog["next"] = $scope.salesmanDialog.customer.next;
            $scope.customerDialog["helper"] = null;
            $scope.customerDialog["screen"] = 0;
            
            if($scope.salesmanDialog.question.length === 0){
               console.log($scope.salesmanDialog.description + "NO QUESTION !!! Is WIN ???");
               $scope.customerDialog["next"] = locationData.BOUGHT;
            }
        }else{
            if($scope.salesmanDialog.question.length === 0){
               // console.log($scope.salesmanDialog.description + "NO QUESTION !!!");
            }
        }
        
        
            
            if(__showCustomerQuestion){
                $scope.showScreen(0);
                $scope.customerDialogVisible = true;
                
                if($scope.salesmanDialog.question.length === 0){
                    $scope.customerDialogAnswerButtonVisible = true;
                }else{
                    $scope.customerDialogAnswerButtonVisible = false;
                }
                                 
                $scope.preparePosCustomerBaloon();

                if($scope.posScreenCustomer){  
                    $("#customerAnswerModalDialog").css($scope.posScreenCustomer);
                }
                if($scope.arrowScreenCustomer){
                    $scope.customer_arrow_class = $scope.arrowScreenCustomer;
                }                
            }
        
        
    };

    var __show_salesman_dialog_panel = function(){
            var __sd = $("#salesmanDialogID");
            var __height = __sd.css("height");
            var __bottom = "-" + __height;
            __sd.css({"bottom":  __bottom, "top": ""});
            __sd.animate({bottom: "0px"}, 1000);        
    };
    
    var __hide_salesman_dialog_panel = function(__immediate){
            // скрываем плашку с вопросами
            if(__immediate === undefined)__immediate = false;
            var __sd = $("#salesmanDialogID");            
            var __height = __sd.css("height");
            __height = parseFloat(__height);
            __height += 50;
            if(__immediate){
                __sd.css({bottom: "-400px"});
            }else{
                __sd.animate({bottom: "-"+__height+"px"}, 1000);
            }
    }

    $scope.okSalesmanQuestion  = function(___question){
        
        $scope.selectedQuestion = ___question;
        
        if($scope.selectedQuestion >= 0){
            
            $scope.lastGamePhase = 0;            
            silvester.setPhase(0);
            
            // скрываем плашку с вопросами                        
            __hide_salesman_dialog_panel();            
                        
            $scope.leaveDialogVisible = false;            
            $scope.boughtDialogVisible = false;

           
            $scope.last_question_type = locationData.getTypeQuestion($scope.selectedQuestion);            
            $scope.customerDialog = locationData.getAnswer($scope.last_question_type);
            
            if($scope.customerDialog){
                
                if($scope.customerDialog.type === -1){
                    //диалог начат покупателем
                    //сразу переходим к следующему вопросу
                    $scope.customerDialogVisible = false;
                    $scope.okCustomerAnswer();
                    return;
                }
                
                /**
                 * определяем эмоцию покупателя
                 */                                
                if($scope.last_question_type === 0){//отрицательный вопрос                    
                    customers.emotion = "negative";
                }else{
                    customers.emotion = phases.getPhaseEmotion();
                }
                
                /*
                 * !!! показать сначала экран, чтобы выбрать позицию помошника
                 */
                if($scope.customerDialog.screen != undefined){
                    $scope.showScreen($scope.customerDialog.screen);
                }else{
                    $scope.showScreen(0);
                }
                
                if($scope.customerDialog.text && $scope.customerDialog.next < 1000000){
                    $scope.customerDialogVisible = true;
                    $scope.customerDialogAnswerButtonVisible = true;
                    
                    $scope.preparePosCustomerBaloon();
                    
                    if($scope.posScreenCustomer){  
                        $("#customerAnswerModalDialog").css($scope.posScreenCustomer);
                    }
                    if($scope.arrowScreenCustomer){
                        $scope.customer_arrow_class = $scope.arrowScreenCustomer;
                    }
                    $scope.showHelper("");
                }else{
                    $scope.customerDialogVisible = false;
                    $scope.okCustomerAnswer();
                }
            }else{
                //не найден ответ покупателя - выходим из диалога
               $scope.showHelper("");
               $scope.customerDialog = locationData.getNegativeAnswer("Э-э-э... Спасибо, я думаю, стоит обратиться к кому-нибудь другому.");               
               $scope.customerDialogVisible = true;
               $scope.customerDialogAnswerButtonVisible = true;
               game.employTime($scope.salesmanDialog.time);                
            }
        }
    };
    
    $scope.overSalesmanQuestion  = function(___question){
        /*
        var __question = locationData.getQuestionInfo(___question);
            if(__question){                
                if(__question.helper != undefined && __question.helper){
                    $scope.showHelper(__question.helper, false);
                }else{
                   $scope.showHelper($scope.salesmanDialog.helper, false); 
                }
            }
        */
    };
   
    /*
    $scope.okCustomerAnswer  = function(){
        $scope.customerDialogVisible = false;
        
        if($scope.customerDialog.helper != undefined && $scope.customerDialog.helper){  
            var __next = $scope.customerDialog.next;
            if(__next === locationData.LEAVE || __next === locationData.STOP || __next === locationData.BOUGHT){
                $scope.helperFinallyPhrase = true;
            }
            $scope.showHelper($scope.customerDialog.helper, "analyze_customer_answer");
        }else{
            $scope.showHelper("");
            $scope.analyzeCustomerAnswer();
        }
    },
    */
    
    $scope.okCustomerAnswer  = function(){
        $scope.customerDialogVisible = false;
        silvester.selvesterType("HELPER");
        
        if($scope.customerDialog.helper != undefined && $scope.customerDialog.helper){  
            var __next = $scope.customerDialog.next;
            if(__next === locationData.LEAVE || __next === locationData.STOP || __next === locationData.BOUGHT){
                $scope.helperFinallyPhrase = true;
            }
            $scope.showHelper($scope.customerDialog.helper, "analyze_customer_answer");        
        }else{
            $scope.showHelper("");
            $scope.analyzeCustomerAnswer();
        }
        
    },
            
    $scope.analyzeCustomerAnswer  = function(){
        
        $scope.customerDialogVisible = false;
        silvester.selvesterType("HELPER");
        var __next = $scope.customerDialog.next;
        switch (__next){
            case locationData.LEAVE :
            case locationData.STOP :
                $scope.showCustomerLeave();
                $scope.okCustomerLeave("");
                break;
            case locationData.BOUGHT :
                $scope.showCustomerBought();
                $scope.okCustomerBought("");
                break;
            default :
                $scope.showSalesmanDialog(__next);
        };
        
        game.employTime($scope.salesmanDialog.time);
    };
    
    
    $scope.showCustomerLeave  = function(){
        $scope.salesmanDialogVisible = false;        
        $scope.customerDialogVisible = false;
        $scope.leaveDialogVisible = true;        
        $scope.boughtDialogVisible = false; 
    };

    $scope.showCustomerBought  = function(){
        $scope.salesmanDialogVisible = false;        
        $scope.customerDialogVisible = false;
        $scope.leaveDialogVisible = false;
        $scope.boughtDialogVisible = true;          
    };    
    
    $scope.okCustomerBought  = function(__helper_text){
        
        $scope.scoreCounter += 10;        
        $scope.salesCounter += 1;                
        __saveScopeCounter(10, "sum");
        
        $scope.helperFinallyPhrase = true;
        if(__helper_text){
            $scope.showHelper(__helper_text, locationData.BOUGHT_ACTION);
        }else{
            $scope.stopDialog(locationData.BOUGHT);
        }
                        
    };
    
    
    $scope.okCustomerLeave  = function(__helper_text){
        $scope.failsCounter++;
        $scope.helperFinallyPhrase = true;
         if(__helper_text){
            $scope.showHelper(__helper_text, locationData.LEAVE_ACTION);
         }else{
            $scope.stopDialog(locationData.LEAVE);
         }
    };
    
    var __test_helper_position_on_screen = function(__x, __y){
        return;
        if(!$scope.silvesterDialogVisible) return;
        
        var __helper_balloon_left = $("#helper_balloon_ID").css("left");
        if(__helper_balloon_left)__helper_balloon_left = parseFloat(__helper_balloon_left);
        else __helper_balloon_left = 0;
            
       // var __helper_left = $("#helperID").css("left");
        var __helper_left = $("#helperID")[0].offsetLeft;
        $("#helperID").css("left", __helper_left);
        //var __helper_right = $("#helperID").css("right");
        var __helper_top = $("#helperID")[0].offsetTop;
        
        var __helper_width = $("#helperID").css("width");
        var __helper_height = $("#helperID").css("height");        

       __helper_top = parseFloat(__helper_top);
       __helper_width = parseFloat(__helper_width);
       __helper_height = parseFloat(__helper_height);
        
        var __xx = __x + 265;
        var __yy = __y + 200;
        
        if(
            (__helper_left < __x && __helper_top < __y)            
            ||
            (__helper_left < __xx && __helper_top < __yy)
        ){        
                if(__xx < $scope.window_width / 2){
                    var ___left = __xx + 20;
                    $("#helperID").animate({"left": ___left}, 1000, "easeInOutSine");
                }else{
                    var ___left = __xx + 20;
                    $("#helperID").animate({"left": ___left}, 1000, "easeInOutSine");                    
                }
        }
        
    };
    
    $scope.closePopup = function(__popup_id){
        switch(__popup_id){
            case "START_DIALOG" :
                $scope.cancelStartDialog();
                break;
            case "BONUS_SELECTOR" :
                $scope.stopBonusDialog();
                break;                
        }
    };
  /*  
    var __test_helper_position_on_screen = function(__x, __y){
        
        if(!$scope.silvesterDialogVisible) return;
        
        var __helper_close_area = 0;
        var __helper_close_area_direction = 'NONE';        
        
            var __helper_balloon_left = $("#helper_balloon_ID").css("left");
            if(__helper_balloon_left)__helper_balloon_left = parseFloat(__helper_balloon_left);
            else __helper_balloon_left = 0;
            
            var __helper_pos = $("#helperID").css("left");
            if(__helper_pos){
                __helper_pos = parseFloat(__helper_pos);
                __helper_close_area = __helper_pos + Math.abs(__helper_balloon_left);
                __helper_close_area_direction = "LEFT";
            }else{
                __helper_pos = $("#helperID").css("right");
                if(__helper_pos)__helper_pos = parseFloat(__helper_pos);
                __helper_close_area = __helper_pos + Math.abs(__helper_balloon_left);
                __helper_close_area_direction = "RIGHT";
            }        
                
        switch(__helper_close_area_direction){
            case 'LEFT':
                if(__x < __helper_close_area){
                    var ___left = __helper_close_area - __x - 20;
                    //$("#helperID").css("left", ___left);
                    $("#helperID").animate({"left": ___left}, 1000, "easeInOutSine");
                }
                break;
            case 'RIGHT':
                if((__x+265+20) > __helper_close_area){
                    var ___right = __helper_close_area + 20 + 256;
                    //__elem.animate({top: __top}, __helper_fly_animantion_time, "easeInOutSine");
                    $("#helperID").animate({"right": ___right}, 1000, "easeInOutSine");
                }
                break;
            default:
        }  
        return __x;
    };
    */ 
/**
 * управление бонусами
 * выбираем бонус из списка
 * @param {type} __bonus_id
 * @param {type} __x
 * @param {type} __y
 * @returns {unresolved}
 */     
    $scope.selectBonusActions  = function(__bonus_id, __x, __y){
        if($scope.gameInDialog) return;
        if(!$scope.bonusEnabled) return;
        
         var elem_w = $("#bonusSelector").width();
         var elem_h = $("#bonusSelector").height();        
        
        $("#bonusSelector").draggable();
        
        if((__y-elem_h) < 0)__y = -elem_h;
        if((__y-elem_h) > ($scope.window_height-40))__y = $scope.window_height - elem_h - 40;
        
        if(__x < 0)__x = 0;
        if(__x > $scope.window_width)__x = $scope.window_width - elem_w;
                
        __test_helper_position_on_screen(__x, __y);
        
        $("#bonusSelector").css({
            'top': __y,
            'left': __x                
        });        
        
        $scope.currentBonus = null;
                        
        switch(__bonus_id){
            case "NOTEBOOK":
                $scope.currentBonus = bonuses.setBonus(1);                
                break;
            case "PAD":
            case "SMARTPHONE":
                $scope.currentBonus = bonuses.setBonus(2);
                break;  
            default:
                $scope.currentBonus = bonuses.setBonus(1);
        }
                        
        if($scope.currentBonus){
            
            if(bonuses.usedBonuses() < 1){
                //первый бонус
                $scope.startSilvesterDialog(6);   
            //следующие бонусы
            }else{ //$scope.startSilvesterDialog(10);
                //$scope.selectionBonus = true;
            }
            
            $scope.selectionBonus = true;
            
            if(selectBonusTimer)$timeout.cancel(selectBonusTimer);            
            /*
            selectBonusTimer = $timeout(function(){
                $scope.stopBonusDialog();
            }, _bonusActionSelectionTimeout);
            */      
        }else{
            $scope.stopBonusDialog();
        }
    };
    
    var __incBonusCounter = function(){
        var __bns_xnt = bonuses.getBonusAction().bonus;
        if(__bns_xnt > 0){
            $scope.scoreCounter += 1;
            __saveScopeCounter(1, "sum");
        }
        $scope.bonusCounter += __bns_xnt;
                
        if($scope.bonusCounter === 0)$scope.bonusText = "бонусов";
        if(($scope.bonusCounter % 10) === 1)$scope.bonusText = 'бонус';
        else if($scope.bonusCounter  === 2 || $scope.bonusCounter  === 3 || $scope.bonusCounter  === 4)$scope.bonusText = 'бонуса';
        else if($scope.bonusCounter  === 12 || $scope.bonusCounter  === 13 || $scope.bonusCounter  === 14)$scope.bonusText = 'бонусов';
        else if(($scope.bonusCounter % 10) === 2)$scope.bonusText = 'бонуса';
        else if(($scope.bonusCounter % 10) === 3)$scope.bonusText = 'бонуса';
        else if(($scope.bonusCounter % 10) === 4)$scope.bonusText = 'бонуса';
        else $scope.bonusText = 'бонусов';                
    };
    
    $scope.startBonusDialog  = function(__action_id){
        if($scope.gameInDialog) return;
        //if(bonuses.usedBonuses() > bonuses.totalBonuses()) return;
        
        $scope.gameInBonus = true;
        $scope.selectionBonus = false;
                
        bonuses.setAction(__action_id);                        
        bonuses.setActive(true);
        
        ige.client.hideBonusArea($scope.currentBonus.name);
        
        if(selectBonusTimer)$timeout.cancel(selectBonusTimer);
        if(startBonusTimer)$timeout.cancel(startBonusTimer);
        
        game.employTime(bonuses.getBonusAction().time);
        
        $scope.showHelper("");
        
        startBonusTimer = $timeout(function(){
            $scope.stopBonusDialog();
        }, _bonusShowTimeout);
        
    };
    
    $scope.bonusFinalizeDialog = function(){
        var __helper_phase = bonuses.getBonusAction().helper_phase;
        $scope.startSilvesterDialog(__helper_phase);
        __incBonusCounter();
    };
    
    $scope.stopBonusDialog = function(){
        $scope.gameInBonus = false;
        $scope.selectionBonus = false;
        bonuses.setActive(false);
        $scope.showHelper('');
    };       
    
    var _displaySalesCounter = function(){
        var __el = $("#salesCounterID");
        if(__el){
            __el.animate({"top": "30px", "opacity": "0"}, 500, "easeInCirc", function() {
                    var __el = $("#salesCounterID");
                    __el.text($scope.salesCounter);
                    $scope.salesText = _displayCounterTextSales($scope.salesCounter);                    
                    __el.css({"top": "-40px", "opacity": "1"});
                    __el.animate({"top": "0px"}, 1000, "easeOutBounce");                    
            });            
        }                
    };
    
    var _displayBonusCounter = function(){
        var __el = $("#bonusCounterID");
        if(__el){
            __el.animate({"top": "30px", "opacity": "0"}, 500, "easeInCirc", function() {
                    var __el = $("#bonusCounterID");
                    __el.text($scope.bonusCounter);
                    $scope.bonusText = _displayCounterTextBonus($scope.bonusCounter);                    
                    __el.css({"top": "-40px", "opacity": "1"});
                    __el.animate({"top": "0px"}, 1000, "easeOutBounce");                    
            });            
        }                
    };
    
    var _displayCounterTextSales = function(__val){
        if(__val === 0)return "продаж";
        else if( 11 <= __val && __val  <= 14)return 'продаж';                        
        else if((__val % 10) === 1)return 'продажа';
        else if((__val % 10) === 2)return 'продажи';
        else if((__val % 10) === 3)return 'продажи';
        else if((__val % 10) === 4)return 'продажи';
        else return 'продаж';        
    };
    
    var _displayCounterTextScore = function(__val){
        if(__val === 0)return "баллов";
        else if( 11 <= __val && __val  <= 14)return 'баллов';                        
        else if((__val % 10) === 1)return 'балл';
        else if((__val % 10) === 2)return 'балла';
        else if((__val % 10) === 3)return 'балла';
        else if((__val % 10) === 4)return 'балла';
        else return 'баллов';        
    };
    
    var _displayCounterTextBonus = function(__val){
        if(__val === 0)return "бонусов";
        else if( 11 <= __val && __val  <= 14)return 'бонусов';                        
        else if((__val % 10) === 1)return 'бонус';
        else if((__val % 10) === 2)return 'бонуса';
        else if((__val % 10) === 3)return 'бонуса';
        else if((__val % 10) === 4)return 'бонуса';
        else return 'бонусов';        
    };
    
    var _displayCounter = function(__el_id, __val, __scope_text){
        var __el = $("#"+__el_id);
        if(__el){
            __el.animate({"top": "30px", "opacity": "0"}, 500, "easeInCirc", function() {
                    __el.text(__val);
                    __el.css({"top": "-40px", "opacity": "1"});
                    __el.animate({"top": "10px"}, 1000, "easeOutBounce" , function(){
                        $scope.salesText = __func_text(__val);
                    });                    
            });            
        }
    };
      
    if($localStorage.mvideo_sound_volume == undefined)$scope.setSoundVolume(0.5);
    else $scope.setSoundVolume($localStorage.mvideo_sound_volume);   
   
   //$scope.bonusEnabled = true;
   //$scope.selectBonusActions("NOTEBOOK", 100, 100);
        
   // if(ige && ige.client)ige.client.showBonusArea();
   
   /*
    $scope.higlightElement("sales_counter_highlight", true);
    $scope.higlightElement("bonus_counter_highlight", true);
    $scope.higlightElement("phasesListInDialogELEM", true);
    $scope.higlightElement("statisticsButtonImg", true);
    $scope.higlightElement("exitButton", true);
    $scope.higlightElement("game_time_progress_tabl", true);
    $scope.higlightElement("game_time_progress_bar", true);
    
    $scope.higlightElement("structure_btn", true);
    $scope.higlightElement("sound_btn", true);
    $scope.higlightElement("helper_btn", true);
    $scope.higlightElement("info_btn", true);
    */
   
   //courselab
   //Run(false);   
   //__saveScopeCounter(11, "sum");
      
};


function IndexSupportCtrl($scope, $timeout) {
    
     var bg_list = [
         //'assets/loc/01_mvideo_main_splash.png',
         'assets/loc/01_mvideo_main_splash_2.png'
         //'assets/loc/01_mvideo_main_splash_3.png'
     ];
    
     var index_bg = 0;
    
     $scope.showIndex = false;
     $scope.showStartButton = false;
     $scope.locationBackground = bg_list[index_bg];
     
     $scope.window_width = 0;
     $scope.window_height = 0;
     
    $scope.$watch('window_width', function(){
        $scope.onResizeActions($scope.window_width, $scope.window_height);
    });

    $scope.$watch('window_height', function(){
        $scope.onResizeActions($scope.window_width, $scope.window_height);
    });
    
    $scope.onResizeActions  = function(__w, __h){
        var img = $("#location_background_image");
        img.height(__h);
        var offset = img.offset();
        var dy = img.height() / 768;
        var __top = 490 * dy;
        var __left = offset.left + dy * 135;
        $("#start_button").css({
            'top': __top,
            'left': __left                
        });        
    };
    
     
     $timeout(function(){
        $scope.showIndex = true;            
     }, 1000);

     $timeout(function(){
        $scope.onResizeActions($scope.window_width, $scope.window_height);
        $scope.showStartButton = true;            
     }, 500);
     
};


function videoRotatorCtrl($scope, $timeout, utils) {
     
    $scope.videoNumber = 0;    
    
    //$scope.videoFiles = ["v_2_3_4", "v_4", "v_5", "v_6", "v_7", "v_10", "v_13", "v_15"];
    $scope.videoFiles = ["v_intro"];
    $scope.videoTotal = $scope.videoFiles.length;
    $scope.videoFile = $scope.videoFiles[$scope.videoNumber];
    
    $scope.window_width = 0;
    $scope.window_height = 0;
     
    $scope.$watch('window_width', function(){
        //$scope.onResizeActions($scope.window_width, $scope.window_height);
    });

    $scope.$watch('window_height', function(){
        //$scope.onResizeActions($scope.window_width, $scope.window_height);
    });
    
    $scope.startVideo = function(){
            try {
            
                var browser = utils.browser();
            
                if(browser.browserType === "Safari" || browser.browserType === "IE") {
                    $('#video').attr('src', "assets/intro/"+"v_intro.mp4");
                }else if(browser.browserType === "Firefox"){
                    $('#video').attr('src', "assets/intro/"+"v_intro.ogv");                    
                } else {
                    $('#video').attr('src', "assets/intro/"+"v_intro.webm");
                };

                $('#video').load();
                $('#video').play();
            }catch(err){};                
    };
    
    $scope.loadVideo = function(){
        if($scope.videoNumber < $scope.videoTotal){
            $scope.videoFile = $scope.videoFiles[$scope.videoNumber];
        }else{
             $scope.endVideo();
        }
    };
    
    $scope.endVideo = function(){
        document.location.replace("intro/vhelp_16_17.html");
    };
    
    $scope.startVideo();
    
};

function videoBonusCtrl($scope, $timeout, bonuses, utils) {
    
    bonuses.setRotator($scope);
    
    $scope.gameInBonus = false;
    
    $scope.videoNumber = 0;    
    
    $scope.videoFile = "999";
    
    $scope.window_width = 0;
    $scope.window_height = 0;
     
    $scope.$watch('window_width', function(){
        //$scope.onResizeActions($scope.window_width, $scope.window_height);
    });

    $scope.$watch('window_height', function(){
        //$scope.onResizeActions($scope.window_width, $scope.window_height);
    });
    
    $scope.loadVideo = function(){
        $scope.endVideo();
    };
    
    $scope.endVideo = function(){        
        $('#video').attr('src', "");
        if($scope.gameInBonus){
            $scope.gameInBonus = false;
            bonuses.rotatorEnded();
        }
    };
            
    $scope.initVideo = function(__video_file){ 
        if(__video_file){
            $scope.videoFile = __video_file;            
            try {
                $scope.gameInBonus = true;
                var browser = utils.browser();
            
                if(browser.browserType === "Safari" || browser.browserType === "IE") {
                    $('#video').attr('src', __video_file+".mp4");
                }else if(browser.browserType === "Firefox"){
                    $('#video').attr('src', __video_file+".ogv");
                }else {
                    $('#video').attr('src', __video_file+".webm");
                };

                $('#video').load();
                $('#video').play();
                $scope.gameInBonus = true;
            }catch(err){};        
        }else{
            $scope.gameInBonus = false;
        }
    };   
    
};

function ImageRotatorCtrl($scope, $timeout, bonuses) {
    
    bonuses.setRotator($scope);
    
    $scope.isActive = bonuses.ACTIVE;
    
    $scope.showIndex = true;
    
    $scope.videoTotal = 1;
    $scope.videoNumber = 1;
    $scope.videoFile = 'v1';
    
    $scope.imagesReady = false;
    $scope.imagesTotal = 54;
    $scope.imagesLoaded = 0;
    $scope.imagesLoadedPercent = 0;
    
        $scope.cycleNum = 2;
        $scope.currentCycleNum = 0;    
    
    $scope.imageFrame = 0;
    
    $scope.images_path = bonuses.getPath;    
    $scope.images = [];
         
     $scope.window_width = 0;
     $scope.window_height = 0;
     
    $scope.$watch('window_width', function(){
        $scope.onResizeActions($scope.window_width, $scope.window_height);
    });

    $scope.$watch('window_height', function(){
        $scope.onResizeActions($scope.window_width, $scope.window_height);
    });
    
    $scope.onResizeActions  = function(__w, __h){
        
        var rotator_div = $("#rotator");
        if(rotator_div){
            var __xx = (__w - ((__h/668) * 1024)) / 2;
            __xx = Math.round(__xx);
            rotator_div.css({"left": __xx+"px"});
        }   
        
        var __img = $("#bonus_rotator_screen");
        
        var __wi = Math.round((__h / 668) * 1024);
        
        if(__img){
            __img.css({"width":__wi+"px", "height:": __h+"px"});
        }
    };
    
    $scope.init = function(_arr, _cnt){
        $scope.cycleNum = _cnt;
        $scope.currentCycleNum = 0;
        $scope.imagesReady = false;
        $scope.imagesLoaded = 0;
        $scope.imagesTotal = _arr.length;
        $scope.imageFrame = 0;
        $scope.images = [];
        for(var __i=0; __i < _arr.length; __i++){
           $scope.images[__i] = bonuses.getPath() + _arr[__i];
        }
    };
    
    $scope.loadVideo = function(){
        if($scope.videoNumber <= $scope.videoTotal){
            $scope.videoFile = 'v'+$scope.videoNumber;
        }else{
             $scope.endVideo();
        }
    };
    
    $scope.end_rotate = function(){
        $scope.currentCycleNum++;
        if($scope.currentCycleNum >= $scope.cycleNum){
            //$scope.end_rotate();
            bonuses.rotatorEnded();
        }else{
            $scope.imageFrame = 0;
            $scope.next_rotate();
        }
    };
    
    $scope.endVideo = function(){
    };
    

    $scope.imageLoaded = function(){
        $scope.imagesLoaded++;
        //console.log("imagesLoaded= "+$scope.imagesLoaded);
        $scope.imagesLoadedPercent = Math.round(($scope.imagesLoaded / $scope.imagesTotal) * 100);
        if($scope.imagesLoaded >= $scope.imagesTotal){ 
            $scope.imagesLoadedPercent = 100;
            // Устанавливаем прозрачность всех картинок в 0
            $('div#rotator ul li').css({opacity: 0.0, height: "100%"});
            
            // Берем первую картинку и показываем ее
            
            var current = $('div#rotator ul li:first');
            current.css({opacity: 0.0, height: "100%"}); 
            current.animate({opacity: 1.0}, 100);
            //current.addClass('show');
                                   
            $scope.imagesReady = true;
            
            $scope.imageFrame++;
            
           $scope.onResizeActions($scope.window_width, $scope.window_height);                        
            
            $scope.rotate(); 
            //$scope.next_rotate();
        }
    };

    $scope.next_rotate = function(){
        $timeout(function(){
             $scope.rotate();
        }, 1000);    
    };
    
    $scope.rotate = function() {	
        // Берем первую картинку
        var current = ($('div#rotator ul li.show')?  $('div#rotator ul li.show') : $('div#rotator ul li:first'));

        // Берем следующую картинку, когда дойдем до последней начинаем с начала
        var next = ((current.next().length) ? ((current.next().hasClass('show')) ? $('div#rotator ul li:first') :current.next()) : $('div#rotator ul li:first'));	

        // Расскомментируйте, чтобы показвать картинки в случайном порядке
        // var sibs = current.siblings();
        // var rndNum = Math.floor(Math.random() * sibs.length );
        // var next = $( sibs[ rndNum ] );

        // Подключаем эффект растворения/затухания для показа картинок, css-класс show имеет больший z-index
        next.css({opacity: 0.0});
        next.addClass('show');
        //next.css({height: "100%", width: "100%"});
        next.css({height: "100%"});
        next.animate({opacity: 1.0}, 100);

        // Прячем текущую картинку
        current.animate({opacity: 0.0}, 500)
        //current.css({opacity: 0.0})
        .removeClass('show');
        
        $scope.onResizeActions($scope.window_width, $scope.window_height);
        
        $scope.imageFrame++;
        if($scope.imageFrame > $scope.imagesTotal){
            // game
            $scope.end_rotate();
        }else{
            $scope.next_rotate();
        }
    }
                    
};


function mapCtrl($scope, $timeout, map) {
    $scope.map = map;
    
    $scope.window_width = 0;
    $scope.window_height = 0;    
    
    $scope.map.showCurrentDepartment();
        
    $scope.mouseOverMetod = function(__event){
        $scope.map.testDepartment(__event.offsetX, __event.offsetY);
    };
    $scope.mouseLeaveMetod = function(__event){
        $scope.map.showCurrentDepartment();
    };    
    $scope.mouseClickMetod = function(__event){
        $scope.map.setDepartment();
        $scope.map.visible = false;
        $scope.map.selectDepartment();        
    };  
    
    var __resize = function(){
        if($scope.map.visible){
            
            var __margin_left = 0;
            var __margin_top = 0;
            var __img_h = 668;
            var __img_w = 926;
            if($scope.window_height > (668 + 200)){
                $scope.map.currentScale = 1;
            }else{
                $scope.map.currentScale = ($scope.window_height-200) / __img_h;
                
                __img_h = Math.round(__img_h * $scope.map.currentScale);
                __img_w = Math.round(__img_w * $scope.map.currentScale);                
            }
            __margin_left = ($scope.window_width - __img_w)/2;
            __margin_top = ($scope.window_height - __img_h)/2;
            
            __margin_left = Math.round(__margin_left)+'px';
            __margin_top = Math.round(__margin_top)+'px';
                    
            $(".map-image").height(__img_h);        
            $(".map-image").width(__img_w);
            //$(".map-image").css({"left": __margin_left, "top": __margin_top});
            
            __margin_left = parseFloat(__margin_left)+'px';
            __margin_top = parseFloat(__margin_top)-40 +'px';            
            $("#mapDialog").css({width: __img_w+"px", height: __img_h+40+"px", "left": __margin_left, "top": __margin_top});
        }        
    }
    
    $scope.$watch('window_width', function(){ 
       __resize();
    });

    $scope.$watch('window_height', function(){
       __resize(); 
    });
    
    $scope.$watch('map.visible', function(){
       __resize(); 
    }); 
    
    $scope.okMap = function(){
        $scope.map.visible = false;
        $scope.map.selectDepartment();
    }
};



function audioCtrl($scope, game) {
    
    $scope.game = game;
    
    $scope.path = 'assets/sound/';
    $scope.track = -1;        
    $scope.tracks = [        
        //{'mp3':'PHONE.mp3', 'ogg':'PHONE.ogg'}
        {'mp3':'bg.mp3', 'ogg':'bg.ogg'}
    ];
    $scope.cycle = true;
    $scope.src = '';
    
    $scope.volume_change = -0.1;
    
     $scope.$watch('game.play_background_sound', function(newValue, oldValue){
        if(newValue){
            if(0 <= $scope.track && $scope.track < $scope.tracks.length){
                $("#audio_bg")[0].play();
            }else{
                $scope.next();
            }
        }else{
            $("#audio_bg")[0].pause();
            //$("#audio_bg").play();            
        }
    });
    
     $scope.$watch('game.sound_volume', function(newValue, oldValue){
         if(0 <= newValue && newValue <= 1){
            $("#audio_bg")[0].volume = newValue;
         }
    });    
    
    $scope.next = function(){
        $scope.track++;
        var __obj = null;
        if($scope.track < $scope.tracks.length){
            __obj = $scope.tracks[$scope.track];
        }else{
            if($scope.cycle){
                 $scope.track = 0;
                 __obj = $scope.tracks[$scope.track];
            }
        }
        
        if(__obj){
            if($("#audio_bg")[0].canPlayType("audio/mpeg")){
                $scope.src = $scope.path + __obj.mp3;
            }else{
                $scope.src = $scope.path + __obj.ogg;
            }
            
            $('#audio_bg').attr('src', $scope.src);
            $("#audio_bg")[0].load();
            $("#audio_bg")[0].play();
        }

    };
    
};
