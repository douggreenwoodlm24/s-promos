
$(function() {	

//Product option checkboxes

	 var honorClub = false;
	$('.product__options-item-cb').click(function() {

		var cbValue = $(this).val();
		
		//if warranty box clicked also check Honor club checkbox
		if (cbValue == "product__3-year-warranty") {
			if ($('input#product__3-year-warranty').is(":checked")){
				$('input#product__honor-club').prop('checked', true);
				$('input#product__honor-club').prop('disabled', true);
			} else {
				$('input#product__honor-club').prop('disabled', false);
				//alert(honorClub);
				if (honorClub == false) {
					$('input#product__honor-club').prop('checked', false);
				}
			}
		}

		//if Honor club box checked remember value so we can reset correctly
		if (cbValue == "product__honor-club") {
			if ($('input#product__honor-club').is(":checked")){
				honorClub = true;	
			} else {
				honorClub = false;		
			}
		}

	});

	//Honor club terms modal -- http://dimsemenov.com/plugins/magnific-popup/documentation.html#inline-type
	if ($('.open-popup-link').length > 0) {
		$('.open-popup-link').magnificPopup({
		  type:'inline',
		  closeBtnInside:false
		});
	}
	
});