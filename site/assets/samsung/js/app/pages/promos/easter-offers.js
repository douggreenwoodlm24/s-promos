///////////////////////////
// easter 
///////////////////////////
$(function() {	
	if ($('.promotions-easter-deal-filter').length > 0) { 
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
			$('.promotions-easter-deal-filter__link').removeClass('selected'); //reset tabs
			$('.promotion__products-tv-special').removeClass('promotion__products-tv-special--show');
			switch(hash) {
			    case "#mobiles-and-wearables":
					$('.promotion__products-item[data-category-code="P-SMARTPH"]').removeClass('hidden');
					$('.promotion__products-item[data-category-code="A-WEARGAD"]').removeClass('hidden');
					$('.promotions-easter-deal-filter__link[data-category-code="P-SMARTPH"]').addClass('selected');
			        break;
			    case "#tablets":
			 		$('.promotion__products-item[data-category-code="T-TABLET"]').removeClass('hidden');
			 		$('.promotions-easter-deal-filter__link[data-category-code="T-TABLET"]').addClass('selected');
			        break;
		        case "#tv-and-av":
			 		$('.promotion__products-tv-special').addClass('promotion__products-tv-special--show');
			 		$('.promotions-easter-deal-filter__link[data-category-code="E-TV"]').addClass('selected');
			        break;
			     case "#pc-and-monitors":
			 		$('.promotion__products-item[data-category-code="C-MONITOR"]').removeClass('hidden');
			 		$('.promotions-easter-deal-filter__link[data-category-code="C-MONITOR"]').addClass('selected');
			        break;   
 		        case "#home-appliances":
 		        	$('.promotion__products-item[data-category-code="H-WHITEGD"]').removeClass('hidden');
					$('.promotion__products-item[data-category-code="H-CONHOME"]').removeClass('hidden');
					$('.promotions-easter-deal-filter__link[data-category-code="H-WHITEGD"]').addClass('selected');
 		        	break
			    case "#accessories":
			 		$('.promotion__products-item[data-category-code="A-ACCESSOR"]').removeClass('hidden');
					$('.promotion__products-item[data-category-code="A-ACCCABLE"]').removeClass('hidden');	
					$('.promotions-easter-deal-filter__link[data-category-code="A-ACCESSOR"]').addClass('selected');
			        break; 
/**** 
	* Spring Offers Landing Page cases
	*/	
			    case "#washing-machines":
			 		$('.promotion__products-item[data-category-code="H-WHITEGD"]').removeClass('hidden');
					$('.promotions-easter-deal-filter__link[data-category-code="H-WHITEGD"]').addClass('selected');
			        break; 
			    case "#vacuum-cleaners":
			 		$('.promotion__products-item[data-category-code="H-HOMEAP"]').removeClass('hidden');
					$('.promotions-easter-deal-filter__link[data-category-code="H-HOMEAP"]').addClass('selected');
			        break; 
			    case "#smartthings":
			 		$('.promotion__products-item[data-category-code="E-SMARTHOM"]').removeClass('hidden');
					$('.promotions-easter-deal-filter__link[data-category-code="E-SMARTHOM"]').addClass('selected');
			        break; 
			    case "#memory":
			 		$('.promotion__products-item[data-category-code="C-MEMCARD"]').removeClass('hidden');
					$('.promotions-easter-deal-filter__link[data-category-code="C-MEMCARD"]').addClass('selected');
			        break; 
/** END Spring Offers 
*/	
			    default: 
			        $('.promotion__products-item').removeClass('hidden');
			        $('.promotions-easter-deal-filter__link[data-category-code="ALL"]').addClass('selected');
			        break;
			} 
			$('.promotion__products').removeClass('promotion__products--fade');
		} 
		$('.promotions-easter-deal-filter__item').mousedown(function() {
			$('.promotion__products').addClass('promotion__products--fade');
		});
		$('.promotions-easter-deal-filter__link').click(function() {
			$('.promotions-easter-deal-filter__link').removeClass('selected');
		});
	}
}); 