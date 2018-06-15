///////////////////////////
// tabpro
///////////////////////////
 
$(function() {	

	if ($('.tpsbundle').length > 0) { 

		//catch specific external/incoming promo links and auto scroll to product section

		var qs = (document.location+'?').split('?')[1];
		var promoString = "app_mygalaxy";

		if (qs) {
			if (qs.indexOf(promoString) > -1) {
				autoScroll2('#buy',500,60);
			}
		}
		

		$('.tpsbundle-swatch').click(function() {

			var thisItem = $(this).closest('.tpsbundle-bundle-item');

			var sku = $(this).data('sku');
			var img = $(this).data('img-url');
			var prodUrl = $(this).data('prod-url');
			var version = $(this).data('version');

			//set selected class
			$('.tpsbundle-swatch').removeClass('selected');
			$(this).addClass('selected');

			//update img src and links
			$('.js-tpsbundle-bundle-img').attr('src',img); //set image
			$('.js-tpsbundle-a2b').attr('href','/uk/basket/add/?i=' + sku); //set a2b link
			$('.js-tpsbundle-prod-info').attr('href',prodUrl); //set product page link
			$('.tpsbundle-bundle-content-info .version',thisItem).text(version); //set product version text 
		});
	} 

}); 