module.exports = function(grunt) {
	grunt.config.merge({
		pkg: grunt.file.readJSON('package.json'),	
		githooks: {
			all: {
				'post-merge': 'buildAll',
			}
		}	
	})
}