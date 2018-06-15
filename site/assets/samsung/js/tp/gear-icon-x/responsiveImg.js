// responsiveImg
// (function($,window,document,undefined){ 
	var options = {
		size: [
			{device:'mobile',size:640},
			{device:'tablet',size:960},
			{device:'btablet',size:1280},
			{device:'web',size:null}
		]
	}
		,list = []
		,win = $(window)
		,before_model = null
		,inited = false

	function cal(width){
		var model = '';
		$.each(options.size,function(i,obj){
			if(obj != null)
			{
				if(obj.size == null){
					model = obj.device;
				}else if(width <= obj.size){
					model = obj.device;
					return false;
				}
				return true;
			}else{
				return 'web';
			}
		});
		return model;
	}
	function sort_func(a,b){
		return a.size == null ? false : b.size == null ? true : (a.size > b.size);
	}

	jqueryFunction = viewResize;
	function viewResize(){
		// setTimeout(pageReSizing,1000);
		//var w = win.width();
		var w = viewportWidth();
		var model = cal(w);
		if(model == before_model) return;
		before_model = model;
		$.each(list,function(i,elem){
			var src = null;
			(src = elem.getAttribute('data-'+model+'-img')) && (elem.src != src) && (elem.src = src);

			/* 160625 add alt data attribute */
			var alt = null;
			(alt = elem.getAttribute('data-'+model+'-alt')) && (elem.alt != alt) && (elem.alt = alt);
		});
	}
	
	function init(args,THIS){
		if(args){
			$.extend(options,args);
		}
		list = $(THIS);
		options.size.sort(sort_func);
		inited || win.on('resize',resize_re) && (inited = true)
		viewResize();


	}

	function refresh(elem){
		list = $(elem);
	}

	var method = {
		init: init,
		refresh: refresh
	}

	$.fn.responsive = function(args){
		if(typeof args == 'undefined'){
			method['init'](null,this);
		}else if(typeof args == 'object'){
			method['init'](args,this);
		}else if(typeof args == 'string' && method[args]){
			method[args](this);
		}
		return this;
	}

	function resize_re()
	{
		viewResize();
		setTimeout(viewResize, 100);
	}
// })(jQuery,window,document);

$(function(){
	$('img.responsiveImg').responsive({
		size:[
			{device:'mobile',size:640},
			{device:'tablet',size:960},
			{device:'btablet',size:1280},
			{device:'web',size:null}
		]
	});
});
$(window).resize(function(){
	resize_re()
});


function viewportWidth() 
{  
	// console.log("viewportWidth - clientWidth : " + document.documentElement.clientWidth);
	// console.log("viewportWidth - innerWidth : " + window.innerWidth);
	
	if (typeof document.documentElement.clientWidth != 'undefined' && typeof window.innerWidth != 'undefined')  
	{
		if(document.documentElement.clientWidth > window.innerWidth)
			return document.documentElement.clientWidth;  
		else
			
			return window.innerWidth;
	}else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0)
	{
		return document.documentElement.clientWidth;  
	}else{
		return viewportwidth = document.getElementsByTagName('body')[0].clientWidth;
	} 
}