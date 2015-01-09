/**
 * data 数据缓存
 * export Data 
 */
;(function(window){
	'use strict';

	var Data = {
		cache : {
			0 : {}
		},
		uid : 1,
		expando : Math.random,
		key : function( elem ){

			var unlock = elem[this.expando];

			if(!unlock){
				unlock = Data.uid ++;

				elem[this.expando] = unlock;
			}

			if( !this.cache[unlock] ){
				this.cache[unlock] = {};
			}

			return unlock;	

		},
		set : function(elem,data,value){

			var unlock = this.key(elem);
			var cache = this.cache[unlock];

			if( typeof data === 'string'){
				cache[data] = value;
			}else{
				for(var prop in data){
					cache[prop] = data[prop];
				}
			}

			return cache;
		},
		get : function(elem,key){
			var cache = this.cache[this.key(elem)];

			return key === undefined ? cache : cache[key];
		},
		remove : function(elem,key){
			var unlock = this.key(elem);
			
			// key 存在只remove对应数据
			if(key){
				delete this.cache[unlock][key];
			}else{
				this.cache[unlock] = {};
			}
		}

	};

	
	window.Data = Data;

})(window);





