///////////////////////////
// checkout 
///////////////////////////
$(function() {	


	if ($('.checkout').length > 0) { 

		showHideDelivery(true); //check shipping radios on load

		$('#ship_to_billing,#ship_to_delivery').click(function() {
			showHideDelivery(false);
		});

		////////////////////////////
		//start Address Finder
		////////////////////////////

	    //enable finder section if we have JS (otherwise show vanilla form) // - find a better way to hand n number of these
		$('.js-co-badd-finder').removeClass('hidden');
		$('.js-co-badd-fields').addClass('hidden'); 


		$('.js-co-badd-manual').click(function() { // If enter address manually is clicked

		    var addressFinder = $(this).closest("*[data-address-type]");
		    var addressFields = addressFinder.data("address-fields");
		    var addressFieldPrefix = addressFinder.data("address-field-prefix");


			//$('.js-co-badd-finder').addClass('hidden');
		    addressFinder.find('.js-co-badd-wrapper').addClass('disable');
		    $('.' + addressFields).removeClass('hidden');
		    addressFinder.find('.js-co-badd-manual').addClass('hidden');
		    addressFinder.find('.js-co-badd-search-again').removeClass('hidden');

		    addressFinder.find('#b_pc_lookup').val('');
		    addressFinder.find("#b_pc_lookup").attr('disabled', 'disabled');
		    
			$("#checkout").validate().resetForm();
			

		});

		$('.js-co-badd-search-again').click(function() { // If search again is clicked

		    var addressFinder = $(this).closest("*[data-address-type]");
		    var addressFields = addressFinder.data("address-fields");
		    var addressFieldPrefix = addressFinder.data("address-field-prefix");

		    $('.' + addressFields).addClass('hidden');

			//$('.js-co-badd-finder').addClass('hidden');
		    addressFinder.find('.js-co-badd-wrapper').removeClass('disable');
		    addressFinder.find('.js-co-badd-manual').removeClass('hidden');
		    addressFinder.find('.js-co-badd-search-again').addClass('hidden');
		    addressFinder.find('.js-co-badd-results').addClass('hidden');

		    addressFinder.find("#b_pc_lookup").removeAttr('disabled')

		    resetFields(addressFieldPrefix);

		});


		$('.js-co-badd-pc-lookup').click(function() { //if find address button is clicked

		    //get the context for the address lookup that was clicked
		    var addressFinder = $(this).closest("*[data-address-type]");

		    var addressType = addressFinder.data("address-type");

		    var postCode = addressFinder.find('#b_pc_lookup').val().trim();
			
            addressFinder.find('.co_address-no-results').addClass('hidden');
            addressFinder.find('.js-co-badd-results').addClass('js-co-badd-results--loading'); //show a loading bar

			$.ajaxSetup({
			    cache: false
			});

			$.ajax({
			    url: 'address-list',
                method:'post',
			    data: { postCode: postCode }
			}).done(function (data) {

			    if (data) {


            		addressFinder.find('.js-co-badd-results').removeClass('hidden');
					
			        addressFinder.find('.js-co-badd-results').removeClass('js-co-badd-results--loading');
			        if (data.AddressData.length > 0) {

                        //remove any previous entries
			            addressFinder.find('.js-co-badd-results-list option[value!=""]').remove();

                        //write the new ones out
						$.each(data.AddressData, function (i, item) {
						    addressFinder.find('.js-co-badd-results-list').append($('<option>').text(item.AddressText).attr('value', item.AddressKey));
						});

			            //reset text
						addressFinder.find('.js-co-badd-manual').text('Enter address manually');
					}
			        else {
			            noResults();
			        }
			    } else {

			        //no results returns - allow the user to enter an address manually
			        addressFinder.find('.js-co-badd-fields').removeClass('hidden');
			    }
			}).fail(function () {
			    noResults(addressFinder);
			});


			resetFields();

		}); 

		$('.js-co-badd-results-list').change(function () { //is select menu option is changed

		    var addressFinder = $(this).closest("*[data-address-type]");
		    var addressFields = addressFinder.data("address-fields");
		    var addressFieldPrefix = addressFinder.data("address-field-prefix");
			
			//disable look-up
		    addressFinder.find('.js-co-badd-wrapper').addClass('disable');

		    addressFinder.find('.js-co-badd-manual').addClass('hidden');
		    addressFinder.find('.js-co-badd-search-again').removeClass('hidden');

			//show address form
		    $('.' + addressFields).removeClass('hidden');

			//get the addressKey
		    var addressKey = addressFinder.find('.js-co-badd-results-list option:selected').val();

		    //get the address details object using the key
		    $.ajaxSetup({
		        cache: false
		    });

			$.ajax({
			    url: 'address-details',
			    method: 'post',
			    data: { addressKey: addressKey }
			}).done(function (data) {
			    if (data) {
			        resetFields(addressFieldPrefix);

			        $('#' + addressFieldPrefix + 'company').val(data.Company);
			        $('#' + addressFieldPrefix + 'street').val(data.Address1);
			        $('#' + addressFieldPrefix + 'street1').val(data.Address2);
			        $('#' + addressFieldPrefix + 'city').val(data.City);
			        $('#' + addressFieldPrefix + 'state').val(data.State);
			        $('#' + addressFieldPrefix + 'zip').val(data.ZipCode);
			    }
			});


		});

		function resetFields(fieldPrefix) {
		    $('#' + fieldPrefix + 'street').val('');
		    $('#' + fieldPrefix + 'street1').val('');
		    $('#' + fieldPrefix + 'city').val('');
		    $('#' + fieldPrefix + 'state').val('');
		    $('#' + fieldPrefix + 'zip').val('');
		}

		function noResults(addressFinder) {

		    addressFinder.find('.js-co-badd-results').removeClass('js-co-badd-results--loading'); //show a loading bar

		    //remove any previous entries and hide the list
		    addressFinder.find('.js-co-badd-results-list option[value!=""]').remove();
		    addressFinder.find('.js-co-badd-results').addClass('hidden');

		    //no results returns - allow the user to enter an address manually
		    addressFinder.find('.js-co-badd-fields').removeClass('hidden');
		    addressFinder.find('.co_address-no-results').removeClass('hidden');
		    addressFinder.find('.js-co-badd-manual').removeClass('hidden');
		}

		////////////////////////////
		//end Address recall
		////////////////////////////
 	}

 	$('.form-textfield,.form-selectmenu').focus(function() {
 		//$(this).parent().parent().find('.form-label').addClass('active');
 		resetActiveRows();
 		$(this).closest('.form-row').addClass('form-row--active');
 	});

 	$('.form-textfield,.form-selectmenu').blur(function() {
 		resetActiveRows();
 	});

 	function resetActiveRows() {
 		$('.form-row').removeClass('form-row--active');
 	}

 	

 	function showHideDelivery(init) {
 		//reset labels
 		$('.js-shipping-label').removeClass('active');

 		//check active radio
		if ($('#ship_to_billing').is(':checked')) {

			if (init) { //initial page load so hide rather than slide up
				$('.js-delivery-wrapper').hide();
			} else {
				$('.js-delivery-wrapper').slideUp();
			}
			//set label status
			$('#ship_to_billing').parent().parent().find('.js-shipping-label').addClass('active');
		} 

		if ($('#ship_to_delivery').is(':checked')) {
			$('.js-delivery-wrapper').slideDown();

			//set label status
			$('#ship_to_delivery').parent().parent().find('.js-shipping-label').addClass('active');
		} 


		//console.log(shipToBilling + " | " + shipToDelivery);

 	}



 	//SIMS ON PLACE ORDER PAGE
	if ($('.place-order-sims').length > 0) { 

		$('.js-bconfig__tariff-select').each(function( index ) { //iterate through each item
			
			var sku = $(this).data('contract-id');

			$(this).html('<a href="/uk/basket/add?i=' + sku + '">Select Tariff ></a>');

		});


	}
	//END SIMS ON PLACE ORDER PAGE

});