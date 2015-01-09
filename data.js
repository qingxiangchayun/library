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
			
			this.dataAttr(elem,key);

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
		},
		dataAttr : function(elem,key){ // 处理 HTML5 data-*  attribute
			var attr, name,value ;

			if(key){
				name = 'data-' + key;

			}else{
				attr = elem.attributes;

				for(var i=0,len=attr.length; i<len; i++){
					name = attr[i].name;
					value = attr[i].value;

					if( name.indexOf( 'data-') === 0){
						name = name.substring(5);

						this.set(elem,name,value);
					}
				}
			}
		}

	};

	
	window.Data = Data;

})(window);





