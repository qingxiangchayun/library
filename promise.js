/**
 * promise js
 * 
 */
;(function(global, factory){
	// CommonJS
	if( typeof module !== "undefined" && module && module.exports){
		module.exports = factory();
	
	// AMD RequireJS
	}else if( typeof define === 'function' && define.amd){
		define(factory);
	
	// global
	}else{
		global.Promise = factory();
	}

})( window, function(){
	'use strict';

	// 判断浏览器是否支持ES6的Promise  
	// 不要使用 typeof Promise === 'function' 判断， 函数会预解析
	if(window.Promise){
		//return ;
	}


	/**
	 * Promise 构造函数
	 * status 值 pending, fulfilled 或 rejected
	 */
	function Promise(resolver){
		if(typeof resolver !== 'function'){
			throw new TypeError('resolver must be a function.');
		}

		if(!this || this.constructor !== Promise){
			throw new TypeError(' Constructor Promise requires "new".')
		}

		var _this = this;

		this.status = 'pending';
		this.queue = [];

		var resolve = function(value){
			_this.resolve(value);
		};

		var reject = function(reason){
			_this.reject(reason);
		}

		resolver(resolve,reject);
	}

	/*Promise.resolve = function(value){
		this.status = 'fulfilled';
		this._doQueue(value);
	}

	Promise.reject = function(reason){
		this.status = 'rejected';
		this._doQueue(reason);
	}

	Promise._doQueue = function(val){
		var status = this.status;
		for(var i=0,len = Promise.queue.length; i<len; i++){

			if(status === 'fulfilled'){
				Promise.queue[i][0]();
			}

			if(status === 'rejected'){
				Promise.queue[i][1]();
			}
		}
	}*/

	Promise.prototype = {
		constructor : Promise,
		resolve : function(value){
			this.status = 'fulfilled';
			this._doQueue(value);
		},
		reject : function(reason){
			this.status = 'rejected';
			this._doQueue(reason);
		},
		_doQueue : function(val){
			var status = this.status;
			var _this = this;

			setTimeout(function(){
				console.log(_this)

				for(var i=0,len = _this.queue.length; i<len; i++){

					if(status === 'fulfilled'){
						_this.queue[i][0] && _this.queue[i][0](val);
					}

					if(status === 'rejected'){
						_this.queue[i][1] && _this.queue[i][1](val);
					}
				}
				
			},1)
		},
			
		then : function(onFulfilled,onRejected){
			this.queue.push([onFulfilled,onRejected]);
			return this;
		},
		catch : function(onRejected){
			return this.then(null,onRejected);
		}
	};
	
	return Promise;
});