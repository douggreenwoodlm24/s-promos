///////////////////////////
// Config 
///////////////////////////
$(function() {	

	if ($('.tradein').length > 0) { 
		
	//reset drop down
	$('.js-tradein-device option[value="-1"]').attr("selected",true);

	//disable grade until device selected
	$('.tradein__condition-list').addClass('suppressed');

	resetTradeInForm();

	$('.js-tradein-device').change(function() {

		//enabled grades
		$('.tradein__condition-list').removeClass('suppressed');

		resetTradeInForm();

	});

	//catch trade in grade click
	$('.tradein__condition-list:not(suppressed) .js-tradein-grade').click(function() {

		// gwt current grade
		var grade = $(this).val();

		//get grade price out of device select menu selected option 
		var value = $(".js-tradein-device option:selected").data("grade-" + grade);

		//write grade price
		$('.js-tradein-value').text(value);
		
		$('#tradein_input').val(value);

		 //disable total
		$('.tradein__value').removeClass('suppressed');

		//enable submit
		$('.tradein__submit-button').removeClass('suppressed');

	});

	//validate S6 stage 1 form
	$('.js-tradein__form--stage1').submit(function() {

		var result = false;
			
		if ($('#tradein_terms').is(':checked') && $('#tradein_imei').val() != '') {

			
			var imei = $('#tradein_imei').val();
			$.ajax({
					url: '/uk/s6tradein/validate-imei',
					type: 'POST',
					async: false,
					data: { imei: imei }
			}).done(function (data) {
				if (data == true)
				{
					result = true;
				}
				else
				{
					showIMEIAlert();
				}
				
			});
	
		} else {
			showIMEIAlert();
		}

		return result;
		
	});
	
	//validate Gear stage 1 form
	$('.js-geartradein__form--stage1').submit(function() {

		var result = false;
			
		if ($('#tradein_terms').is(':checked')) {
			result=true;
	
		} else {
			showAlert();
		}

		return result;
		
	});

	function showIMEIAlert() {
		alert("Please agree to the Trade In Terms and Conditions and enter a valid IMEI number before continuing");
	}
	
	function showAlert() {
		alert("Please agree to the Trade In Terms and Conditions before continuing");
	}
	
	//stage 1 quick select
	$('.js-tradein__qs-item').click(function() {

		resetTradeInForm();


		var thisId = $(this).data('device-id'); //get id from data attr
		var thisVal = $('.js-tradein-device option[data-device-id="' + thisId + '"]').val(); //Firefox had issues moving to option via data attr, so look up val insetead :/

		$('.js-tradein-device').val(thisVal);
		
		//enabled grades
		$('.tradein__condition-list').removeClass('suppressed');

		//auto scroll
		autoScroll2('.js-tradein-device',500,60);

	});

	// Stage 2

	$('.tradein__select-product input').each(function(i) {
       this.checked = false;

	});

	$('.tradein__select-product input').click(function() {

		//enable submit
		$('.tradein__submit-button').removeClass('suppressed');

		$('.tradein__select-product').removeClass('active');

		$(this).parent().addClass('active');
		
		
	});

	$('.tradein__submit-button').click(function() {
		
		var shortSku = $('input[name=i]:checked').data("shortsku");
		var sku = $('input[name=i]:checked').data("sku");
		
		sendScAddPrd(shortSku, sku);
	});
	

	function resetTradeInForm() {
		 //reset grade (need to do this if device has changed)
		 $('.js-tradein-grade').each(function(i) {
	       this.checked = false;
		 });

		//reset total to 0
	    $('.js-tradein-value').text("0.00");
		
	    $('#tradein_input').val('');

	    $('#tradein_imei').val('');

	    //disable total
		$('.tradein__value').addClass('suppressed');

	    //disable submit
		$('.tradein__submit-button').addClass('suppressed');

		//reset terms checkbox
		$('#tradein_terms').prop('checked',false);

	}


	}

});
