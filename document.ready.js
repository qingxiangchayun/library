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
 * 相关知识
 * document.readyState  (https://html.spec.whatwg.org/multipage/dom.html#current-document-readiness)
 * Returns "loading" while the Document is loading, 
 * "interactive" once it is finished parsing but still loading sub-resources, and "complete" once it has loaded.
 * 
 */

;(function(window){
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

		var toplevel = false;

		try {
			toplevel = window.frameElement == null;
		} catch(e) {}

		if(document.documentElement.doScroll && toplevel){
			doScrollCheck();
		}
	};

	
	window.$ = $;

})(window);