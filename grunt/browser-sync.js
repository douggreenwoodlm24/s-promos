module.exports = function(grunt) {
	grunt.config.merge({
		browserSync: {
			bsFiles: {
				src : ['site/assets/samsung/css/style.min.css','site/assets/samsung/css/landing.min.css','site/assets/samsung/css/promos.min.css', 'site/assets/samsung/js/scripts.min.js', 'site/*.html']
			},		
			options: {
				server: {
					baseDir: "site",
					index: "index.html",
					 directory: true
				},
				online: true,
				watchTask: true,
				notify: false,
				reloadDelay: 250
			}
		}
	})
}