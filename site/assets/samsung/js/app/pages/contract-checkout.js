///////////////////////////
// checkout 
///////////////////////////
$(function() {	


	if ($('.checkout').length > 0) { 
 
		
		var currentMonth = 3;
		var currentYear = 2016;
		var yearDiff;
		var monthDiff;
		var dateDiff;

		//$('#Address1MoveInMonth,#Address1MoveInYear').val("-1"); //reset move in date dropdowns on reload
		//$('.checkout__prevaddress').show();
		$('.js-move-in-month,.js-move-in-year').change(function() {

			var _parent = $(this).parent(); //cache parent -- will reuse quite a bit

			var addressMonth = parseInt(_parent.find('.js-move-in-month').val());
			var addressYear = parseInt(_parent.parent().find('.js-move-in-year').val());
			var nextAddress = $(this).data('nextaddress');

			if (!isNaN(addressMonth) && !isNaN(addressYear)) {

				//$('#prevaddress1').addClass('checkout__prevaddress--show');
				 monthDiff = currentMonth - addressMonth;
				 yearDiff = currentYear - addressYear;

				 //convert to months
				 dateDiff = monthDiff + (yearDiff * 12);
				
				 //correct times if partial year
				 if (monthDiff < 0) { 
				 	yearDiff = yearDiff - 1;
				 	monthDiff = monthDiff + 12;
				 }


				if (yearDiff >= 0) { //check for invalid date
					$('.js-checkout__date-note',_parent).html('You moved in <strong>' + yearDiff + '</strong> '  + (yearDiff == 1 ? "year" : "years") + ' and <strong>' + monthDiff + '</strong> '  + (monthDiff == 1 ? "month" : "months") + ' ago');
				} else {
					$('.js-checkout__date-note',_parent).html('Invalid date'); //future date
				}

				// check if we have 3 years of historyu -- if not enable next address block
				// also handle if previous address move in updated and hide unneeded address blocks

				if (dateDiff < 36) { //less than 3 years
 
					if (nextAddress > 0) { //we have a next address
						$('.checkout__prevaddress[data-address="' + nextAddress + '"]').slideDown();
					} 

				} else {

					//hide next address
					if (nextAddress > 0) {
						$('.checkout__prevaddress[data-address="' + nextAddress + '"]').hide();
						$('.checkout__prevaddress[data-address="' + (nextAddress + 1)  + '"]').hide(); //el hack
						$('.checkout__prevaddress[data-address="' + (nextAddress + 2) + '"]').hide(); //el hack
					} 

				}
				
				//set hidden field values
				$('.js-move-in-month-val',_parent).val(monthDiff);
				$('.js-move-in-year-val',_parent).val(yearDiff);

			} else {
				$('.js-checkout__date-note',_parent).html(''); //wipe date helper
			}

		});


		$('#EmploymentStatus').change(function() {

			var statusID = $(this).val();

			if (statusID == 0 || statusID == 4) {
				$('.js-employment-details').slideDown();
			} else {
				$('.js-employment-details').slideUp();
				$('#EmploymentOccupation,#EmployedMonths,#EmployedYears').val(""); // reset occupation and time in job
			}


			

		});

 	}


});