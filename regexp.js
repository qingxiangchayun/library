/**
 * RegExp.js 
 * 各种有趣的正则
 */

;(function(window){
	'use strict';

	var regexpLib = {

	};

	// 手机号、银行卡号只显示后四位
	(function(){

		var re = /\d(?=\d{4})/g;
		var str = '18689161829';
		console.log(str.replace(re,'*')); // *******1829

	})();

	
	// 手机号显示为 ***-****-****
	(function(){

		var re = /(\d{3})(\d{4})(\d{4})/;
		var str = '18689161829';
		var arr = re.exec(str);
		arr.shift();
		var newStr = arr.join('-');
		console.log(newStr);

	})();

	// 转驼峰
	(function(){
		var re = /-(\w)/g;
		var str = 'border-top-width';

		str.replace(re,function($0,$1){
			return $1.toUpperCase();
		});

	})();

	// 获取url对应的参数值
	(function(){

		//var str = location.search;
		var str = '?search=123&categoryId=-1&serviceType=totalCourse';
		
		function queryUrlParam(key){
			var re = new RegExp('[?&]' + key + '=([^&]+)');

			return re.exec(str) ? re.exec(str)[1] : null;

		}
		

	})();

	window.regexpLib = regexpLib;

})(window);