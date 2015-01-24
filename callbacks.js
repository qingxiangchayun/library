/**
 * callbacks js  jQuery Callbacks 简单实现
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
		var arr;

		if(options){
			arr = options.match(/\S+/g) || [];

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
			fired, 
			firing, // 解决循环 
			firingStart,
			firingLength,
			firingIndex,
			list = [],
			fireData ; // fire时传入的参数  add 调用 fire 时要用到

		// options { once : true, memory : true } / {}
		options = createOptions(options); 

		var fire  = function(data){
			fireData =  data;

			fired = firing = true;

			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;

			for(; firingIndex < firingLength; firingIndex++){
				
				// 设置 stopOnFalse时，其他callbacks不执行
				if( list[firingIndex].apply(this,data) === false && options.stopOnFalse){
					// 防止add时调用
					options.memory = false; 
					break;
				}
			}
			
			firing = false;

		};


		var self = {
			add : function(fn){
				
				// memory=true add时执行fire,之前执行完成的callbacks应不再执行  所以 for循环中i不应该一直从0开始
				// firingStart = current list.length
				var start = list.length;

				if(!options.unique || !this.has(fn)){
					list.push(fn);
				}
		
				if(firing){
					firingLength = list.length;

				// 设置memory时，add时应执行fire方法
				}else if(options.memory && fireData){
					firingStart = start;
					fire(fireData);
				} 

				return this;
			},
			fire : function(){
				// 设置once时, fire只执行一次
				if(!options.once || !fired){
					fire(arguments);
				}
				return this;
			},
			remove : function(fn){
				var removeIndex = inArray(fn,list);
				if(removeIndex > -1){
					list.splice(removeIndex,1);
					
					// firing过程中 remove，需要修改 firingLength,firingIndex
					if(firing){

						// [fn1,fn2,fn3]  
						// case : fn1 firing remove fn1  list=[fn2,fn3] removeIndex 0 firingInex 0  index/length -1
						// case : fn1 firing remove fn2  list=[fn1,fn3] removeIndex 1 firingInex 0 index 不用修改
						// case : fn2 firing remove fn1  list=[fn2,fn3] removeIndex 0 firingInex 1 index/length -1
						
						// removeIndex 值应该永远小于 firingLength
						//if(removeIndex <= firingLength){
							firingLength -= 1;
						//}

						if(removeIndex <= firingIndex){
							firingIndex -= 1;
						}
					}
				}

				return this;
			},
			has : function(fn){
				//  list 为空返false
				return fn ? inArray(fn,list) > -1 : list.length > 0
			},
			empty : function(){
				list = [];

				// empty 修改 firingLength 
				firingLength = 0;
				return this;
			},
			fired : function(){
				return !!fired;
			}
		}

		return self;

	};

	root.callbacks = callbacks;


})(window);