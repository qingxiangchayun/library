/**
 * promise js
 * 
 * @return {[type]} 
 */
;(function(window){
	'use strict';

	/**
	 * [Promise description]
	 * pending, fulfilled 或 rejected
	 */
	function Promise(){
		this.status = 'pending';
	}

	Promise.prototype = {
		constructor : Promise,
		then : function(onFulfilled,onRejected){

			return new Promise();
		}
	};


})(window);