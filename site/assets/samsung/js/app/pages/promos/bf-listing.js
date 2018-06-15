///////////////////////////
// BF 
///////////////////////////

$(function() {	


	if ($('.promotions-bf-deal-filter').length > 0) { 

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

	}

}); 
