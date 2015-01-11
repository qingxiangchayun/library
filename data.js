/**
 * data 数据缓存
 * 
 * export Data 
 */
;(function(window){
	'use strict';

	var data_user, data_priv, exportData;

	/**
	 * Data 构造函数
	 */
	function Data(){
		this.cache = {
			0 : {}
		};

		this.expando = 'datacache' + Math.random();

		console.log(this);
	}

	Data.uid = 1;

	Data.prototype = {
		constructor : Data,
		key : function(elem){ 

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
			
			//this.dataAttr(elem,key);

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

	data_user = new Data();
	data_priv = new Data();

	// 重写 data_uesr 的get方法 处理 HTML5 data-*  attribute
	data_user.get = function(elem,key){
		var attr, name,value,cache;

		if( !data_priv.get(elem,'parsedDataAttrs') ){
			attr = elem.attributes;

			for(var i=0,len=attr.length; i<len; i++){
				name = attr[i].name;
				value = attr[i].value;

				if( name.indexOf('data-') === 0){
					name = name.substring(5);

					this.set(elem,name,value);
				}
			}

			// 需调用private的set方法
			data_priv.set(elem, 'parsedDataAttrs', true);
		}

		cache = this.cache[this.key(elem)];
		return key === undefined ? cache : cache[key];
	};

	exportData = data_user;
 
	window.Data = exportData;
	window.DataPvt = data_priv;

})(window);





