///////////////////////////
// Xmas deals 
///////////////////////////
/*
$(function() {	

	if ($('.p-advent__offer-view-terms').length > 0) { 

		$('.p-advent__offer-view-terms').click(function() {
			$(this).hide();
			$('.p-advent__offer-terms').removeClass('p-advent__offer-terms--collapse');
		});

	}

	if ($('.js-advent-json__product').length > 0) { 

		$('.js-advent-json__product').hide();
		$('.js-advent-hero-a2b').hide();

		var jsonSkus = $('.js-advent-json__product');


		jsonSkus.each(function( index ) { //iterate through each item
		    
		    
			//console.log(index);
			//$(this).hide();

			var _this = $(this);
			var jsonPath = "/uk/xmas-sku-" + $(this).data('sku') + "/json/";

			$.getJSON(jsonPath,function(data) {
				
				var Stock = data['HasStock'];
				var BuyButton = data['ShowBuyButton'];
				var RRP = data['RRPPrice'];
				var SavingPC = data['RRPSavingPercent'];
				var Title = data['Title'];
				var Version  = data['Version'];

				if (Stock == true && BuyButton == true) {
					$(_this).show();
					//show hero add to basket if tied to stock
					$('.js-advent-hero-a2b[data-hero-sku="' + $(_this).data('sku') + '"]').show();	
				} else {
					$(_this).addClass('p-advent__product--outofstock').show();
				}

				if (RRP) {
					$('.js-advent-rrp',_this).text('RRP ' + RRP);
				}

				if (SavingPC && SavingPC > 0) {
					$('.js-advent-save',_this).text('Save ' + SavingPC + "%");
				}



				//Set GA event label
				$('.track-ga-event',_this).attr('data-ga-event-label', Title + " / " + Version);
			}); 


		});


	}

}); */
