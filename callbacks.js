/**
 * callbacks js jQuery Callback 代码实现
 * 
 */
;(function(root){
	'use strict';

	/**
	 * 将字符串转成json对象  'once memory' --> { once : true, memory : true }
	 * @param  {[String]} options 
	 * @return {[Object]}  obj
	 */
	var createOptions = function(options){
		var obj = {};
		var arr = [];

		if(options){
			arr = options.match(/\S+/g);

			for(var i=0,len=arr.length; i<len; i++){
				obj[ arr[i] ] = true;
			}
		}

		return obj;
	};

	var inArray = function(elem,arr){
		for(var i=0,len=arr.length; i<len; i++){
			if(elem === arr[i]){
				return i;
			}
		}

		return -1;
	}

	/**
	 * Callbacks
	 * @param  {[String]} options 值 once/memory/unique/stopOnFalse
	 * @return {[Object]} callbacks obj
	 */
	var callbacks = function( options ){
		var memory,
			fired, // options.once fired=true
			firing, // 解决循环 
			list = [],
			stack = [],
			once,
			fireData ; // fire时传入的参数  add 调用 fire 时要用到

		// options { once : true, memory : true } / {}
		options = createOptions(options); 

		var fire  = function(data){
			fireData =  data;

			// 设置once时, fire只执行一次
			if(once){
				return;
			}

			firing = true;
			//for(var i=0,len=list.length; i<len; i++){
			//不缓存list.length  firing过程中 会add
			for(var i=0;i<list.length; i++){
				// 设置 stopOnFalse时，其他callbacks不执行
				if( list[i].apply(this,data) === false && options.stopOnFalse){
					// 防止add时调用
					memory = false; 
					break;
				}
			}
			firing = false;

		/*	if(stack){
				if(stack.length){
					fire( stack.shift() );
				}
			}*/

			if(options.once){
				once = true;
			}
			
		};


		var self = {
			add : function(fn){
				if(!options.unique || !this.has(fn)){
					list.push(fn);
				}
		
				if(firing){


				// 设置memory时， add 时应执行fire方法
				}else if(options.memory && fireData){
					fire(fireData);
				} 

				return this;
			},
			fire : function(){
				if(firing){
					stack.push(arguments);
				}else{
					fire(arguments);
				}
				return this;
			},
			has : function(fn){
				// !!(list && list.length) --> list 为空返false
				return fn ? inArray(fn,list) > -1 : !!(list && list.length)
			}
		}

		return self;

	};

	root.callbacks = callbacks;


})(window);