/// <vs AfterBuild='buildAll' />
module.exports = function(grunt) {
	//Load tasks
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-browser-sync');
	
	//Build Config
	require('./grunt/default-options.js')(grunt); 
	require('./grunt/sass.js')(grunt); 
	require('./grunt/uglify.js')(grunt); 
	require('./grunt/watch.js')(grunt);
	require('./grunt/browser-sync.js')(grunt);
	
	//Register tasks 
	grunt.registerTask('buildSamsungStoreCss', ['sass:samsung_store']);
	grunt.registerTask('buildSamsungStoreJS', ['uglify:samsung_store']);


	//build all -- add new tasks here so they can run when someone else runs 'git pull'
    grunt.registerTask(
        'buildAll', [
			'buildSamsungStoreCss',
            'buildSamsungStoreJS',
        ]
    );
	
	//default -- just call build all
	grunt.registerTask('default', ['buildAll']);
	grunt.registerTask('bs', ['browserSync','watch:samsung_store_css']);
}