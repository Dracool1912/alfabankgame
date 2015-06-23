var silvesterDialog =  {
    
    "animation_data":[
        {"id": 1, 
            "description": "сердитый, вправо руки за спину",
            "helper_dir": 1,
            "wings": {"top": "110px", "left": "-100px", "width": "594px", "height":"266px"},
            "wing_up": {"top": "80px", "left": "0px", "width": "260px", "height":"90px"},
            "wing_down": {"top": "100px", "left": "0px", "width": "298px", "height":"82px"},
            "wings_back": true,
            "balloon":{"bottom":"-220px", "left":"-140px"}, 
            "body":{"top":"0px", "left":"90px", "width": "288px", "height":"614px"}, 
            "arrow":"right_right_down_arrow",
            "position":{"top": "120px", "right": "400px", "left": ""}
        },
        
        {"id": 2, 
            "description": "улыбается, вправо руки в бока",
             "helper_dir": 2,
            "wings": {"top": "90px", "left": "-30px", "width": "410px", "height":"150px"},
            "wing_up": {"top": "100px", "left": "-30px", "width": "350px", "height":"134px"},
            "wing_down": {"top": "120px", "left": "-30px", "width": "400px", "height":"116px"},
            "wings_back": true,
            "balloon":{"bottom":"-145px", "left":"-180px"}, 
            "body":{"top":"0px", "left":"90px", "width": "205px", "height":"391px"}, 
            "arrow":"right_right_down_arrow",
            "position":{"top": "120px", "right": "400px", "left": ""}
        },
        
        {"id": 3, 
            "helper_dir": 3,
            "description": "спиной слево",
            "wings": {"top": "80px", "left": "10px", "width": "520px", "height":"276px"},
            "wing_up": {"top": "80px", "left": "10px", "width": "517px", "height":"197px"},
            "wing_down": {"top": "115px", "left": "60px", "width": "477px", "height":"244px"},
            "wings_back": false,
            "balloon":{"bottom":"-120px", "left":"-200px"}, 
            "body":{"top":"0px", "left":"90px", "width": "282px", "height":"388px"}, 
            "arrow":"right_right_down_arrow",
            "position":{"top": "120px", "right": "400px", "left": ""}
        },        
        
        {"id": 4, 
            "helper_dir": 4,
            "description": "сердитый, влево руки за спину",
            "wings": {"top": "100px", "left": "-20px", "width": "594px", "height":"266px"},
            "wing_up": {"top": "80px", "left": "50px", "width": "260px", "height":"90px"},
            "wing_down": {"top": "100px", "left": "50px", "width": "298px", "height":"82px"},
            "wings_back": true,
            "balloon":{"bottom":"-210px", "left":"-210px"}, 
            "body":{"top":"0px", "left":"90px", "width": "288px", "height":"614px"}, 
            "arrow":"right_right_down_arrow",
            "position":{"top": "120px", "right": "400px", "left": ""}
        },
        
        {"id": 5, 
            "description": "откртие бонусов, неправвильное действие с бонусом - сердитый, влево руки за спину",
            "helper_dir": 4,
            "wings": {"top": "100px", "left": "-20px", "width": "594px", "height":"266px"},
            "wing_up": {"top": "80px", "left": "50px", "width": "260px", "height":"90px"},
            "wing_down": {"top": "100px", "left": "50px", "width": "298px", "height":"82px"},
            "wings_back": true,
            "balloon":{"bottom":"-210px", "left":"-210px"}, 
            "body":{"top":"0px", "left":"90px", "width": "288px", "height":"614px"}, 
            "arrow":"right_right_down_arrow",
            "position":{"top": "200px", "right": "300px", "left": ""}
        },
        
        {"id": 6, 
            "description": "праввильное действие с бонусом - улыбается, вправо руки в бока",
             "helper_dir": 2,   
            "wings": {"top": "90px", "left": "-30px", "width": "410px", "height":"150px"},
            "wing_up": {"top": "100px", "left": "-30px", "width": "350px", "height":"134px"},
            "wing_down": {"top": "120px", "left": "-30px", "width": "400px", "height":"116px"},
            "wings_back": true,
            "balloon":{"bottom":"-145px", "left":"-180px"}, 
            "body":{"top":"0px", "left":"90px", "width": "205px", "height":"391px"}, 
            "arrow":"right_right_down_arrow",
            "position":{"top": "100px", "right": "300px", "left": ""}
        }, 
        
        {"id": 7,  
            "description": "Game Over - улыбается, вправо руки в бока",
             "helper_dir": 2,   
            "wings": {"top": "90px", "left": "-30px", "width": "410px", "height":"150px"},
            "wing_up": {"top": "100px", "left": "-30px", "width": "350px", "height":"134px"},
            "wing_down": {"top": "120px", "left": "-30px", "width": "400px", "height":"116px"},
            "wings_back": true,
            "balloon":{"bottom":"-145px", "left":"-180px"}, 
            "body":{"top":"0px", "left":"90px", "width": "205px", "height":"391px"}, 
            "arrow":"right_right_down_arrow",
            "position":{"top": "120px", "right": "", "left": "500px"}
        },
        
        {"id": 8, 
            "helper_dir": 5,
            "description": "спиной вправо",
            "wings": {"top": "80px", "left": "10px", "width": "520px", "height":"276px"},
            "wing_up": {"top": "80px", "left": "10px", "width": "517px", "height":"197px"},
            "wing_down": {"top": "115px", "left": "60px", "width": "477px", "height":"244px"},
            "wings_back": false,
            "balloon":{"bottom":"-90px", "left":"-110px"}, 
            "body":{"top":"0px", "left":"90px", "width": "282px", "height":"388px"}, 
            "arrow":"right_right_down_arrow",
            "position":{"top": "120px", "right": "400px", "left": ""}
        },        
        
        {"id": 9, 
            "helper_dir": 6,
            "description": "спиной с рупором влево",
            "wings": {"top": "105px", "left": "-105px", "width": "550px", "height":"240px"},
            "wing_up": {"top": "80px", "left": "10px", "width": "517px", "height":"197px"},
            "wing_down": {"top": "115px", "left": "60px", "width": "477px", "height":"244px"},
            "wings_back": false,
            "balloon":{"bottom":"-120px", "left":"-200px"}, 
            "body":{"top":"0px", "left":"90px", "width": "325px", "height":"419px"}, 
            "arrow":"right_right_down_arrow",
            "position":{"top": "120px", "right": "400px", "left": ""}
        },
        
        {"id": 10, 
            "helper_dir": 7,
            "description": "спиной с рупором вправо",
            "wings": {"top": "105px", "left": "70px", "width": "550px", "height":"240px"},
            "wing_up": {"top": "80px", "left": "10px", "width": "517px", "height":"197px"},
            "wing_down": {"top": "115px", "left": "60px", "width": "477px", "height":"244px"},
            "wings_back": false,
            "balloon":{"bottom":"-120px", "left":"-200px"}, 
            "body":{"top":"0px", "left":"90px", "width": "325px", "height":"419px"}, 
            "arrow":"right_right_down_arrow",
            "position":{"top": "120px", "right": "400px", "left": ""}
        },
        
        {"id": 11, 
            "description": "улыбается, вправо руки в бока - успешная продажа - SALE_OK screen",
            "helper_dir": 2,
            "wings": {"top": "90px", "left": "-30px", "width": "410px", "height":"150px"},
            "wing_up": {"top": "100px", "left": "-30px", "width": "350px", "height":"134px"},
            "wing_down": {"top": "120px", "left": "-30px", "width": "400px", "height":"116px"},
            "wings_back": true,
            "balloon":{"bottom":"-145px", "left":"-180px"}, 
            "body":{"top":"0px", "left":"90px", "width": "205px", "height":"391px"}, 
            "arrow":"right_right_down_arrow",
            "position":{"top": "300px", "right": "", "left": "400px"}
        },        
        
        //клиент ушел
        {"id": 12, 
            "description": "сердитый, вправо руки за спину",
            "helper_dir": 1,
            "wings": {"top": "110px", "left": "-100px", "width": "594px", "height":"266px"},
            "wing_up": {"top": "80px", "left": "0px", "width": "260px", "height":"90px"},
            "wing_down": {"top": "100px", "left": "0px", "width": "298px", "height":"82px"},
            "wings_back": true,
            "balloon":{"bottom":"-220px", "left":"-140px"}, 
            "body":{"top":"0px", "left":"90px", "width": "288px", "height":"614px"}, 
            "arrow":"right_right_down_arrow",
            "position":{"top": "120px", "right": "", "left": "400px"}
        }        
    ],
    
    "phase" : [
        {"id":1,
            "screen" : "",
            "test_complete": true,
            "complete": false,
            "animation_data_id": 4,
         "state" : [    
             {"text":"Итак, мы в отделе <b>Digital</b>. Ты можешь передвигать с помощью мыши: на случай, если я загораживаю тебе игровое пространство:)", "show_elem":"", "screen":""},
             {"text":"Нашел себя? Вон там стоит оптимистически настроенный продавец в красненькой рубашке – это ты.", "show_elem":"", "screen":""},
             {"text":"Нажми левой кнопкой мыши по любому месту в отделе – туда переместится твой персонаж.", "show_elem":"", "screen":"", "action":"allow_customer_selection"},
             {"text":"Видишь покупателя, который прогуливается вдоль витрин? Ты можешь пообщаться с ним. Для выбора покупателя нажми по нему левой кнопкой мыши.", "show_elem":"", "screen":""},
             {"text":"Для того чтобы снять выбор, ты можешь нажать на игровое поле. Чтобы начать диалог с покупателем, нажми кнопку <b>Начать общение</b>.", "show_elem":"", "screen":""}
            ]
        },
        
        {"id":2,
            //локация диалога с покупателем
            "screen" : "",
            "test_complete": true,
            "complete": false,
            "show_once": true,
            "animation_data_id": 4,
         "state" : [                          
             {"text":"Итак, мы находимся в локации диалога с покупателем. Сейчас ты будешь общаться с ним. Обрати внимание на таймер: после каждой фразы будет списываться время.", "show_elem":"game_time_progress_tabl", "screen":""},
             {"text":"А теперь  поздоровайся с покупателем. Выбери верный вариант приветствия из списка предложенных.", "show_elem":"", "screen":"", "action":"start_customer_dialog"}
            ]
        },

        {"id":3,
            //удачная покупка
            "screen" : "",
            "test_complete": false,
            "complete": false,
            "animation_data_id": 11,
         "state" : [                          
             {"text":"Посмотри, совершенная продажа отобразилась в счетчике продаж. Ты прирожденный продавец! Давай вернемся в магазин, и ты попробуешь поработать с покупателем самостоятельно!", "show_elem":"sales_counter_highlight", "screen":"sale_ok", "action":"close_dialog_mode"}
            ]
        },

        {"id":4,
            //не удачная покупка
            "screen" : "",
            "test_complete": false,
            "complete": false,
            "animation_data_id": 12,
         "state" : [                          
             {"text":"Из-за того, что ты меня не слушал, мы потеряли время и не набрали ни одного балла. Давай вернемся в магазин и попытаемся еще раз.", "show_elem":"sales_counter_highlight", "screen":"sale_fail", "action":"close_dialog_mode"}
            ]
        },
        
        {"id":5,
            //реализация бонуса
            "screen" : "",
            "test_complete": true,
            "complete": false,
            "animation_data_id": 5,
         "state" : [                          
             {"text":"Когда в зале нет покупателей или ты немного устал, не стоит отлынивать от работы и заниматься ничегонеделанием.", "show_elem":"", "screen":""},
             {"text":"Ты можешь заняться поиском бонусов, например, протереть пыль, пополнить накопители, расставить ценники.", "show_elem":"", "screen":""},
             {"text":"Чтобы найти бонус, поводи мышкой по игровому полю. Когда указатель изменится на указатель в виде руки, нажми по на предмет, на котором находится указатель. Подскажу тебе: ориентируйся на стеллаж с ноутбуками.", "show_elem":"", "screen":"", "action":"show_bonus_area"}
            ]
        },

        {"id":6,
            //реализация бонуса
            "screen" : "",
            "test_complete": true,
            "complete": false,
            "animation_data_id": 5,
         "state" : [                          
             {"text":"Перед тобой список доступных действий, которые ты можешь совершить. Выбери действие и нажми на него. Не ошибись с выбором! За правильно выбранное действие ты получишь балл.", "show_elem":"", "screen":""}
            ]
        },
        
        {"id":7,
            //Реализация бонуса. Протереть пыль
            "screen" : "",
            "test_complete": true,
            "complete": false,
            "animation_data_id": 6,
         "state" : [                          
             {"text":"Ура-ура! Ты выбрал правильное действие и получил за это бонус. Обрати внимание: за бонусы также списывается время.", "show_elem":"bonus_counter_highlight", "screen":""},
             {"text":"В течение рабочего дня ты можешь найти множество бонусов. Если не будет покупателей, не стой без дела и не жди, что они появятся сразу, – ищи бонусы.", "show_elem":"", "screen":"", "action":"check_bonus_counter"}
            ]
        },
        
        {"id":8,
            //Реализация бонуса. Написать пальцем
            "screen" : "",
            "test_complete": true,
            "complete": false,
            "animation_data_id": 5,
         "state" : [                          
             {"text":"Никита, ну разве можно по монитору пальцем водить? Надо было выбрать <b>Протереть пыль</b>. Нам за этот бонус даже баллов не начислили.", "show_elem":"", "screen":""},
             {"text":"В течение рабочего дня ты можешь найти множество бонусов. Если не будет покупателей, не стой без дела и не жди, что они появятся сразу, – ищи бонусы.", "show_elem":"", "screen":"", "action":"close_bonus"}
            ]
        },
        
        {"id":9,
            //Реализация бонуса. Протереть пыль рукой
            "screen" : "",
            "test_complete": true,
            "complete": false,
            "animation_data_id": 5,
         "state" : [                          
             {"text":"Никита, зачем рукой? У тебя же есть салфетка. Надо было выбрать «Протереть пыль». Нам за этот бонус даже баллов не начислили.", "show_elem":"", "screen":""},
             {"text":"В течение рабочего дня ты можешь найти множество бонусов. Если не будет покупателей, не стой без дела и не жди, что они появятся сразу,  – ищи бонусы.", "show_elem":"", "screen":"", "action":"close_bonus"}
            ]
        },
        

        {"id":10,
            //Реализация второго бонуса
            "screen" : "",
            "test_complete": true,
            "complete": false,
            "animation_data_id": 5,
         "state" : [                          
             {"text":"Теперь попробуй сам найти бонус. Закрой мою подсказку и приступай к поиску.", "show_elem":"", "screen":"", "close_button":"1"}
            ]
        },
        
        {"id":11,
            //Второй бонус. Сфотографироваться
            "screen" : "",
            "test_complete": true,
            "complete": false,
            "animation_data_id": 5,
         "state" : [                          
             {"text":"Ой, а как же я без новой фотки?  Я ничего не продам, но сфотографируюсь.", "show_elem":"", "screen":""},
             {"text":"Баллов не получили, а время потеряли. В следующий раз будь посерьезнее.", "show_elem":"", "screen":"", "action":"close_bonus"}
            ]
        },
        
        
        {"id":12,
            //Второй бонус. Поставить на место
            "screen" : "",
            "test_complete": true,
            "complete": false,
            "animation_data_id": 6,
         "state" : [                          
             {"text":"Отлично! Ты все правильно сделал!", "show_elem":"bonus_counter_highlight", "screen":"", "action":"check_bonus_counter"}
            ]
        },
        
        {"id":13,
            //Второй бонус. Установить новые приложения
            "screen" : "",
            "test_complete": true,
            "complete": false,
            "animation_data_id": 5,
         "state" : [                          
             {"text":"Нашел время для игр. Тебе надо было просто поставить планшет на место. Приложений он не требует.", "show_elem":"", "screen":""},
             {"text":"Баллов не получили, а время потеряли. В следующий раз будь посерьезнее.", "show_elem":"", "screen":"", "action":"close_bonus"}
            ]
        },
        
        
// TODO
//Молодой человек, не могли бы вы мне помочь?
        {"id":14,
            //Активный покупатель
            "screen" : "",
            "test_complete": true,
            "complete": false,
            "animation_data_id": 4,
         "state" : [                          
             {"text":"Посмотри вот на того молодого человека, который тебя зовет. Это активный покупатель. Он готов купить и ему нужна твоя помощь.", "show_elem":"", "screen":""},
             {"text":"Начать диалог с ним надо как можно раньше, иначе он уйдет. Для этого на него надо будет просто нажать и выбрать действие Начать диалог.", "show_elem":"", "screen":""},
             {"text":"Сейчас ты будешь с ним общаться самостоятельно. Следи за временем, не забывай про вежливое обращение с клиентом и твою цель  – стать супер-продавцом! Если что, обращайся ко мне за советом. Меня можно вызвать по кнопке Сильвестр. Ну что ты стоишь? Закрывай мою подсказку и вперед – к продажам!", "show_elem":"", "screen":""}
            ]
        },
        
        {"id":15,
            //Game Over
            "screen" : "",
            "test_complete": true,
            "complete": false,
            "animation_data_id": 7,
         "state" : [                          
             {"text":"Что же, этап обучения закончен. Дальше - сам! Можешь всегда рассчитывать на мою поддержку.", "show_elem":"", "screen":"", "action":"game_over"}
            ]
        },
        
        {"id":16,
            // следующая удачная покупка
            "screen" : "",
            "test_complete": false,
            "complete": false,
            "animation_data_id": 11,
         "state" : [                          
             {"text":"Молодец, ты совершил еще одну успешную продажу. Давай вернемся в магазин, и я научу тебя еще одной полезной вещи, которая поможет тебе заработать очки.", "show_elem":"sales_counter_highlight", "screen":"sale_ok", "action":"close_dialog_mode_and_show_bonus_dialog"}
            ]
        },        
        
    ]
};