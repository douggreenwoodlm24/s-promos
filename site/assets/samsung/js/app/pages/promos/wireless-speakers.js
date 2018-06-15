///////////////////////////
// new year's resolutions page
///////////////////////////
$(function() {	
	if ($('.s360speakers').length > 0) { 
		$('.s360speakers-swatch').click(function() {
			var thisItem = $(this).closest('.s360speakers-bundle-item');
			var sku = $(this).data('sku');
			var img = $(this).data('img-url');
			var prodUrl = $(this).data('prod-url');
			var version = $(this).data('version');
			var textbtn = $(this).data('textbtn');
			//set selected class
			$('.s360speakers-swatch',thisItem).removeClass('selected');
			$(this).addClass('selected');
			//update img src and links
			$('.js-s360speakers-bundle-img',thisItem).attr('src',img); //set image
			$('.s360speakers-bundle-button',thisItem).attr('href','/uk/basket/add/?i=' + sku); //set a2b link
			//$('.s360speakers-prod-info').attr('href',prodUrl); //set product page link
			$('.s360speakers-bundle-content-info .version',thisItem).text(version); //set product version text 
			$('.s360speakers-bundle-button',thisItem).text(textbtn); //set product button text 
		});
	} 
}); 