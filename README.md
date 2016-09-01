Put the entire directory in server running PHP to get hte proxy script running

If need be:

1. npm init
2. npm install -g grunt-cli
3. create a Gruntfile.js (sample:

module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "css/main.css": "less/main.less" // destination file and source file
        }
      }
    },
    watch: {
      styles: {
        files: ['less/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.registerTask('default', ['less', 'watch']);
};

)

4. npm install grunt grunt-contrib-less grunt-contrib-watch jit-grunt --save-dev
5. grunt
6. that should be it

