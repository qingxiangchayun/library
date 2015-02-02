/**
 * PubSub 实现
 * 中间层： topic / event
 */

;(function(window){
	'use strict';

	var PubSub = {
		handlers : {}
	};

	// subscribe
	PubSub.sub = function(eventType, handler){
		
		if( !(eventType in this.handlers) ){
			this.handlers[eventType] = [];
		}
		
		this.handlers[eventType].push(handler);

		// return this 可以支持链式调用
		return this;
	};

	PubSub.unsub = function(eventType,handler){
		var handlers = this.handlers;

		if(eventType in handlers){

			// handler存在 remove对应的订阅信息
			if(handler){

				for(var i=0,len=handlers[eventType].length; i<len; i++){
					if(handlers[eventType][i] == handler){
						handlers[eventType].splice(i,1);
						break;
					}
				}

			}else{
				handlers[eventType] = [];
			}
		}

		return this;
	};

	// publish
	PubSub.pub = function(eventType){
		// handler arguments
		var handlerArgs = Array.prototype.slice.call(arguments,1);

		if( this.handlers[eventType] ){

			for(var i=0,len=this.handlers[eventType].length; i<len; i++){
				this.handlers[eventType][i].apply(this,handlerArgs);
			}
		}
		
		return this;
	};

	window.PubSub = PubSub;

})(window);