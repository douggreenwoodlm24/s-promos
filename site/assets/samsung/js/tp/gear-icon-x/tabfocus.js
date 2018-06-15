//************************************
	
	// SAMSUNG NFC Sub Landing
	// NINEFIVE

//************************************/

$(function(){
	$(window).keydown(function(e){
		// console.log(document.activeElement)
	});	
	
	// $element.keydown(function(e){
	// 	if(e.keyCode === 13) { // enter
	// 	}
	// 	if((e.keyCode === 9 && !e.shiftKey)){ // tab
	// 	}
	// 	if((e.keyCode === 9 && e.shiftKey)){ // shift+tab
	// 	}
	// });

	$('.skip-content a').keydown(function(e){
		if($(this).attr('href') == '#content'){
			if(e.keyCode === 13) { // enter
				e.preventDefault();

				$('html,body').animate({'scrollTop':$('#nfc_wrap').offset().top}, 500, function(){
					$('#nfc_wrap').focus();	
					$('html,body').scrollTop($('#nfc_wrap').offset().top);	
				});
				
			}
		}else if($(this).attr('href') == '#accHelp'){
			if(e.keyCode === 13) { // enter
				e.preventDefault();
				$('html,body').animate({'scrollTop':$('#accHelp').offset().top}, 800, function(){
					$('#accHelp').focus();	
				});
			}
		}
	});
	
	var viewCurr = 0;
	$('.more_about .obj .img_wrap .img .btn_viewmore a').keydown(function(e){
		if(e.keyCode === 13) { // enter
			e.preventDefault();

			var _name = $(this).parent().attr('class'); 
			viewCurr = _name.charAt(_name.length-1)-1;

			$(this).trigger('click');			
			
			setTimeout(function(){
				console.log(currAboutPop)
				$('.more_about .layerpop .thumb ul li').eq(viewCurr).find('a').focus();
			}, 1000); //160625 focus delay 추가. (레이어팝업이 800ms초 이후에 display:block 됨.)
		}
	});

	$('.more_about .layerpop .thumb ul li a').keydown(function(e){
		var idx = $(this).parent().index();

		if(e.keyCode === 13) { // enter
			e.preventDefault();
			if(layerComplete) {
				$('.layerpop .thumb li').eq(idx).find('a').trigger('click');

			}	
		}
		if((e.keyCode === 9 && !e.shiftKey)){ // tab
			e.preventDefault();
			
			if(layerComplete) {
				if(idx == 3) $('.more_about .layerpop .btn_close').focus();
				else  $('.more_about .layerpop .thumb ul li').eq(idx+1).find('a').focus();
			}
		}
		if((e.keyCode === 9 && e.shiftKey)){ // shift+tab
			e.preventDefault();
			if(layerComplete) {
				if(idx == 0) $('.more_about .layerpop .btn_close').focus();
				else  $('.more_about .layerpop .thumb ul li').eq(idx-1).find('a').focus();
			}
		}
	});

	// $('.more_about .layerpop .thumb ul li:first-child a').keydown(function(e){
	// 	if((e.keyCode === 9 && e.shiftKey)){ // shift + tab
	// 		e.preventDefault();
	// 		$('.more_about .layerpop .btn_close').focus();
	// 	}
	// });
	$('.more_about .layerpop .btn_close').keydown(function(e){
		if(e.keyCode === 13) { // enter
			e.preventDefault();
			var i = $('.more_about .layerpop .thumb ul li.active').index();
			$(this).trigger('click');
			$('.more_about .obj .img_wrap .img .btn_viewmore0'+(i+1)).find('a').focus();	
		}
		if((e.keyCode === 9 && !e.shiftKey)){ // tab
			e.preventDefault()
			$('.more_about .layerpop .thumb ul li').eq(0).find('a').focus();
		}
	});

	$('.slider_control .btns a.btn_prev').keydown(function(e){
		if(e.keyCode === 13) { // enter
			e.preventDefault();

			$(this).trigger('click');

			var btns = $(this).parent();
			if(btns.find('.btn_prev').css('display') == 'block') $(this).focus();
			else btns.find('.btn_next').focus();
		}
	});
	$('.slider_control .btns a.btn_next').keydown(function(e){
		if(e.keyCode === 13) { // enter
			e.preventDefault();

			$(this).trigger('click');

			var btns = $(this).parent();
			btns.find('.btn_prev').focus();
		}
	});

});

