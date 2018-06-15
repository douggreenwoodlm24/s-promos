//************************************
	
	// SAMSUNG NFC Sub Landing
	// NINEFIVE

//************************************/

$(window).load(function(){
	viewSection = 0;
	reScroll = 0;

	setTimeout(init,100);
	setTimeout(topMove,500);
	check_device();
	
	setTimeout(init,1000);

	if(orientationChk=='portrait')
		oldOrientation = 'portrait';
	else if(orientationChk=='landscape')
		oldOrientation = 'landscape';

	viewSection = 0;
});
var oldOrientation;
var reScroll;
$(window).resize(function(){
/*	if(check_device() == '')
	{
		$("body").css({"position":"static"});
		$("#nfc_wrap").removeClass("mobile_device");
	}else{

	}*/

	pageH = window.innerHeight;

	if(viewportWidth() > 1920) pageW = 1920;
	else if(viewportWidth() < 320) pageW = 320;
	else pageW = viewportWidth(); 

	//$('a.btn_buy_now').css('left',pageW/2);
	$(".slider .slider_cont").css('width',pageW);
	$(".slider .slider_cont ul li").css('width',pageW);
	$(".cont > div").eq(1).find(".slider .slider_cont ul").css({"margin-left":-pageW * subTab02});
	$(".cont > div").eq(2).find(".slider .slider_cont ul").css({"margin-left":-pageW * subTab03});
	
	setTimeout(function(){		
		
		if(check_device() != '' && orientationChk=='portrait')
		{	
			init();
			reScroll = headerHeight + (pageH * (viewSection));
			if(reScroll > 0)
				$("html,body").stop().animate({"top": -reScroll + "px"},500);
			oldOrientation = 'portrait';
		
		}else if(check_device() != '' && orientationChk=='landscape')
		{
			if(oldOrientation == 'portrait')
			{
				init();
				reScroll = headerHeight + (pageH * (viewSection));
				$("body").animate({"scrollTop" : reScroll});
				oldOrientation = 'landscape';
			}
		}

	},500);
	
});

$(window).on("orientationchange",function(event){
	setTimeout(init,200);
	if(check_device() != '' && orientationChk=='portrait'){
		$(window).scrollTop(0);
		setTimeout(function(){
			fixTop = 0;
			viewSection =0;
			currScTop = 0;
			$('body').css({'top':currScTop});
			
			setTimeout(function(){
				init();
				topMove();
			}, 200);
		}, 500);
		//setTimeout(topMove,200);
	}
	
})

var scroll_top;
var fixAble = false;
$(window).scroll(scrolling);

function scrolling(){
	scroll_top = $(window).scrollTop();

	if(check_device() != '' && orientationChk=='portrait')
	{	
		if(scroll_top <= fixTop && pageType == "static")
		{
			toFixed();
		}
	}

	if(check_device() != '' && orientationChk=='landscape')
	{
		var contH = parseInt($(".keyvisual").css("height"));
		if(headerHeight + contH * 5 < scroll_top)
		{
			viewSection = 5;
			reScroll = headerHeight + (pageH * 5);
		}
		else if(headerHeight + contH * 4 < scroll_top)
		{
			viewSection = 4;
			reScroll = headerHeight + (pageH * 4);
		}
		else if(headerHeight + contH * 3 < scroll_top)
		{
			viewSection = 3;
			reScroll = headerHeight + (pageH * 3);
		}
		else if(headerHeight + contH * 2 < scroll_top)
		{
			viewSection = 2;
			reScroll = headerHeight + (pageH * 2);
		}
		else if(headerHeight + contH * 1 < scroll_top)
		{
			viewSection = 1;
			reScroll = headerHeight + (pageH * 1);
		}
		else if(headerHeight < scroll_top)
		{
			viewSection = 0;
			reScroll = headerHeight;
		}else{
			viewSection = 0;
			reScroll = 0;
		}
	}
}

function toFixed()
{
	if(fixAble)
	{
		$(window).unbind('scroll');

		fixAble = false;
		//$(window).scrollTop(fixTop);
		$("body").css({"overflow":"hidden"});
		
		setTimeout(function(){
			$("body").css({"position":"fixed"});
			$("body").css({"top": -fixTop});
			pageType = "fixed";
			$("body").css({"overflow":"auto"});
			$(window).bind('scroll', scrolling);
		},100);
	}
}

var headerHeight = 0;
function topMove()
{
	headerHeight = $(".header").outerHeight();
	//console.log("headerHeight : " + headerHeight);
	sTop = headerHeight;
	
	if(pageType == "fixed")
		$("html,body").stop().animate({"top" : -headerHeight});
	else
		$("html,body").stop().animate({"scrollTop" : headerHeight});
}

var pageH = 0;
var pageW = 0;
var viewSection =0;
var sTop = 0;
var fullH = 0;
var touchState = false;
var pageType = "fixed";
var slider = [0,6,8,0,0];
var startHeight = 0;
function init()
{
	//console.log("check_device() : " + check_device());
	pageH = window.innerHeight;
	startHeight = window.innerHeight;
	if(viewportWidth() > 1920) pageW = 1920;
	else if(viewportWidth() < 320) pageW = 320;
	else pageW = viewportWidth(); 
	
	

	if(check_device() != '' && orientationChk=='portrait')
	{
		
		$("body").css({"position":"fixed"});
		
		$("#nfc_wrap").removeClass("mobile_device_l").addClass("mobile_device").removeClass('height780web');
		$(".container").css({"padding":"0 0 0"});

		
		$("#nfc_wrap .keyvisual").css({"height":pageH,"width":pageW,'overflow':'hidden'});
		$("#nfc_wrap .cont>div").css({"height":pageH,"width":pageW,'overflow':'hidden'});
		//alert("pageW : " + pageW + ", pageH : " + pageH);
		fullH = $(document).height();
		

		bodyH = headerHeight + (pageH * 5)

		if(!aboutPopOpenChk){
			document.removeEventListener("touchstart", startTabletHandler);
			document.removeEventListener("touchmove", moveTabletHandler);

			document.addEventListener("touchstart", startHandler);
			document.addEventListener("touchmove", moveHandler);
			document.addEventListener("touchend", endHandler);
		}
			

		for(var i = 0;i < slider.length; i++)
		{
			if(slider[i] != 0)
			{
				$(".cont > div").eq(i).find(".slider .slider_cont ul").css({"width":pageW * slider[i]});
			}
		}
	}else if(check_device() != '' && orientationChk=='landscape'){		

		$("body").css({"position":"static"});
		$("#nfc_wrap").removeClass("mobile_device").addClass("mobile_device_l").removeClass('height780web');

		$("body").css({"position":''});
		$(".container").css({"padding":''});
		$("#nfc_wrap .keyvisual").css({"height":'',"width":''});
		$("#nfc_wrap .cont>div").css({"height":'',"width":''});
		$(".slider .slider_cont ul").css({"width":''});
		
		document.removeEventListener("touchstart", startHandler);
		document.removeEventListener("touchmove", moveHandler);
		document.removeEventListener("touchend", endHandler);

		document.addEventListener("touchstart", startTabletHandler);
		document.addEventListener("touchmove", moveTabletHandler);

	}else{

		$("body").css({"position":"static"});

		/*20160615 Start*/
		var mobileKeyWords = new Array('iPhone', 'iPad', 'iPod', 'BlackBerry', 'Android', 'Windows CE', 'LG', 'MOT', 'SAMSUNG', 'SonyEricsson'); //160625 device 목록에 ipad 추가
		var device_name = '';
		for (var word in mobileKeyWords){
			if (navigator.userAgent.match(mobileKeyWords[word]) != null){
				device_name = mobileKeyWords[word];
				break;
			}
		}
		
		$("#nfc_wrap").removeClass("mobile_device").removeClass("mobile_device_l").addClass('height780web');


		/*20160615 End*/
		if(device_name != '')
		{
			document.addEventListener("touchstart", startTabletHandler);
			document.addEventListener("touchmove", moveTabletHandler);
		}else{
			document.addEventListener("mousedown", startWebHandler, false);
			document.addEventListener("mouseup", endWebHandler, false);
		}
	}


		

	
	//sliderInit();
	//$('a.btn_buy_now').css({'left':pageW/2});
	$(".slider .slider_cont").css('width',pageW);
	$(".slider .slider_cont ul li").css('width',pageW);
	$(".cont > div .slider_control .btns a.btn_prev").css({"display":"none"});

	if(!aboutPopOpenChk) buynowBtnStatus();
}

/*20160615 Start*/
function startWebHandler(event)
{
	startPosition_X = event.clientX;
	startPosition_Y = event.clientY;
}

var clickPosition = 0;
var moveType = "";
function endWebHandler(event)
{
	if(!aboutPopOpenChk){
		endPosition_X = event.clientX;
		endPosition_Y = event.clientY;
		
		clickPosition = $(document).scrollTop() + startPosition_Y;
		if(startPosition_X - endPosition_X > 100)
			moveType = "Left";
		else if(endPosition_X - startPosition_X > 100)
			moveType = "Right";
		else
			moveType = "";
		
		var sec02 = $(".header").outerHeight() + $(".keyvisual").outerHeight() + $(".more_about").outerHeight();
		var sec03 = sec02 + $(".usp").outerHeight();
		var sec04 = sec03 + $(".gallery").outerHeight();
		// console.log("sec02 : " + sec02);
		// console.log("sec03 : " + sec03);
		// console.log("sec04 : " + sec04);

		console.log("startPosition_Y : " + startPosition_Y);

		if(moveType != "")
		{
			if(sec02 < clickPosition && sec03 > clickPosition)
			{
				console.log("2 moveType : " + moveType + ", subTab02 : " + subTab02);
				if(moveType == "Left")
				{
					if(subTab02 < slider[1]-1)
					{
						subTab02++;
					}
				}else if(moveType == "Right"){
					if(subTab02 > 0)
						subTab02--;
				}

				console.log("subTab02 : " + subTab02);

				$(".cont > div").eq(1).find(".slider .slider_cont ul").animate({"margin-left":-pageW * subTab02});
				$(".cont > div").eq(1).find(".slider .carousel ul li").removeClass("active");
				$(".cont > div").eq(1).find(".slider .carousel ul li").eq(subTab02).addClass("active");

				if(subTab02 <= 0) {
					$(".cont > div").eq(1).find(".slider .btns a.btn_prev").css({"display":"none"});
					$(".cont > div").eq(1).find(".slider .btns a.btn_next").css({"display":"block"});
				}else if (subTab02 >= slider[1]-1){
					$(".cont > div").eq(1).find(".slider .btns a.btn_prev").css({"display":"block"});
					$(".cont > div").eq(1).find(".slider .btns a.btn_next").css({"display":"none"});
				}else{
					$(".cont > div").eq(1).find(".slider .btns a.btn_prev").css({"display":"block"});
					$(".cont > div").eq(1).find(".slider .btns a.btn_next").css({"display":"block"});
				}

				sendClickCode('microsite_action','uk:geariconx:feature_usp ' + (subTab02+1));
			}else if(sec03 < clickPosition && sec04 > clickPosition)
			{
				console.log("3 moveType : " + moveType);

				if(moveType == "Left")
				{
					if(subTab03 < slider[2]-1)
						subTab03++;			
					
					if(subTab03 == slider[2])
						$(".cont > div").eq(layerIndex).find(".slider .btns a.btn_next").css({"display":"none"});						
					else
						$(".cont > div").eq(layerIndex).find(".slider .btns a").css('display','block');
				}else if(moveType == "Right")
				{
					if(subTab03 > 0)
						subTab03--;

					if(subTab03 == 0)
						$(".cont > div").eq(layerIndex).find(".slider .btns a.btn_prev").css({"display":"none"});						
					else
						$(".cont > div").eq(layerIndex).find(".slider .btns a").css('display','block');
				}
				console.log("subTab03 : " + subTab03);
				
				$(".cont > div").eq(2).find(".slider .slider_cont ul").animate({"margin-left":-pageW * subTab03});
				$(".cont > div").eq(2).find(".slider .carousel ul li").removeClass("active");
				$(".cont > div").eq(2).find(".slider .carousel ul li").eq(subTab03).addClass("active");

				if(subTab03 <= 0) {
					$(".cont > div").eq(2).find(".slider .btns a.btn_prev").css({"display":"none"});
					$(".cont > div").eq(2).find(".slider .btns a.btn_next").css({"display":"block"});
				}else if (subTab03 >= slider[2]-1){
					$(".cont > div").eq(2).find(".slider .btns a.btn_prev").css({"display":"block"});
					$(".cont > div").eq(2).find(".slider .btns a.btn_next").css({"display":"none"});
				}else{
					$(".cont > div").eq(2).find(".slider .btns a.btn_prev").css({"display":"block"});
					$(".cont > div").eq(2).find(".slider .btns a.btn_next").css({"display":"block"});
				}

				sendClickCode('microsite_action','uk:geariconx:gallery_usp ' + (subTab03+1));
			}else{
				console.log("clickPosition : " + clickPosition);
			}
		}
	}
}

function startTabletHandler(event)
{
	startPosition_X = event.changedTouches[0].clientX;
	startPosition_Y = event.changedTouches[0].clientY;
}

function moveTabletHandler(event)
{
	
	if(startPosition_X != 0)
	{
		endPosition_X = event.changedTouches[0].clientX;
		endPosition_Y = event.changedTouches[0].clientY;
		
		clickPosition = $(document).scrollTop() + startPosition_Y;

		if(startPosition_X - endPosition_X > 50)
			moveType = "Left";
		else if(endPosition_X - startPosition_X > 50)
			moveType = "Right";
		else
			moveType = "";
		
		var sec02 = $(".header").outerHeight() + $(".keyvisual").outerHeight() + $(".more_about").outerHeight();
		var sec03 = sec02 + $(".usp").outerHeight();
		var sec04 = sec03 + $(".gallery").outerHeight();
		
		if(moveType != "")
		{
			startPosition_X = 0;
			if(sec02 < clickPosition && sec03 > clickPosition)
			{
				console.log("2 moveType : " + moveType + ", subTab02 : " + subTab02);
				if(moveType == "Left")
				{
					if(subTab02 < slider[1]-1)
					{
						subTab02++;
					}
				}else if(moveType == "Right"){
					if(subTab02 > 0)
						subTab02--;
				}

				console.log("subTab02 : " + subTab02);

				
				sendClickCode('microsite_action','uk:geariconx:feature_usp ' + (subTab02+1));
				
				$(".cont > div").eq(1).find(".slider .slider_cont ul").animate({"margin-left":-pageW * subTab02});
				$(".cont > div").eq(1).find(".slider .carousel ul li").removeClass("active");
				$(".cont > div").eq(1).find(".slider .carousel ul li").eq(subTab02).addClass("active");

				if(subTab02 <= 0) {
					$(".cont > div").eq(1).find(".slider .btns a.btn_prev").css({"display":"none"});
					$(".cont > div").eq(1).find(".slider .btns a.btn_next").css({"display":"block"});
				}else if (subTab02 >= slider[1]-1){
					$(".cont > div").eq(1).find(".slider .btns a.btn_prev").css({"display":"block"});
					$(".cont > div").eq(1).find(".slider .btns a.btn_next").css({"display":"none"});
				}else{
					$(".cont > div").eq(1).find(".slider .btns a.btn_prev").css({"display":"block"});
					$(".cont > div").eq(1).find(".slider .btns a.btn_next").css({"display":"block"});
				}
			}else if(sec03 < clickPosition && sec04 > clickPosition)
			{
				console.log("3 moveType : " + moveType);

				if(moveType == "Left")
				{
					if(subTab03 < slider[2]-1)
						subTab03++;			
					
					if(subTab03 == slider[2])
						$(".cont > div").eq(layerIndex).find(".slider .btns a.btn_next").css({"display":"none"});						
					else
						$(".cont > div").eq(layerIndex).find(".slider .btns a").css('display','block');
				}else if(moveType == "Right")
				{
					if(subTab03 > 0)
						subTab03--;

					if(subTab03 == 0)
						$(".cont > div").eq(layerIndex).find(".slider .btns a.btn_prev").css({"display":"none"});						
					else
						$(".cont > div").eq(layerIndex).find(".slider .btns a").css('display','block');
				}
				console.log("subTab03 : " + subTab03);
				
				sendClickCode('microsite_action','uk:geariconx:gallery_usp ' + (subTab03+1));

				$(".cont > div").eq(2).find(".slider .slider_cont ul").animate({"margin-left":-pageW * subTab03});
				$(".cont > div").eq(2).find(".slider .carousel ul li").removeClass("active");
				$(".cont > div").eq(2).find(".slider .carousel ul li").eq(subTab03).addClass("active");

				if(subTab03 <= 0) {
					$(".cont > div").eq(2).find(".slider .btns a.btn_prev").css({"display":"none"});
					$(".cont > div").eq(2).find(".slider .btns a.btn_next").css({"display":"block"});
				}else if (subTab03 >= slider[2]-1){
					$(".cont > div").eq(2).find(".slider .btns a.btn_prev").css({"display":"block"});
					$(".cont > div").eq(2).find(".slider .btns a.btn_next").css({"display":"none"});
				}else{
					$(".cont > div").eq(2).find(".slider .btns a.btn_prev").css({"display":"block"});
					$(".cont > div").eq(2).find(".slider .btns a.btn_next").css({"display":"block"});
				}
			}
		}
	}
}

/*20160615 End*/

var orientationChk;
function check_device(){
	var mobileKeyWords = new Array('iPhone', 'iPad', 'iPod', 'BlackBerry', 'Android', 'Windows CE', 'LG', 'MOT', 'SAMSUNG', 'SonyEricsson'); //160625 device 목록에 ipad 추가
	var device_name = '';
	for (var word in mobileKeyWords){
		if (navigator.userAgent.match(mobileKeyWords[word]) != null){
			device_name = mobileKeyWords[word];
			break;
		}
	}
	
	if(window.orientation == 0){ // portrait
		orientationChk = 'portrait';
		if(viewportWidth() < 560)
			return device_name;
		else
			return '';
	}else { // landscape
		orientationChk = 'landscape';
		
		if(viewportWidth() < 966)
			return device_name;
		else
			return '';
	}
}

// Touch Down
var startPosition_X = 0;
var startPosition_Y = 0;
var eventTouch;
var startTop = 0;
function startHandler(event)
{
	touchState = true;
	startPosition_X = event.changedTouches[0].clientX;
	startPosition_Y = event.changedTouches[0].clientY;
	if(viewSection == 6)
		startTop = sTop;
	//console.log("startPosition_X : " + startPosition_X + ", startPosition_Y : " + startPosition_Y);
}

// Touch Move
var movePosition_X = 0;
var movePosition_Y = 0;
var realMoviePosition = 0;
var bodyH;
function moveHandler(event)
{
	movePosition_X = event.changedTouches[0].clientX;
	movePosition_Y = event.changedTouches[0].clientY;

	realMoviePosition = startPosition_Y - movePosition_Y;
	
	//console.log("viewSection : " + viewSection + ", realMoviePosition : " + realMoviePosition);

	if(viewSection == 6)
	{
		sTop = startTop + realMoviePosition;

		fullH = $(document).height();
		var topLimit = (pageH*5)+headerHeight;
		if(sTop < fullH - pageH && topLimit < sTop)
		{
			$("html,body").css({"top": -sTop + "px"});
			footerUp = true;
		}
	}
}

// Touch Up
var endPosition_X = 0;
var endPosition_Y = 0;
var subTab02 = 0;
var subTab03 = 0;
var subTab04 = 0;
var scrollType = "col";

var layerIndex = 0;
var sliderNumber = 0;

var fixTop = 0;
var footerUp = false;
var scrollSize = 20;
function endHandler(event)
{
	if(!aboutPopOpenChk){
		endPosition_X = event.changedTouches[0].clientX;
		endPosition_Y = event.changedTouches[0].clientY;

		if(Math.abs(startPosition_X - endPosition_X) > Math.abs(endPosition_Y - startPosition_Y))
		{
			scrollType = "row";
		}else{
			scrollType = "col";
		}
		
		//console.log("scrollType : " + scrollType);

		if(scrollType == "row")				//가로 스와이프
		{
			//console.log("slider[viewSection -1] : " + slider[viewSection -1]);
			console.log("viewSection : " + viewSection);
			if(slider[viewSection -1] != 0)
			{
				if(startPosition_X - endPosition_X > scrollSize)				// right
				{
					if(viewSection == 2)
					{
						console.log('ininini')
						if(subTab02 < (slider[viewSection -1] -1))
							subTab02++;
						
						layerIndex = 1;
						sliderNumber = subTab02;
					
					}else if(viewSection == 3)
					{
						if(subTab03 < (slider[viewSection -1] -1))
							subTab03++;
						
						layerIndex = 2;
						sliderNumber = subTab03;
						
						
						if(subTab03 == (slider[viewSection -1] -1))
							$(".cont > div").eq(layerIndex).find(".slider .btns a.btn_next").css({"display":"none"});						
						else
							$(".cont > div").eq(layerIndex).find(".slider .btns a").css('display','block');
						
					}
				}else if(endPosition_X - startPosition_X > scrollSize)			// left
				{
					if(viewSection == 2)
					{
						if(subTab02 > 0)
							subTab02--;
						
						layerIndex = 1;
						sliderNumber = subTab02;
						
					}else if(viewSection == 3)
					{
						if(subTab03 > 0)
							subTab03--;
						
						layerIndex = 2;
						sliderNumber = subTab03;

						if(subTab03 == 0)
							$(".cont > div").eq(layerIndex).find(".slider .btns a.btn_prev").css({"display":"none"});						
						else
							$(".cont > div").eq(layerIndex).find(".slider .btns a").css('display','block');
					}
				}

				if(viewSection == 2)
					sendClickCode('microsite_action','uk:geariconx:feature_usp ' + (subTab02+1));
				else if(viewSection == 3)
					sendClickCode('microsite_action','uk:geariconx:gallery_usp ' + (subTab03+1));


				$(".cont > div").eq(layerIndex).find(".slider .slider_cont ul").animate({"margin-left":-pageW * sliderNumber});
				$(".cont > div").eq(layerIndex).find(".slider .carousel ul li").removeClass("active");
				$(".cont > div").eq(layerIndex).find(".slider .carousel ul li").eq(sliderNumber).addClass("active");

				
			}
		}else if(scrollType == "col")		//세로 스크롤
		{
			if(endPosition_Y - startPosition_Y > scrollSize)			// up
			{
				var topLimit = (pageH*5)+headerHeight;
				//console.log("footerUp : " + footerUp);
				if(viewSection == 6 && !footerUp)
				{
					viewSection = 5;
				}

				if(viewSection < 6)
				{
					footerUp = false;
					if(viewSection > 0)
					{
						viewSection--;
						sTop = (pageH*viewSection)+headerHeight;
					}
					else
					{
						viewSection = -1;
						sTop = 0;
					}


					if(pageType == "fixed")
						$("html,body").stop().animate({"top": -sTop + "px"},800, "easeOutExpo");
					else
						$("html,body").stop().animate({"scrollTop": sTop + "px"},500);
				}else{
					if(bodyH-50 > sTop)
						viewSection = 5;
					
					if(viewSection == 6 && sTop - topLimit < 50)
					{
						$("html,body").animate({"top": -topLimit + "px"},200);
						viewSection = 5;
					}
				}
			}else if(startPosition_Y - endPosition_Y > scrollSize)		// down
			{
				if(pageType != "static")
				{
					viewSection++;
					if(viewSection < 5)
					{
						sTop = (pageH*viewSection)+headerHeight;

						if(pageType == "fixed")
							$("html,body").stop().animate({"top": -sTop + "px"},800, "easeOutExpo");
						else
							$("html,body").stop().animate({"scrollTop": sTop + "px"},500);
					}
					else if(viewSection == 5)
					{
						viewSection = 5;

						sTop = (pageH*viewSection)+headerHeight;
						if(sTop  > fullH - pageH)
							sTop = fullH - pageH;
						
						$("html,body").stop().animate({"top": -sTop + "px"},500, function(){
							viewSection = 6;
						});
					}else
					{
						viewSection = 6;
					}
				}
			}
			buynowBtnStatus();
		}
		touchState = false;
			
	}
	
}

var selectorNumber = 0;
$(function(){
	
	var layer = $(".cont>div");

	$('.slider_control .btns a.btn_prev').click(function(){
		for(var i = 0;i < layer.length; i++)
		{
			if(layer.eq(i).attr("class") == $(this).parents('.cont > div').attr("class"))
				selectorNumber = i;
		}

		$(".cont > div").eq(selectorNumber).find(".slider .btns a").eq(0).css({"display":"block"});
		$(".cont > div").eq(selectorNumber).find(".slider .btns a").eq(1).css({"display":"block"});

		if(selectorNumber == 1)
		{
			subTab02--;
			if(subTab02 <= 0) subTab02 = 0;
			sliderNumber = subTab02;
		}
		else if(selectorNumber == 2)
		{
			subTab03--;
			if(subTab03 <= 0) subTab03 = 0;
			sliderNumber = subTab03;
		}
		else if(selectorNumber == 3)
		{
			subTab04--;
			if(subTab04 <= 0) subTab04 = 0;
			sliderNumber = subTab04;
		}

		sliderMotion();
		return false;
	});

	$('.slider_control .btns a.btn_next').click(function(){
		for(var i = 0;i < layer.length; i++)
		{
			if(layer.eq(i).attr("class") == $(this).parents('.cont > div').attr("class"))
				selectorNumber = i;
		}

		if(selectorNumber == 1)
		{
			subTab02++;
			if(subTab02 >= slider[selectorNumber]-1) subTab02 = slider[selectorNumber]-1;
			sliderNumber = subTab02;
		}
		else if(selectorNumber == 2)
		{
			subTab03++;
			if(subTab03 >= slider[selectorNumber]-1) subTab03 = slider[selectorNumber]-1;
			sliderNumber = subTab03;
		}
		else if(selectorNumber == 3)
		{			
			subTab04++;
			if(subTab04 >= slider[selectorNumber]-1) subTab04 = slider[selectorNumber]-1;			
			sliderNumber = subTab04;
		}

		sliderMotion();
		return false;
	});

	$('.slider .slider_control .carousel li a').click(function(){
		/*//console.log('click')
		for(var i = 0;i < layer.length; i++)
		{
			if(layer.eq(i).attr("class") == $(this).parents('.cont > div').attr("class"))
				selectorNumber = i;
		}


		var chkIdx = $(this).parent().index();
		//console.log(chkIdx)
		if(selectorNumber == 1) {
			subTab02 = chkIdx;
			sliderNumber = subTab02;
		}else if(selectorNumber == 2) {
			subTab03 = chkIdx;
			sliderNumber = subTab03;
		}else if(selectorNumber == 3) {
			//console.log('1')
			subTab04 = chkIdx;
			sliderNumber = subTab04;
			//console.log(sliderNumber)
		}

		sliderMotion();*/
		return false;
	});
});

function sliderMotion(){
	//console.log('on');
	$(".cont > div").eq(selectorNumber).find(".slider .slider_cont ul").animate({"margin-left":-pageW * sliderNumber});
	btnStatus();
}
function btnStatus(){
	if(selectorNumber == 1){
		if(subTab02 <= 0) {
			$(".cont > div").eq(selectorNumber).find(".slider .btns a.btn_prev").css({"display":"none"});
			$(".cont > div").eq(selectorNumber).find(".slider .btns a.btn_next").css({"display":"block"});
		}else if (subTab02 >= slider[selectorNumber]-1){
			$(".cont > div").eq(selectorNumber).find(".slider .btns a.btn_prev").css({"display":"block"});
			$(".cont > div").eq(selectorNumber).find(".slider .btns a.btn_next").css({"display":"none"});
		}else{
			$(".cont > div").eq(selectorNumber).find(".slider .btns a.btn_prev").css({"display":"block"});
			$(".cont > div").eq(selectorNumber).find(".slider .btns a.btn_next").css({"display":"block"});
		}

		sendClickCode('microsite_action','uk:geariconx:feature_arrow ' + (sliderNumber + 1));
	}else if(selectorNumber == 2){
		if(subTab03 <= 0) {
			$(".cont > div").eq(selectorNumber).find(".slider .btns a.btn_prev").css({"display":"none"});
			$(".cont > div").eq(selectorNumber).find(".slider .btns a.btn_next").css({"display":"block"});
		}else if (subTab03 >= slider[selectorNumber]-1){
			$(".cont > div").eq(selectorNumber).find(".slider .btns a.btn_prev").css({"display":"block"});
			$(".cont > div").eq(selectorNumber).find(".slider .btns a.btn_next").css({"display":"none"});
		}else{
			$(".cont > div").eq(selectorNumber).find(".slider .btns a.btn_prev").css({"display":"block"});
			$(".cont > div").eq(selectorNumber).find(".slider .btns a.btn_next").css({"display":"block"});
		}

		sendClickCode('microsite_action','uk:geariconx:gallery_arrow ' + (sliderNumber + 1));
	}else if(selectorNumber == 3){
		if(subTab04 <= 0) {
			$(".cont > div").eq(selectorNumber).find(".slider .btns a.btn_prev").css({"display":"none"});
			$(".cont > div").eq(selectorNumber).find(".slider .btns a.btn_next").css({"display":"block"});
		}else if (subTab04 >= slider[selectorNumber]-1){
			$(".cont > div").eq(selectorNumber).find(".slider .btns a.btn_prev").css({"display":"block"});
			$(".cont > div").eq(selectorNumber).find(".slider .btns a.btn_next").css({"display":"none"});
		}else{
			$(".cont > div").eq(selectorNumber).find(".slider .btns a.btn_prev").css({"display":"block"});
			$(".cont > div").eq(selectorNumber).find(".slider .btns a.btn_next").css({"display":"block"});
		}
	}

	$(".cont > div").eq(selectorNumber).find(".slider .carousel ul li").removeClass("active");
	$(".cont > div").eq(selectorNumber).find(".slider .carousel ul li").eq(sliderNumber).addClass("active");
}
