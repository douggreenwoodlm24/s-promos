// section 1 swiper/carousel
var swiper = new Swiper('#fit-swiper-section1 .swiper-container', {
					pagination : '#fit-swiper-section1 .swiper-pagination',
					paginationClickable : true,
					nextButton : '#fit-swiper-section1 .swiper-button-next',
					prevButton : '#fit-swiper-section1 .swiper-button-prev',
					slidesPerView : 1,
					spaceBetween : 30,
					breakpoints : {
						1023 : {
							slidesPerView : 1,
							spaceBetween : 20
						},
						639 : {
							slidesPerView : 1,
							spaceBetween : 10
						}
					}
				});

// section 2 swiper/carousel
var swiper = new Swiper('#fit-swiper-section2 .swiper-container', {
	pagination : '#fit-swiper-section2 .swiper-pagination',
	paginationClickable : true,
	nextButton : '#fit-swiper-section2 .swiper-button-next',
	prevButton : '#fit-swiper-section2 .swiper-button-prev',
	slidesPerView : 1,
	spaceBetween : 30,
	breakpoints : {
		1023 : {
			slidesPerView : 1,
			spaceBetween : 20
		},
		639 : {
			slidesPerView : 1,
			spaceBetween : 10
		}
	}
});

// product row swiper/carousel 1
var galleryTop = new Swiper('#fit-swiper-product1 .gallery-top', {
	nextButton : '#fit-swiper-product1 .swiper-button-next',
	prevButton : '#fit-swiper-product1 .swiper-button-prev',
	spaceBetween : 10,
});
var galleryThumbs = new Swiper('#fit-swiper-product1 .gallery-thumbs', {
	spaceBetween : 0,
	centeredSlides : true,
	slidesPerView : 'auto',
	touchRatio : 0.2,
	slideToClickedSlide : true
});
galleryTop.params.control = galleryThumbs;
galleryThumbs.params.control = galleryTop;


//product row swiper/carousel 2
var galleryTop2 = new Swiper('#fit-swiper-product2 .gallery-top', {
	nextButton : '#fit-swiper-product2 .swiper-button-next',
	prevButton : '#fit-swiper-product2 .swiper-button-prev',
	spaceBetween : 10,
});
var galleryThumbs2 = new Swiper('#fit-swiper-product2 .gallery-thumbs', {
	spaceBetween : 0,
	centeredSlides : true,
	slidesPerView : 'auto',
	touchRatio : 0.2,
	slideToClickedSlide : true
});
galleryTop2.params.control = galleryThumbs2;
galleryThumbs2.params.control = galleryTop2;
