'use strict';

/* Controllers */
function ApplicationCtrl($scope) {    
};

function GameSupportCtrl($scope, $timeout, game, silvester, locationData, bonuses, phases) {
     
    $scope.version = '28.06.2013';
    
    var _idleTimeout = 10 * 1000;
    var idleTimer ;
    var selectBonusTimer;
    var startBonusTimer;
    var confirmStartDialogTimer;
    
    var _bonusActionSelectionTimeout = 5 * 1000;
    var _bonusShowTimeout = 30 * 1000;
    var _bonusShowCycleCount = 1; 
    
    var __mouseDown = false;
    
    /**
     * Helper
     */
    
    var __helper_path = "assets/helper/";
    
    $scope.helper_id = 1;
    
    $scope.helper_path = "";
    
    $scope.helper_img_up = "";
    $scope.helper_img_down = "";
    $scope.helper_img_body = "";

    $scope.helper_img_down_visible = false;
    $scope.helper_img_up_visible = false;

    $scope.helper_arrow_class = "";
    
    var __helper_animantion_time = 150;
    var __helper_animantion_timer = null;
    
    $scope.selectHelper = function(__helper_id){
        
        $scope.helper_id = __helper_id;
        
        if(__helper_id > 0){            
            $scope.helper_path = __helper_path + __helper_id + "/";

            $scope.helper_img_up = $scope.helper_path + "w_up.png";
            $scope.helper_img_down = $scope.helper_path + "w_down.png";
            $scope.helper_img_body = $scope.helper_path + "body.png";

            $scope.silvesterDialogVisible = true;
            
            silvester.setCurrentHelperId(__helper_id);
            var __saved_position = silvester.getHelperPosition();
            
            var __wing_up = silvester.getAnimationInfo("wing_up");
            var __wing_down = silvester.getAnimationInfo("wing_down");
            var __balloon = silvester.getAnimationInfo("balloon");
            var __body = silvester.getAnimationInfo("body");
            var __arrow = silvester.getAnimationInfo("arrow");
            var __position = silvester.getAnimationInfo("position");

            if(__saved_position) __position = __saved_position;
            
            $("#helper_img_up").css(__wing_up);
            $("#helper_img_down").css(__wing_down);
            $("#helper_img_body").css(__body);
            $("#helper_balloon_ID").css(__balloon);
            $("#helperID").css(__position);

            $scope.helper_arrow_class = __arrow;
                        
            __tickHelperAnimation();
                        
        }else{
            $scope.silvesterDialogVisible = false;
            if(__helper_animantion_timer)$timeout.cancel(__helper_animantion_timer);
        }
        
        
        
    };

    var __tickHelperAnimation = function(){
                if($scope.helper_img_down_visible && $scope.helper_img_up_visible){
                   $scope.helper_img_down_visible = true; 
                   $scope.helper_img_up_visible = false;
                }else if($scope.helper_img_down_visible && !$scope.helper_img_up_visible){
                   $scope.helper_img_down_visible = false; 
                   $scope.helper_img_up_visible = true;
                }else if(!$scope.helper_img_down_visible && $scope.helper_img_up_visible){
                   $scope.helper_img_down_visible = true; 
                   $scope.helper_img_up_visible = false;
                }else{
                   $scope.helper_img_down_visible = false; 
                   $scope.helper_img_up_visible = true;                    
                } 
                
            __helper_animantion_timer = $timeout(function (){
                __tickHelperAnimation();
            }, __helper_animantion_time);                
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
    
    $scope.customerDialogVisible = false;
    
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
    
    $scope.bonusCounter = 0;
    $scope.salesCounter = 0;
    $scope.scopeCounter = 0;
    $scope.failsCounter = 0;
    
    $scope.locationBackground = '';
    
    $scope.posScreenHelper = null;
    $scope.arrowScreenHelper = null;

    $scope.posScreenCustomer = null;
    $scope.arrowScreenCustomer = null;

    $scope.gameStructureImage = "assets/scheme.png";
    
    $scope.allowSelectCustomer = false;
    
    $scope.silvesterDialogVisible = false;
    $scope.silvesterDialogFooterVisible = false;
    $scope.silvesterImageVisible = false;
    $scope.silvesterDialogNextButtonVisible = true;
    $scope.silvesterDialogNextButtonAction = "";
    $scope.silvesterDialogText = "";
    $scope.sivester_main_img = 'assets/dialog/silvester_d_l_1.png';
    
    $scope.gameProgressInfo = game.getGameProgressInfo();    
    $scope.time = $scope.gameProgressInfo.time;
    
    $scope.$watch('time', function(){
        $timeout(function(){
            $scope.gameProgressInfo = game.getGameProgressInfo();
            $scope.time = $scope.gameProgressInfo.time;            
        },game.timerInterval);
    });
    
    
    $scope.$watch('window_width', function(){       
       if($scope.window_width < 1024){
        $("#game_time_progress_bar").width($scope.window_width);
            var __ww = $scope.window_width - 540;
            if(__ww < 50)__ww = 50;
            $("#game_time_progress_bar").width(__ww);
       }else{
           $("#game_time_progress_bar").width(450);
       }
              
        $scope.preparePosHelperBaloon();        
        if($scope.posScreenHelper){                    
            $("#helperDialog").css($scope.posScreenHelper);
        }

        $scope.preparePosCustomerBaloon();
        if($scope.posScreenCustomer){                    
            $("#customerAnswerModalDialog").css($scope.posScreenCustomer);
        }
              
    });

    $scope.$watch('window_height', function(){
        $("#location_background_image").height($scope.window_height);
        //$("#bonus_rotator_screen").height($scope.window_height);
        //$("#div#rotator").height($scope.window_height);
        //$scope.initSalesmanDialogPosition();
        
        $scope.preparePosHelperBaloon();        
        if($scope.posScreenHelper){                    
            $("#helperDialog").css($scope.posScreenHelper);
        }

        $scope.preparePosCustomerBaloon();
        if($scope.posScreenCustomer){                    
            $("#customerAnswerModalDialog").css($scope.posScreenCustomer);
        }
                
    });
    
    
    var __tooltype_options = {delay: { show: 500, hide: 100}, placement: "bottom" };
    $('#sales_counter').tooltip(__tooltype_options);
    $('#bonus_counter').tooltip(__tooltype_options);
    //$('#game_time_progress').tooltip(__tooltype_options);
    $('#game_time_left').tooltip(__tooltype_options);
    $('#game_time_right').tooltip(__tooltype_options);
    $('#game_time_progress_bar').tooltip(__tooltype_options);    
    $('#statisticsButton').tooltip(__tooltype_options);
    $('#exitButton').tooltip(__tooltype_options);
    
    
    __tooltype_options = {delay: { show: 500, hide: 100}, placement: "top"};
    $('#MVideo_logo').tooltip(__tooltype_options);
    $('#structure_btn').tooltip(__tooltype_options);
    $('#sound_btn').tooltip(__tooltype_options);
    $('#helper_btn').tooltip(__tooltype_options);
    $('#info_btn').tooltip(__tooltype_options);
    
    
    /*
    $scope.locationID = "NOTEBOOK";
    $scope.confimStartDialog();
      */  
    
    $scope.customerInTargetArea  = function(__customer_info){
        if(__customer_info.type === "active"){
            
        }
    };                            
           
    $scope.invokeSilvester = function(){        
        if($scope.silvesterDialogVisible){
           $scope.silvesterDialogVisible = false; 
        }else{
           
           $scope.lastGamePhase = silvester.setPhase(1);            
            if(silvester.phaseComplete()){
                $scope.lastGamePhase = silvester.setPhase(5);
                if(silvester.phaseComplete()){
                    $scope.lastGamePhase = silvester.setPhase(0);
                }
            }
            
            $scope.startSilvesterDialog($scope.lastGamePhase);
        }
    }
    
    $scope.startSilvesterDialog = function(__phase){
        
        if($scope.gameInBonus)return;
                
            silvester.setPhase(__phase);
            if(silvester.phaseComplete()){
                return;
            }
            
            $scope.silvesterDialogVisible = true;
            $scope.lastGamePhase = __phase;            
            $scope.nextSilvesterDialog();        
        
    };
    
    $scope.initSalesmanDialogPosition = function(){
        var __hhh = $("#salesmanDialogID").css("height");
        var __dh = $scope.window_height - 40 - __hhh.substr(0, __hhh.length-2);
        var __hhh = $("#salesmanDialogID").css({"top": __dh+"px", "bottom": ''});        
    };
    
    $scope.okGameOver = function(){
        document.location.replace("index.html");
    };
    
    $scope.higlightElement = function(__dialog_elem){
      /*
       * TODO - сделать подсветку элемента
       */  
    };
    
    $scope.nextSilvesterDialog = function(){
        //следующий текст диалога
        
        if($scope.silvesterDialogNextButtonAction){
            switch($scope.silvesterDialogNextButtonAction){
                case "close_dialog_mode" :
                    $scope.exitFromDialogMode();
                    break;                
                case "show_bonus_area" :
                    if(ige && ige.client)ige.client.showBonusArea();
                    break;
            }
            $scope.silvesterDialogNextButtonAction = "";
            $scope.showHelper("");
        }else{
        
            var __dialog_text = silvester.nextState();

            if(!$scope.allowSelectCustomer && silvester.allowSelectCustomer()){
                $scope.allowSelectCustomer = true;
                if(ige && ige.client)ige.client.setAllowSelectCustomer(true);
            }

            $scope.showHelper(__dialog_text);
        }
    };
        
    $scope.startDialog = function(location_id, __x, __y){                        
            $scope.locationID =  location_id;  
            $scope.startDialogPopup = true;
            
         __x = __x - 40;
        if(__x < 0)__x = 0;
        if(__x > $scope.window_width)__x = $scope.window_width - 265;

        __y = __y - (197 + 40);

        if(__y < 32)__y = 32;
        if(__y > ($scope.window_height - 40))__y = $scope.window_height - 40;
                
        $("#startDialogPopupID").css({
            'top': __y,
            'left': __x                
        });        
            
            if(confirmStartDialogTimer)$timeout.cancel(confirmStartDialogTimer);            
            confirmStartDialogTimer = $timeout(function(){
                $scope.cancelStartDialog();
            }, _bonusActionSelectionTimeout);
            
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
        
        switch($scope.locationID){
            case "NOTEBOOK" :
                locationData.setData(locationNotebook);
                break;
            case "SMARTPHONE" :
                locationData.setData(locationSmartphone);
                break;
            default:
                return;
        }
        
        $scope.stopBonusDialog();
        
        silvester.setPhase(2);
                        
        $scope.gameInDialog = true;
        
        $scope.stopIdleTimer();
                        
        $scope.showSalesmanDialog();   
        
        $scope.startSilvesterDialog(2);
        
        if(ige && ige.client)ige.client.gameInDialog();
        
    },
    
    $scope.stopDialog = function(dialog_rezult, __helper_text){
        
        $scope.salesmanDialogVisible = false;        
        $scope.customerDialogVisible = false;        
        $scope.leaveDialogVisible = false;        
        $scope.boughtDialogVisible = false;
                
        if(dialog_rezult === locationData.LEAVE){
            $scope.lastDialogResult = -1;
                $timeout(function(){
                    $scope.startSilvesterDialog(4);                    
                },500);
        }
        
        if(dialog_rezult === locationData.BOUGHT){ 
            $scope.lastDialogResult = 0;
            $timeout(function(){
                $scope.startSilvesterDialog(3);
            },500);                                                
        }
                
        if($scope.salesCounter >= 3){
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
            $scope.exitFromGame();
        }
        
    };
        
    $scope.exitFromGame = function(){
        $scope.gameOver();
    };
    
    $scope.gameOver = function(){
        $scope.showHelper("");
        $scope.gameOverDialogVisible = true;        
    };
    
    $scope.exitFromDialogMode = function(){
        $scope.gameInDialog = false;
        $scope.lastGamePhase = 1;
        $scope.invokeSilvester();
        if(ige && ige.client)ige.client.resumeGameAfterDialog($scope.lastDialogResult);        
    }; 
    
    $scope.startPlayerIdleTimer = function(){
        /*
        idleTimer = $timeout(function(){
            if(silvester.getPhase() !== 1 && !$scope.selectionBonus && !$scope.gameInBonus){
                $scope.startSilvesterDialog(5);
            }
        },_idleTimeout);        
        */
    };
    
    $scope.stopIdleTimer = function(){
        if(idleTimer)$timeout.cancel(idleTimer);
    };
    
    $scope.resetIdleTimer = function(){
        //$scope.stopIdleTimer();
        //$scope.startPlayerIdleTimer();
    };
    
    $scope.resetDialog = function(){
        
        locationData.reset();
        
        $scope.gameInDialog = false;
        $scope.salesmanDialogVisible = false;        
        $scope.customerDialogVisible = false;        
        $scope.leaveDialogVisible = false;        
        $scope.boughtDialogVisible = false;
    };    

    $scope.showPhase = function(__phase){      
        if(!__phase)__phase = 1;
        phases.setPhase(__phase);
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
        if(__obj){
             var __delta = $scope.window_height / 668;

            __obj["margin-top"] = Math.round(__obj["margin-top"] * __delta);
            __obj["margin-left"] = Math.round(__obj["margin-left"] * __delta);

            __obj["margin-top"] = __obj["margin-top"] + "px";
            __obj["margin-left"] = __obj["margin-left"] + "px";
            $scope.posScreenHelper = __obj;
        }
        var __arrow = locationData.getArrowHelperScreenFile();
        if(__arrow)$scope.arrowScreenHelper = __arrow;        
    }

    $scope.preparePosCustomerBaloon = function (){
        var __obj = locationData.getPosCustomerScreenFile();
        var __arrow = locationData.getArrowCustomerScreenFile();
        var __style = {"left": "", "top":"", "right":"", "bottom":""};
        if(__obj && __arrow){
             var __delta = $scope.window_height / 668;

             var __w = $("#customerAnswerModalDialog").css("width");
             var __h = $("#customerAnswerModalDialog").css("height");
                         
             if(__arrow.indexOf("left") >= 0){                 
                 if(__obj["x"] > 512 ){
                     __style["left"] = __obj["x"] - 512 - 66;
                 }else{
                     __style["left"] = -1 * (512 - __obj["x"] - 66);
                 }
                 
                 __style["left"] = Math.round(__style["left"] * __delta);
                 __style["left"] = __style["left"] + $scope.window_width / 2;
                 __style["left"] = __style["left"] + "px";
                 
             }else if(__arrow.indexOf("right") >= 0){
                 if(__obj["x"] > 512 ){
                     __style["right"] = __obj["x"] - 512 - 66;
                 }else{
                     __style["right"] = -1 * (512 - __obj["x"] + 66);
                 }
                 
                 __style["right"] = Math.round(__style["right"] * __delta);
                 __style["right"] = $scope.window_width / 2 - __style["right"];
                 __style["right"] = __style["right"] + "px";
             }

             if(__arrow.indexOf("down") >= 0){
                 
                 __style["bottom"] = 668 - __obj["y"] - 30;                 
                 __style["bottom"] = Math.round(__style["bottom"] * __delta);
                 __style["bottom"] = __style["bottom"] + "px";
                                  
             }else if(__arrow.indexOf("up") >= 0){
                 __style["top"] = Math.round((__style["y"]-30) * __delta);
                 __style["top"] = __style["top"] + "px";                 
             }
                                    
            $scope.posScreenCustomer = __style;
        }
        
        if(__arrow)$scope.arrowScreenCustomer = __arrow;        
    }
    
    $scope.showScreen = function(__screen){
            var __customer_background = locationData.getScreenFile(__screen);
            if(__customer_background){
                $scope.locationBackground = __customer_background;
                
                $scope.preparePosHelperBaloon();
                $scope.preparePosCustomerBaloon();
            }        
    };
    

/**
 * 
 * Управление помошником
 */
    $scope.showSilvester = function(__text){
        if(__text){
            
            $scope.silvesterDialogText = __text;
            
            $scope.silvesterDialogVisible = true;
            $scope.helperDialogVisible = false;
            $scope.helperDialogText = "";                                        

            $scope.silvesterImageVisible = true;

            
            $( "#helperID").draggable();
 
            $scope.silvesterDialogFooterVisible = true; 

            $scope.silvesterDialogNextButtonVisible = silvester.existNextState(); 
            
            $scope.silvesterDialogNextButtonAction = silvester.getStateAction();
            if($scope.silvesterDialogNextButtonAction){
                $scope.silvesterDialogNextButtonVisible = true;
            }
            
        }else{
            // закрываем диалог сильвестра
            $scope.silvesterDialogText = ""
            $scope.silvesterDialogVisible = false;
            $scope.silvesterImageVisible = false;
        }
    };

    $scope.fixHelperPosition = function(__position){
        silvester.fixHelperPosition(__position);
    };

    $scope.showHelper = function(__text){
        
        /*
        if($scope.gameInDialog){
            $scope.showBaloonSilvester(__text);
            $scope.showSilvester("");
        }else{
            $scope.showSilvester(__text);
            $scope.showBaloonSilvester("");            
        } 
        */              
       
        $('#helperID').draggable(
            {
                drag: function(){
                    var offset = $(this).offset();
                   //var xPos = offset.left;
                    //var yPos = offset.top;
                    $scope.fixHelperPosition({"top":offset.top+"px", "left":offset.left+"px"});
                    //$('#posX').text('x: ' + xPos);
                    //$('#posY').text('y: ' + yPos);
                }
            });       
       
       if(__text){
            $scope.selectHelper(4);
       }else{
           $scope.selectHelper(0);
       }
       $scope.helperDialogText = __text; 
       
       $scope.silvesterDialogNextButtonVisible = silvester.existNextState(); 
            
       $scope.silvesterDialogNextButtonAction = silvester.getStateAction();
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
        
        if(__dialog_screen){
            switch(__dialog_screen){
                case "sale_ok":
                    $scope.locationBackground = locationData.SALE_OK_SCREEN();
                    break;
                case "sale_fail":
                    $scope.locationBackground = locationData.SALE_FAIL_SCREEN();
                    break;
            }
        }
        
        if(__dialog_elem){
            $scope.higlightElement(__dialog_elem);
        }
        
        
    };

    $scope.showBaloonSilvester = function(__text){
        if(__text){          
                $scope.silvesterDialogVisible = false;
                $scope.helperDialogVisible = true;
                $scope.helperDialogText = __text; 
                $scope.silvesterDialogNextButtonVisible = silvester.existNextState();
                
                $scope.silvesterDialogNextButtonAction = silvester.getStateAction();
                if($scope.silvesterDialogNextButtonAction){
                    $scope.silvesterDialogNextButtonVisible = true;
                }
                
                $( "#helperDialog").draggable();
                
                $scope.preparePosHelperBaloon();
                if($scope.posScreenHelper){  
                    $("#helperDialog").css({"top":"50%", "left":"50%"});
                    $("#helperDialog").css($scope.posScreenHelper);
                }
                if($scope.arrowScreenHelper){
                    
                    $("#helper_arrow_left_up_ID").css("display", "none");
                    $("#helper_arrow_right_up_ID").css("display", "none");
                    $("#helper_arrow_right_down_ID").css("display", "none");
                    $("#helper_arrow_left_down_ID").css("display", "none");
                    
                    switch($scope.arrowScreenHelper){
                        case "right_down" :
                            $("#helper_arrow_right_down_ID").css("display", "block");
                            break;
                        case "right_up" :
                            $("#helper_arrow_right_up_ID").css("display", "block");
                            break;
                        case "left_down" :
                            $("#helper_arrow_left_down_ID").css("display", "block");
                            break;
                        case "left_up" :
                        default :
                            $("#helper_arrow_left_up_ID").css("display", "block");
                    }
                }
                
        }else{
            $scope.helperDialogVisible = false;
            $scope.helperDialogText = "";                        
        }
    };
//**********************************************************************

/**
 * 
 * управление диалогом продавец - покупатель
 */

    $scope.showSalesmanDialog  = function(__next_id){
        
        if(__next_id === undefined) __next_id = 1;
        
        $scope.salesmanDialog = locationData.getDialogByID(__next_id);
                        
        $scope.showPhase($scope.salesmanDialog.phase);
        
        var __salesman_background = locationData.getScreenFile($scope.salesmanDialog.screen);        
        if(__salesman_background){
            $scope.locationBackground = __salesman_background;
        }
        
        $scope.showHelper($scope.salesmanDialog.helper, false);
        
        $scope.selectedQuestion = -1;
        
        $scope.salesmanDialogVisible = true;       
        $scope.customerDialogVisible = false;        
        $scope.leaveDialogVisible = false;        
        $scope.boughtDialogVisible = false;        
        
        //анимация появления плашки
        var __sd = $("#salesmanDialogID");
        var __height = __sd.css("height");
        var __bottom = "-" + __height;
        __sd.css({"bottom":  __bottom, "top": ""});
        __sd.animate({bottom: "40px"}, 1000);
       
        $timeout(function(){
            var __sd = $("#salesmanDialogID");
            if(__sd){
                __sd.css({bottom: "40px", "top": ""});
            }
            $scope.salesmanDialogVisible = true;
        },1000);       
       
    };

    $scope.okSalesmanQuestion  = function(___question){
        
        $scope.selectedQuestion = ___question;
        
        if($scope.selectedQuestion >= 0){
            
            $scope.lastGamePhase = 0;            
            silvester.setPhase(0);
            
            // скрываем плашку с вопросами
            var __sd = $("#salesmanDialogID");            
            var __height = __sd.css("height");
            __height = parseFloat(__height);
            __sd.animate({bottom: "-"+__height+"px"}, 1000);
                        
            $scope.leaveDialogVisible = false;            
            $scope.boughtDialogVisible = false;

            var __questionInfo = locationData.getQuestionInfo(___question);
            var __question = locationData.getTypeQuestion($scope.selectedQuestion);

            $scope.customerDialog = locationData.getAnswer(__question);
            
            if($scope.customerDialog){
                /*
                 * !!! показать сначала экран, чтобы выбрать позицию помошника
                 */
                if($scope.customerDialog.screen != undefined){
                    $scope.showScreen($scope.customerDialog.screen);                    
                }

                if(__questionInfo.helper != undefined && __questionInfo.helper){
                    $scope.showHelper(__questionInfo.helper , false);
                }else if($scope.customerDialog.helper != undefined){
                    $scope.showHelper($scope.customerDialog.helper, false);
                }else{
                }

                if($scope.customerDialog.text && $scope.customerDialog.next < 1000000){
                    $scope.customerDialogVisible = true;
                    
                    //$( "#customerAnswerModalDialog").draggable();                    
                    
                    $scope.preparePosCustomerBaloon();
                    
                    if($scope.posScreenCustomer){  
                        $("#customerAnswerModalDialog").css({"top":"50%", "left":"50%"});
                        $("#customerAnswerModalDialog").css($scope.posScreenCustomer);
                    }
                    if($scope.arrowScreenCustomer){
                        switch($scope.arrowScreenCustomer){
                            case "right_down" :
                                $("#customer_arrow_left_down_ID").css("display", "none");
                                $("#customer_arrow_right_down_ID").css("display", "block");                                                                            
                                break
                            case "left_down" :
                            default :
                                $("#customer_arrow_left_down_ID").css("display", "block");
                                $("#customer_arrow_right_down_ID").css("display", "none");                                                
                        }
                    }
                    
                }else{
                    $scope.customerDialogVisible = false;
                    $scope.okCustomerAnswer();
                }
            }else{
                //не найден ответ покупателя - выходим из диалога
                $scope.showCustomerLeave();
                $scope.okCustomerLeave();
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
    
    $scope.okCustomerAnswer  = function(){
                
        var __next = $scope.customerDialog.next;
        switch (__next){
            case locationData.LEAVE :
            case locationData.STOP :
                $scope.showCustomerLeave();
                $scope.okCustomerLeave($scope.customerDialog.helper);
                break;
            case locationData.BOUGHT :
                $scope.showCustomerBought();
                $scope.okCustomerBought($scope.customerDialog.helper);
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
        //$scope.bonusCounter += 10;
        $scope.scopeCounter += 10;
        $scope.salesCounter += 1;        
        $scope.stopDialog(locationData.BOUGHT, __helper_text);
    };
    
    $scope.okCustomerLeave  = function(__helper_text){
        $scope.failsCounter++;
        $scope.stopDialog(locationData.LEAVE, __helper_text);
    };
     
     
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
        
        if(__x < 0)__x = 0;
        if(__x > $scope.window_width)__x = $scope.window_width - 265;

        if((__y-197) < 0)__y = -197;
        if((__y-197) > $scope.window_height)__x = $scope.window_height - 197;
                
        $("#bonusSelector").css({
            'top': __y-197,
            'left': __x                
        });        
        
        $scope.currentBonus = null;
                        
        switch(__bonus_id){
            case "NOTEBOOK":
                $scope.currentBonus = bonuses.setBonus(1);                
                break;
            case "SMARTPHONE":
                $scope.currentBonus = bonuses.setBonus(2);
                break;                
        }
                        
        if($scope.currentBonus){
            
            if(bonuses.usedBonuses() < 1) $scope.startSilvesterDialog(6);   //первый бонус
            else $scope.startSilvesterDialog(10);                           //следующие бонусы
                                    
            $scope.selectionBonus = true;
            
            if(selectBonusTimer)$timeout.cancel(selectBonusTimer);            
            selectBonusTimer = $timeout(function(){
                $scope.stopBonusDialog();
            }, _bonusActionSelectionTimeout);
        }else{
            $scope.stopBonusDialog();
        }
    };
    
    $scope.startBonusDialog  = function(__action_id){
        if($scope.gameInDialog) return;
        //if(bonuses.usedBonuses() > bonuses.totalBonuses()) return;
        
        $scope.gameInBonus = true;
        $scope.selectionBonus = false;
                
        bonuses.setAction(__action_id);                        
        bonuses.setActive(true);
                
        if(selectBonusTimer)$timeout.cancel(selectBonusTimer);
        if(startBonusTimer)$timeout.cancel(startBonusTimer);

        
        var __bns_xnt = bonuses.getBonusAction().bonus;
        if(__bns_xnt > 0){
            $scope.scopeCounter += 1;
        }
        $scope.bonusCounter += __bns_xnt;
        game.employTime(bonuses.getBonusAction().time);

        var __helper_phase = bonuses.getBonusAction().helper_phase;
        $scope.startSilvesterDialog(__helper_phase);
        
        startBonusTimer = $timeout(function(){
            $scope.stopBonusDialog();
        }, _bonusShowTimeout);
        
    };
    
    $scope.stopBonusDialog = function(){
        $scope.gameInBonus = false;
        $scope.selectionBonus = false;
        bonuses.setActive(false);
        $scope.showHelper('');
    };       
    
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
        $scope.gameInBonus = false;
        $scope.endVideo();
    };
    
    $scope.endVideo = function(){
        bonuses.rotatorEnded();
    };
            
    $scope.initVideo = function(__video_file){ 
        if(__video_file){
            $scope.videoFile = __video_file;
            $scope.gameInBonus = true;
            try {
            
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
