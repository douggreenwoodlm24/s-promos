///////////////////////////
// Samsung Basket Empty JS
///////////////////////////

$(function() {	
	
	////// INITIALISE SWIPER ON MOBILE DEVICES //////
	
	var swiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		paginationType: 'bullets',
		paginationClickable: true,
		slidesPerView: 5,
		spaceBetween: 10,
		breakpoints: {
			768: {  slidesPerView: 1, spaceBetween: 20 }
		}
	});
}); 
