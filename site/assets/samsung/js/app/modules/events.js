// event tracking

$(function() {

	//custom
	if ($('.track-ga-event').length > 0) {
		
		$(".track-ga-event").on( "click", function() {
			var category = $(this).data('ga-event-category');
			var label = $(this).data('ga-event-label');
			var type =  $(this).data('ga-event-type');
			logEvent(category,type,label);
		});

	}


	//////////////////
	// Listing  
	/////////////////
	if ($('.listing').length > 0) { //check we're on the listing page
		listingFilterEvents();
		listingSwitchEvents();
		listingAddToBasket();
	}


	//////////////////
	// Product  
	/////////////////
	if ($('.product__head').length > 0) { //check we're on the product page
		logLocalPDPview();
		setupGalleryEvents();
		productSwitchEvents();
		productTabEvents();
	}

});


// ------------------------------------------
// LISTING EVENTS
// ------------------------------------------


function listingFilterEvents() {
	$(".listing__filters-item").on( "click", function() {
		var label = $(this).text().trim();
		var title = $('.listing__title-main').text();
		logEvent("Listing","Current page: " + title,"Filter: " + label);
	});
}



function listingSwitchEvents() {
	$(".js-listing-swatch").on( "click", function() {

		var thisInfo = $(this).closest('.listing__product');
		var title = thisInfo.find('.listing__product-title',thisInfo).text().trim();
		var version  = thisInfo.find('.listing__product-version',thisInfo).text().trim();
		var label;
		var colour;

		if (version == "") {
			label = title;
		} else {
			label = title + " (Was: " + version + ")";
		}

		colour = $(this).attr('title').trim();

		logEvent("Listing","Change colour > " + colour,label);
	});
}


function listingAddToBasket() {
	$(".listing__product-a2b-button").on( "click", function() {

		var thisInfo = $(this).closest('.listing__product-list');
		var title = thisInfo.find('.listing__product-title',thisInfo).text();
		var version  = thisInfo.find('.listing__product-version',thisInfo).text();
		var label;

		if (version == "") {
			label = title;
		} else {
			label = title + " (" + version + ")";
		}

		logEvent("Listing","Add to basket",label);
	});
}


// ------------------------------------------
// PRODUCT EVENTS
// ------------------------------------------


function logLocalPDPview() {
	//log an event for a local PDP view	
	var label = $('#js-product-title').text();
	label +=  " (" + $('#js-product-version').text() + ")";
	var type = "BP PDP view";
	logEvent("Product",type,label); 
}


function setupGalleryEvents() {
	//main image clicks
	$(".swiper-slide").on( "click", function() {
		var label = $('#js-product-title').text();
		label +=  " (" + $('#js-product-version').text() + ")";
		label += " / Image: " + ($(this).data('swiper-slide-index') + 1);
		var type = "Image Lightbox (via primary image)";
		logEvent("Product",type,label);
	});

	//thumbnail clicks
	$(".product__gallery-item").on( "click", function() {
		var label = $('#js-product-title').text();
		label +=  " (" + $('#js-product-version').text() + ")";
		label += " / Image: " + ($('a',this).data('gallery-index'));
		var type = "Image Lightbox (via thumbnails)";
		logEvent("Product",type,label);
	});



	if ($.fn.swiper) {
		swiper.on('onSlideChangeEnd', function () {
			if (swiper.touches['startX'] > 0) { //this is a touch event

				//calc current slide
				var slideTotal = swiper.slides.length - 2; //-1 for loop mode
				var currentIndex = swiper.activeIndex;
				if (currentIndex == 0) {currentIndex = slideTotal;}// check for first looped slide
				if (currentIndex > slideTotal) {currentIndex = 1;}// check for last looped slide
				
				//write event
				var label = $('#js-product-title').text();
				label +=  " (" + $('#js-product-version').text() + ")";
				label += " / Image: " + currentIndex;
				var type = "Image Gallery Swipe (touch)";
				logEvent("Product",type,label);
	    	}
		});
		
	} 

}

function productSwitchEvents() {
	//change product colour/version
	$(".product__color-link").on( "click", function() {
		var label = $('#js-product-title').text();
		label +=  " (" + $('#js-product-version').text() + ")";
		var type = "Change Colour";
		logEvent("Product",type,label); 
	});
}

function productTabEvents() {
	//change product colour/version
	$(".product__tabs-item").on( "click", function() {
		var label = $('#js-product-title').text();
		label +=  " (" + $('#js-product-version').text() + ")";
		var type = "Tab Click";
		type += " (" + $(this).data('tab') + ")";
		logEvent("Product",type,label); 
	});
}




function logEvent(category,action,label,testing) {

	var forceTesting = false; // (true/false) force test flag on all events regardless of testing bool -- dumps events to console

	if (forceTesting) {
		testing = true;
	} else {
		testing = (typeof testing === "undefined") ? false : testing; // default test setting to false	
	}


	if (!testing) {
		//_gaq.push(['_trackEvent', category, action, label]); // old GA/IA8
		ga('send', 'event', category, action, label); //Universal Analytics
	} else { //testing -- log to console instead
		console.log('Fire GA Event\n----------------------\nCategory/Page: ' + category + '\nAction: ' + action + '\nLabel: ' + label + '\n----------------------\n');
	}
	
}

 		