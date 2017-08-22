module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
	pkg: grunt.file.readJSON("package.json"),  	
	sass: {
  		options: {
  			sourceMap: true
  		},
  		dist: {
  			files: {
  				'css/style.css':'sass/style.sass'
  			}
  		}
  	},
	watch: {
    		scripts: {
        		files: ['sass/style.sass'],
        			tasks: ['sass'],
        			}
	}
  });

  // Load the plugins tasks
  
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  
  // Default task(s)

  grunt.registerTask('default', ['sass', 'watch']);
 };