'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');

var gameServ = angular.module('gameServices', []);
    gameServ.service('game', function(){
        
        var _gameModeEducation = 1;
        var _gameModeByTime = 2;
        
        var _gameMode = _gameModeEducation;
        //var _gameMode = _gameModeByTime;
        
        var timerInterval = 1000;
        //сколько проходит секунд игры на одну секнду реального времени
        var timeSpeed = 1;
        
        var gameTime = new Date();
        var startGameTime = new Date();
        var endGameTime = new Date();
        
        var timeFromStart = 0;
        
        //виртуальные секунды игры        
        var numTimeTicks = 0;
        
        var startHour = 10;
        var gameHours = 9;
        
        var getGameMode = function(){
            return _gameMode;
        };

        var setGameMode = function(__gm){
            _gameMode = __gm;
        };
        
        var HMtoStr = function(_leftHours, _leftMinutes){
                var __hh = '';
                if(_leftHours < 2)__hh = ' час ';
                else if(_leftHours < 5)__hh = ' часа ';
                else if(_leftHours < 21)__hh = ' часов ';
                else if(_leftHours = 21)__hh = ' час ';
                else __hh = ' часа ';

                var __mm = '';
                if((_leftMinutes % 10) === 1)__mm = ' минута ';
                else if(_leftMinutes  === 2 || _leftMinutes  === 3 || _leftMinutes  === 4)__mm = ' минуты ';
                else if(_leftMinutes  === 12 || _leftMinutes  === 13 || _leftMinutes  === 14)__mm = ' минут ';
                else if((_leftMinutes % 10) === 2)__mm = ' минуты ';
                else if((_leftMinutes % 10) === 3)__mm = ' минуты ';
                else if((_leftMinutes % 10) === 4)__mm = ' минуты ';
                else __mm = ' минут ';
            
                return  (_leftHours === 0 ? '' : _leftHours + __hh) + (_leftMinutes === 0 ? '' : _leftMinutes + __mm);            
        };
        
        var reset = function(){
            var _today = new Date();
            var _year = _today.getFullYear();
            var _month = _today.getMonth();
            var _date = _today.getDate();
            
            gameTime = new Date( _year, _month, _date, startHour, 0, 0, 0);
            startGameTime = new Date( _year, _month, _date, startHour, 0, 0, 0);
            endGameTime = new Date( _year, _month, _date, startHour + gameHours, 0, 0, 0);
            
            numTimeTicks = 0;
        };

         var employTime = function(__time){
             numTimeTicks += __time * 60;
         };

         var getGameTime = function(){    
                 
                    var __time = startGameTime.getTime();
                    if(_gameMode === _gameModeByTime){
                        numTimeTicks++;
                    }
                    __time = __time + timerInterval * timeSpeed * numTimeTicks;
                    gameTime = new Date();
                    gameTime.setTime(__time);                                                
                return gameTime;
            };
            
        var getTimeRight = function(){
                var _leftMSeconfs = gameTime.getTime() - startGameTime.getTime();
                var _leftSeconds = _leftMSeconfs / 1000;
                var _leftHours = Math.floor(_leftSeconds / 3600);
                var _leftMinutes =  Math.floor((_leftSeconds - _leftHours * 3600 ) / 60);
                
                return HMtoStr(_leftHours, _leftMinutes);
        };
            
        var getTimeLeft = function(){
                var _leftMSeconfs = endGameTime.getTime() - gameTime.getTime();
                var _leftSeconds = _leftMSeconfs / 1000;
                var _leftHours = Math.floor(_leftSeconds / 3600);
                var _leftMinutes =  Math.floor((_leftSeconds - _leftHours * 3600 ) / 60);
                
                return HMtoStr(_leftHours, _leftMinutes);
            };
        
        var gameProgress = function(){
                var __totalMSec = endGameTime.getTime() - startGameTime.getTime();
                var _diff = gameTime.getTime() - startGameTime.getTime();
                var _progress = Math.round((_diff / __totalMSec) * 100);
                
                var _success = 0;
                var _warning = 0;
                var _alarm = 0;
                
                if(_progress <= 50){
                    _success = _progress;
                }else if(50 < _progress && _progress <= 80){
                    _success = 50;
                    _warning = _progress - _success;
                }else if(80 < _progress && _progress <= 100){
                    _success = 50;
                    _warning = 80 - _success;
                    _alarm   = _progress - _success - _warning;
                }else{
                    _success = 50;
                    _warning = 30;
                    _alarm   = 20;                    
                }
                
                return {success:_success, warning:_warning, alarm:_alarm};
            };
        
        reset();
        
        return {
            timerInterval: timerInterval,
                    
            GAME_MODE_EDUCATION: _gameModeEducation,
            GAME_MODE_BY_TIME: _gameModeByTime,
            
            play_background_sound: false,
            sound_volume: 0.5,
            
            getGameMode: function(){
                return getGameMode();
            },

            setGameMode: function(__gm){
                setGameMode(__gm);
            },
            
            
            getNumTimeTicks: function(){
                return numTimeTicks;
            },
            
            setNumTimeTicks: function(__t){
                numTimeTicks = __t;
            },
                    
            getGameProgressInfo: function(){
                
                var _info = {
                    time:getGameTime(), 
                    progress:gameProgress(),
                    timeLeft:getTimeLeft(),
                    timeRight:getTimeRight()
                };
                        
                return _info;        
            },
            
            employTime : function(__time){
                return employTime(__time);
            },
                    
            gameProgress: function(){
                return gameProgress();
            },

            getTimeLeft: function(){
                return getTimeLeft();
            },
             
            getTimeRight: function(){
                return getTimeRight();
            },
                    
            reset: function(){
                reset();
            },
            
            getGameTime: function(){                
                return getGameTime();
            }
        };
    });

gameServ.service('customers', function(){
    var __data = null;
        
    var getByID = function(__id){
        for(var i=0; i < __data.customers.length; i++){
            var __c = __data.customers[i];
            if(__id == __c.id){                
                return __c;
            }
        } 
        return null;
    }
    
    return {
        
        customer: null,
        emotion: null,
        dialog_position: 'left',
        screen: null,
        location: null,
        ignore_emotions: false,
                
        setData: function(dt){
            __data = dt;
        },                
                
        setCurrent: function(__id){
            this.customer = getByID(__id);
            this.emotion = null;
            this.dialog_position = 'left';
        },
                        
        getEmotionScreenInfo: function(){
            var __obj = null;
            if(this.customer){
                var __path = __data.path + this.customer.departament + "/" + this.customer.path;                                
                
                if(!(this.dialog_position === 'left' || this.dialog_position === 'right'))this.dialog_position = 'left';                    
               
               if(this.ignore_emotions){
                    __obj = this.customer.emotions[this.dialog_position]["screen"];
                    __obj["image"] = "";
               }else{
                    switch (this.emotion){
                        case "negative" :
                        case "problem" :
                        case "joy" :
                            __obj = this.customer.emotions[this.dialog_position][this.emotion];
                            __obj["image"] = __path + this.customer.emotions[this.dialog_position][this.emotion].img;
                            break;  
                        case "screen" :
                            __obj = this.customer.emotions[this.dialog_position][this.emotion];
                            __obj["image"] = "";                        
                            break;
                        case "neutral" :                        
                        default :
                            __obj = this.customer.emotions[this.dialog_position]["neutral"];
                            __obj["image"] = __path + this.customer.emotions[this.dialog_position]["neutral"].img;                        
                    }
               }
                
                __obj["dx"] = 0;
                __obj["dy"] = 0;   

                    var __location_screen_info = this.customer.emotions[this.dialog_position]["locations"];
                    if(__location_screen_info){
                        for(var _i=0; _i < __location_screen_info.length; _i++){
                            if(__location_screen_info[_i]["location"] && __location_screen_info[_i]["screen"]){
                                if(__location_screen_info[_i]["location"].toString().toUpperCase() == this.location.toString().toUpperCase() && __location_screen_info[_i]["screen"].toString().toUpperCase() == this.screen.toString().toUpperCase()){
                                   __obj["dx"] = __location_screen_info[_i]["dx"];
                                   __obj["dy"] = __location_screen_info[_i]["dy"];
                                   break;
                                }
                            }
                        }
                    }
                
            }
            return __obj;
        }
    };
});

gameServ.service('map', function(){
    var DEPARTMENT_DIGITAL = 'DIGITAL';
    var DEPARTMENT_TV = 'TV';
    var DEPARTMENT_HOME = 'HOME';
    
    var DEPARTMENT_NONE = 'NONE';
    
    var __image_path = "assets/map/";
    
    var _DEPARTMENT_DIGITAL_MAP = __image_path+'map.png';
    
    var DEPARTMENT_DIGITAL_H = __image_path+'digital.png';
    var DEPARTMENT_TV_H = __image_path+'tv.png';
    var DEPARTMENT_HOME_H = __image_path+'home.png';    
    
//    var DEPARTMENT_TV_H = __image_path+'tv_lock.png';
//    var DEPARTMENT_HOME_H = __image_path+'home_lock.png';        
   
    var ___currentDepartment = DEPARTMENT_DIGITAL;
    
    var _currentDepartmentHighlightImage = DEPARTMENT_DIGITAL_H;
    
    var digital_bounds = {x:270, y:220, w:340, h:448};
    var tv_bounds = {x:610, y:220, w:316, h:448};
    var home1_bounds = {x:200, y:0, w:726, h:180};
    var home2_bounds = {x:0, y:120, w:240, h:320};
    
    var testArea = function(__x, __y, __area){        
        if(__area.x < __x && __x <  (__area.x + __area.w)){
            if(__area.y < __y && __y <  (__area.y + __area.h)){
                return true;
            }
        }
        return false;
    }
        
    return {
        
        visible: false,
        currentScale: 1,
        currentDepartment: DEPARTMENT_NONE,
        
        selectedDepartment: DEPARTMENT_NONE,
        
        DEPARTMENT_DIGITAL_MAP: _DEPARTMENT_DIGITAL_MAP,
        currentDepartmentHighlightImage: _currentDepartmentHighlightImage,
        
        testDepartment: function(__x, __y){
            __x /= this.currentScale;
            __y /= this.currentScale;
            
            if(testArea(__x, __y, digital_bounds)){
                ___currentDepartment = DEPARTMENT_DIGITAL;
            }else
            if(testArea(__x, __y, tv_bounds)){
                ___currentDepartment = DEPARTMENT_TV;
            }            
            if(testArea(__x, __y, home1_bounds)){
                ___currentDepartment = DEPARTMENT_HOME;
            }        
            if(testArea(__x, __y, home2_bounds)){
                ___currentDepartment = DEPARTMENT_HOME;
            }                    
            this.showDepartment(___currentDepartment);
        },
          
        setDepartment: function(){
            this.currentDepartment = ___currentDepartment;
            this.showDepartment(this.currentDepartment);
        },
          
        selectDepartment: function(){
            this.selectedDepartment = this.currentDepartment;
        },
          
        setSelectDepartment: function(__dep){
            this.currentDepartment = __dep;
            this.selectedDepartment = this.currentDepartment;
        },          
                
        showCurrentDepartment: function(){
            this.showDepartment(this.currentDepartment);
        },
                
        showDepartment: function(__cd){
            switch(__cd){
                case DEPARTMENT_DIGITAL :
                    this.currentDepartmentHighlightImage = DEPARTMENT_DIGITAL_H;
                    break;
                case DEPARTMENT_TV :
                    this.currentDepartmentHighlightImage = DEPARTMENT_TV_H;
                    break;
                case DEPARTMENT_HOME :
                    this.currentDepartmentHighlightImage = DEPARTMENT_HOME_H;
                    break; 
                default :
                    this.currentDepartmentHighlightImage = '';
            }                
        }
    }    
});

var dialogServ = angular.module('dialogServices', []);
//****
dialogServ.service('phases', function(){
        var _data = null;
        var _phase = 1;
        var _lastPhase = null;
        var changeCount = 0;
    
        var reset = function(){
                if(_data){
                    _phase = 1;
                }
            };
       
        var getPhaseByID = function(__id){
                if(_data){
                    for(var _ind=0; _ind < _data.phases.length; _ind++){
                        var __phase = _data.phases[_ind];
                        if(__phase.id == __id){

                            if(__phase.id < _phase)__phase.style = "phase-sucess";
                            else if(__phase.id == _phase)__phase.style = "phase-current";
                            else __phase.style = "phase-left";                         
                            
                            return __phase;
                        }
                    };
                }
                return null;
            };

        return {
            reset: function(){
                reset();
            },
            
            setData: function(d){
                _data = d;
                reset();
            },

            setPhase: function(__id){
                _phase = __id;
            },

            getPhaseEmotion: function(){
                if(_data){                
                    for(var _ind=0; _ind < _data.phases.length; _ind++){
                        var __phase = _data.phases[_ind];
                        if(__phase.id == _phase)return __phase.emotion;
                    };                
                }
                return "neutral";
            },

            getPhasesInDialog: function(){
                var __out = [];
                
                if(_data){     
                    var ___ind = 0;

                    var __phase = getPhaseByID(_phase-1);
                    if(__phase)__out[___ind++] = __phase;

                    __phase = getPhaseByID(_phase);
                    if(__phase)__out[___ind++] = __phase;

                    __phase = getPhaseByID(_phase+1);
                    if(__phase)__out[___ind++] = __phase;
                    
                }
                return __out;
            },

            getPhases: function(){
                var __out = [];
                
                if(_data){
                
                    for(var _ind=0; _ind < _data.phases.length; _ind++){
                        var __phase = _data.phases[_ind];
                        if(__phase.id < _phase)__phase.style = "phase-sucess";
                        else if(__phase.id == _phase)__phase.style = "phase-current";
                        else __phase.style = "phase-left"; 
                        __out[_ind] = __phase;
                    };
                
                }
                return __out;
            },
                    
            getPhaseByID: function(__id){
                return getPhaseByID(__id);
            },
    
            changed: function(){
                return changeCount;
            }            
        }
});
//****
    dialogServ.service('bonuses', function(){
    
        var _data = null;
        var _bonus = 1;
        var _action = 0;
        var _lastBonus = null;
        var changeCount = 0;
        
        var _usedBonuses = 0;
        
        var _rotator = null;
        var _game = null;
        
        var _bonusCycleNum = 2;
        
        var _active = false;
    
        var reset = function(){
            _usedBonuses = 0;
                if(_data){
                    _bonus = 1;
                    _action = 1; 
                    for(var _ind=0; _ind < _data.bonuses.length; _ind++){
                        _data.bonuses[_ind].used = false;
                    }
                }
            };
    
         var getBonusByID = function(__id){
                if(_data){
                    for(var _ind=0; _ind < _data.bonuses.length; _ind++){
                        var __bonus = _data.bonuses[_ind];
                        if(__bonus.id == __id){
                            _lastBonus = __bonus;
                            _bonus = __id;
                            
                             if(__bonus.used)return null;   //бонус использован
                             else return __bonus; 
                        }
                    };
                }
                return null;
            };
    
            var getBonusAction = function(__a_ind){
                if(_lastBonus && 0 <= __a_ind && __a_ind < _lastBonus.actions.length){
                    return _lastBonus.actions[__a_ind];
                }
                return null;
            };
    
        return {
            ACTIVE: _active,
            
            usedBonuses: function(){
                return _usedBonuses;
            },

            totalBonuses: function(){
                return _data.bonuses.length;
            },
                    
            setRotator: function(obj){ 
                _rotator = obj;
            },

            setGame: function(obj, __cnt){ 
                _game = obj;
                _bonusCycleNum = __cnt;
            },
                    
            rotatorEnded: function(){ 
                _game.bonusFinalizeDialog();
                //_game.stopBonusDialog();
            },
                    
            getPath: function(){
                if(_data)return _data.screens_path;
                else return '';
            },
                     
            setActive: function(__b){
                _active = __b;
                if(_active){
                    if(_rotator){
                        var _aaa = getBonusAction(_action);
                        _rotator.initVideo(_data.screens_path + _aaa.video);
                        _lastBonus.used = true;
                        _usedBonuses++;
                    }
                }else{
                    if(_rotator)_rotator.initVideo("");
                }
            },
            
            isActive: function(){
                return _active;
            },
                    
            reset: function(){
                reset();
            },
            
            setData: function(d){
                _data = d;
                reset();
            },
            
            setBonus: function(_b){
                _bonus = _b;
                return getBonusByID(_bonus);                
            },

            
            setAction: function(_a){
                _action = _a;
            },

            getBonusActions: function(){
                if(_lastBonus){
                    return _lastBonus.actions;
                }
                return null;
            },
                    
            getBonusAction: function(){
                return getBonusAction(_action);
            },
                    
            changed: function(){
                return changeCount;
            }            
        };
    });
//********
    dialogServ.service('locationData', function($http){
        
        var LEAVE = 0;
        var STOP = 0;
        var BOUGHT = 1000000;
        
        var DEMO_DIALOG = 0;
        var GAME_DIALOG = 1;
        
        var _location_path = "assets/loc/";
        var _sale_ok = "sale_ok.png";
        var _sale_fail = "sale_fail.png";
                
        var _data_location = null;
        var _data_dialogs = null;
        var _data_traectory = null;
        
        var _data = null;
        var _phase = 1;
        var _question = 0;
        var changeCount = 0;
        
        var _lastScreen = '';
        var _lastScreenId = 0;
        var _lastDialog = null;
        var _lastDialogPos = '';
        
        var _negative_cnt = 0;
               
        //$httpProvider.defaults.transformRequest
        
        var setTraectory = function(tr){
            _data_traectory = tr;
        };
        
        
        var getScreenInfo  = function(__screen){
                if(_data){
                    for(var _i=0; _i < _data.screens.length; _i++){
                        var _scrn = _data.screens[_i];
                        if(_scrn["id"] == __screen){
                            return _scrn;
                        }
                    }
                    return null;
                    /*
                    if(__screen > 0 && __screen <= _data.screens.length){
                        return _data.screens[__screen-1];
                    }else{
                        return null;
                    }
                    */
                }else{
                    return null;
                } 
        };
        
        var  getScreenFile = function(__screen, __layer){
                if(__layer == undefined) __layer = '';
                var __obj = getScreenInfo(__screen);
                if(__obj){
                        switch(__layer){
                            case 'before' :
                                _lastScreen = _data.screens_path + __obj.before;
                                break;
                            case 'back' :
                                _lastScreen = _data.screens_path + __obj.back;
                                break;  
                            default :
                                _lastScreen = _data.screens_path + __obj.name;
                        }                        
                        _lastScreenId = __screen;
                        return _lastScreen;                    
                }else{
                    return "";
                }
            };

        var  getPosHelperScreenFile = function(__screen){
                var __obj = getScreenInfo(__screen);
                if(__obj){
                        var ___obj = $.extend({}, __obj.posHelper);
                        return ___obj;
                }else{
                    return null;
                }
            };
            
        var  getHelperId = function(__screen){
                var __obj = getScreenInfo(__screen);
                if(__obj){
                        return __obj.helper_id;                        
                }else{
                    return 0;
                }
            };            

        var  getPosCustomerScreenFile = function(__screen){
                var __obj = getScreenInfo(__screen);
                if(__obj){
                        var ___obj = $.extend({}, __obj.posCustomer);
                        return ___obj;
                }else{
                    return null;
                }
            };
        
        var getArrowHelperScreenFile = function(__screen){
                var __obj = getScreenInfo(__screen);
                if(__obj){
                    return __obj.arrowHelper;
                }else{
                    return "";
                }
            };
        
        var getArrowCustomerScreenFile = function(__screen){
                var __obj = getScreenInfo(__screen);
                if(__obj){
                    return __obj.arrowCustomer;
                }else{
                    return "";
                }
            };
        
        
        var getDialogPos = function(__screen){
                    if(__screen == 0) __screen = _lastScreenId;
                    var __obj = getScreenInfo(__screen);
                    if(__obj){
                        _lastDialogPos = __obj.dialog;
                        return _lastDialogPos;                        
                    }else{
                       return "right"; 
                    }
            };
            
        var reset = function(){
            if(_data){
                _phase = 1;
                _question = 1; 
                _negative_cnt = 0;
                _lastScreen = _data.screens_path + _data.screens[0].name;
                
                for(var _ind=0; _ind < _data.dialogs.length; _ind++){                
                    for(var __ind=0; __ind < _data.dialogs[_ind].question.length; __ind++){
                        _data.dialogs[_ind].question[__ind]["index"] = __ind;
                    }
                }
                
            }            
        };
        
        var setLocation = function(__d_l){
            _data_location = __d_l;
        };
        
        var setDialogs = function(__d_d){
            _data_dialogs = __d_d;
        };
        
        var getDialogCell = function(__cell){
            var __part  = 0;
            
            var __d_ind = __cell.indexOf("-");
            if(__d_ind > 0){
                __part = __cell.substr(__d_ind+1);
                __part = parseInt(__part);
                __cell = __cell.substr(0, __d_ind);
            }
            
            for(var __i=0; __i < _data_dialogs["sheet"].length; __i++){
                var ___cell = _data_dialogs["sheet"][__i];
                if(___cell["id"] === __cell){
                    var __s = ___cell["text"];
                    if(__part === 0){
                        return __s;
                    }else{                        
                        var __ind = __s.indexOf("/");
                        if(__ind >= 0){
                            if(__part === 1){
                                return __s.substr(0, __ind);
                            }else if(__part === 2){
                                return __s.substr(__ind+1);
                            }else{
                                return __s;
                            }
                        }else{
                            return __s;
                        }
                    }
                }
            }
        };
        
        var splitCellWithText = function(__cellValue, __delimiter){
            var _out = [];
            var _arr = __cellValue.split(__delimiter);                
            for(var _i=0; _i < _arr.length; _i++){
                var _s = getDialogCell(_arr[_i]);
                _out.push(_s);
            }
            return _out;
        };
        
        var parseDialogCell = function(__cellValue){
            var _out = [];
            if(__cellValue.indexOf(",") > 0){
                _out = splitCellWithText(__cellValue, ",");
            }else if(__cellValue.indexOf("/") > 0){
                _out = splitCellWithText(__cellValue, "/");
            }else if(__cellValue.indexOf("+") > 0){
                _out = splitCellWithText(__cellValue, "+");
                _out = [_out[0] + ' ' + _out[1]];
            }else if(__cellValue == "NEXT_PHASE"){
                
            }else{
                var _s = getDialogCell(__cellValue);
                _out.push(_s);
            }
            
            return _out;
        };
        
        var findFirstScreen = function(){
            for(var _i=0; _i < _data_location.screens.length; _i++){
                var _scrn = _data_location.screens[_i];
                if(_scrn["id"] != _data_location["_SALE_OK_SCREEN"] && _scrn["id"] != _data_location["_SALE_FAIL_SCREEN"]){
                    var __scrn_id = _scrn["id"];
                    __scrn_id = parseInt(__scrn_id);
                    return __scrn_id;
                }
            }
            return 1;
        };
        
        var findNextPhaseID = function(__s_i, __s_phase, __s_next){
            for(var __i=__s_i+1; __i < _data_traectory.dialogs.length; __i++){
                var __traectory_dialogs = _data_traectory.dialogs[__i];
                var __phase = __traectory_dialogs["phase"];
                __phase = parseInt(__phase);
                if(__phase > __s_phase){
                    __s_next = __i+1;
                    return __s_next;
                }
            }
            return __s_next;
        };
        
        var initGameDialog = function(){
            _data_location["dialogs"] = [];
            _data_location.max_negative = 2;
            if(_data_traectory){
                for(var __i=0; __i < _data_traectory.dialogs.length; __i++){
                    //var __screen = findFirstScreen();
                    // > 0 - выбирается указанный экран
                    // 0 - экран не меняется
                    // -1 экран берется из свойств покупателя
                    var __screen = -1;
                    var __traectory_dialogs = _data_traectory.dialogs[__i];
                    var __next = 0;                    
                    var __phase = __traectory_dialogs["phase"]; 
                    var __description = __traectory_dialogs["description"]; 
                    __phase = parseInt(__phase);
                    var _dialog = {
                        "phase": __phase,
                        "screen": __screen,
                        "helper": null,
                        "id": __i+1,
                        "time": 1,
                        "question": [],
                        "answer": [],
                        "customer": null,
                        "description": __description
                    };
                    
                    if(__i === (_data_traectory.dialogs.length-1))__next = 1000000;
                    else __next = _dialog["id"] + 1;                    
                    
                    var __customer = {
                                "positive": "",
                                "negative": "",
                                "next": __next
                            };
                    var __set_customer = false;
                    for(var __d=0; __d < __traectory_dialogs["dialog"].length; __d++){
                        
                        var __traectory_dialog = __traectory_dialogs["dialog"][__d];
                        
                        if(__traectory_dialog["salesman"] || __traectory_dialog["customer"]){
                        
                            var __salesman_text = parseDialogCell(__traectory_dialog["salesman"])
                            var __customer_text = parseDialogCell(__traectory_dialog["customer"])

                            if(__traectory_dialog["customer"]  == "NEXT_PHASE"){
                                __next = findNextPhaseID(__i, __phase, __next);
                            }

                            var __customer_answer = null;

                            if(__traectory_dialogs["first"] === "CUSTOMER" && __customer_text.length > 0){
                                if(__traectory_dialog["type"] == 1)
                                        __customer["positive"] = __customer_text[0];
                                else    __customer["negative"] = __customer_text[0];
                                __customer_text.splice(0, 1);
                                __set_customer = true;
                            }
                            __customer_answer = __customer_text;

                            for(var __i1=0; __i1 < __salesman_text.length; __i1++){
                                var _q_text = __salesman_text[__i1];
                                if(_q_text){
                                    var __question = {
                                         "type": parseInt(__traectory_dialog["type"]),
                                         "text": _q_text
                                    };
                                    _dialog["question"].push(__question);
                                }
                            }

                            if(__customer_answer){
                                for(var __i1=0; __i1 < __customer_answer.length; __i1++){
                                    var __answer = {
                                         "type": parseInt(__traectory_dialog["type"]),
                                         "next": __next,
                                         "helper": "",
                                         "screen": __screen,
                                         "text": __customer_answer[__i1]
                                    };
                                    _dialog["answer"].push(__answer);
                                }
                            }

                        }
                    }
                    if(__set_customer) _dialog["customer"] = __customer;
                    
                    _data_location.dialogs.push(_dialog);
                    
                }   
            }
            
            _data = _data_location;
            ldService.dialog_type = GAME_DIALOG;
            reset();            
        };
        
        var ldService = {

            LEAVE: LEAVE,
            STOP: STOP,
            BOUGHT: BOUGHT,
            
            LEAVE_ACTION: "LEAVE_ACTION",
            STOP_ACTION: "STOP_ACTION",
            BOUGHT_ACTION: "BOUGHT_ACTION",  
            
            lastScreen: 0,
            
            DEMO_DIALOG: DEMO_DIALOG,
            GAME_DIALOG: GAME_DIALOG,            
            dialog_type: DEMO_DIALOG,

            loaded_location_data: 'DEMO',
            try_location_data: 'DEMO',
                    
            loaded_product_data: 'DEMO',
            try_product_data: 'DEMO',
        
            location_demo_ready: false,
            
            location_ready: false,
            location_error:false,
            
            dialog_ready: false,
            dialog_error:false,
                        
            traectory_ready: false,
            traectory_error: false,            
            
            customer: null,

            SALE_OK_SCREEN: function(){
                return getScreenFile(_data._SALE_OK_SCREEN);
            },
            SALE_FAIL_SCREEN: function(){
                return getScreenFile(_data._SALE_FAIL_SCREEN);
            },

            SALE_OK_SCREEN_ID: function(){
                return _data._SALE_OK_SCREEN;
            },
            SALE_FAIL_SCREEN_ID: function(){
                return _data._SALE_FAIL_SCREEN;
            },
                    
            reset: function(){
                reset();
            },
            
            setData: function(d){                
                _data = d;
                ldService.dialog_type = DEMO_DIALOG;
                ldService.loaded_product_data = 'DEMO';
                reset();
                ldService.location_demo_ready = true;
            },
            
            initGameDialog: function(){
                initGameDialog();
            },
                        
            loadLocation: function(__product){
                ldService.dialog_type = GAME_DIALOG;  
                ldService.location_ready = false;
                ldService.location_demo_ready = false;
                ldService.location_error = false;
                
                ldService.try_location_data = __product; 
                var _file_id = "location_"+__product.toLowerCase() + '.json';
                //console.log("Load location: "+_file_id);
                
                $http({
                    method: 'GET',
                    url: 'gameData/'+_file_id
                }).success(function(data, status, headers, config) {
                    ldService.loaded_location_data = ldService.try_location_data;
                    setLocation(data);
                    if(_data_location.dialogs != undefined &&_data_location.dialogs.length > 0){
                        ldService.dialog_type = DEMO_DIALOG;
                        ldService.setData(_data_location);
                        ldService.location_demo_ready = true;
                    }else{
                        ldService.dialog_type = GAME_DIALOG;  
                        ldService.location_ready = true;
                    }
                }).error(function(data, status, headers, config) {
                    ldService.location_error = true;
                });                
            },
                    
            loadDialogs: function(){
                ldService.dialog_type = GAME_DIALOG;  
                
                ldService.dialog_ready = false;
                ldService.dialog_error = false;
                
                ldService.try_product_data = ldService.loaded_location_data;                
                
                var _file_id = ldService.try_product_data + '.json';
                //********************************
                //_file_id = "PAD.json";
                console.log("Load dialogs: "+_file_id);
                $http({
                    method: 'GET',
                    url: 'gameData/d/'+_file_id
                }).success(function(data, status, headers, config) {
                    ldService.loaded_product_data = ldService.try_product_data;
                    setDialogs(data);
                    ldService.dialog_ready = true;
                }).error(function(data, status, headers, config) {
                    ldService.dialog_error = true;
                });                
            },              
            
            loadTraectory: function(__customer){
                this.customer = __customer;
                var _file_id = '';
                var _product = this.customer["product"];
                var _type = this.customer["type"];
                var _n_rnd = Math.ceil(5 * Math.random());

                if(_type === 'active'){
                    _file_id = _n_rnd + 'a';
                }else{
                    _file_id = (_n_rnd + 5) + 'p';
                }

                //*******************************
                //_file_id = "7p";
                //_product = "PAD";

                _file_id = _file_id + '.json';
                console.log("Load traectory: "+_file_id);
                ldService.traectory_error = false;
                ldService.traectory_ready = false;
                $http({
                    method: 'GET',
                    url: 'gameData/t/' + _product + '/' + _file_id                    
                }).success(function(data, status, headers, config) {
                    setTraectory(data);                    
                    initGameDialog();
                    ldService.traectory_ready = true;
                }).error(function(data, status, headers, config) {
                    ldService.traectory_error = true;
                });
            },
        
            getPhaseFile: function(__phase){
                if(_data){
                    if(__phase > 0 && __phase <= _data.phases.length){
                        return _data.phases_path + _data.phases[__phase-1];
                    }else{
                        return "";
                    }
                }else{
                    return "";
                }
            },
            
            getPosHelperScreenFile: function(){
                return getPosHelperScreenFile(_lastScreenId);
            },
            
            getHelperId: function (){
                return getHelperId(_lastScreenId);
            },

            
            getArrowHelperScreenFile: function(){
                return getArrowHelperScreenFile(_lastScreenId);
            },

            getPosCustomerScreenFile: function(){
                return getPosCustomerScreenFile(_lastScreenId);
            },
            
            getArrowCustomerScreenFile: function(){
                return getArrowCustomerScreenFile(_lastScreenId);
            },
                    
            getScreenFile: function(__screen, __layer){
                return getScreenFile(__screen, __layer);
            },
              
            getScreenLeayersInfo: function(__screen){
                if(__screen == "0" || __screen == 0){
                    __screen = _lastScreenId;
                }else{
                    _lastScreenId = __screen;
                    this.lastScreen = __screen;                    
                }
                return  getScreenInfo(__screen);
            },
                    
            getDialogPos: function(__screen){
                return getDialogPos(__screen);
            },

            getLastDialogPos: function(){
                return getDialogPos(_lastScreenId);
            },
                    
            getDialogByID: function(__id){
                if(_data){
                    for(var _ind=0; _ind < _data.dialogs.length; _ind++){
                        var __dialog = _data.dialogs[_ind];
                        if(__dialog.id == __id){
                            __dialog.question = __dialog.question.shuffle();
                            _lastDialog = __dialog;
                            return __dialog;
                        }
                    };
                }
                return null;
            },
            
            getQuestionInfo: function(__q){
                if(_lastDialog){
                    if(0 <= __q && __q < _lastDialog.question.length){
                        var __que = _lastDialog.question[__q];
                        return __que;
                    }                    
                }    
                return null;
            },
            
            getNegativeAnswer: function(__text){
                return {
                    "type": 0,
                    "text": __text,
                    "screen": 10,
                    "helper": "",
                    "next": 0
                }        
            },
            
            getAnswer: function(__tq){
                                
                if(__tq == 0){
                    if(_data.max_negative > 0){
                        _negative_cnt++;
                        if(_negative_cnt >= _data.max_negative) return null;
                    }
                }                        
        
                if(_lastDialog){
                    if(_lastDialog.answer.length > 0){
                        var __ans = _lastDialog.answer[0];
                        for(var key = 0; key < _lastDialog.answer.length; key++){
                            __ans = _lastDialog.answer[key];
                            if(__ans.type == __tq){
                                return __ans;
                            }
                        }
                        return __ans;
                    }else{
                        if(_lastDialog.customer !== null){
                            return {
                                 "type": -1,
                                 "next": _lastDialog.customer.next,
                                 "helper": "",
                                 "screen": 0,
                                 "text": ""
                            };
                        }else{
                            return null;
                        }
                    }
                }else{
                    return null;
                }                 
            },
                    
            getTypeQuestion: function(__q){                
                if(_lastDialog && __q >= 0 && __q < _lastDialog.question.length){
                    var __question = _lastDialog.question[__q];
                    return __question.type;
                }else{
                    return -1;
                }
            },
                               
           getPhase: function(){return _phase;},
           getQuestion: function(){return _question;},
                        
            setPhase: function(v){_phase = v; changeCount++;},
            setQuestion: function(v){_question = v; changeCount++;},
            
            changed: function(){
                return changeCount;
            }
        };
        
        return ldService;
    });

//********
   
   dialogServ.service('utils', function(){
       
        var ua = navigator.userAgent.toLowerCase();
        var check = function(r) {
            return r.test(ua);
        };
        var DOC = document;
        var isStrict = DOC.compatMode == "CSS1Compat";
        var isOpera = check(/opera/);
        var isChrome = check(/chrome/);
        var isWebKit = check(/webkit/);
        var isSafari = !isChrome && check(/safari/);
        var isSafari2 = isSafari && check(/applewebkit\/4/); // unique to
        // Safari 2
        var isSafari3 = isSafari && check(/version\/3/);
        var isSafari4 = isSafari && check(/version\/4/);
        var isIE = !isOpera && check(/msie/);
        var isIE7 = isIE && check(/msie 7/);
        var isIE8 = isIE && check(/msie 8/);
        var isIE6 = isIE && !isIE7 && !isIE8;
        var isGecko = !isWebKit && check(/gecko/);
        var isGecko2 = isGecko && check(/rv:1\.8/);
        var isGecko3 = isGecko && check(/rv:1\.9/);
        var isBorderBox = isIE && !isStrict;
        var isWindows = check(/windows|win32/);
        var isMac = check(/macintosh|mac os x/);
        var isAir = check(/adobeair/);
        var isLinux = check(/linux/);
        var isSecure = /^https/i.test(window.location.protocol);
        var isIE7InIE8 = isIE7 && DOC.documentMode == 7;

        var jsType = '', browserType = '', browserVersion = '', osName = '';
        var ua = navigator.userAgent.toLowerCase();
        var check = function(r) {
            return r.test(ua);
        };      
        
        var osName = '';
        var browserType = '';
        var browserVersion = '';
        var jsType = '';
        
        var browser = function(){
            if(isWindows){
                osName = 'Windows';

                if(check(/windows nt/)){
                    var start = ua.indexOf('windows nt');
                    var end = ua.indexOf(';', start);
                    osName = ua.substring(start, end);
                }
            } else {
                osName = isMac ? 'Mac' : isLinux ? 'Linux' : 'Other';
            } 

            if(isIE){
                browserType = 'IE';
                jsType = 'IE';

                var versionStart = ua.indexOf('msie') + 5;
                var versionEnd = ua.indexOf(';', versionStart);
                browserVersion = ua.substring(versionStart, versionEnd);

                jsType = isIE6 ? 'IE6' : isIE7 ? 'IE7' : isIE8 ? 'IE8' : 'IE';
            } else if (isGecko){
                var isFF =  check(/firefox/);
                browserType = isFF ? 'Firefox' : 'Others';;
                jsType = isGecko2 ? 'Gecko2' : isGecko3 ? 'Gecko3' : 'Gecko';

                if(isFF){
                    var versionStart = ua.indexOf('firefox') + 8;
                    var versionEnd = ua.indexOf(' ', versionStart);
                    if(versionEnd == -1){
                        versionEnd = ua.length;
                    }
                    browserVersion = ua.substring(versionStart, versionEnd);
                }
            } else if(isChrome){
                browserType = 'Chrome';
                jsType = isWebKit ? 'Web Kit' : 'Other';

                var versionStart = ua.indexOf('chrome') + 7;
                var versionEnd = ua.indexOf(' ', versionStart);
                browserVersion = ua.substring(versionStart, versionEnd);
            }else{
                browserType = isOpera ? 'Opera' : isSafari ? 'Safari' : '';
            }            
        };
        
      return {
         browser: function(){
             browser();
             return {
                'osName': osName,
                'browserType': browserType,
                'browserVersion': browserVersion,
                'jsType': jsType 
             };
         } 
      }; 
   });
//********
    dialogServ.service('silvester', function($rootScope){
        
        var _data = null;
        var _phase = 1;
        var _state = 0;
        var changeCount = 0;
        
        var _currentHelperId = 0;
        
        var _allowSelectCustomer = false;
        var _selvesterType = "";
        var _positions = [];
        
        var getPhaseData = function(){
                if(0 < _phase && _phase <= _data.phase.length){
                    return _data.phase[_phase-1];
                }else{
                    return null;
                }
            };
        
            var getStateData = function(){
                var _phase_data = getPhaseData();
                if(_phase_data.test_complete && _phase_data.complete){
                    return "";
                }else{                
                    if(_state > 0 && _state <= _phase_data.state.length){
                        
                        if(_state == _phase_data.state.length){
                            if(_phase_data.test_complete){
                                _phase_data.complete = true;
                            }                                                
                        }
                                                
                        return _phase_data.state[_state-1].text;
                    }else{
                        return "";
                    }
                }
            };
        
            var getStateParameter = function(__param){
                var _phase_data = getPhaseData();
                if(_state > 0 && _state <= _phase_data.state.length){
                    if(_phase_data.state[_state-1][__param] != undefined ){
                        return _phase_data.state[_state-1][__param];           
                    }else{
                        return "";
                    }
                }else{
                    return "";
                }
            };        
        
            var getStateCloseButton = function(){
                var __d = getStateParameter("close_button");
                if(__d) return __d;
                else return "0";
            };
            
            var getStateElement = function(){
                return getStateParameter("show_elem");
            };      
            
            var getStateScreen = function(){
                return getStateParameter("screen");                
            };
            
            var getStateAction = function(){
                return getStateParameter("action");
            };
            
            var reset = function(){
                _phase = 1;
                _state = 0;
                for(var __i=0; __i < _data.phase.length; __i++){
                    _data.phase[__i].complete = false;
                    _data.phase[__i]["show_counter"] = 0;
                    if(_data.phase[__i]["show_once"] === undefined){
                       _data.phase[__i]["show_once"] = false;
                    }
                }
            };
            
        return {

            currentHelperId: _currentHelperId,
            
            selvesterType: function(___type){
                if(___type === undefined)return _selvesterType;
                else _selvesterType = ___type;
            },
                        
            setCurrentHelperId: function(__currentHelperId){
                this.currentHelperId = __currentHelperId;
                _currentHelperId = __currentHelperId;
            },

            fixHelperPosition: function(__position){
                _positions[_currentHelperId] = __position;
            },

            getHelperPosition: function(){
                return _positions[_currentHelperId];
            },

            getHelperId: function(){
                var _phase_data = getPhaseData();
                if(_phase_data){
                    return _phase_data.animation_data_id;
                }else{
                    return 0;
                }
            },

            getAnimationInfo: function(__prop){
                for(var __i=0; __i < _data.animation_data.length; __i++){
                    if(_data.animation_data[__i].id == _currentHelperId){
                        return _data.animation_data[__i][__prop];
                    }                    
                }
                return null;
            },

            reset: function(){
                reset();
            },
            
            setData: function(d){
                _data = d;
                reset();
            },
                    
            getPhaseData: function(){
                return getPhaseData();
            },
                    
            getStateData: function(){
                return getStateData();
            },

            getStateElement: function(){
                return getStateElement();
            },

            getStateScreen: function(){
                return getStateScreen();
            },
              
            getStateAction: function(){
                return getStateAction();
            },
                    
            getStateCloseButton: function(){
                return getStateCloseButton();
            },
            
            visibleHelperImage: function(){
                var ___i = getStateData();
            },

            existNextState: function(){
                var _phase_data = getPhaseData();
                if(_phase_data){
                    if(_state == (_phase_data.state.length) ){
                        return false;
                    }else{
                        return true;
                    }
                }else{
                    return false;
                }
            },

            allowSelectCustomer: function(){
                return _allowSelectCustomer;
            },

            phaseComplete: function(){
                if(_phase == 0)return true;
                var _phase_data = getPhaseData();
                if(_phase_data){
                        if(_phase_data.test_complete && _phase_data.complete){
                            return true;
                        } 
                        if(_phase_data["show_once"] && _phase_data["show_counter"] > 1){
                            _phase_data.complete = true;
                            return true;
                        }
                        
                }
                return false;
            },

            nextState: function(){
                
                var _phase_data = getPhaseData();
                if(_phase_data){
                    _state++;
                    if(_state <= _phase_data.state.length){
                        
                        if(_phase == 1 && _state == 4){
                            _allowSelectCustomer = true;
                        }
                        return getStateData();
                    }else{
                        _phase = 0;
                        _state = 0;
                        if(_phase_data.test_complete){
                            _phase_data.complete = true;
                        }                        
                        return null;
                    }
                }
                return null;
            },
                    
           getPhase: function(){return _phase;},
           getState: function(){return _state;},
                        
            setPhase: function(v){
                _phase = v; 
                var _phase_data = getPhaseData();
                if(_phase_data){
                    _phase_data["show_counter"] += 1;
                }
                _state = 0; 
                changeCount++; 
                return _phase;
            },
            setState: function(v){_state = v; changeCount++;},
            
            changed: function(){
                return changeCount;
            }
        };
        
    });
//*

    
        
        