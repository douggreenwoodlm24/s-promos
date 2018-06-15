// mini basket
$(function() {
	// $('.js-mini-basket-contents').show(); //temp show basket on page load

    $('.js-mini-basket').click(function (e) {

        if (window.location.href.indexOf("/basket/") > -1) {
            e.preventDefault();
            return;
        }

		$(this).toggleClass('active');

		$('.js-mini-basket-contents').toggle();

		return false;
	})


	$('.js-mini-basket-contents .cart-close').click(function() {

		$('.js-mini-basket-contents').hide();
		$('.js-mini-basket').removeClass('active');
	});

});