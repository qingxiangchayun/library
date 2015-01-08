/**
 * PubSub 实现
 */

(function(window){
	'use strict';

	var PubSub = {
		handlers : {}
	};

	PubSub.on = function(eventType, handler){

		if( !(eventType in this.handlers) ){
			this.handlers[eventType] = [];
		}
		
		this.handlers[eventType].push(handler);

		return this;
	};

	PubSub.emit = function(eventType){
		// handler arguments
		var handlerArgs = Array.prototype.slice.call(arguments,1);

		for(var i=0,len=this.handlers[eventType].length; i<len; i++){
			this.handlers[eventType][i].apply(this,handlerArgs);
		}

		return this;
	};

	window.PubSub = PubSub;

})(window);