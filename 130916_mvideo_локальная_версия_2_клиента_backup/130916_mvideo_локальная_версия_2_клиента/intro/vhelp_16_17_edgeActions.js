
(function($,Edge,compId){var Composition=Edge.Composition,Symbol=Edge.Symbol;
//Edge symbol: 'stage'
(function(symbolName){Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",4750,function(sym,e){sym.stop();});
//Edge binding end
Symbol.bindElementAction(compId,symbolName,"${_next_button}","click",function(sym,e){sym.play();});
//Edge binding end
Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",6950,function(sym,e){sym.stop();});
//Edge binding end
Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",11408,function(sym,e){window.open("vhelp_27.html","_self");});
//Edge binding end
})("stage");
//=========================================================
(function(symbolName){Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",1507,function(sym,e){sym.play(0);});
//Edge binding end
})("silv_anim_16");
//=========================================================
(function(symbolName){Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",100,function(sym,e){sym.play(0);});
//Edge binding end
})("silv_wings_16");
//Edge symbol: 'd1'
(function(symbolName){})("d16_1");
//Edge symbol: 'd1'
(function(symbolName){})("d16_2");
//=========================================================
(function(symbolName){Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",100,function(sym,e){sym.play(0);});
//Edge binding end
})("silv_wings_17");
//=========================================================
(function(symbolName){Symbol.bindTriggerAction(compId,symbolName,"Default Timeline",1507,function(sym,e){sym.play(0);});
//Edge binding end
})("silv_anim_17");
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
//Edge symbol end:'next_button'
})(jQuery,AdobeEdge,"EDGE-11452498");