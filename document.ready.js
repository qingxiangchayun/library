/**
 * document.ready 实现
 *
 * use API
 * $ ( function(){ code... } )
 *
 * DOM Ready 
 * 1、DOMContentLoaded IE9+ 
 * 2、readystatechange document.readystate !=='loading' IE8 
 * 3、document.documentElement.doScroll
 * 
 */

(function(window){
	'use strict';

	var callbackQueue = [];
	var isBindReady = false;

	var $ = function(callback){
		
		callbackQueue.push(callback);

		bindReady();
		
	};


	var domReady = function(){

		$.isReady = true;

		while(callbackQueue.length){
			(callbackQueue.shift())();
		}

		if(document.addEventListener){
			document.removeEventListener('DOMContentLoaded',domReady,false);
		}else{
			document.detachEvent('DOMContentLoaded',domReady);
		}
			
	};

	var doScrollCheck = function(){
		if($.isReady){
			return;
		}

		try {
			document.documentElement.doScroll('left');
		} catch (error){
			setTimeout( doScrollCheck, 1);
			return;
		}
		domReady();
	};

	var bindReady = function(){

		if(isBindReady){
			return;
		}

		isBindReady = true;

		if( document.addEventListener){
			document.addEventListener('DOMContentLoaded', domReady ,false);
		}else{
			document.attachEvent('onreadystatechange', domReady);
		}

		if(document.documentElement.doScroll){
			doScrollCheck();
		}
	};

	
	window.$ = $;

})(window);