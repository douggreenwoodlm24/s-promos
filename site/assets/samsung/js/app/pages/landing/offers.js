// Offers page - swap class of "Shop all deals" box, depending on whether there are 5 or 6 offers (i.e. make "Shop all deals" 33% or 100% width
$(function(){
	var offersLength = $('.offers-area .offers-area-item').length;
	console.log(offersLength);
	if (offersLength == 6){ // NB: number of offers (5) + 1 for button
		$('.offers-link-shop').addClass('width-33').addClass('medium-4');
	} else {
		$('.offers-link-shop').addClass('width-100').addClass('medium-12');
	};
});