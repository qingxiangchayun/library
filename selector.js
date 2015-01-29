/**
 * selector.js  选择器
 *
 * return DOM NoteList HTMLCollection
 */

(function(window){
	'use strict';

	// RegExp ID
	var rId = /^#\w+$/; 

	// RegExp className 
	var rClass = /^\.\w+/;

	var rSpace = /\s+/g;

	var getByClassName = function(className){
		var match = [];
		
		// HTMLCollection
		var list;

		var currentClass;

		// 浏览器支持 getElementsByClassName
		if(document.getElementsByClassName){
			return document.getElementsByClassName(className);
		}else{
			list = document.getElementsByTagName('*');

			for(var i=0,len=list.length; i<len; i++){
				// 将多个空格替换成一个空格  <div class="list   active">  'list   active' --> 'list active'
				rSpace.lastIndex = 0;
				currentClass = list[i].className.replace(rSpace,' ');

				if( new RegExp('\\b'+className + '\\b','g').test( currentClass ) ){
					match.push(list[i]);
				}
			}

			return match;
		}
	};

	/**
	 * 选择器
	 * @param  {[String]} str 选择器 '#id' '.class' 'tag'
	 * @return {[type]}          [description]
	 */
	var selector = function(str){
		var className;

		if(!str){
			throw new TypeError('arguments error');
		}

		// '#id'
		if(rId.test(str)){
			return document.getElementById( str.substring(1) );

		// '.class' '.classA.classB' '.classA .classB'
		}else if(rClass.test(str)){
			className = str.replace(/\./g,'');
			return getByClassName(className)
		}

	};


	window.$ = selector;

})(window);


