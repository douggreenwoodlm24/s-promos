
$(function() {	

	var hash = location.hash;

	//bundle tabs
	var productBundlePanels = $('.product__bundle-panel');
	var productBundleTabs = $('.product__bundle-tabs-item');

	//default active (overview)
	productBundlePanels.addClass('hidden'); //hide all by default
	
	if (hash == "#talkband-b2") {
		$('.product__bundle-panel[data-panel="b-talkbandb2"]').removeClass('hidden');
		$('.product__bundle-tabs-item[data-tab="b-talkbandb2"]').addClass('active');
	} else {
		$('.product__bundle-panel[data-panel="b-honor6"]').removeClass('hidden');
		$('.product__bundle-tabs-item[data-tab="b-honor6"]').addClass('active');
	}
	
	
	//tab/panel switcher
	$('.product__bundle-tabs-item').click(function() {
		//alert('123123');
		var thisPanel = $(this).data('tab');

		productBundlePanels.addClass('hidden');
		productBundleTabs.removeClass('active');

		$(this).addClass('active');

		$('.product__bundle-panel[data-panel="' + thisPanel + '"]').removeClass('hidden');

	});


	//product tabs
	var productPanels = $('.product__panel');
	var productTabs = $('.product__tabs-item');

	//default active (overview)
	productPanels.addClass('hidden'); //hide all by defailt
	$('.product__panel[data-panel="overview"]').removeClass('hidden');
	$('.product__tabs-item[data-tab="overview"]').addClass('active');

	//tab/panel switcher
	$('.product__tabs-item').click(function() {

		var thisPanel = $(this).data('tab');

		productPanels.addClass('hidden');
		productTabs.removeClass('active');

		$(this).addClass('active');

		$('.product__panel[data-panel="' + thisPanel + '"]').removeClass('hidden');

	});

	//reviews shortcut
	$('.product__review-avg a').on( "click", function() {
  		$('.product__tabs-item[data-tab="reviews"]').trigger( "click" ); //trigger click on reviews tab
	});
	
	
});