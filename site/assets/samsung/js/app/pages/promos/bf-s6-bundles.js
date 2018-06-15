///////////////////////////
// Config 
///////////////////////////
/*
$(function() {	


	if ($('.bf-s6-bundles').length > 0) { 

		//init builder


		//block stage 2
		//$('.js-bf-s6_stage2').addClass('inactive'); //accessories
		//$('.js-bf-s6_stage3').addClass('inactive'); //totals
		$('.colour-swatch').addClass('inactive'); // lock out colour swatches until we've picked a device


		// SELECT DEVICE
		$('.js-bf-s6-device').click(function() {
			
			var no_bundle;

			$('.js-bf-s6-device').removeClass('selected'); //remove previous selected
			$('.colour-swatch').addClass('inactive'); 

			$(this).addClass('selected'); //select this item

			$('.colour-swatch',this).removeClass('inactive'); //enable swatches

			//pre-select first swatch colour if no other swatches selected
			if(!$('.js-bf-swatch',this).hasClass('selected')) {
				$('.js-bf-swatch:first-child',this).click();
				no_bundle = $('.js-bf-swatch:first-child',this).data('no-bundle');
			} else {
				no_bundle = $('.js-bf-swatch.selected',this).data('no-bundle');
			}

			//check for no bundle SKU
			$('.js-bf-s6-accessory').removeClass('hide');
			if (no_bundle > 0) { //quick check for value
				$('.js-bf-s6-accessory[data-sku="' + no_bundle + '"]').addClass('hide');
			}

			autoScroll2('.bf-s6-bundles__section-title--s1',500,60);

			calcTotal();
		});

		//SELECT Swatch
		$('.js-bf-swatch').click(function() {

			$(this).siblings().removeClass('selected');
			$(this).addClass('selected'); //select this item

			var img_url = $(this).data('img-url');
			var no_bundle = $(this).data('no-bundle'); //check for accessory SKU that we can't bundle/need to block

			//Swap image
			//console.log(img);
			//$('.bf-s6-bundle__img img',this).hide();
			$(this).closest('.bf-s6-bundle').find('.bf-s6-bundle__img img').attr('src',img_url);


			//check if stage 2 active, make active if not and calculate totals
			if($('.js-bf-s6_stage2').hasClass('inactive')) {
				$.doTimeout( 333, function(){
					$('.js-bf-s6_stage2').removeClass('inactive');
					calcTotal();
				});
			} else {
				calcTotal();
			}


			//check for no bundle SKU
			$('.js-bf-s6-accessory').removeClass('hide');
			if (no_bundle > 0) { //quick check for value
				$('.js-bf-s6-accessory[data-sku="' + no_bundle + '"]').addClass('hide');
			}
		});

		//SELECT ACCESSORY
		$('.js-bf-s6-accessory').click(function() {
			
			$('.js-bf-s6-accessory').removeClass('selected'); //remove previous selected
			$(this).addClass('selected'); //select this item

		
			if($('.js-bf-s6_stage3').hasClass('inactive')) {
				$.doTimeout( 333, function(){
					$('.js-bf-s6_stage3').removeClass('inactive');
					calcTotal();
					autoScroll2('.bf-s6-bundles__section-title--s3',1500,60);		

				});
			} else {
				calcTotal();
				autoScroll2('.bf-s6-bundles__section-title--s3',1500,60);		

			}	
			
		});

	}

	function calcTotal() {


		

		if(!$('.js-bf-s6_stage3').hasClass('inactive')) { //only write totals if we have an active stage 3
			
			//build vars
			//get product details
			var deviceSku = $('.js-bf-s6-device.selected .js-bf-swatch.selected').data('sku');
			var deviceTitle = $('.js-bf-s6-device.selected .bf-s6-bundle__title').text();
			var deviceColour = $('.js-bf-s6-device.selected .js-bf-swatch.selected').attr('title');
			var devicePrice = $('.js-bf-s6-device.selected .js-bf-swatch.selected').data('price');
			var accessorySku = $('.js-bf-s6-accessory.selected').data('sku');
			var accessoryTitle = $('.js-bf-s6-accessory.selected').data('title');
			var accessoryPrice = $('.js-bf-s6-accessory.selected').data('price');
			

			//get bundle SKU
			var bundleSku = bundleLookUp(deviceSku,accessorySku);
			var bundleJson = "//shop.samsung.com/uk/bundle-" + bundleSku + "/json/"; //hardcoded live JSON url
			//var bundleJson = "/uk/bundle-" + bundleSku + "/json/"; //local JSON (might not work on live?) 

			//console.log(bundleSku);

			$('#bf-s6-bundle-form').hide();
			$('.bf-s6-submit-msg').text('').removeClass('active');
			
			$('.js-bf-s6-totals-prod1').html("&ndash;");
			$('.js-bf-s6-totals-prod2').html("&ndash;");

			//reset totals	
			$('.js-bf-s6-rrp-total').html('&ndash;');
			$('.js-bf-s6-offer-total').html('&ndash;');
			$('.js-bf-s6-offer-saving').html('&ndash; / &ndash;');

			//some error checking if zero data feed (out of stock??)

			if (bundleSku != -1) {

				//load bundle JSON
				$.getJSON(bundleJson,function(data) {	

					var bundlePrice = data['SellPrice'];
					var bundleRRP = data['RRPPrice'];
					var bundleRRPSaving = parseFloat(data['RRPSaving']).toFixed(2);
					var bundleRRPSavingPC = data['RRPSavingPercent'];
					var bundleStock = data['HasStock'];
					var bundleBuyButton = data['ShowBuyButton'];

					//item confirmation (device and accessory)
					$('.js-bf-s6-totals-prod1').html(deviceTitle + " &ndash; " + deviceColour);
					$('.js-bf-s6-totals-prod2').html(accessoryTitle);

					//reset totals	
					$('.js-bf-s6-rrp-total').html('&ndash;');
					$('.js-bf-s6-offer-total').html('&ndash;');
					$('.js-bf-s6-offer-saving').html('&ndash; / &ndash;');
 	
					
					//write totals	
					$('.js-bf-s6-rrp-total').text(bundleRRP);
					$('.js-bf-s6-offer-total').text(bundlePrice);
					$('.js-bf-s6-offer-saving').text("£" + bundleRRPSaving + ' / ' + bundleRRPSavingPC + '%');

					//write bundle SKU to hidden field
					
					//check stock and buy button
					//alert(bundleStock + ' // ' + bundleBuyButton);
					if (bundleStock == false || bundleBuyButton == false) {
						$('.bf-s6-submit-msg').html('Sorry, this bundle is currently out of stock').addClass('active');
					} else {
						$('#bf-s6-bundle-form .js-a2b-sku').attr('value',bundleSku); //update add to basket SKU
						$('#bf-s6-bundle-form').show(); //re-enable submit form
					}

				}).done(function( json ) {
			    	
					
			  	}); 

		  	} else {

		  		//item confirmation (device and accessory)
				$('.js-bf-s6-totals-prod1').html('Sorry, this bundle is currently unavailable');
				$('.js-bf-s6-totals-prod2').html('');		

		  	}


			}

	}


	function bundleLookUp(deviceSku,accessorySku) {
		// yep, crazy :)
		switch (deviceSku) { 
			// Start S6
			case 282668: //S6 Black
				switch (accessorySku) {
					case 284344: //Charger
					return 286197;
					case 285121: //Gear S2
					return 286211;
					case 285122: //Gear S2 Classic
					return -1;
					case 285380: //Speaker
					return 286140;
					case 283933: //Smartthings
					return 286144;
				}
				break; 
			case 282680: //S6 White	
				switch (accessorySku) {
					case 284344: //Charger
					return 286199;
					case 285121: //Gear S2
					return 286212;
					case 285122: //Gear S2 Classic
					return -1;
					case 285380: //Speaker
					return 286141;
					case 283933: //Smartthings
					return 286145;
				}
				break;
			case 282630: //S6 Gold
				switch (accessorySku) {
					case 284344: //Charger
					return 286200;
					case 285121: //Gear S2
					return 286213;
					case 285122: //Gear S2 Classic
					return -1;
					case 285380: //Speaker
					return 286142;
					case 283933: //Smartthings
					return 286146;
				}
				break;
			case 282669: //S6 Blue
				switch (accessorySku) {
					case 284344: //Charger
					return 286201;
					case 285121: //Gear S2
					return 286214;
					case 285122: //Gear S2 Classic
					return -1;
					case 285380: //Speaker
					return 286143;
					case 283933: //Smartthings
					return 286147;
				}
				break;
			// END S6

			//Start S6 Edge
			case 282657: //S6 Edge Black
				switch (accessorySku) {
					case 284344: //Charger
					return 286203;
					case 285121: //Gear S2
					return ;
					case 285122: //Gear S2 Classic
					return 286207;
					case 285380: //Speaker
					return 286148;
					case 283933: //Smartthings
					return 286152;
				}
				break; 
			case 282660: //S6 Edge White
				switch (accessorySku) {
					case 284344: //Charger
					return 286204;
					case 285121: //Gear S2
					return -1;
					case 285122: //Gear S2 Classic
					return 286208;
					case 285380: //Speaker
					return 286149;
					case 283933: //Smartthings
					return 286153;
				}
				break;
			case 282672: //S6 Edge Gold
				switch (accessorySku) {
					case 284344: //Charger
					return 286205;
					case 285121: //Gear S2
					return -1;
					case 285122: //Gear S2 Classic
					return 286209;
					case 285380: //Speaker
					return 286150;
					case 283933: //Smartthings
					return 286154;
				}
				break;
			case 282675: //S6 Edge Green
				switch (accessorySku) {
					case 284344: //Charger
					return 286206;
					case 285121: //Gear S2
					return -1;
					case 285122: //Gear S2 Classic
					return 286210;
					case 285380: //Speaker
					return 286151;
					case 283933: //Smartthings
					return 286155;
				}
				break;

			//Start S6 Edge +
			case 282735: //S6 Edge + Black
				switch (accessorySku) {
					case 284344: //Charger
					return 286215;
					case 285121: //Gear S2
					return -1;
					case 285122: //Gear S2 Classic
					return 286195;
					case 285380: //Speaker
					return 286156;
					case 283933: //Smartthings
					return 286158;
				}
				break; 
			case 282730: //S6 Edge + Gold
				switch (accessorySku) {
					case 284344: //Charger
					return 286216;
					case 285121: //Gear S2
					return -1;
					case 285122: //Gear S2 Classic
					return 286196;
					case 285380: //Speaker
					return 286157;
					case 283933: //Smartthings
					return 286159;
				}
				break; 
			//end S6 Edge +
			default:
				return -1;
				break;
			}


		//return 286140;

	}

}); */