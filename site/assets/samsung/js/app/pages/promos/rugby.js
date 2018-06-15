
///////////////////////////
// new year's resolutions page
///////////////////////////

$(function() {	

	
	if ($('.rugby').length > 0) { 


		var featuredSkus = $('.rugby__featured-item');

		featuredSkus.each(function(index) { //iterate through each item

			//var _this = $(this);
			var sku = $(this).data('sku');
			var jsonPath = "//shop.samsung.com/uk/rugby-sku-" + sku + "/json/";

			$.getJSON(jsonPath,function(data) {			
				updateFeatured(sku,data);
			}).fail(function( jqxhr, textStatus, error ) {
			    $('.rugby__featured-item[data-sku="' + sku + '"]').remove(); // remove from layout if JSON load fails
			});


		});


		var initialSkus = $('.rugby__mtt-product');

		initialSkus.each(function(index) { //iterate through each item

			//var _this = $(this);
			var sku = $(this).data('init-sku');
			var jsonPath = "//shop.samsung.com/uk/rugby-sku-" + sku + "/json/";

			$.getJSON(jsonPath,function(data) {			
				updateProduct(sku,sku,data);
			}).fail(function( jqxhr, textStatus, error ) {
				//testing
			    //$('.rugby__mtt-product[data-init-sku="' + sku + '"] .rugby__mtt-product-title').html('Product failed - excluded? <span class="rugby__mtt-product-version">sku: ' + sku + '</span>');
			    $('.rugby__mtt-product[data-init-sku="' + sku + '"]').remove(); // remove from layout if JSON load fails
			});


		});

		//end initial SKU stock check

		$('.js-rugby-swatch').click(function() {

			$(this).siblings().removeClass('selected');
			$(this).addClass('selected'); //select this item

			var swatchSku = $(this).data('sku');
			var sku = $(this).closest('.rugby__mtt-product').data('init-sku');

			//var img_url = "https://i.expansys.net/img/p/" + swatchSku  + "/nyr-image.jpg";

			//Swap image
			//$(this).closest('.rugby__mtt-product').find('.rugby__mtt-product-img img').attr('src',img_url);

		
			//build JSON URL
			var JsonUrl = "//shop.samsung.com/uk/nyr-sku-" + swatchSku + "/json/"; //hardcoded live JSON url

			//load product data
			$.getJSON(JsonUrl,sku,function(data) {	

				//alert(sku);
				updateProduct(sku,swatchSku,data);

				//write a2b link
				//var a2blink = "/uk/basket/add?i=" + swatchSku;
				//$('.rugby__mtt-product[data-init-sku="' + sku + '"] .rugby__mtt-product-buy a').attr('href',a2blink);

			}).fail(function( jqxhr, textStatus, error ) {
				//testing
			    //$('.rugby__mtt-product[data-init-sku="' + sku + '"] .rugby__mtt-product-title').html('Product failed - excluded? <span class="rugby__mtt-product-version">sku: ' + swatchSku + '</span>');
			});

		});


	

	}

	function updateFeatured(sku,data) { //use data from Json feed to update product data

		//alert('123')

		//Update Sku used for image swapping and add to basket link

		var Stock = data['HasStock'];
		var StockText = data['StockText'];
		var BuyButton = data['ShowBuyButton'];
		var Price = data['SellPrice'];

		//console.log(sku);


		//write stock
		if (Stock == true && BuyButton == true) {
			$('.rugby__featured-item[data-sku="' + sku + '"] .rugby__featured-stock span').html("<strong>" + Price + "</strong> &mdash; " + StockText);
			//write buy button
			$('.rugby__featured-item[data-sku="' + sku + '"] .rugby__featured-a2b').html('<a href="/uk/basket/add?i=' + sku +'">Add to Basket</a>');
		} else {
			$('.rugby__featured-item[data-sku="' + sku + '"] .rugby__featured-stock span').html("<strong>" + Price + "</strong> &mdash; " + StockText);
			//write fake buy button
			$('.rugby__featured-item[data-sku="' + sku + '"] .rugby__featured-a2b').html('<span class="oos">' + StockText + '</span>');
		}
		//write price
		//$('.rugby__mtt-product[data-init-sku="' + sku + '"] .rugby__mtt-product-price').text(Price);

	}


	function updateProduct(sku,updateSku,data) { //use data from Json feed to update product data

		//alert('123')

		//Update Sku used for image swapping and add to basket link

		var Stock = data['HasStock'];
		var StockText = data['StockText'];
		var BuyButton = data['ShowBuyButton'];
		var RRP = data['RRPPrice'];
		var SavingPC = data['RRPSavingPercent'];
		var Saving = data['RRPSaving'];
		var Title = data['Title'];
		var Version  = data['Version'];

		var imgPath = "https://i.expansys.net/img/h/" + updateSku + "/rugby-image.jpg";

		var FullTitle;

		if (Version != "") {
			FullTitle = Title + ' <span class="rugby__mtt-product-version">(' + Version + ')';
		} else {
			FullTitle = Title;
		}

		var Price = data['SellPrice'];

		//console.log(sku);

		//write image
		$('.rugby__mtt-product[data-init-sku="' + sku + '"] .rugby__mtt-product-img').html('<img src="' + imgPath + '" alt="' + Title + '">');

		//write title
		$('.rugby__mtt-product[data-init-sku="' + sku + '"] .rugby__mtt-product-title').html(FullTitle);

		//write stock
		if (Stock == true && BuyButton == true) {
			$('.rugby__mtt-product[data-init-sku="' + sku + '"] .rugby__mtt-product-buy').addClass('rugby__mtt-product-buy--visible');
			$('.rugby__mtt-product[data-init-sku="' + sku + '"] .rugby__mtt-product-stock').text(StockText);
			//write buy button
			$('.rugby__mtt-product[data-init-sku="' + sku + '"] .rugby__mtt-product-buy').html('<a href="/uk/basket/add?i=' + updateSku +'">Add to Basket</a>');
		} else {
			$('.rugby__mtt-product[data-init-sku="' + sku + '"] .rugby__mtt-product-buy').removeClass('rugby__mtt-product-buy--visible');
			$('.rugby__mtt-product[data-init-sku="' + sku + '"] .rugby__mtt-product-stock').text(StockText);
			$('.rugby__mtt-product[data-init-sku="' + sku + '"] .rugby__mtt-product-buy a').remove();
		}

		//write price
		$('.rugby__mtt-product[data-init-sku="' + sku + '"] .rugby__mtt-product-price').text(Price);


		//write saving
		if (SavingPC > 1) { //we have a saving
			if ($('.rugby__mtt-product[data-init-sku="' + sku + '"] .rugby__mtt-product-save').length > 0) {
				$('.rugby__mtt-product[data-init-sku="' + sku + '"] .rugby__mtt-product-save').html('Save <strong>£' + parseFloat(Saving.toFixed(0)) + '</strong>').removeClass('rugby__mtt-product-save--is-bundle');
			} else {
				$('.rugby__mtt-product[data-init-sku="' + sku + '"]').append('<li class="rugby__mtt-product-save">Save <strong>£' + parseFloat(Saving.toFixed(0)) + '</strong></li>');			
			}
			$('.rugby__mtt-product[data-init-sku="' + sku + '"] .rugby__mtt-product-price').append(' <span class="saving">(Save £' + Saving.toFixed(0) + ")</span>");
		} else {

			var thisSaveTag = $('.rugby__mtt-product[data-init-sku="' + sku + '"] .rugby__mtt-product-save');
			if (!thisSaveTag.hasClass('rugby__mtt-product-save--is-bundle')) {
				thisSaveTag.remove();
			}
			
		}

		//update info link
		$('.rugby__mtt-product[data-init-sku="' + sku + '"] .rugby__mtt-product-link').html('<a href="/uk/view-details-' + updateSku + '/">See product details ></a>');

		//Set GA event label
		//$('.track-ga-event',_this).attr('data-ga-event-label', Title + " / " + Version);
	}

}); 
