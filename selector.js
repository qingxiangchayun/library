/**
 * selector.js  选择器
 *
 * return DOM obj /  HTMLCollection / Node List  
 */

;(function(window){
	'use strict';

	// RegExp ID
	var rId = /^#\w+$/; 

	// RegExp className 
	var rClass = /^\.\w+/;

	var toolStrim = function(str){
		var trim = String.prototype.trim;

		if(trim){
			return trim.call(str);
		}else{
			return str.replace(/^\s+|\s+$/g,'');
		}
	};

	// elem in array
	var inArray = function(elem,arr){
		for(var i=0,len=arr.length; i<len; i++){
			if(elem === arr[i]){
				return true;
			}
		}

		return false;
	};

	// array in array  
	// [a,b] in [a,b,c] true
	// [a,b,d] in [a,b,c] false
	var arrInArray = function(partArr,allArr){
		var result = true;

		for(var i=0,len=partArr.length; i<len; i++){
			if( !inArray( partArr[i], allArr ) ){
				result = false;
				break;
			}
		}

		return result;
	};

	// classNameArr [classA] [classA,classB]
	var getByClassName = function(classNameArr){
		var match = [];
		
		// HTMLCollection
		var list;

		var currentClassArr ;

		// 浏览器支持 getElementsByClassName
		if(document.getElementsByClassName){
			return document.getElementsByClassName(classNameArr.join(' '));
		}else{
			list = document.getElementsByTagName('*');

			for(var i=0,len=list.length; i<len; i++){
				
				// 将多个空格替换成一个空格  <div class="list   active">  'list   active' --> 'list active'
				// rSpace.lastIndex = 0;
				// currentClass = list[i].className.replace(rSpace,' ');
				
				// test 方式不能匹配这种情况  传入className为 '.classA.classC'  html的class为 ' classA classB classC'
				// if( new RegExp('\\b'+className + '\\b','g').test( currentClass ) ){
				// 	match.push(list[i]);
				// }

				
				// ' classA classB classC ' --> [classA,classB,classC]
				currentClassArr = toolStrim( list[i].className ).split(/\s+/);

				if( arrInArray( classNameArr, currentClassArr ) ){
					match.push( list[i] );
				}

			}

			return match;
		}
	};

	/**
	 * 选择器
	 * @param  {[String]} str 选择器 '#id' '.class' 'tag'
	 * @return {[Object]}  DOM obj /  HTMLCollection / Node List        
	 */
	var selector = function(str){
		var classNameArr;

		if(!str){
			throw new TypeError('arguments error');
		}

		// '#id'
		if(rId.test(str)){
			return document.getElementById( str.substring(1) );

		// '.class  ' '.classA.classB' '.classA .classB'
		}else if(rClass.test(str)){
			// trim '.classA   ' --> '.classA'
			// substring '.classA' --> 'classA'
			// split '.classA.classB' --> [classA,classB]
			
			classNameArr = toolStrim(str).substring(1).split('.')
			return getByClassName(classNameArr);
		
		// tag
		}else{
			return document.getElementsByTagName(str);
		}

	};

	// export
	window.$ = selector;

})(window);


