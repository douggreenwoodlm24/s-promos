// search
$(function() {

	//show hide small screen search field
	$('.js-small-search').click(function() {
		//check if search field hidden
		if ($('.header__search').is(":hidden")) {
			//alert(1);
			$('.header__search').addClass('header__search--show');
			$('.header__search-field').focus(); //set focus on input 
		} else {
			//alert(2);
			$('.header__search').removeClass('header__search--show');
		}	
	});


	// trigger when clicking search submit button
	$('.header__search-submit').click(function() {

		var query = $('.header__search-field').val();
		var placeholder = $('.header__search-field').attr('placeholder');

		// if empty query submitted populate with the placeholder text
		if (query == "") { 
			$('.header__search-field').val(placeholder); 	
		}

	});


	// FOOTER trigger when clicking search submit button
	$('.footer-search .btn-search').click(function() {

		var query = $('.search-form-input-footer').val();
		var placeholder = $('.search-form-input-footer').attr('placeholder');

		// if empty query submitted populate with the placeholder text
		if (query == "") { 
			$('.search-form-input-footer').val(placeholder); 	
		}

	});


}); 