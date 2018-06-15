module.exports = function(grunt) {
	grunt.config.merge({	
	watch: {
		//samsung: { //bundle tasks
		//	files: ['assets/samsung/scss/**/*.scss','assets/samsung/js/app/**/*.js'],
		//	tasks: ['buildSamsungStoreCss','buildSamsungStoreJS'],
		//	options: {
		//	  spawn: false,
		//	  livereload: true
		//	}
		//}
		//START Samsung store
		samsung_store_css: {
			files: 'site/assets/samsung/scss/**/*.scss',
			tasks: ['buildSamsungStoreCss'],
			options: {
			  spawn: false,
			  livereload: false
			}
		},
		samsung_store_js: {
			files: 'site/assets/samsung/js/app/**/*.js',
			tasks: ['buildSamsungStoreJS'],
			options: {
			  spawn: false,
			  livereload: false
			}
		},		
	}		
	})
}