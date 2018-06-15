module.exports = function(grunt) {
	grunt.config.merge({
		sass: {
			//Samsung Store
			samsung_store: {
				options: {
					outputStyle: 'compressed'
				},
				files: { 
					'site/assets/samsung/css/style.min.css' : 'site/assets/samsung/scss/style.scss',
					//'site/assets/samsung/css/swiper2.min.css' : 'site/assets/samsung/scss/swiper2.scss',
					'site/assets/samsung/css/swiper3.min.css' : 'site/assets/samsung/scss/swiper3.scss',
					//'site/assets/samsung/css/holding.min.css' : 'site/assets/samsung/scss/holding.scss',
					'site/assets/samsung/css/promos.min.css' : 'site/assets/samsung/scss/promos.scss',
					'site/assets/samsung/css/landing.min.css' : 'site/assets/samsung/scss/landing.scss',
					'site/assets/samsung/css/bespoke.min.css' : 'site/assets/samsung/scss/bespoke.scss',
					'site/assets/samsung/css/swiper-chef.min.css' : 'site/assets/samsung/scss/swiper-chef.scss',
					'site/assets/samsung/css/gear-icon-x.min.css' : 'site/assets/samsung/scss/tp/gear-icon-x.scss',
				}
			}	
		},
	})
}