

// product row swiper/carousel 1
var galleryTop = new Swiper('#tvj-swiper-product1 .gallery-top', {
	nextButton : '#tvj-swiper-product1 .swiper-button-next',
	prevButton : '#tvj-swiper-product1 .swiper-button-prev',
	spaceBetween : 10,
});
var galleryThumbs = new Swiper('#tvj-swiper-product1 .gallery-thumbs', {
	spaceBetween : 0,
	centeredSlides : true,
	slidesPerView : 'auto',
	touchRatio : 0.2,
	slideToClickedSlide : true
});
galleryTop.params.control = galleryThumbs;
galleryThumbs.params.control = galleryTop;

