$(function() {	
	if ($('.wms').length > 0) {
		WMSSkuCheck();


		//Filter click
		$('.js-wms-filter').click(function() { 
			//get filter id and value
			var filterId = $(this).data('filter-id');
			var filterValue = $(this).data('filter-value');
			
			if(!$(this).hasClass('active')) { //only do stuff if current section not already active
				$(this).addClass('active').siblings().removeClass('active'); //allow toggle of active filter while resetting siblings
			

				if (filterId == 1 && (filterValue == 2 || filterValue == 3) && $(this).hasClass('active')) {
					$('.wms__filter-block').not('.wms__filter-block[data-filter-group="1"]').addClass('hidden');
				} else {
					$('.wms__filter-block').removeClass('hidden');
				}
				//start filtering...
				filterProducts(filterId,filterValue); //check and apply all filters
				calcViableFilters(filterId,filterValue); //check what filters are still viaable with new result set
				logWMSFilterEvent(filterId,filterValue); //log click event

			} else {

				//allow toggle on filter 2 & 3 (Colour and capacity)
				if (filterId == 2 || filterId == 3) {

					$(this).removeClass('active'); 

					//start filtering...
					filterProducts(filterId,filterValue); //check and apply all filters
					calcViableFilters(filterId,filterValue); //check what filters are still viaable with new result set
					logWMSFilterEvent(filterId,filterValue); //log click event

				}

				//allow resetting of current filter group if active filter clicked
				if (filterValue > 0 && (filterId == 4 || filterId == 5 || filterId == 6 || filterId == 7 || filterId == 8)) { 			
					$('.js-wms-filter[data-filter-id="' + filterId + '"][data-filter-value="-1"]').addClass('active');
					$(this).removeClass('active'); 

					//start filtering...
					filterProducts(filterId,filterValue); //check and apply all filters
					calcViableFilters(filterId,filterValue); //check what filters are still viaable with new result set
					logWMSFilterEvent(filterId,filterValue); //log click event
				}

			}
			
		});


		//end filter click
		//reset button
		$('.js-wms-filter-reset').click(function() {
			$('.js-wms-filter').removeClass('active'); // remove active class from all filters
			//$('.js-wms-filter[data-filter-id="7"],.js-wms-filter[data-filter-id="8"]').prop('checked', false); //unset checkbox/smartswitches on filters 7&8
			$('.js-wms-filter').removeClass("inactive");
			$('.js-wms-filter[data-filter-value="-1"]').addClass("active");
			filterProducts();
			logEvent("WM Selector","Reset","Reset All Filters"); //log reset event
			autoScroll2('#wms-start',500,60);
		});

		//send reset button
		//EVENT LOGGING
		//add to basket button click event
		$('.wms__listing-a2b a').click(function() {
			var sku = $(this).closest('.js-wms-product').data('sku');
			logEvent("WM Selector","Add to Basket","SKU: " + sku);
		});
		//more info button click event
		$('.wms__listing-more-info a').click(function() {
			var sku = $(this).closest('.js-wms-product').data('sku');
			logEvent("WM Selector","More info","SKU: " + sku);
		});
	}

	function WMSSkuCheck() {
		products = $('.js-wms-product');
		var skus = "";
		products.each(function(index) { //iterate through each item
			//var _this = $(this);
			skus += $(this).data('sku') + ",";
			//var jsonPath = "/uk/wms-sku-" + sku + "/json/";
			//$.getJSON(jsonPath,function(data) {			
			//	updateProduct(sku,data);
			//}); 
		});

		var jsonPath = "/uk/snippet?products=" + skus;
		//loop through object and update each SKU
		$.getJSON(jsonPath,function(data) {			
	
		    for(var i=0;i<data.length;i++){	        
		        updateProduct(data[i]);
		    }


		}); 


		//alert(skus);
	}
function updateProduct(data) { //use data from Json feed to update product data
		var sku = data['SKU'];
		var Stock = data['HasStock'];
		var SellPrice = data['SellPrice'];
		//var StockText = data['StockText'];
		//var BuyButton = data['ShowBuyButton'];
		//var RRP = data['RRPPrice'];
		//var SavingPC = data['RRPSavingPercent'];
		//var Saving = data['RRPSaving'];
		var Title = data['Title'];
		var Version  = data['Version'];
		//var FullTitle;
		//if no stock, remove from listing
		if (!Stock) {
			$('.js-wms-product[data-sku="' + sku +'"]').remove();
		}
		//update title / version / price
		$('.js-wms-product[data-sku="' + sku +'"] .wms__listing-title .title').text(Title);
		if (Version != "") {
			$('.js-wms-product[data-sku="' + sku +'"] .wms__listing-title .version').text("(" + Version + ")");
		}
		//$('.js-wms-product[data-sku="' + sku +'"] .wms__listing-title').text(SellPrice);
		$('.js-wms-product[data-sku="' + sku +'"] .wms__listing-price').text(SellPrice);
	}


	function filterProducts(filterId,filterValue) {
		var attributeFilter = "";
		var products = $('.js-wms-product');
		products.hide();
		$('.wms__listing-no-results').removeClass('wms__listing-no-results--show'); //hide no results panel
		var activeFilters =	$('.js-wms-filter.active');
		activeFilters.each(function() {
			var thisFilterId = $(this).data('filter-id');
			var thisFilterValue = $(this).data('filter-value');
			if (thisFilterId > 0 && thisFilterValue > 0) {
				//attributeFilter += '[data-filter-' + filterId + '-value="' + filterValue +'"]';
				attributeFilter += '[data-filter-' + thisFilterId + '-value="' + thisFilterValue +'"]';
 			}
		});
		//console.log(attributeFilter);
		$('.js-wms-product' + attributeFilter).show();
		if ($('.js-wms-product:visible').length < 1) {
			$('.wms__listing-no-results').addClass('wms__listing-no-results--show');
		} 
	}


	//bit of a mess -- excluding some filters breaks switching so jumping through some hoops to try and keep it usable
	function calcViableFilters (filterId,filterValue) {
		var results = $('.js-wms-product:visible');
		var resultCount = results.length;
		//console.log($('.js-wms-product:visible').data('filter-3-value'));
		if (resultCount > 0) {
			var viableFilters = { 
			    //'filter-1': [],
			   // 'filter-2': [],
			    'filter-3': [],
			    'filter-4': [],
			    'filter-5': [],
			    'filter-6': [],
			    'filter-7': [],
			    'filter-8': []
			};
			//build object with filters that could apply to the current reseults
			results.each(function(index) {
				for (i = 3; i < 9; i++) {
					viableFilters["filter-" + i].push($(this).attr('data-filter-' + i + '-value'));
				}
			});
			//console.log(viableFilters);
			var j = 3;
			//loop through filters
			for (var prop in viableFilters) {
		        //console.log(prop + " = " + viableFilters[prop]);
		        $('.js-wms-filter[data-filter-id="' + j + '"]').addClass("inactive");

		        //console.log("--- " + j + " ---")
		        //loop through available filter possibilities
		        for (var i = 0; i < viableFilters[prop].length; i++) {
				  	//console.log(viableFilters[prop][i]);
				  	//loads of dupes / optimise 
				  	//var viableFiltersSelected = $('.js-wms-filter[data-filter-id="' + j + '"][data-filter-value="' + viableFilters[prop][i] + '"]');

				  	//if (viableFiltersSelected.length > 0) {
				  	//	viableFiltersSelected.removeClass("inactive").siblings.removeClass("inactive");
				  	//} else {

				  	//}

				  	//var viableFiltersSelected = $('.js-wms-filter[data-filter-id="' + j + '"][data-filter-value="' + viableFilters[prop][i] + '"]');
				  	$('.js-wms-filter[data-filter-id="' + j + '"][data-filter-value="' + viableFilters[prop][i] + '"]').removeClass("inactive");
				}
				j++;
		    } 

		     $('.js-wms-filter[data-filter-value="-1"]').removeClass("inactive");
		     //$('.js-wms-filter.active').siblings().removeClass("inactive");
		} else {

			//no results- reset prompt?

		}
	}


	function logWMSFilterEvent(filterId,filterValue) {
		//var label = $(this).text().trim();
		//var title = $('.listing__title-main').text();
		var results = $('.js-wms-product:visible').length;
		var filtersActive = $('.js-wms-filter.active').length;
		//put in better id > labels
		var filterGroupLabel,filterValueLabel;
		//friendly filter group label
		switch (filterId) {
			case 1:
				filterGroupLabel = "Machine Type";
				switch (filterValue) {
					case 1:
						filterValueLabel = "Washing Machine";
						break;
					case 2:
						filterValueLabel = "Washer Dryer";
						break;
					case 3:
						filterValueLabel = "Tumble Dryer";
						break;
				}
				break;
			case 2:
				filterGroupLabel = "Colour";
				switch (filterValue) {
					case 1:
						filterValueLabel = "White";
						break;
					case 2:
						filterValueLabel = "Graphite";
						break;
					case 3:
						filterValueLabel = "Stainless Steel";
						break;
				}
				break;
			case 3:
				filterGroupLabel = "Capacity";
				filterValueLabel = filterValue + "KG"; //value is capacity (not just a random id)
				break;
			case 4:
				filterGroupLabel = "Stain Removal";
				switch (filterValue) {
					case 1:
						filterValueLabel = "Speciality Cycle";
						break;
					case 2:
						filterValueLabel = "Bubble Soak";
						break;
					case 3:
						filterValueLabel = "Stain Away";
						break;
				}
				break;
			case 5:
				filterGroupLabel = "Fast Cycle";
				switch (filterValue) {
					case 1:
						filterValueLabel = "1200 RPM";
						break;
					case 2:
						filterValueLabel = "1400 RPM";
						break;
					case 3:
						filterValueLabel = "1600 RPM";
						break;
				}
				break;
			case 6:
				filterGroupLabel = "Noise Control";
				switch (filterValue) {
					case 1:
						filterValueLabel = "None";
						break;
					case 2:
						filterValueLabel = "Noise reduction";
						break;
					case 3:
						filterValueLabel = "Noise & Vibration reduction";
						break;
				}
				break;
			case 7:
				filterGroupLabel = "AddWash";
				switch (filterValue) {
					case 2:
						filterValueLabel = "Yes";
						break;
					default:
						filterValueLabel = "No";
						break;
				}
				break;
			case 8:
				filterGroupLabel = "Smart Control";
				switch (filterValue) {
					case 2:
						filterValueLabel = "Yes";
						break;
					default:
						filterValueLabel = "No";
						break;
				}
				break;
			default:
			    filterGroupLabel = filterId; //this shouldn't happen
			}
		logEvent("WM Selector","Filter:" + filterGroupLabel,filterValueLabel + " (Results: " + results + " / Active Filters: " + filtersActive + ")");
	}
});