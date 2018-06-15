// modal windows
$(function() {

	if ($('.js-open-modal').length > 0) {
		$('.js-open-modal').magnificPopup({
	      type: 'ajax',
	      closeOnContentClick: true,
		  //closeBtnInside: false,
		  fixedContentPos: 'auto',
		  midClick: true,
		  mainClass: 'mfp-modal', // class to remove default margin from left and right side
	      //alignTop: true,
	      overflowY: 'scroll' // as we know that popup content is tall we set scroll overflow by default to avoid jump
	    });
	} 

	//same as above but cloned incase we need to make changes
	if ($('.js-open-lb').length > 0) {
		$('.js-open-lb').magnificPopup({
	      type: 'ajax',
	      closeOnContentClick: false,
		  //closeBtnInside: false,
		  fixedContentPos: 'auto',
		  midClick: true,
		  mainClass: 'mfp-modal', // class to remove default margin from left and right side
	      //alignTop: true,
	      overflowY: 'scroll' // as we know that popup content is tall we set scroll overflow by default to avoid jump
	    });
	} 


	if ($('.js-rugby-comp-form').length > 0) {
		$('.js-rugby-comp-form').magnificPopup({
	      type: 'iframe',
	      closeOnContentClick: true,
		  //closeBtnInside: false,
		  fixedContentPos: 'auto',
		  midClick: true,
		  mainClass: 'mfp-rugby-comp-form', // class to remove default margin from left and right side
	      //alignTop: true,
	      overflowY: 'scroll' // as we know that popup content is tall we set scroll overflow by default to avoid jump
	    });
	} 


	if ($('.js-open-new-reg-form').length > 0) {
		$('.js-open-new-reg-form').magnificPopup({
	      type: 'iframe',
	      closeOnContentClick: true,
		  //closeBtnInside: false,
		  fixedContentPos: 'auto',
		  midClick: true,
		  mainClass: 'mfp-modal', // class to remove default margin from left and right side
	      //alignTop: true,
	      overflowY: 'scroll' // as we know that popup content is tall we set scroll overflow by default to avoid jump
	    });
	} 
   

   if ($('.open-popup-link').length > 0) {
	$('.open-popup-link').magnificPopup({
	  type:'iframe',
	  //closeBtnInside: true,
	  mainClass: 'mfp-modal', // class to remove default margin from left and right side
	  closeOnContentClick: true,
	  midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
	});
	}


   if ($('.open-popup-image').length > 0) {
	$('.open-popup-image').magnificPopup({
	  type:'image',
	  closeOnContentClick: true
	});
	}


});