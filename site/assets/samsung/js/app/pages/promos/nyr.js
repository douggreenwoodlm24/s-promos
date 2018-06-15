
///////////////////////////
// new year's resolutions page
///////////////////////////

$(function() {	

	
	if ($('.nyr').length > 0) { 

		var initialSkus = $('.nyr__product-item');

		initialSkus.each(function(index) { //iterate through each item

			//var _this = $(this);
			var sku = $(this).data('init-sku');
			var jsonPath = "/uk/nyr-sku-" + sku + "/json/";

			$.getJSON(jsonPath,function(data) {			
				updateProduct(sku,data);
			}); 


		});

		//end initial SKU stock check

		$('.js-nyr-swatch').click(function() {

			$(this).siblings().removeClass('selected');
			$(this).addClass('selected'); //select this item

			var swatchSku = $(this).data('sku');
			var sku = $(this).closest('.nyr__product-item').data('init-sku');

			var img_url = "https://i.expansys.net/img/p/" + swatchSku  + "/nyr-image.jpg";

			//Swap image
			$(this).closest('.nyr__product-item').find('.nyr__product-img img').attr('src',img_url);

		
			//build JSON URL
			var JsonUrl = "//shop.samsung.com/uk/nyr-sku-" + swatchSku + "/json/"; //hardcoded live JSON url
			//var bundleJson = "/uk/bundle-" + bundleSku + "/json/"; //local JSON (might not work on live?) 


			//load product data
			$.getJSON(JsonUrl,sku,function(data) {	

				updateProduct(sku,data);

				//write a2b link
				var a2blink = "/uk/basket/add?i=" + swatchSku;
				$('.nyr__product-item[data-init-sku="' + sku + '"] .nyr__product-buy a').attr('href',a2blink);

			}).done(function(json) {
		    				
		  	}); 

		});

	}


	function updateProduct(sku,data) { //use data from Json feed to update product data

		var Stock = data['HasStock'];
		var StockText = data['StockText'];
		var BuyButton = data['ShowBuyButton'];
		var RRP = data['RRPPrice'];
		var SavingPC = data['RRPSavingPercent'];
		var Saving = data['RRPSaving'];
		var Title = data['Title'];
		var Version  = data['Version'];

		var FullTitle;

		if (Version != "") {
			FullTitle = Title + " &mdash; " + Version;
		} else {
			FullTitle = Title;
		}

		var Price = data['SellPrice'];

		//console.log(sku);

		//write title
		$('.nyr__product-item[data-init-sku="' + sku + '"] .nyr__product-title').html(FullTitle);

		//write stock
		if (Stock == true && BuyButton == true) {
			$('.nyr__product-item[data-init-sku="' + sku + '"] .nyr__product-buy').addClass('nyr__product-buy--visible');
			$('.nyr__product-item[data-init-sku="' + sku + '"] .nyr__product-stock').text(StockText);
		} else {
			$('.nyr__product-item[data-init-sku="' + sku + '"] .nyr__product-buy').removeClass('nyr__product-buy--visible');
			$('.nyr__product-item[data-init-sku="' + sku + '"] .nyr__product-stock').text(StockText);
		}

		//write price
		$('.nyr__product-item[data-init-sku="' + sku + '"] .nyr__product-price').text(Price);


		//write saving
		if (SavingPC > 1) { //we have a saving
			if ($('.nyr__product-item[data-init-sku="' + sku + '"] .nyr__product-save').length > 0) {
				$('.nyr__product-item[data-init-sku="' + sku + '"] .nyr__product-save').html('Save <strong>£' + parseFloat(Saving.toFixed(0)) + '</strong>');
			} else {
				$('.nyr__product-item[data-init-sku="' + sku + '"]').append('<li class="nyr__product-save">Save <strong>£' + parseFloat(Saving.toFixed(0)) + '</strong></li>');			
			}
		} else {
			$('.nyr__product-item[data-init-sku="' + sku + '"] .nyr__product-save').remove();
		}



		//Set GA event label
		//$('.track-ga-event',_this).attr('data-ga-event-label', Title + " / " + Version);*/
	}

}); 
