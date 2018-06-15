// listing filters show/hide

$(function() {
 
	//temp
	//$('.listing__filters-show-hide-bar').addClass('listing__filters-show-hide-bar--active');
	//$('.listing__filters-inner').addClass('listing__filters-inner--show');


	$('.listing__filters-show-hide-bar').click(function() {

		$(this).toggleClass('listing__filters-show-hide-bar--active');
		$(this).parent().find('.listing__filters-inner').toggleClass('listing__filters-inner--show');

	});

	$('.js-listing-select').change(function() {

		if ($(this).hasClass('js-listing-select--link')) {
			var link = $(this).val();

			if (link != -1) {
				window.location.href = link;
			}
		}

		if ($(this).hasClass('js-listing-select--form')) {
			var formid = $(this).data('formid');

			//submit form
			$('#' + formid).submit();
			//if (link != -1) {
			//	window.location.href = link;
			//}
			//alert('form');
		}

	});

}); 