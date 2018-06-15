///////////////////////////
// Config 
///////////////////////////
/*
$(function() {	

	if ($('.x15-s6-bundles--chargers,.x15-s6-bundles--gears2').length > 0) { 

		//init builder

		//block stage 2
		//$('.js-x15-s6_stage2').addClass('inactive'); //accessories
		//$('.js-x15-s6_stage3').addClass('inactive'); //totals
		$('.colour-swatch').addClass('inactive'); // lock out colour swatches until we've picked a device


		// SELECT DEVICE
		$('.js-x15-s6-device').click(function() {
			
			var no_bundle;

			$('.js-x15-s6-device').removeClass('selected'); //remove previous selected
			$('.colour-swatch').addClass('inactive'); 

			$(this).addClass('selected'); //select this item

			$('.colour-swatch',this).removeClass('inactive'); //enable swatches

			//pre-select first swatch colour if no other swatches selected
			if(!$('.js-x15-swatch',this).hasClass('selected')) {
				//$('.js-x15-swatch:first-child',this).click();
				$('.js-x15-swatch:first-child',this).addClass('selected');
				no_bundle = $('.js-x15-swatch:first-child',this).data('no-bundle');
			} else {
				no_bundle = $('.js-x15-swatch.selected',this).data('no-bundle');
			}

			//check for no bundle SKU
			$('.js-x15-s6-accessory').removeClass('hide');
			if (no_bundle > 0) { //quick check for value
				$('.js-x15-s6-accessory[data-sku="' + no_bundle + '"]').addClass('hide');
			}

			autoScroll2('.x15-s6-bundles__section-title--s1',500,60);
			$('.js-x15-s6_stage3').removeClass('inactive');

			calcTotal();
		});

		//SELECT Swatch
		$('.js-x15-swatch').click(function() {

			$(this).siblings().removeClass('selected');
			$(this).addClass('selected'); //select this item

			var img_url = $(this).data('img-url');
			var no_bundle = $(this).data('no-bundle'); //check for accessory SKU that we can't bundle/need to block

			//Swap image
			//console.log(img);
			//$('.x15-s6-bundle__img img',this).hide();
			$(this).closest('.x15-s6-bundle').find('.x15-s6-bundle__img img').attr('src',img_url);


			//if no stage 2
			if($('.js-x15-s6_stage3').hasClass('inactive')) {
				$.doTimeout( 333, function(){
					$('.js-x15-s6_stage3').removeClass('inactive');
					//calcTotal();
				});
			} else {
				//calcTotal();
			}


			//check for no bundle SKU
			$('.js-x15-s6-accessory').removeClass('hide');
			if (no_bundle > 0) { //quick check for value
				$('.js-x15-s6-accessory[data-sku="' + no_bundle + '"]').addClass('hide');
			}
		});

		//SELECT ACCESSORY
		$('.js-x15-s6-accessory').click(function() {
			
			$('.js-x15-s6-accessory').removeClass('selected'); //remove previous selected
			$(this).addClass('selected'); //select this item

		
			if($('.js-x15-s6_stage3').hasClass('inactive')) {
				$.doTimeout( 333, function(){
					$('.js-x15-s6_stage3').removeClass('inactive');
					calcTotal();
					autoScroll2('.x15-s6-bundles__section-title--s3',1500,60);		

				});
			} else {
				calcTotal();
				autoScroll2('.x15-s6-bundles__section-title--s3',1500,60);		

			}	
			
		});

	}

	function calcTotal() {


		

		if(!$('.js-x15-s6_stage3').hasClass('inactive')) { //only write totals if we have an active stage 3
			
			//build vars
			//get product details
			var deviceSku = $('.js-x15-s6-device.selected .js-x15-swatch.selected').data('sku');
			var deviceThisBundleSku = $('.js-x15-s6-device.selected .js-x15-swatch.selected').data('this-bundle');
			var deviceTitle = $('.js-x15-s6-device.selected .x15-s6-bundle__title').text();
			var deviceColour = $('.js-x15-s6-device.selected .js-x15-swatch.selected').attr('title');
			var devicePrice = $('.js-x15-s6-device.selected .js-x15-swatch.selected').data('price');
			var accessorySku = $('.js-x15-s6-accessory.selected').data('sku');
			var accessoryTitle = $('.js-x15-s6-accessory.selected').data('title');
			var accessoryPrice = $('.js-x15-s6-accessory.selected').data('price');
			

			//get bundle SKU
			//var bundleSku = bundleLookUp(deviceSku,accessorySku);
			
			var bundleSku = deviceThisBundleSku; //hack for no accessory stage

			var bundleJson = "//shop.samsung.com/uk/bundle-" + bundleSku + "/json/"; //hardcoded live JSON url
			//var bundleJson = "/uk/bundle-" + bundleSku + "/json/"; //local JSON (might not work on live?) 

			//console.log(bundleSku);

			$('#x15-s6-bundle-form').hide();
			$('.x15-s6-submit-msg').text('').removeClass('active');
			
			$('.js-x15-s6-totals-prod1').html("&ndash;");
			$('.js-x15-s6-totals-prod2').html("&ndash;"); 

			//reset totals	
			$('.js-x15-s6-rrp-total').html('&ndash;');
			$('.js-x15-s6-offer-total').html('&ndash;');
			$('.js-x15-s6-offer-saving').html('&ndash; / &ndash;');



			//some error checking if zero data feed (out of stock??)

			if (bundleSku != -1) {

				//load bundle JSON
				$.getJSON(bundleJson,function(data) {	

					var title = data['Title'];
					var version = data['Version'];
					var bundlePrice = data['SellPrice'];
					var bundleRRP = data['RRPPrice'];
					var bundleRRPSaving = parseFloat(data['RRPSaving']).toFixed(2);
					var bundleRRPSavingPC = data['RRPSavingPercent'];
					var bundleStock = data['HasStock'];
					var bundleBuyButton = data['ShowBuyButton'];

					//item confirmation (device and accessory)
					$('.js-x15-s6-totals-prod1').html(title);
					$('.js-x15-s6-totals-prod2').html(version);

					//reset totals	
					$('.js-x15-s6-rrp-total').html('&ndash;');
					$('.js-x15-s6-offer-total').html('&ndash;');
					$('.js-x15-s6-offer-saving').html('&ndash; / &ndash;');
 	
					
					//write totals	
					$('.js-x15-s6-rrp-total').text(bundleRRP);
					$('.js-x15-s6-offer-total').text(bundlePrice);
					$('.js-x15-s6-offer-saving').text("£" + bundleRRPSaving + ' / ' + bundleRRPSavingPC + '%');

					//write bundle SKU to hidden field
					
					//check stock and buy button
					//alert(bundleStock + ' // ' + bundleBuyButton);
					if (bundleStock == false || bundleBuyButton == false) {
						$('.x15-s6-submit-msg').html('Sorry, this bundle is currently out of stock').addClass('active');
						$('#x15-s6-bundle-form .js-a2b-sku').attr('value',''); //remove any old value just in-case
					} else {

						$('#x15-s6-bundle-form .js-a2b-sku').attr('value',bundleSku); //update add to basket SKU
						$('#x15-s6-bundle-form').show(); //re-enable submit form
					}



				}).done(function( json ) {
			    	
					
			  	}); 

		  	} else {

		  		//item confirmation (device and accessory)
				$('.js-x15-s6-totals-prod1').html('Sorry, this bundle is currently unavailable');
				$('.js-x15-s6-totals-prod2').html('');		

		  	}


			}

	}



}); */