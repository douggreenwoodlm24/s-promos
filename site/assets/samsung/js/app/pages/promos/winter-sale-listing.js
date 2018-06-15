///////////////////////////
// Winter Sale 2015/16
///////////////////////////

$(function() {	

	if ($('.promotion__products--wsale').length > 0) { 
	if(window.location.hash) {
	     var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
	     if (hash == "home-appliances") {
	     	autoScroll2('.wsale__cat-promo--home-appliances',1250,60);
	     }
	  } 
	}

/*	if ($('.promotions-bf-deal-filter').length > 0) { 




		$('.promotions-bf-deal-filter__item').click(function() {

			var category_code = $(this).data('category-code');

			$('.promotions-bf-deal-filter__item').removeClass('selected');
			$(this).addClass('selected');


			if (category_code == "ALL") {
				$('.promotion__products-item').removeClass('hidden');
			} else if (category_code == "P-SMARTPH") {
				$('.promotion__products-item').addClass('hidden');
				$('.promotion__products-item[data-category-code="P-SMARTPH"]').removeClass('hidden');
				$('.promotion__products-item[data-category-code="A-WEARGAD"]').removeClass('hidden');
			} else if (category_code == "H-WHITEGD") {
				$('.promotion__products-item').addClass('hidden');
				$('.promotion__products-item[data-category-code="H-WHITEGD"]').removeClass('hidden');
				$('.promotion__products-item[data-category-code="H-CONHOME"]').removeClass('hidden');	
			} else if (category_code == "A-ACCESSOR") {
				$('.promotion__products-item').addClass('hidden');
				$('.promotion__products-item[data-category-code="A-ACCESSOR"]').removeClass('hidden');
				$('.promotion__products-item[data-category-code="A-ACCCABLE"]').removeClass('hidden');		
			} else {
				$('.promotion__products-item').addClass('hidden');
				$('.promotion__products-item[data-category-code="' + category_code + '"] ').removeClass('hidden');
			}

			autoScroll2('.promotions-bf-deal-filter',500,60);
			
		});

	}*/

}); 
