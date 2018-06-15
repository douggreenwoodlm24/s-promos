///////////////////////////
// samsung upgrade 
///////////////////////////
$(function() {	
	if ($('.sup').length > 0) { 
		var disableSupClick = false;
		//check stock on load
		var S7EdgeDefaultStock = $('.sup__product-item-colours-box.selected--s7edge').data('has-stock');
		var S7DefaultStock = $('.sup__product-item-colours-box.selected--s7').data('has-stock');
		if (!S7EdgeDefaultStock) {
			$('.js-sup-preorder--s7edge').html('Sold Out').addClass('soldout');
		}
		if (!S7DefaultStock) {
			$('.js-sup-preorder--s7').html('Sold Out').addClass('soldout');
		}
		$('.sup__product-item-colours-box').click(function() {
			var sku = $(this).data('sku');
			var href = $(this).data('href');
			var shipText = $(this).data('ship-text');
			var stock = $(this).data('has-stock');
			var preorder = $(this).data('is-preorder');
			var price = $(this).data('price');
			var monthlyPrice = $(this).data('monthly-price');
			$(this).siblings().removeClass('selected');	
			$(this).addClass('selected');
			var newImg = "//i.expansys.net/img/p/" + sku + "/samsung-galaxy-s7.jpg";
			var thisButton = $(this).closest('.sup__product-item').find('.js-sup-preorder');
			var thisImage =  $(this).closest('.sup__product-item').find('.js-sup-img');
			var thisShipText =  $(this).closest('.sup__product-item').find('.js-ship-text');
			thisButton.attr('href',href); 
			if (!stock) {
				thisButton.html('Sold Out');
				disableSupClick = true;
				thisButton.addClass('soldout');
			} else {
				if (preorder) {
					thisButton.html('Pre-order Now');	
				} else {
					thisButton.html('Order Now');
				}
				disableSupClick = false;
				thisButton.removeClass('soldout');
				thisShipText.text(shipText);

				if (price){
					$(this).closest('.sup__product-item').find('.js-price').text(price);
					$(this).closest('.sup__product-item').find('.js-monthly-price').text(monthlyPrice);
				}

				if (sku == 290938 || sku == 290937) {
					$(this).closest('.sup__product-item').find('.js-s7-pink-promo').text("Complimentary luxury bag with purchase*");		
				} else {
					$(this).closest('.sup__product-item').find('.js-s7-pink-promo').text("");
				}
			}
			thisImage.attr('src',newImg);
		}); 
		$('.js-sup-preorder').click(function(e) {
			if (disableSupClick) {
				e.preventDefault();
			}
		});
	}
}); 