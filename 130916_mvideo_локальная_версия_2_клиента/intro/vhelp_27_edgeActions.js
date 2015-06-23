
(function($,Edge,compId){var Composition=Edge.Composition,Symbol=Edge.Symbol;
//Edge symbol: 'stage'
(function(symbolName){Symbol.bindElementAction(compId,symbolName,"${_next_button}","click",function(sym,e){sym.$("next_button").hide();sym.play();window.open("../game.html","_self");});
//Edge binding end
Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",8500,function(sym,e){sym.stop();});
//Edge binding end
Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",0,function(sym,e){sym.play("start");});
//Edge binding end
Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",9000,function(sym,e){window.open("../game.html","_self");});
//Edge binding end
Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",9005,function(sym,e){window.open("../game.html","_self");});
//Edge binding end
})("stage");
//=========================================================
(function(symbolName){Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",0,function(sym,e){});
//Edge binding end
Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",125,function(sym,e){sym.play();});
//Edge binding end
})("silv_27_1");
//=========================================================
(function(symbolName){Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",125,function(sym,e){sym.play(0);});
//Edge binding end
})("silv_27_2");
//Edge symbol: 'd1'
(function(symbolName){})("d_17");
//=========================================================
(function(symbolName){Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",0,function(sym,e){sym.$("next1").show();sym.$("next2").hide();sym.$("next3").hide();sym.stop();});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_next1}","mouseover",function(sym,e){sym.$("next1").hide();sym.$("next2").show();});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_next2}","mouseout",function(sym,e){sym.$("next2").hide();sym.$("next1").show();});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_next2}","click",function(sym,e){sym.play();});
//Edge binding end
Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",500,function(sym,e){sym.stop(0);});
//Edge binding end
})("next_button");
//Edge symbol: 'd1'
(function(symbolName){})("d_1");
//=========================================================
(function(symbolName){Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",0,function(sym,e){sym.$("next1").show();sym.$("next2").hide();sym.$("next3").hide();sym.stop();});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_next1}","mouseover",function(sym,e){sym.$("next1").hide();sym.$("next2").show();});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_next2}","mouseout",function(sym,e){sym.$("next2").hide();sym.$("next1").show();});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_next2}","click",function(sym,e){sym.play();});
//Edge binding end
Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",500,function(sym,e){sym.stop(0);});
//Edge binding end
})("next_button_1");
//=========================================================
(function(symbolName){Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",0,function(sym,e){sym.$("next1").show();sym.$("next2").hide();sym.$("next3").hide();sym.stop();});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_next1}","mouseover",function(sym,e){sym.$("next1").hide();sym.$("next2").show();});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_next2}","mouseout",function(sym,e){sym.$("next2").hide();sym.$("next1").show();});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_next2}","click",function(sym,e){sym.play();});
//Edge binding end
Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",500,function(sym,e){sym.stop(0);});
//Edge binding end
})("next_button_2");
//Edge symbol end:'next_button_2'
})(jQuery,AdobeEdge,"EDGE-9693118");