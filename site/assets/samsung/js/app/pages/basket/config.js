///////////////////////////
// Config 
///////////////////////////
$(function() {	

    if ($('.bconfig').length > 0) {

		//reset any old data on load
		$('.bconfig__type-select input').prop('checked', false); //set checkbox/radio value
		
		$('.js-bconfig-next').addClass('bconfig__button--inactive');

		$('.bconfig__stage[data-multi-select="true"] .js-bconfig-next').removeClass('bconfig__button--inactive'); //might be a better way to do this!

		$('#sup-terms').attr('checked', false);

		var configRegion = $('#configRegion').val();
		var baseSite = $('#baseSite').val();


		setFinTermsHeight();
		//set height of terms example 
		if(window.addEventListener) {
		window.addEventListener('resize', debounce(function() {    
			setFinTermsHeight();
		    
		}, 250)); //run once every 250ms
		}



		//////////////////////
		// stage > next click
		//////////////////////
	    $('.js-bconfig-next').click(function() {

	        //get the current panel and stage
	        var currentPanel = $(this).closest('.bconfig__stage');
	        var currentContent = $(this).closest('.bconfig__stage-content');
	        var currentStage = currentPanel.data('stage');

	        // next panel stage
	        var nextStage = currentStage + 1;
	        var nextPanel = $('.bconfig__stage[data-stage="' + nextStage + '"]');
	        var nextContent = $('.bconfig__stage[data-stage="' + nextStage + '"] .bconfig__stage-content');



	        //check if "next button" has a submit class -- if yes then submit form now!!1
	        if ($(this).hasClass('js-bconfig-submit')) {

	        	$('#bconfig__form').submit(); //submit form now
	        	$('input[type="submit"]').prop('disabled', true); //disable submit button
	        	$('.bconfig__stage--current .js-bconfig-next').text('Loading ...'); //set message on button

	        	return false; //stop processing
	        }



	        //update status on current panel (mark as done)
	        currentPanel.addClass('bconfig__stage--complete').removeClass('bconfig__stage--current');

	        nextPanel.addClass('bconfig__stage--current').removeClass('bconfig__stage--todo');

	        if (nextStage == 2) { //enable stage 2 SIM Free button

 				$('.bconfig__stage[data-stage="' + nextStage + '"] .js-bconfig-next').removeClass('bconfig__button--inactive');
	        }

	        if (nextStage == 4) { //write payment totals (base price + accessories)

	            var pm = $("input:radio[name ='payment']:checked").val();

	            var itemTotalPrice = parseFloat($('#dp').val());

	            //hardcoded image URLs to live server
	            switch (pm) {
	            case 'pp':
	                $('#selected-pm-text').html('PayPal');
	                $('#selected-pm-logo').html('<img src="//i-sabre.expansys.net/assets/samsung/img/basket/configure/pp-logo.png">');
	                break;
	            case 'ppc':
	                $('#selected-pm-text').html('PayPal Credit');
	                $('#selected-pm-logo').html('<img src="//i-sabre.expansys.net/assets/samsung/img/basket/configure/ppc-logo.png">');
	                break;
	            case 'cc':
	                $('#selected-pm-text').html('Credit Card');
	                $('#selected-pm-logo').html('<img src="//i-sabre.expansys.net/assets/samsung/img/basket/configure/cc-logo.png">');
	                break;

	            }

	            //get selected accessories
	            var accs = [];

	            $("input[name='acc']:checked").each(function() {
	                accs.push($(this).val());
	            });


	            if (accs.length > 0) {
	    			$('.bconfig__confirm-recap-note').hide();
	    		}

	            $.each(accs, function (index, value) {
	                var item = $('li[data-sku="' + value + '"]');

	                var itemPrice = (item.data('price'));
	                var itemTitle = (item.data('value'));
	                var itemVersion = (item.data('version'));

	                itemTotalPrice += itemPrice;

	                $('#selected-accessories').append('<ul class="bconfig__confirm-product reset-list"> <li class="bconfig__confirm-product-img"><img src="//i.expansys.net/img/l/' + value + '/.jpg" /></li> <li class="bconfig__confirm-product-title">' + itemTitle + '<span class="version">' +  itemVersion + '</span></li> <li class="bconfig__confirm-product-price">&pound;' + itemPrice.toFixed(2) + '</li></ul>');
	            });

	            //set total
	            $('.js-confirm-total').html('&pound;' + itemTotalPrice.toFixed(2));

				$.ajax({
					url: '/' + configRegion + '/basket/add-configure/add-items/',
					data: { items: accs },
					type: 'POST'
				}).done(function (data) {
					if (data) {
						console.log('added');
					}
				});
				
				var contractId = $('#contractId').val();
				
				if (contractId != '-1')
				{
					$.ajax({
					url: '/uk/basket/add-configure/add-items/',
					data: { items: contractId },
					type: 'POST'
					}).done(function (data) {
						if (data) {
							console.log('added');
						}
					});
				}
				

			}

			autoScroll2('.bconfig__progress',500,100);

			//update progress bar
			$('.bconfig__progress-item[data-stage="' + currentStage + '"]').removeClass('bconfig__progress-item--current').addClass('bconfig__progress-item--complete');
			$('.bconfig__progress .count[data-stage="' + nextStage + '"]').addClass('count--selected');

			//slight delay for next stage
			setTimeout(function(){ 
				$('.bconfig__progress-item[data-stage="' + nextStage + '"]').addClass('bconfig__progress-item--current');
			}, 250);

		});



		//////////////////////
		// stage select tariff (bit hacky for now)
		//////////////////////

		$('.js-bconfig__tariff-select').click(function() {

			var contractId = $(this).data("contract-id"); //get the id of this tariff

			//write tariff/contract id to hidden field 
			$('#contractId').val(contractId);


			//check for SIM free 
			if (contractId == -1) {

				$('#confirm-sim-contract-list,.js-bconfig__confirm-contract-total').hide();
				$('#confirm-sim-free-list,.js-bconfig__confirm-total').show();

			} else { // this is a contract


				var contractLogo = $(this).closest('.tr').find('.bconfig__sim-logo img').attr('src'); //get the network logo for this tariff
				var contractTerm = $(this).data("contract-term");
				var contractMins = $(this).data("contract-mins");
				var contractTexts = $(this).data("contract-texts");
				var contractData = $(this).data("contract-data");
				var contractPerMonth = $(this).data("contract-pm");

				$('#confirm-sim-free-list,.js-bconfig__confirm-total').hide();
				$('#confirm-sim-contract-list,.js-bconfig__confirm-contract-total').show();
				

				//write tariff details to confirm stage
				$('#confirm-sim-contract-id').text(contractId);
				$('#confirm-sim-contract-logo').html('<img src="' + contractLogo + '">');
				$('#confirm-sim-contract-term').text(contractTerm);
				$('#confirm-sim-contract-mins').html("<strong>" + contractMins + "</strong> minutes");
				$('#confirm-sim-contract-texts').html("<strong>" + contractTexts + "</strong> texts");
				$('#confirm-sim-contract-data').html("<strong>" + contractData + "</strong> data");
				$('#confirm-monthly-total').text(contractPerMonth); //write monthly total

			} 


	        //update status on current panel (mark as done) -- some duplication here
	        $('.bconfig__stage[data-stage="2"]').addClass('bconfig__stage--complete').removeClass('bconfig__stage--current');
	        $('.bconfig__stage[data-stage="3"]').addClass('bconfig__stage--current').removeClass('bconfig__stage--todo');

	        //HACK
	        //update progress bar
			$('.bconfig__progress-item[data-stage="2"]').removeClass('bconfig__progress-item--current').addClass('bconfig__progress-item--complete');
			$('.bconfig__progress .count[data-stage="3"]').addClass('count--selected');

			//slight delay for next stage
			setTimeout(function(){ 
				$('.bconfig__progress-item[data-stage="3"]').addClass('bconfig__progress-item--current');
			}, 250);

		}); 


 
		//////////////////////
		// stage > reset
		//////////////////////
		$('.js-bconfig-reset').click(function() {


			 if (confirm("Are you sure you want to start again?")) {
			    
				//reset panels and selected inputs
				$('.bconfig__list-item').removeClass('selected');
				$('.bconfig__type-select input').prop('checked', false); //set checkbox/radio values
				
				//reset panels
				$('.bconfig__stage').addClass('bconfig__stage--todo').removeClass('bconfig__stage--current').removeClass('bconfig__stage--complete'); 
				
				//reset accessory list
				$('#selected-accessories ul').remove();
				
				//set stage 1 as active
				$('.bconfig__stage[data-stage="1"]').addClass('bconfig__stage--current').removeClass('bconfig__stage--todo');
				
				//reset stage 1 progress button
				$('.bconfig__stage[data-stage="1"] .js-bconfig-next').addClass('bconfig__button--inactive');


				var baseSku = $('#baseSku').val();
				
				//clear basket
				$.get('/'+configRegion+'/basket/add-configure/?i=' + baseSku);


				//reset accessory note
				$('.bconfig__confirm-recap-note').show();

				//reset terms checkbox
				$('#sup-terms').attr('checked', false); 

				//reset progress bar
				$('.bconfig__progress-item').removeClass('bconfig__progress-item--complete');
				$('.bconfig__progress-item[data-stage="1"]').addClass('bconfig__progress-item--current');
				$('.bconfig__progress .count').removeClass('count--selected');
				$('.bconfig__progress .count[data-stage="1"]').addClass('count--selected');


				//autoScroll2('.bconfig__stage--current',500,60);

			}

		}); 



		//////////////////////
		// final submit
		//////////////////////
		$('.js-bconfig-submit').click(function() {



			//submit form to basket page
			$('#bconfig__form').submit(function(event) {

				var contractId = $('#contractId').val();
				
			    //validate data
			    var pm = $("input:radio[name ='payment']:checked").val();
	
				
				var baseSite = $('#baseSite').val();
				
			    switch (pm) {
                    case 'cc':
                        $('#bconfig__form').attr('action', 'https://' + baseSite + '/' + configRegion + '/checkout/');
                        break;
			        case 'pp':
			            if (contractId != "-1")
			            {
			                $('#bconfig__form').attr("action", "https://" + baseSite + '/' + configRegion + "/checkout/?pm=PP");
			            }
			            else {
			                $('#bconfig__form').attr('action', 'https://' + baseSite + '/' + configRegion + '/checkout/paypal-handler?pm=PP');
			            }
			            break;
			        case 'ppc':
						if (contractId != "-1")
						{
						    $('#bconfig__form').attr("action", "https://" + baseSite + '/' + configRegion + "/checkout/?pm=PPC");
						}
						else
						{
						    $('#bconfig__form').attr('action', 'https://' + baseSite + '/' + configRegion + '/checkout/paypal-handler?pm=PPC');
						}
			            break;
                }

                return; //submit form 

				//event.preventDefault(); //block submit

			});
			 
		});



  		///////////////////////////////////
		// Products
		/////////////////////////////////

		$('.bconfig__type-more-info a').click(function() {


			//alert('Load product page/data in lightbox/pop-up');

			return false;

		});


		$('.bconfig__list-item').not('.bconfig__list-item--locked').click(function() {

			//can we select multiple values
			var thisStage = $(this).closest('.bconfig__stage'); //store the panel we're working on
			var allowMulti = thisStage.data('multi-select'); //get select multiple items setting from data attr
			var type = $(this).data('type');
			var value = $(this).data('value');
			var stage = thisStage.data('stage');
			var stageTotal = 0;
			var stageNote = ""; 


			//check for P4L payment method
			if (type == "payment" && value == "p4l") { //Pay 4 later

				//update button label
				$('.bconfig__stage--current .js-bconfig-next').text('Join the Samsung Upgrade Programme >').addClass('js-bconfig-submit').addClass('bconfig__button--inactive').attr('data-ga-event-type','Go to P4L');;

				//show terms checkbox and link
				$('.js-sup-confirm').addClass('bconfig__stage-sup-confirm--show');

			} else if (type == "payment" && value != "p4l") { // Payment but not Pay 4 later

				//update button label
				$('.bconfig__stage--current .js-bconfig-next').text('Next >').attr('data-ga-event-type','Next Stage'); //reset button label
				$('.bconfig__stage--current .js-bconfig-next').removeClass('js-bconfig-submit');

				//hide terms checkbox and link
				$('.js-sup-confirm').removeClass('bconfig__stage-sup-confirm--show');
				//reset terms checkbox
				$('#sup-terms').attr('checked', false); 

			}
 


			if (allowMulti) {
			//get current checkbox/selected value

				if ($(this).hasClass('selected')) {

					$(this).removeClass('selected');
					$('.bconfig__type-select input',this).prop('checked', false);

				} else {

					$(this).addClass('selected'); //set item as selected
					$('.bconfig__type-select input',this).prop('checked', true); //set checkbox value

				}

				//get selected collection
				findSelected = $('.bconfig__stage[data-stage="' + stage + '"] .bconfig__list-item.selected');

				//loop through selected and calc price
				findSelected.each(function(index) { //iterate through each item
					
	
					stageTotal += parseFloat($(this).data('price'));

				})


			} else {

				if (!$(this).hasClass('selected')) {

					//reset others
					$('.bconfig__stage--current .bconfig__list-item').removeClass('selected');
					//$('.bconfig__type-select input',this).prop('checked', false);


					// set this
					$(this).addClass('selected'); //set item as selected
					$('.bconfig__type-select input',this).prop('checked', true);

					//enable next button

					$(this).closest('.bconfig__stage').find('.js-bconfig-next').not('.js-bconfig-submit').removeClass('bconfig__button--inactive');


					//get selected
					//findSelected = $('.bconfig__stage[data-stage="' + stage + '"] .bconfig__list-item.selected');
					stageNote  = $('.bconfig__stage[data-stage="' + stage + '"] .bconfig__list-item.selected .bconfig__type-label').text();
					stageTotal  = parseFloat($('.bconfig__stage[data-stage="' + stage + '"] .bconfig__list-item.selected').data('price'));

				}

			}	

		});


 
		//SUP checkbox logic
		$('#sup-terms').click(function() {
			if ($(this).is(":checked")) {
				$('.bconfig__stage--current .js-bconfig-submit').removeClass('bconfig__button--inactive');
			} else {
				$('.bconfig__stage--current .js-bconfig-submit').addClass('bconfig__button--inactive');
			}

		});


		function setFinTermsHeight() {

			$('.bconfig__type-finance-example').css('min-height',0);
			var ppcTermsHeight = $('.bconfig__type-finance-example--ppc').outerHeight();
			var supTermsHeight = $('.bconfig__type-finance-example--sup').outerHeight();
			var maxHeight;

			if (ppcTermsHeight > supTermsHeight) {
				maxHeight = ppcTermsHeight;
			} else {
				maxHeight = supTermsHeight;
			}

			$('.bconfig__type-finance-example').css('min-height',maxHeight);
		}
	}
 

	//contract tabs
	$('.bconfig__sim-tabs-item').click(function() {

		var network = $(this).data('network');

		$(this).addClass('bconfig__sim-tabs-item--selected').siblings().removeClass('bconfig__sim-tabs-item--selected');

		$('.bconfig__sim-listing[data-network="' + network + '"]').addClass('bconfig__sim-listing--show').siblings().removeClass('bconfig__sim-listing--show');

	});

	$('#SendO2ContractInfo').click(function () {

	    if ($(this).is(":checked")) {

	        $.ajax({
	            url: '/uk/checkout/add-contact-request/',
	            type: 'POST'
	        }).done(function(data) {
	            if (data) {
	                console.log('added');
	            }
	        });
	    }

	});

});
 


