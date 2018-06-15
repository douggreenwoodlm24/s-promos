///////////////////////////
// Gear Fit 2 - Scripts
///////////////////////////
$(function() {	
	if ($('.gf2').length > 0) { 
		var theGallery 	= $('.gf2-buysection-gallery');
		var theContent 	= $('.gf2-buysection-content');
		var theThumbs 	= $('.gf2-buysection-gallery-thumbs');
		$('.gf2-swatch').click(function() {
			var sku 			= $(this).data('sku');
			var img 			= $(this).data('img-url');
			var prodUrl 		= $(this).data('prod-url');
			var version 		= $(this).data('version');
			var textbtn 		= $(this).data('textbtn');
			$('.gf2-swatch',theGallery).removeClass('selected');
			$('.gf2-thumb', theThumbs).removeClass('selected');
			$('.gf2-thumb', theThumbs).first().addClass('selected');
			$(this).addClass('selected');
			$('.js-gf2-buysection-img',theGallery).attr('src',img); 
			$('.gf2-buysection-content-info .version',theContent).text(version); 

			if(sku > 0) {
    			$('.gf2-buysection-button',theContent).attr('href','/uk/basket/add/?i=' + sku).text(textbtn); 
			} else {
				$('.gf2-buysection-button',theContent).attr('href','#').text(textbtn);
			}

			//$('.gf2-buysection-button',theContent).text(textbtn); 
			theThumbs.children('img').each(function(){
				var newImg = $(this).data('img-'+version.toLowerCase());
				$(this).attr('src', '//i-sabre.expansys.net/assets/samsung/img/landing/gearfit2/'+newImg); // hardcoded image path to live for now
			})
		});

		$('.gf2-thumb').click(function() {
			var thumbURL 		= $(this).attr('src');
			$('.gf2-thumb',theThumbs).removeClass('selected');
			$('.js-gf2-buysection-img',theGallery).attr('src',thumbURL); 
			$(this).addClass('selected');
		});

		//check for null link on add to basket / coming soon button
		$('.gf2-button').click(function() {
			var basketHref = $(this).attr("href");
      
      		if(basketHref == "#") {
      			return false;
      		}

		});
	} 
}); 
/* Stick Buy Button */
$(window).scroll(function(){
  if($(document).scrollTop() > 800){ 
    $('.gf2_fixedbtn').addClass('show');
  } else { 
	  $('.gf2_fixedbtn').removeClass('show');
  }
});