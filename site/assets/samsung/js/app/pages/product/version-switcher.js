
$(function() {	


	if ($('.js-product-color').length > 0) {
		window.onpopstate = function(event){
			var popSku = event.state;

			if (popSku) {
			var sku = $('.js-product-color[data-sku="'+ popSku + '"]').data('sku'); //get SKU
			var json = $('.js-product-color[data-sku="'+ popSku + '"]').data('json'); //get JSON path
			var title = $('.js-product-color[data-sku="'+ popSku + '"] a').attr('title');
			var url = $('.js-product-color[data-sku="'+ popSku + '"] a').attr('href');
			loadVersion(sku,json,title,url,false); 
			}
		}	

		var initialSku = $('.product__head').data('initial-sku');

		//set current swatch to active
		$('.js-product-color[data-sku="'+ initialSku + '"]').addClass('active');

		//add initial SKU to history
		history.replaceState(initialSku, $('.js-product-color[data-sku="'+ initialSku + '"] a').attr('title'), $('.js-product-color[data-sku="'+ initialSku + '"] a').attr('href'));

	}

	$('.js-product-color').on("click", function() {
		
		if(!$(this).hasClass('active')) {
			var sku = $(this).data('sku'); //get SKU
			var json = $(this).data('json'); //get JSON path
			var title = $('a',this).attr('title');;
			var url = $('a',this).attr('href');
			loadVersion(sku,json,title,url,true); //get product data from JSON URL	
		}
		return false; //block default link
	});

	
	function loadVersion(sku,json,title,url,clicked) {
	
	$('.product__head').addClass('product__head--loading');

	$.getJSON(json,function(data) {
	  $('.js-product-color').removeClass('active'); //remove active swatch as data comes in
	//  console.log(data);
	  //write data

	  var rrp = data['RRPPrice'];
	  var percent = data['RRPSavingPercent'];
	  var hasStock = data['HasStock'];
	  var status = data['Status'];
	  var showBuyButton = data['ShowBuyButton'];

	  $(".js-product-title").text(data['Title']);
	  $(".js-product-version").text(data['Version']);
	  $("#js-product-price").text(data['SellPrice']);
	  $("#js-product-stock").text(data['StockText']);

	  $("#js-product-leadtime").text(data['LeadTimeText']);

	  //get add to basket link out of data attr
	  //var a2bUrl =  $("#js-product-a2b").data('a2b-url') + sku;

	  //write new sku to hidded field
	  $("#js-a2b-sku").attr('value',sku);


	   //check RRP/Saving

	



	  //if rrp price set and saving percent over 0% or larger
	  if(rrp && percent > 0) {
	  	var thisSaving = $(".product__price-was");
	  	thisSaving.empty();
	  	thisSaving.append('<span class="product__price-was-rrp">' + rrp + '</span> <span class="product__price-was-save">(Save ' + percent + '%)</span>');

	  	$('.product__price-was').removeClass('product__price-was--hide');
	  } else {
	  	$('.product__price-was').addClass('product__price-was--hide');
	  }
 

	  //show/hide buy button if SKU has stock
	  if ((hasStock || status == 2) && showBuyButton) {
	  	$('.product__add').removeClass('product__add--hide');
	  } else {
	  	$('.product__add').addClass('product__add--hide');
	  }


	  	// new image and gallery
	  	var slides = [];
	 	slides.push ('<div class="swiper-slide"><a href="' + data['Image'].replace("/p/", "/b/") + '" class="js-product__gallery-link"><img src="' + data['Image'] + '"></a></div>');
		
		//kill old gallery
	 	$('.product__gallery').remove(); 
	 	

		if(data['ImageGallery']) { //check if we have more than one image
	 		//build new gallery

	 		//add new gallery container
	 		$('#js-product__images').append('<div class="product__gallery"><ul class="reset-list"></ul></div>');

	 		//cache
	 		var prodGallery = $('.product__gallery');

	 		//add initial image
	 		prodGallery.append('<li class="product__gallery-item active"><a href="'  + data['Image'].replace("/p/", "/b/") + '" class="product__gallery-link js-product__gallery-link active" data-gallery-index="1"><img src="' + data['Image'] +  '" class="js-product-thumbnail"></a></li>');
  
			$.each(data['ImageGallery'], function(id,img) {
			   	var pimg = img.replace("/s/s", "/p/p");
			   	var bimg = img.replace("/s/s", "/b/b"); 
			   	//create array of slide HTML
				slides.push ('<div class="swiper-slide"><a href="' + bimg + '" class="js-product__gallery-link"><img src="' + pimg + '"></a></div>'); 
			
				var gIndex = id + 2;
				//build gallery
				prodGallery.append('<li class="product__gallery-item active"><a href="'  + bimg + '" class="product__gallery-link js-product__gallery-link" data-gallery-index="' + gIndex + '"><img src="' + pimg + '" class="js-product-thumbnail"></a></li>');
 
			});
			 	
		}

		//reset carousel
		swiper.removeAllSlides();

		//create new gallery
		swiper.appendSlide(slides);

	  	swiper.slideTo(1); 

	//restart magnificPopup
	//exclude generated prev/next slides
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



	}).done(function( json ) {
    	$('.product__head').removeClass('product__head--loading'); //fade back in
    	$('.js-product-color[data-sku="'+ sku + '"]').addClass('active'); // set new active swatch

    	//update page <title>
    	pageTitle = " — Samsung Store UK";
    	document.title = title + pageTitle;

    	if (clicked) {
	    	//update browser URL + history
	    	history.pushState(sku, title, url);
    	} 
  	});

}


	
});