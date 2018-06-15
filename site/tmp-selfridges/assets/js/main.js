/*price range - need to uncomment below if slider is required (price-range.js) */

// $('#sl2').slider();
//
//	var RGBChange = function() {
//	  $('#RGB').css('background', 'rgb('+r.getValue()+','+g.getValue()+','+b.getValue()+')')
//	};	

/* Add class to <html> to help anchor footer at bottom on small pages */
$(function(){
	if($("body").hasClass("login")){
		$("html").addClass("loginHtml");
		//console.log("This is a login page");
	}
});

/* Lightbox / Modal */
$('#myModal').on('shown.bs.modal', function(){
	  $('#myInput').focus();
	});

/* Add <br> below the product rows on product listing  */
$(function(){
	$('.product-list-items .list-table-item:nth-child(2n)').after('<br class="clear-both">');
});

/* initialise product detail image/thumbnail carousel (i.e. thumbnail carousel below large image) */
 $(window).load(function() {
        $('.flexslider-thumbs').flexslider({
            animation: "slide",
            controlNav: "thumbnails"
        });
    });
 
 /* initialise related products carousel (i.e. multiple item carousel) */
 $(window).load(function() {
	  $('.flexslider-multi').flexslider({
		  animation: "slide",
		    animationLoop: false,
		    itemWidth: 210,
		    itemMargin: 5,
		    minItems: 2,
		    maxItems: 4
	  });
	});
		
/* Mobile nav: open either menu or search, not both */
$(function(){
	$('.btn-navbar-search-xs').click(function(){
		if ($('.navbar-main').hasClass('in')) {
			$('.navbar-main').removeClass('in').addClass('collapse');
		} 
	});
	$('.btn-navbar-main').click(function(){
		//console.log('btn clicked');
		if ($('.navbar-search-xs').hasClass('in')) {
			$('.navbar-search-xs').removeClass('in').addClass('collapse');
		} 
	});
});

/* Product detail page: Thumbnail images swap */
$(function(){
	$('#product-image-thumbs img').click(function() { 
         var src = $(this).attr('src');
         $('#product-image-full').attr('src', src);
         $('img.current').removeClass('current');
         $(this).addClass('current');
     });
    
});

/* Change arrow direction on product listing filter section (mobile devices) */
$(function(){
	$(".filter-button").click(function(){
		//console.log('filter button clicked');
		if(("#filter-product-options").hasClass(".in")){
			$(".filter-button").after(" abc");
		} else {
			$(".filter-button").after(" def");
		}
	})
});

/* Stop auto-scroll on carousel */
$('.carousel.no-autoscroll').carousel({
    interval: false
});

/* Show/hide shipping address is same as billing address fields */
$(function(){
	$('#ship_address_fields').css('display','none');
	$('#ship_address_same').click(function(){
		if ($(this).is(':checked')) {
			$('#ship_address_fields').css('display','none');
		} else {
			$('#ship_address_fields').css('display','block');
		};
	});
});

/* Show/hide post-sales CRM questions on checkout page */
$(function(){
	$('#postSalesQuestions_fields').css('display','none');
	$('#postSalesQuestions_tick').click(function(){
		//console.log('aaaa');
		if ($(this).is(':checked')) {
			$('#postSalesQuestions_fields').css('display','block');
		} else {
			$('#postSalesQuestions_fields').css('display','none');
		};
	});
});


/* Accordion: Add plus/minus icons */
$(document).ready(function(){    
	$('.plus-minus').click(function(){
		if ($(this).find('.fa').hasClass('fa-plus')){
			$(this).find('.fa').removeClass("fa-plus").addClass("fa-minus");
		} else {
			$(this).find('.fa').removeClass("fa-minus").addClass("fa-plus");
		};
	});
});


/* Initialise validation on forms */
$(document).ready(function(){    
	if($(".form-validate form").length){
		$('form').validate({
			rules: {
				login_email: {
					required: true,
					email: true
				},
				login_password: "required",
				register_first_name: "required",
				register_last_name: "required",
				register_company_name: "required",
				register_telephone: "required",
				register_email: {
					required: true,
					email: true
				},
				bill_first_name: "required",
				bill_last_name: "required",
				bill_phone: "required",
				bill_email: "required",
				bill_address_1: "required",
				bill_city: "required",
				bill_postcode: "required",
				bill_country: "required",
				
				// Selfridges check out fields 
				sel_streetAddress: {
					required: "#purchaseInstore:unchecked"
				},
				sel_town: {
					required: "#purchaseInstore:unchecked"
				},
				sel_postcode: {
					required: "#purchaseInstore:unchecked"
				},
				sel_del_streetAddress: {
					required: "#purchaseInstore:unchecked"
				},
				sel_del_town: {
					required: "#purchaseInstore:unchecked"
				},
				sel_del_postcode: {
					required: "#purchaseInstore:unchecked"
				},
				
				
				ship_first_name: {
					required: "#ship_address_same:unchecked"
				},
				ship_second_name: {
					required: "#ship_address_same:unchecked"
				},
				ship_address_1: {
					required: "#ship_address_same:unchecked"
				},
				ship_city: {
					required: "#ship_address_same:unchecked"
				},
				ship_postcode: {
					required: "#ship_address_same:unchecked"
				},
				ship_country: {
					required: "#ship_address_same:unchecked"
				}
			},
			messages: {
				login_email: "Please enter a valid email address",
				register_email: "Please enter a valid email address",
				login_password: "Please enter a valid password"
			}
		});
	};
});

/* switch between grid and list on product listing */
$('.list-table').on('click',function(e) {
    if ($(this).hasClass('btn-grid')) {
        $('.btn-grid').removeClass('toggle-off').addClass('toggle-on');
        $('.btn-list').removeClass('toggle-on').addClass('toggle-off');
    	$('.product-list-items .list-table-item').removeClass('list').addClass('grid');
        $('.product-list-items .list-table-item').removeClass('col-sm-12').addClass('col-sm-4');
    }
    else if($(this).hasClass('btn-list')) {
    	$('.btn-list').removeClass('toggle-off').addClass('toggle-on');
        $('.btn-grid').removeClass('toggle-on').addClass('toggle-off');
    	$('.product-list-items .list-table-item').removeClass('grid').addClass('list');
        $('.product-list-items .list-table-item').removeClass('col-sm-4').addClass('col-sm-12');
    }
});


/* plus/minus incrementer for basket */
$(function(){
    // This button will increment the value
    $('.qtyplus').click(function(e){
        // Stop acting like a button
        e.preventDefault();
        var $container = $(this).closest('.cart-quantity-button');
        var $field = $container.find('input[name=' + $(this).attr('field') + ']');
        var currentVal = parseInt($field.val(), 10);
        if (!isNaN(currentVal)) {
            $field.val(currentVal + 1);
        } else {
            $field.val(0);
        }
    });
 // This button will decrement the value till 0
    $(".qtyminus").click(function(e) {
        // Stop acting like a button
        e.preventDefault();
        var $container = $(this).closest('.cart-quantity-button');
        var $field = $container.find('input[name=' + $(this).attr('field') + ']');
        var currentVal = parseInt($field.val(), 10);
        if (currentVal===0){
        	 $field.val(0);
        } else {
        	if (!isNaN(currentVal)) {
                $field.val(currentVal - 1);
            } else {
                $field.val(0);
            }
        };
    });
});

/* Insurance form: Activate/deactivate insurance quantity field when checkbox checked/unchecked */
$(function(){
	$('.activated-by-checkbox').prop('disabled', true);
	$('.activates-input').change(function(){
		if ($(this).is(':checked')) {
			$(this).parent().parent().find('.activated-by-checkbox').removeClass('field-disabled').addClass('field-glow').prop('disabled', false);
		} else {
			$(this).parent().parent().find('.activated-by-checkbox').addClass('field-disabled').removeClass('field-glow').prop('disabled', true).val('');
		};
	})
});

/* Enable/disable price override text box */
$(function(){
	$('.priceOverrideOriginal').css('display','block');
	$('.priceOverrideNew').css('display','none');
	$('.priceOverride').change(function(){
		var currentRow = $(this);
		if($(this).val() != 'Original'){
			currentRow.parent().next('td').find('.priceOverrideOriginal').css('display','none');
			currentRow.parent().next('td').find('.priceOverrideOriginal').css('display','none');
			currentRow.parent().next('td').find('.priceOverrideNew').css('display','block');
		} else {
			currentRow.parent().next('td').find('.priceOverrideOriginal').css('display','block');
			currentRow.parent().next('td').find('.priceOverrideNew').css('display','none');
		}
	})
});

/* Update price (in override) */
$('.priceOverride-btn').click(function(){
	// get value entered into input box
	var priceOverrideInputValue = $(this).parent().find('.priceOverride-input').val();
	
	// convert to 2 decimal places
	//var priceOverrideCurrency = priceOverrideInputValue.toFixed(2);
	
	// get quantity of items
	var priceOverrideQuantity = $(this).parents('.itemRow').find('.quantityColumn').text();
	//var itemTotal = $(this).parents('.itemRow').find('.totalColumn').text();
	
	// calculate new line total (input value * quantity)
	var newTotal = priceOverrideInputValue * priceOverrideQuantity;
	
	// update line value
	$(this).parents('.itemRow').find('.totalColumn').text('£' + newTotal);
	
	//console.log(priceOverrideInputValue);
	//console.log(priceOverrideQuantity);
	//console.log(itemTotal);
	
	// prevent default action for button
	return false;
	
});

//show/hide address when in-store purchase checked/unchecked
$('#purchaseAddressRequired').css('display','none');
$('#purchaseInstore').change(function(){
    if (this.checked) {
        $('#purchaseAddressRequired').css('display','none');
    } else {
    	$('#purchaseAddressRequired').css('display','block');
    }
});

//show/hide address when in-store purchase checked/unchecked
$('#deliveryDifferent').css('display','none');
$('#deliveryBillingSame').change(function(){
    if (this.checked) {
        $('#deliveryDifferent').css('display','none');
    } else {
    	$('#deliveryDifferent').css('display','block');
    }
});

// Add a second payment type  
$('#sel_paymentSecondType').css('display','none');
$('#sel_paymentAdd').click(function(){
	$('#sel_paymentSecondType').css('display','block');
	$('#sel_paymentAdd').css('display','none');
});
$('#sel_paymentSecondTypeRemove').click(function(){
	$('#sel_paymentSecondType').css('display','none');
	$('#sel_paymentAdd').css('display','block');
});


// If Price override has been selected/updated, keep field and button on page
//var priceOverride_selectedOption = $('select[id^=priceOverride] option:selected').val();
var priceOverride_selectedOption = $('select#priceOverride_1 option:selected').val();
//console.log(priceOverride_selectedOption);

// Check scanned serial number
$(function(){
	$('.field-scan-serials').blur(function(){
		var scannedSerial = $(this).val();
		$.ajax({
			// The URL for the request
			url : "tmp-selfridges/assets/js/serials.json",

			// The data to send - will be converted to a query string, and passed in the URL
			data : {
				checkSerial : scannedSerial
			},

			// Whether this is a POST or GET request
			type : "GET",

			// The type of data we expect back 
			dataType : "json",

			// Code to run if the request succeeds
			success : function(json) {
				var hasMatch = false;
				for (var serialIndex = 0; serialIndex < json.length; ++serialIndex) {
					var currentSerial = json[serialIndex];
					if(currentSerial.serial == scannedSerial){
						hasMatch = true;
						break;
					};	
				};
				if(hasMatch == true) {
					alert('Serial number is valid');
				} else {
					alert('Serial number does not exist');
				}
			},

			// Code to run if the request fails
			error : function(xhr, status, errorThrown) {
				console.log("There was a problem with the Ajax request");
			},

			// Code to run regardless of success or failure
			complete : function(xhr, status) {
				console.log("The request is complete!");
				}
			});

	})
});
