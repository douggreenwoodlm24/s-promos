///////////////////////////
// Samsung Galaxy S7 Pink 
///////////////////////////
$(function() {	
/**
 *	HERO Banner 
 */
	if ($('.galaxys7__header').length > 0) { 
		window.onload = function(){
			$('.galaxys7__header-panel').addClass('showup');
			setTimeout( function() { 
				$('.galaxys7__header-hero-1').addClass('comein');
			}, 500);
			setTimeout( function() { 
				$('.galaxys7__header-hero-2').addClass('comein');
			}, 1000);
		};	
	}
/**
 *	Memory Section
 */
	if ($('.galaxys7').length > 0) { 
		var theGallery 	= $('.galaxys7__memory-gallery');
		var theContent 	= $('.galaxys7__memory-content');
		$('.galaxys7-swatch').click(function() {
			var sku 			= $(this).data('sku');
			var img 			= $(this).data('img-url');
			var prodUrl 		= $(this).data('prod-url');
			var version 		= $(this).data('version');
			var textbtn 		= $(this).data('textbtn');
			$('.galaxys7-swatch',theContent).removeClass('selected');
			$(this).addClass('selected');
			$('.js-galaxys7__memory-img',theGallery).attr('src',img); 
			$('.galaxys7__memory-content-info .version',theContent).text(version); 
			if(sku > 0) {
    			$('.galaxys7__memory-button',theContent).attr('href','/uk/basket/add/?i=' + sku).text(textbtn); 
			} else {
				$('.galaxys7__memory-button',theContent).attr('href','#').text(textbtn);
			}
		});
		//check for null link on add to basket / coming soon button
		$('.galaxys7__memory-button').click(function() {
			var basketHref = $(this).attr("href");
      		if(basketHref == "#") { return false; }
		});
	} 
}); 