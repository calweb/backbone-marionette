'use strict';

var vendor = require("./public/js/vendor.json");

module.exports = function (grunt) {

  var config = {
    dust: {
      amd: {
        files: {
          'public/js/lib/compiled-amd.js': './views/**/*.html'
        },
        options: {
          wrapperOptions: {
            deps: {
              'dust': 'dustjs-linkedin'
            }
          },
          runtime: false,
          useBaseName: true
        }
      }
    },
    watch: {
      options: {
        nospawn: true,
        livereload: 35729
      },
      js: {
        files: ['public/js/*.js'],
        options: {
          livereload: true
        }
      },
      dust: {
        files: ['views/**/*.dust'],
        tasks: ['dust:amd'],
        options: {
          livereload: true
        }
      }
    },
    symlink: {
      vendors: {
        files: [
          {
            expand: true,
            cwd: 'node_modules',
            src: vendor.paths,
            dest: 'public/js/vendor'
          }
        ]
      },
      tests: {
        files: [
          {
            expand: true,
            cwd: 'node_modules',
            src: ['*'],
            dest: 'tests/lib'
          }
        ]
      }
    },

    mocha_phantomjs: {
      all: ['tests/**/*.html']
    },

    // Mocha
    mocha: {
      test: {

        src: ['tests/index.html'],

        options: {
          port: 9001,
          log: true,
          reporter: 'Nyan',
          run: true
        }
      }

    }
  };

  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

  grunt.registerTask('server', 'Start a custom web server', function() {
      grunt.log.writeln('Started web server on port 3000');
      require('./server.js');
  });

  grunt.registerTask('test', function(target) {


      grunt.task.run([
        'mocha_require_phantom'
        // 'connect:test',
        // 'mocha:test',
        // 'mocha_phantomjs'
        ]);
      });

  grunt.initConfig(config);
  grunt.registerTask('default', ['server', 'watch']);
  grunt.registerTask('dist', ['symlink', 'dust']);

};
