//************************************
	
	// SAMSUNG NFC Sub Landing
	// NINEFIVE

//************************************/

$(function(){
	scrollW();

	userState = '';
	$('.btn_viewmore a').click(function(){
		var _name = $(this).parent().attr('class'); 
		currAboutPop = _name.charAt(_name.length-1)-1;
		currFirst = currAboutPop;
		showAboutPop();

		return false;
	});
	$('.layerpop .btn_close').click(function(){
		closeAboutPop();
		return false;
	});
	$('.layerpop .thumb li a').click(function(){
		if(currAboutPop == 0 && layerComplete)
		{
			currAboutPop = $(this).parent().index();
			popFirstChk = false;
			layerComplete = false;
			viewLayerPopCont();	
		}
		return false;
	});

	$("a.btn_buy_now").click(function(){
		if(check_device() != '' && orientationChk=='portrait')
		{
			sTop = (pageH*4)+headerHeight;
			
			$("html,body").stop().animate({"top": -sTop + "px"},500, function(){
				viewSection = 4;
				buynowBtnStatus();
				// buynowBtnStatus();
			});
		}else{
			var kvHeight = $(".keyvisual").outerHeight();
			var cont = $(".cont > div");
			var contHeight = 0;
			for(var i = 0; i< cont.size()-1;i++)
			{
				contHeight = contHeight + cont.eq(i).outerHeight();
			}
			// console.log("kvHeight : " + kvHeight);
			// console.log("contHeight : " + contHeight);
			headerHeight = $(".header").outerHeight();
			var body = $("html, body");
			$(body).animate({"scrollTop" : (headerHeight + kvHeight + contHeight)}, function(){
				buynowBtnStatus();
			});
		}
		return false;
	});
	
	$('#header div[role=status].cookie-notice button').click(function(){
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

	$("#footer .back-top").click(function(){
		if(check_device() != '' && orientationChk=='portrait')
		{	
			viewSection = -1;
			$("html,body").stop().animate({"top": "0px", avoidCSSTransitions:true},500, function(){
				var buynowBtn = $("a.btn_buy_now");
				buynowBtn.css({'display':'block','opacity':1})
			});
		}else if(check_device() != '' && orientationChk=='landscape')
		{
			var body = $("html, body");
			$(body).animate({"scrollTop" : "0px", avoidCSSTransitions:true}, 1000, function(){
				var buynowBtn = $("a.btn_buy_now");
				buynowBtn.css({'display':'block','opacity':1})
			});
		}else{
			var body = $("html, body");
			$(body).animate({"scrollTop" : "0px", avoidCSSTransitions:true}, 1000, function(){
				var buynowBtn = $("a.btn_buy_now");
				buynowBtn.css({'display':'block','opacity':1})
			});
		}
	});
	
});
$(window).resize(function(){
	userState = 'resize';
	scrollW();
	if(!aboutPopOpenChk) buynowBtnStatus();	
});

$(window).scroll(function(){
	userState = '';
	if(!aboutPopOpenChk) {
		buynowBtnStatus();	
		setTimeout(function(){
			buynowBtnStatus()
		}, 100)
	}
		
});

function scrollW(){
	if(viewportWidth() < 1920) $('.keyvisual .scroll, .cont > div .scroll').css('width', viewportWidth())
	else $('.keyvisual .scroll, .cont > div .scroll').css('width', '')
}

var aboutPopOpenChk = false,
	oldAboutPop, popFirstChk = false;
var currAboutPop = 0;
var currScTop = 0;
var currFirst = 0;
var currViewSection;
var layerComplete = true;
function showAboutPop(){
	if(!aboutPopOpenChk){
		popFirstChk = true;
		aboutPopOpenChk = true;
		layerComplete = false;

		//alert("viewportWidth() : " + viewportWidth());
		$(".btn_buy_now").animate({"opacity":"0"}, function(){
			setTimeout(function(){
				$(".btn_buy_now").css("display","none");
			},200);
		});
		//////////////////
		if(check_device() != '' && orientationChk=='portrait')
		{
			var pageW = viewportWidth(); 
			var popLayer = $('.layerpop .layer > div');
			for(var i = 0; i < popLayer.size();i++)
			{
				$('.layerpop .layer > div').eq(i).css({'opacity':0});
				$('.layerpop .thumb ul li').eq(i).removeClass('active');
			}


			currScTop = $(window).scrollTop();
			$('.layerpop').css({'display':'block',"margin-left":pageW, "opacity":1}).animate({'margin-left':"0px"}, 400, function(){
				$('.layerpop .thumb ul li').eq(oldAboutPop).find('a').focus();	
				layerComplete = true;
			});
			viewLayerPopCont();
		}else{
			currScTop = $(window).scrollTop();

			/*$('body').css({'position':'fixed', 'top':-currScTop})
			$('.layerpop').css({'display':'block', "margin-left":0}).animate({'opacity':1}, 800);
			viewLayerPopCont();
			setTimeout(function(){
				
			}, 1000);*/

			$('body').css({'position':'fixed', 'top':-currScTop});
			
			
			setTimeout(function(){
				$('.layerpop').css({'display':'block', "margin-left":0}).animate({'opacity':1}, 800, function(){
					// viewLayerPopCont();	
					$('.layerpop .thumb ul li').eq(oldAboutPop).find('a').focus();	
					layerComplete = true;
				});
			}, 800);
			viewLayerPopCont();

			
		}
		//////////////////
		
	}
}
function closeAboutPop(){
	//////////////////

	var i = $('.more_about .layerpop .thumb ul li.active').index();

	$('.btn_buy_now').css({'display':'block', 'opacity':0}).stop().animate({'opacity':1});
	if(check_device() != '' && orientationChk=='portrait')
	{
		popFirstChk = false;
		var pageW = viewportWidth(); 

		$('.layerpop').animate({"margin-left":pageW}, 400, function(){
			$(this).css('display','none');
			aboutPopOpenChk = false;
			buynowBtnStatus();
			init();
			$('.more_about .obj .img_wrap .img .btn_viewmore0'+(i+1)).find('a').focus();
		});		
	}else{
		popFirstChk = false;
		$('.layerpop').animate({'opacity':0}, 800, function(){
			$(this).css('display','none');
			aboutPopOpenChk = false;
			buynowBtnStatus();
			$('.more_about .obj .img_wrap .img .btn_viewmore0'+(i+1)).find('a').focus();
		});

		$('body').css({'position':'static'});
		$('html, body').scrollTop(currScTop)
	}

	//////////////////
}

function viewLayerPopCont(){
	// if(layerComplete){
		layerComplete = false;
		oldAboutPop = currAboutPop;
		
		var popLayer = $('.layerpop .layer > div');
		
		for(var i = 0; i < popLayer.size();i++)
		{
			if(i == currAboutPop)
			{
				$('.layerpop .layer > div').eq(i).animate({'opacity':1}, 600, function(){
					currAboutPop = 0;
					layerComplete = true;
				});
				$('.layerpop .thumb ul li').eq(i).addClass('active');
				$('.layerpop .thumb ul li').eq(i).find('a').focus();
				
					
			}else{
				$('.layerpop .layer > div').eq(i).animate({'opacity':0}, 600);
				$('.layerpop .thumb ul li').eq(i).removeClass('active');
			}
		}

		// setTimeout(function(){
		// 	console.log("currAboutPop Focus : " + currAboutPop);
		// 	// $('.more_about .layerpop .thumb ul li').eq(currAboutPop).find('a').focus();
			
		// },800);
	// }
}


var scTop, winH;
var vw;
var userState;
var chkTop = true;

function buynowBtnStatus(){
	scTop = $(window).scrollTop();
	winH = $(window).height();
	var buynowBtn = $("a.btn_buy_now");
	


	if(check_device() != '' && orientationChk=='portrait'){ // mobile device
		buynowBtn.css({'left':'auto', 'right':0})
		// if(viewSection < 1) {
		// 	buynowBtn.css({'opacity':1}).stop().animate({'width':viewportWidth()*0.4}, function(){
		// 		buynowBtn.css('display','block')
		// 	});
		// }else if(viewSection < 3) {
		// 	buynowBtn.css({'opacity':1}).stop().animate({'width':viewportWidth()/2}, function(){
		// 		buynowBtn.css('display','block')
		// 	});
		// }else {
		// 	buynowBtn.css({'opacity':0});
		// 	setTimeout(function(){
		// 		buynowBtn.css('display','none')
		// 	}, 400);
		// }
		if(viewSection < 3) {
			chkTop = true;
			buynowBtn.css({'display':'block','opacity':1})
		}else {
			chkTop = false;
			buynowBtn.css({'opacity':0});
			setTimeout(function(){
				if(!chkTop) buynowBtn.css({'display':'none'})		
			}, 400);	
		}
		

	}else if(check_device() != '' && orientationChk=='landscape'){ // mobile device
		// buynowBtn.css({'left':'auto', 'right':0})

		// if(scTop <= $('#nfc_wrap .more_about').offset().top-winH+buynowBtn.outerHeight() || scTop <=0){
		// 	buynowBtn.css({'opacity':1}).stop().animate({'width':viewportWidth()*0.4});
			
		// }else{
		// 	if(scTop < $('#nfc_wrap .more_about').offset().top-winH+buynowBtn.outerHeight()) {
		// 		buynowBtn.css({'opacity':1}).stop().animate({'width':viewportWidth()*0.4}, function(){
		// 			buynowBtn.css('display','block')
		// 		});
		// 	}else if(scTop < $('#nfc_wrap .gallery').offset().top-winH+buynowBtn.outerHeight()) {
		// 		buynowBtn.css({'opacity':1}).stop().animate({'width':viewportWidth()/2}, function(){
		// 			buynowBtn.css('display','block')
		// 		});
		// 	}else {
		// 		buynowBtn.css({'opacity':0, 'display':'none'});
		// 		setTimeout(function(){
		// 			buynowBtn.css({'display':'none'});
		// 		}, 400);
		// 	}				
		// }
		if(scTop < $('#nfc_wrap .gallery').offset().top-winH+buynowBtn.outerHeight()) {
			chkTop = true;
			buynowBtn.css({'display':'block','opacity':1})
		}else {
			chkTop = false;
			buynowBtn.css({'opacity':0});
			setTimeout(function(){
				if(!chkTop) buynowBtn.css({'display':'none'})		
			}, 400);	
		}
	}else{
		/*
		if(viewportWidth() <= 960){	
			if(userState == 'resize'){			
				if(scTop <= $('#nfc_wrap .more_about').offset().top-winH+buynowBtn.outerHeight() || scTop <=0){
					buynowBtn.css({'left':viewportWidth()*0.6,'width':viewportWidth()*0.4,'opacity':1});
				}else{
					if(scTop <= $('#nfc_wrap .more_about').offset().top-winH+buynowBtn.outerHeight()){
						buynowBtn.css({'left':pageW*0.6,'width':pageW*0.41,'opacity':1, 'display':'block'});	
					}else if(scTop < $('#nfc_wrap .gallery').offset().top-winH+buynowBtn.outerHeight()) {
						buynowBtn.css({'left':pageW/2,'width':pageW*0.51,'opacity':1, 'display':'block'});
					}else {
						buynowBtn.css({'left':pageW/2,'width':pageW*0.51,'opacity':0, 'display':'none'});	
					}
				}
			}else {
				if(scTop <= $('#nfc_wrap .more_about').offset().top-winH+buynowBtn.outerHeight() || scTop <=0){
					buynowBtn.css({'opacity':1, 'left':viewportWidth()*0.6}).stop().animate({'width':viewportWidth()*0.41});
				}else{
					if(scTop <= $('#nfc_wrap .more_about').offset().top-winH+buynowBtn.outerHeight()){
						buynowBtn.css({'opacity':1}).stop().animate({'left':viewportWidth()*0.6,'width':viewportWidth()*0.41}, function(){
							buynowBtn.css('display','block')
						});
					}else if(scTop < $('#nfc_wrap .gallery').offset().top-winH+buynowBtn.outerHeight()) {
						buynowBtn.css({'opacity':1}).stop().animate({'left':viewportWidth()/2,'width':viewportWidth()*0.51}, function(){
							buynowBtn.css('display','block')
						});
					}else {
						buynowBtn.css({'opacity':0, 'display':'none'});
						setTimeout(function(){
							buynowBtn.css({'display':'none'});
						}, 400);
					}				
				}
				
			}

				
		}else {
			buynowBtn.css({'opacity':'','left':'','width':''});
			if(!aboutPopOpenChk){
				if(scTop < $('#nfc_wrap .gallery').offset().top-winH) 
				{
					buynowBtn.css({'opacity':1, 'display':'block'});
				}
				else 
				{
					buynowBtn.css({'opacity':0, 'display':'none'});
				}
			}
		}
		*/

		if(scTop < $('#nfc_wrap .gallery').offset().top-winH+buynowBtn.outerHeight()) {
			chkTop = true;
			buynowBtn.css({'display':'block','opacity':1})
		}else {
			chkTop = false;
			buynowBtn.css({'opacity':0});
			setTimeout(function(){
				if(!chkTop) buynowBtn.css({'display':'none'})		
			}, 400);	
		}		
	}		
}
