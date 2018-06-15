///////////////////////////
// bbd 
///////////////////////////

/*
$(function() {	


	if ($('.promotions-bbd-deal-filter').length > 0) { 

		//check if we've got a hash, and load correct content
		showContent(location.hash);

		window.onhashchange = locationHashChanged;


		function locationHashChanged() {
		    var hash = location.hash;
			//console.log(hash);

			showContent(hash);
		}


		function showContent(hash) {

			$('.promotion__products-item').addClass('hidden'); //hide all by default
			$('.promotions-bbd-deal-filter__link').removeClass('selected'); //reset tabs
			
			//!! hide TV div
			$('.promotion__products-tv-special').removeClass('promotion__products-tv-special--show');

			switch(hash) {
			    case "#mobiles-and-wearables":
					$('.promotion__products-item[data-category-code="P-SMARTPH"]').removeClass('hidden');
					$('.promotion__products-item[data-category-code="A-WEARGAD"]').removeClass('hidden');
					$('.promotions-bbd-deal-filter__link[data-category-code="P-SMARTPH"]').addClass('selected');
			        break;
			    case "#tablets":
			 		$('.promotion__products-item[data-category-code="T-TABLET"]').removeClass('hidden');
			 		$('.promotions-bbd-deal-filter__link[data-category-code="T-TABLET"]').addClass('selected');
			        break;
		        case "#tv-and-av":
			 		//show special <div>
			 		$('.promotion__products-tv-special').addClass('promotion__products-tv-special--show');
			 		$('.promotions-bbd-deal-filter__link[data-category-code="E-TV"]').addClass('selected');
			        break;
			     case "#pc-and-monitors":
			 		$('.promotion__products-item[data-category-code="C-MONITOR"]').removeClass('hidden');
			 		$('.promotions-bbd-deal-filter__link[data-category-code="C-MONITOR"]').addClass('selected');
			        break;   
 		        case "#home-appliances":
 		        	$('.promotion__products-item[data-category-code="H-WHITEGD"]').removeClass('hidden');
					$('.promotion__products-item[data-category-code="H-CONHOME"]').removeClass('hidden');
					$('.promotions-bbd-deal-filter__link[data-category-code="H-WHITEGD"]').addClass('selected');
 		        	break
			    case "#accessories":
			 		$('.promotion__products-item[data-category-code="A-ACCESSOR"]').removeClass('hidden');
					$('.promotion__products-item[data-category-code="A-ACCCABLE"]').removeClass('hidden');	
					$('.promotions-bbd-deal-filter__link[data-category-code="A-ACCESSOR"]').addClass('selected');
			        break; 
			    default: //show all
			        $('.promotion__products-item').removeClass('hidden');
			        $('.promotions-bbd-deal-filter__link[data-category-code="ALL"]').addClass('selected');
			        break;
			} 

			$('.promotion__products').removeClass('promotion__products--fade');
		} 


		$('.promotions-bbd-deal-filter__item').mousedown(function() {
			$('.promotion__products').addClass('promotion__products--fade');
		});

		$('.promotions-bbd-deal-filter__link').click(function() {
			$('.promotions-bbd-deal-filter__link').removeClass('selected');
		});


	}

}); 
*/