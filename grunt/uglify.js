module.exports = function(grunt) {
	grunt.config.merge({
		uglify: {  
			samsung_store: {
				files: {
					'site/assets/samsung/js/scripts.min.js': [
					'site/assets/samsung/js/vendor/modernizr.js',
					'site/assets/samsung/js/app/plugins/*.js',
					'site/assets/samsung/js/app/core/*.js',
					'site/assets/samsung/js/app/modules/*.js',
					'site/assets/samsung/js/app/pages/**/*.js'
					]
				}
			}
		}
	})
}