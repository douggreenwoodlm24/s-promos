// footer
$(function() {


	//products
	$('.footer-m-title').click(function() {
	
		$(this).toggleClass('footer-nav-title--expand');
		$('.footer-nav').toggleClass('footer-nav--show'); 

		return false;

	});

	//apps & other
	$('.footer-nav-title').click(function() {
	
		//collapse any preview menus if this on is being opened

		$(this).toggleClass('footer-nav-title--expand');
		$(this).parent().find('.footer-nav-list').toggleClass('footer-nav-list--show'); 

		return false;

	});

});