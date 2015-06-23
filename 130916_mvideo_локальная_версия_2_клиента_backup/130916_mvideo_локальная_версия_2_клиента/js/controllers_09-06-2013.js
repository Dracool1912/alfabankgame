'use strict';

/* Controllers */
function ApplicationCtrl($scope) {    
};

function GameSupportCtrl($scope, $timeout, game, silvester, locationData) {
     
    var _idleTimeout = 10 * 1000;
    var idleTimer ;
    
    $scope.window_width = 0;
    $scope.window_height = 0;          
    
    silvester.setData(silvesterDialog);
    
    //отображаемый текст диалогов:
    $scope.salesmanDialog = [];
    $scope.customerDialog = [];
    
    //выбранный вопрос
    $scope.selectedQuestion = -1;

    //выбранный ответ
    $scope.selectedAnswer = '';
    
    $scope.salesmanDialogVisible = false;
    
    $scope.phaseImage = '';
    $scope.phaseImageVisible = false;
    
    $scope.customerDialogVisible = false;
    //$('#customerAnswerModalDialog').modal('hide');
    
    $scope.leaveDialogVisible = false;
    //$('#leaveModalDialog').modal('hide');
    
    $scope.boughtDialogVisible = false;
    //$('#boughtModalDialog').modal('hide');
    
    //состояние игры 
    $scope.gameInDialog = false;
    
    $scope.gameInBonusFind = false;
    
    $scope.bonusCounter = 0;
    $scope.salesCounter = 0;
    
    $scope.locationBackground = 'assets/loc/woman_phones.png';
    
    $scope.silvesterDialogVisible = false;
    $scope.silvesterDialogText = "";
    $scope.sivester_main_img = 'assets/dialog/silvester_d_l_1.png'
    
    $scope.gameProgressInfo = game.getGameProgressInfo();    
    $scope.time = $scope.gameProgressInfo.time;
    
    $scope.$watch('time', function(){
        $timeout(function(){
            $scope.gameProgressInfo = game.getGameProgressInfo();
            $scope.time = $scope.gameProgressInfo.time;            
        },game.timerInterval);
    });
    
    
    $scope.$watch('window_width', function(){
        //$("#location_background_image").width($scope.window_width);
    });

    $scope.$watch('window_height', function(){
        $("#location_background_image").height($scope.window_height);
    });
    
    $scope.version = '08.06.2013';
    
    var __tooltype_options = {delay: { show: 500, hide: 100 }};
    $('#sales_counter').tooltip(__tooltype_options);
    $('#bonus_counter').tooltip(__tooltype_options);
    $('#game_time_progress').tooltip(__tooltype_options);
    $('#game_time_left').tooltip(__tooltype_options);
    $('#game_time_right').tooltip(__tooltype_options);
    $('#game_time_progress_bar').tooltip(__tooltype_options);
    
    $('#MVideo_logo').tooltip(__tooltype_options);
    $('#structure_btn').tooltip(__tooltype_options);
    $('#sound_btn').tooltip(__tooltype_options);
    $('#helper_btn').tooltip(__tooltype_options);
    $('#info_btn').tooltip(__tooltype_options);
            
        
    $scope.startBonusDialog = function(){
        if($scope.gameInDialog) return;
        
        $scope.gameInBonusFind = true;
    };

    $scope.stopBonusDialog = function(){
        $scope.gameInBonusFind = false;
    };
    
    $scope.startSilvesterDialog = function(__phase){
        if($scope.gameInDialog || $scope.gameInBonusFind)return;
        silvester.setPhase(__phase);
        $scope.nextSilvesterDialog();
    };
    
    $scope.nextSilvesterDialog = function(){
        var __dialog_text = silvester.nextState();
        $scope.showHelper(__dialog_text);
    };
        
    $scope.startDialog = function(location_id){
                        
        switch(location_id){
            case "NOTEBOOK" :
                locationData.setData(locationNotebook);
                break;
            case "SMARTPHONE" :
                locationData.setData(locationSmartphone);
                break;
            default:
                return;
        }
        
        silvester.setPhase(2);
        
        $scope.gameInDialog = true;
        
        $scope.stopIdleTimer();
        
        $scope.startSilvesterDialog(2);
        
        $scope.showSalesmanDialog();
                
    };
    
    $scope.stopDialog = function(dialog_rezult){
        $scope.gameInDialog = false;
        $scope.salesmanDialogVisible = false;
        
        $scope.customerDialogVisible = false;
        //$('#customerAnswerModalDialog').modal('hide');
        
        $scope.leaveDialogVisible = false;
        //$('#leaveModalDialog').modal('hide');
        
        $scope.boughtDialogVisible = false;
        //$('#boughtModalDialog').modal('hide');
        
        if(dialog_rezult === locationData.LEAVE){
            $timeout(function(){
                $scope.startSilvesterDialog(4);
            },5000);                        
        }
        
        if(dialog_rezult === locationData.BOUGHT){
            $timeout(function(){
                $scope.startSilvesterDialog(3);
            },5000);                                                
        }
        
        $scope.startPlayerIdleTimer();
        
        if(ige && ige.client)ige.client.resumeGameAfterDialog(dialog_rezult);
    };
    
    $scope.startPlayerIdleTimer = function(){
        idleTimer = $timeout(function(){
            if(silvester.getPhase() !== 1){
                $scope.startSilvesterDialog(5);
            }
        },_idleTimeout);        
    };
    
    $scope.stopIdleTimer = function(){
        if(idleTimer)$timeout.cancel(idleTimer);
    };
    $scope.resetIdleTimer = function(){
        $scope.stopIdleTimer();
        $scope.startPlayerIdleTimer();
    };
    
    $scope.resetDialog = function(){
        
        locationData.reset();
        
        $scope.gameInDialog = false;
        $scope.salesmanDialogVisible = false;
        
        $scope.customerDialogVisible = false;
        //$('#customerAnswerModalDialog').modal('hide');
        
        $scope.leaveDialogVisible = false;
       //$('#leaveModalDialog').modal('hide');
        
        $scope.boughtDialogVisible = false;
        //$('#boughtModalDialog').modal('hide');
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
    
    $scope.showScreen = function(__screen){
            var __customer_background = locationData.getScreenFile(__screen);
            if(__customer_background){
                $scope.locationBackground = __customer_background;
            }        
    };
    
    $scope.okSalesmanQuestion  = function(___question){
        
        $scope.selectedQuestion = ___question;
        
        if($scope.selectedQuestion >= 0){
            $scope.salesmanDialogVisible = false;        
            
            $scope.leaveDialogVisible = false;
            //$('#leaveModalDialog').modal('hide');
            
            $scope.boughtDialogVisible = false;
            //$('#boughtModalDialog').modal('hide');

            var __question = locationData.getTypeQuestion($scope.selectedQuestion);

            $scope.customerDialog = locationData.getAnswer(__question);
            
            $scope.showHelper($scope.customerDialog.helper);
            
            $scope.showScreen($scope.customerDialog.screen);
            
            if($scope.customerDialog.text){
                $scope.customerDialogVisible = true;
            }else{
                $scope.customerDialogVisible = false;
                $scope.okCustomerAnswer();
            }
            
            //$('#customerAnswerModalDialog').modal('show');
        }
    };
    
    $scope.overSalesmanQuestion  = function(___question){
        var __question = locationData.getQuestionInfo(___question);
            if(__question){
                
                if(__question.helper != undefined && __question.helper){
                    $scope.showHelper(__question.helper);
                }else{
                   $scope.showHelper($scope.salesmanDialog.helper); 
                }
                
                if(__question.screen != undefined && __question.screen){
                    $scope.showScreen(__question.screen);
                }else{
                    $scope.showScreen($scope.salesmanDialog.screen);
                }
            }
    };
    
    $scope.okCustomerAnswer  = function(){
                
        var __next = $scope.customerDialog.next;
        switch (__next){
            case locationData.LEAVE :
            case locationData.STOP :
                $scope.showCustomerLeave();
                $scope.okCustomerLeave();
                break;
            case locationData.BOUGHT :
                $scope.showCustomerBought();
                $scope.okCustomerBought();
                break;
            default :
                $scope.showSalesmanDialog(__next);
        };
        
        game.employTime($scope.salesmanDialog.time);
    };
    
    $scope.showCustomerLeave  = function(){
        $scope.salesmanDialogVisible = false;
        
        $scope.customerDialogVisible = false;
        //$('#customerAnswerModalDialog').modal('hide');
        
        $scope.leaveDialogVisible = true;        
        //$('#leaveModalDialog').modal('show');
        
        $scope.boughtDialogVisible = false; 
        //$('#boughtModalDialog').modal('hide');
    };

    $scope.showHelper = function(__text){
        if(__text){
            $scope.silvesterDialogText = __text;
            $scope.silvesterDialogVisible = true;
            
            //$('#silvesterDialog').popover({animation:true, placement:'bottom', delay: { show: 500, hide: 100 }, html:false, content:__dialog_text});
            //$('#silvesterDialog').popover("show");
            
        }else{
            // закрываем диалог сильвестра
            $scope.silvesterDialogText = ""
            $scope.silvesterDialogVisible = false;
        }
    };

    $scope.showSalesmanDialog  = function(__next_id){
        
        if(__next_id === undefined) __next_id = 1;
        
        $scope.salesmanDialog = locationData.getDialogByID(__next_id);
        
        $scope.showHelper($scope.salesmanDialog.helper);
        
        $scope.showPhaseImage(locationData.getPhaseFile($scope.salesmanDialog.phase));
        
        var __salesman_background = locationData.getScreenFile($scope.salesmanDialog.screen);        
        if(__salesman_background){
            $scope.locationBackground = __salesman_background;
        }
        
        $scope.selectedQuestion = -1;
        
        $scope.salesmanDialogVisible = true;
        
        $scope.customerDialogVisible = false;
        //$('#customerAnswerModalDialog').modal('hide');
        
        $scope.leaveDialogVisible = false;
        //$('#leaveModalDialog').modal('hide');
        
        $scope.boughtDialogVisible = false;        
        //$('#boughtModalDialog').modal('hide');
    };

    $scope.showCustomerBought  = function(){
        $scope.salesmanDialogVisible = false;
        
        $scope.customerDialogVisible = false;
        //$('#customerAnswerModalDialog').modal('hide');
        
        $scope.leaveDialogVisible = false;
        //$('#leaveModalDialog').modal('hide');
        
        $scope.boughtDialogVisible = true;          
        //$('#boughtModalDialog').modal('show');
    };
    
    $scope.okCustomerBought  = function(){
        $scope.bonusCounter += 10;
        $scope.salesCounter += 1;        
        $scope.stopDialog(locationData.BOUGHT);
    };
    
    $scope.okCustomerLeave  = function(){
        $scope.stopDialog(locationData.LEAVE);
    };
        
    $scope.startBonusDialog  = function(__bonus_id){
        switch(__bonus_id){
            case "COMPUTERS":
                break;
            case "COMPUTERS":
                break;                
        }
    };
    
    $scope.startPlayerIdleTimer();
    
};


function IndexSupportCtrl($scope, $timeout) {
    
     var bg_list = [
         'assets/loc/01_mvideo_main_splash.png',
         'assets/loc/01_mvideo_main_splash_2.png',
         'assets/loc/01_mvideo_main_splash_3.png'
     ];
    
     var index_bg = Math.round(Math.random() * 2) | 0;
    
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
    },
    
     
     $timeout(function(){
        $scope.showIndex = true;            
     }, 1000);

     $timeout(function(){
        $scope.onResizeActions($scope.window_width, $scope.window_height);
        $scope.showStartButton = true;            
     }, 2000);
     
};


function videoRotatorCtrl($scope, $timeout) {
     
    $scope.videoNumber = 0;    
    
    $scope.videoFiles = ["v_2_3_4", "v_4", "v_5", "v_6", "v_7", "v_10", "v_13", "v_15"];
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
    
    $scope.loadVideo = function(){
        if($scope.videoNumber < $scope.videoTotal){
            $scope.videoFile = $scope.videoFiles[$scope.videoNumber];
        }else{
             $scope.endVideo();
        }
    },
    
    $scope.endVideo = function(){
        document.location.replace("intro/vhelp_16_17.html");
    }
    
};

function ImageRotatorCtrl($scope, $timeout) {
    
    $scope.showIndex = true;
    
    $scope.videoTotal = 1;
    $scope.videoNumber = 1;
    $scope.videoFile = 'v1';
    
    $scope.imagesReady = false;
    $scope.imagesReady = false;
    $scope.imagesTotal = 54;
    $scope.imagesLoaded = 0;
    $scope.imagesLoadedPercent = 0;
    
    $scope.imageFrame = 0;
    
    $scope.images_path = "assets/intro/";    
    $scope.images = [];
    
    for(var __i=1; __i<=$scope.imagesTotal; __i++){
        $scope.images[__i-1] = $scope.images_path + (__i < 10 ? '0' : '') +  __i + '.png';
    }
     
    $scope.window_width = 0;
    $scope.window_height = 0;
     
    $scope.$watch('window_width', function(){
        //$scope.onResizeActions($scope.window_width, $scope.window_height);
    });

    $scope.$watch('window_height', function(){
        //$scope.onResizeActions($scope.window_width, $scope.window_height);
    });
    
    $scope.loadVideo = function(){
        if($scope.videoNumber <= $scope.videoTotal){
            $scope.videoFile = 'v'+$scope.videoNumber;
        }else{
             $scope.endVideo();
        }
    },
    
    $scope.endVideo = function(){
        document.location.replace("game.html");
    },
    
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
    },

    $scope.imageLoaded = function(){
        $scope.imagesLoaded++;
        //console.log("imagesLoaded= "+$scope.imagesLoaded);
        $scope.imagesLoadedPercent = Math.round(($scope.imagesLoaded / $scope.imagesTotal) * 100);
        if($scope.imagesLoaded >= $scope.imagesTotal){ 
            $scope.imagesLoadedPercent = 100;
            // Устанавливаем прозрачность всех картинок в 0
            $('div#rotator ul li').css({opacity: 0.0});
            // Берем первую картинку и показываем ее
            $('div#rotator ul li:first').css({opacity: 1.0});            

            $scope.imagesReady = true;
            $scope.rotate(); 
        }
    },

    $scope.next_rotate = function(){
        $timeout(function(){
             $scope.rotate();
        }, 2000);    
    },
    
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
        next.css({opacity: 0.0})
        .addClass('show')
        .animate({opacity: 1.0}, 500);

        // Прячем текущую картинку
        current.animate({opacity: 0.0}, 1000)
        .removeClass('show');
                
        
        $scope.imageFrame++;
        if($scope.imageFrame > $scope.imagesTotal){
            // game
            $scope.endVideo();
        }else{
            $scope.next_rotate();
        }
    }
                    
};

function MyCtrl2() {
};
MyCtrl2.$inject = [];
