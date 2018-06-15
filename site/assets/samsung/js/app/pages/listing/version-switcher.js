
$(function() {	

	//DEV -- enable all add to basket buttons for testing
	/*$(".listing__title-count").dblclick(function() {
		$('.listing__product-a2b-button--disabled').removeClass('listing__product-a2b-button--disabled');
	});*/

	//Swatch hover
	$('.no-touch .js-listing-swatch').hover(function() {
	    //if(!$(this).hasClass('active')) { //don't bother if already active
			var imgUrl = $(this).data('img-url'); //get SKU
			$(this).closest('.listing__product-img').find('img').attr('src',imgUrl); // set new image src
		//}
	  }, function() {
		//only want to revert the image to orginal if we leave the swatch area (other can get a bit jittery)
		$('.no-touch .colour-swatch--listing').mouseleave(function() {
			var thisImg = $(this).closest('.listing__product-img').find('img');
			var origImg = thisImg.data('current-img-url'); //get orginal image src
			thisImg.attr('src',origImg); //set back to current active
		});
	  }
	);

	var rrpPhrase = $('.listing__products').data("rrp-phrase");
	var yourPricePhrase = $('.listing__products').data("your-price-phrase");

	//Swatch click
	$('.js-listing-swatch').on("click", function() {
		if(!$(this).hasClass('active')) {
			var sku = $(this).data('sku'); //get SKU
			var json = $(this).data('json'); //get JSON path
			var initialSku = $(this).closest('.listing__product').data('initial-sku');
			var imgUrl = $(this).data('img-url');

			$(this).closest('.listing__product').addClass('listing__product--loading');
			$(".listing__product[data-initial-sku='" + initialSku +"'] .js-listing-swatch").removeClass("active");
			

			$(this).closest('.listing__product-img').find('img').attr('src',imgUrl).data('current-img-url',imgUrl); // set new image src & update current image data attr

			loadVersion(sku,initialSku,json); //get product data from JSON URL	


		}
		//return false; //block default link
		
	});

	
	function loadVersion(sku,initialSku,json) {
	
	

	$.getJSON(json,function(data) {
	  //$('.js-product-color').removeClass('active'); //remove active swatch as data comes in
	  //console.log(data);
	  //write data[data-gallery-index="'+ sIndex + '"]
	  $(".listing__product[data-initial-sku='" + initialSku +"'] .listing__product-title").text(data['Title']);
	  $(".listing__product[data-initial-sku='" + initialSku +"'] .listing__product-version").text(data['Version']);

	  $(".listing__product[data-initial-sku='" + initialSku + "'] .listing__product-price").text(data['SellPrice']);

	  $(".listing__product[data-initial-sku='" + initialSku + "'] .listing__product-img a").attr('href', data['ProductUrl']);
	  $(".listing__product[data-initial-sku='" + initialSku + "'] .listing__product-title-wrap a").attr('href', data['ProductUrl']);

	  $(".listing__product[data-initial-sku='" + initialSku +"'] .listing__product-price").text(yourPricePhrase +  data['SellPrice']);

	  //write new alt tag
	  var altTag = data['Title'];

	  if (data['Version'] != "") {
	  	altTag += " (" + data['Version'] + ")";
	  }

	  $(".listing__product[data-initial-sku='" + initialSku +"'] .listing__product-img img").attr("alt", altTag);


	  var stockContainer = $(".listing__product[data-initial-sku='" + initialSku +"'] .listing__product-stock");
	  var stockContainerInner = $(".listing__product[data-initial-sku='" + initialSku +"'] .listing__product-stock-inner");

	  stockContainerInner.text(data['StockText']);

	  if (data['ShowBuyButton'] && (data['HasStock'] || data['Status'] == 2)) {
	  	stockContainer.removeClass("listing__product-stock--outofstock").addClass("listing__product-stock--instock");
		
 		$(".listing__product[data-initial-sku='" + initialSku +"'] .listing__product-a2b-button").removeClass('listing__product-a2b-button--disabled');
		
		if (data['Status'] == 2) {
			//$(".listing__product[data-initial-sku='" + initialSku +"'] .listing__product-a2b-button").text('Pre-order');
		}
		else{
			$(".listing__product[data-initial-sku='" + initialSku +"'] .listing__product-a2b-button").text('Add to basket');
		}
		
	  } else {
	  	stockContainer.removeClass("listing__product-stock--instock").addClass("listing__product-stock--outofstock");
	  	$(".listing__product[data-initial-sku='" + initialSku +"'] .listing__product-a2b-button").addClass('listing__product-a2b-button--disabled');
		
		stockContainerInner.text('Out of Stock');
	  }

	  //update add to basket link
	  $(".listing__product[data-initial-sku='" + initialSku +"'] .js-a2b-sku").attr('value',sku);
	  
	  //check RRP/Saving

	  var rrp = data['RRPPrice'];
	  var percent = data['RRPSavingPercent'];

	  //if rrp price set and saving percent over 0% or larger
	  if(rrp && percent > 0) {
	  	var thisSaving = $(".listing__product[data-initial-sku='" + initialSku +"'] .listing__product-save-inner");

	  	thisSaving.empty();
	  	thisSaving.append(rrpPhrase + ' <strong class="listing__product-save-was">' + rrp + '</strong> / Save <strong class="listing__product-save-percent">' + percent + '%</strong>');

	  	//var savePhrase = $(".product__price").data('save-phrase'); //get the phrase for "save" in current lang
	  	//$(".listing__product-save").append('<div class="product__price-was"><span class="product__price-was-rrp">' + rrp + '</span> <span class="product__price-was-save">(' + savePhrase + ' ' + percent +'%)</span>'); //write new saving
	  	$(".listing__product[data-initial-sku='" + initialSku +"'] .listing__product-save").removeClass('listing__product-save--hide');
	  } else {
	  	$(".listing__product[data-initial-sku='" + initialSku +"'] .listing__product-save").addClass('listing__product-save--hide');
	  }
 

	}).done(function( json ) {
    	$('.listing__product--loading').removeClass('listing__product--loading'); //fade back in
    	//$('.js-product-color[data-sku="'+ sku + '"]').addClass('active'); // set new active swatch
    	$(".listing__product[data-initial-sku='" + initialSku +"'] .js-listing-swatch[data-sku='" + sku +"']").addClass('active');
  	});

}


	
});