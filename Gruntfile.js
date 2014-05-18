/*
 * angular-data-localForage
 * http://github.com/jmdobry/angular-data-localForage
 *
 * Copyright (c) 2014 Jason Dobry <http://jmdobry.github.io/angular-data-localForage>
 * Licensed under the MIT license. <https://github.com/jmdobry/angular-data-localForage/blob/master/LICENSE>
 */
module.exports = function (grunt) {
	'use strict';

	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	var pkg = grunt.file.readJSON('package.json');

	// Project configuration.
	grunt.initConfig({
		pkg: pkg,
		clean: {
			coverage: ['coverage/'],
			dist: ['dist/']
		},
		jshint: {
			all: ['Gruntfile.js', 'src/**/*.js', 'test/*.js'],
			jshintrc: '.jshintrc'
		},
		watch: {
			files: ['src/**/*.js'],
			tasks: ['build']
		},
		uglify: {
			main: {
				options: {
					banner: '/**\n' +
						'* @author Jason Dobry <jason.dobry@gmail.com>\n' +
						'* @file angular-data-localForage.min.js\n' +
						'* @version <%= pkg.version %> - Homepage <https://github.com/jmdobry/angular-data-localForage/>\n' +
						'* @copyright (c) 2014 Jason Dobry <https://github.com/jmdobry/>\n' +
						'* @license MIT <https://github.com/jmdobry/angular-data-localForage/blob/master/LICENSE>\n' +
						'*\n' +
						'* @overview localForage adapter for angular-data.\n' +
						'*/\n'
				},
				files: {
					'dist/angular-data-localForage.min.js': ['dist/angular-data-localForage.js']
				}
			}
		},
		copy: {
			dist: {
				files: {
					'dist/angular-data-localForage.js': ['src/angular-data-localForage.js']
				}
			}
		},
		karma: {
			options: {
				configFile: './karma.conf.js'
			},
			dev: {
				browsers: ['Chrome'],
				autoWatch: true,
				singleRun: false
			},
			min: {
				browsers: ['Chrome'],
				autoWatch: false,
				singleRun: true,
				options: {
					files: [
						'bower_components/angular/angular.js',
						'bower_components/angular-mocks/angular-mocks.js',
						'bower_components/angular-data/dist/angular-data.js',
						'bower_components/angular-cache/dist/angular-cache.js',
						'dist/angular-data-localForage.min.js',
						'test/integration/**/*.js',
						'karma.start.js'
					]
				}
			},
			ci: {
				browsers: ['Firefox', 'PhantomJS']
			}
		},
		coveralls: {
			options: {
				coverage_dir: 'coverage'
			}
		}
	});

	grunt.registerTask('version', function (filePath) {
		var file = grunt.file.read(filePath);

		file = file.replace(/<%= pkg\.version %>/gi, pkg.version);

		grunt.file.write(filePath, file);
	});

	grunt.registerTask('test', ['clean:coverage', 'karma:dev']);
	grunt.registerTask('build', [
		'clean',
		'jshint',
		'copy',
		'version:dist/angular-data-localForage.js',
		'uglify:main'
	]);
	grunt.registerTask('default', ['build']);

	// Used by TravisCI
	grunt.registerTask('ci', ['build', 'karma:ci', 'coveralls']);
};
