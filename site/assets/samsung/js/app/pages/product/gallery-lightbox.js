
$(function() {	

	//exclude generated prev/next slides
	
	if ($('.js-product__gallery-link').length > 0) {
		
		$('.swiper-slide .js-product__gallery-link').not('.swiper-slide-duplicate .js-product__gallery-link').magnificPopup({
			type: 'image',
			closeOnContentClick: true,
			closeBtnInside: true,
			fixedContentPos: true,
			mainClass: 'mfp-with-zoom', // class to remove default margin from left and right side
			image: {
				verticalFit: true
			},
			gallery: {
	     	  type: 'image',
	    	  preload: [0,1],
	          enabled:true
	        }
		});

		$('.product__gallery-link').magnificPopup({
			type: 'image',
			closeOnContentClick: true,
			closeBtnInside: true,
			fixedContentPos: true,
			mainClass: 'mfp-with-zoom', // class to remove default margin from left and right side
			image: {
				verticalFit: true
			},
			gallery: {
	     	  type: 'image',
	    	  preload: [0,1],
	          enabled:true
	        }
		});

		//enable thumbnails to change slide
		$('.product__gallery-link').hover(function() {
			var gIndex = $(this).data('gallery-index');
			//$('.product__gallery-link').removeClass('active');
			//$(this).addClass('active');
			swiper.slideTo(gIndex,0); //go to slide, no transition
		});


		//set active thumbnail regardless of now slide changed
		swiper.on('slideChangeStart', function () {
		    var sIndex = swiper.activeIndex;
		    $('.product__gallery-link').removeClass('active');
		    $('.product__gallery-link[data-gallery-index="'+ sIndex + '"]').addClass('active');
		});


	

	}


});