module.exports = function(grunt) { //need add some description
    var config = {
        jshint: {
            options: {
                ignores: ['node_modules/**', 'public/vendor/**', '**/*.min.js'],
                jshintrc: '.jshintrc'
            },
            gruntfile: 'Gruntfile.js',
            server: ['routes/**/*.js', 'app.js', 'config.js'],
            client: 'public/js/**/*.js'
        },
        concat: {
            css: {
                // add your css files over here to concatenate all css files
                // let's save our site users some bandwith

                src: ['public/vendor/bootstrap/dist/css/bootstrap.min.css', 'public/css/styles.min.css'],
                dest: 'public/css/app.styles.min.css'
            }
        },
        uglify: {
            options: {
                mangle: {
                    except: ['jQuery']
                }
            },
            js: {
                files: {
                // add your js files over here to minify them into one javascript source file
                    'public/js/app.min.js': ['public/vendor/jquery/dist/jquery.min.js', 'public/vendor/bootstrap/dist/js/bootstrap.min.js', 'public/js/main.js']
                }
            }
        },
        sass: {
            src: {
                files: [{
                    expand: true,
                    cwd: 'public/sass',
                    src: '**/*.scss',
                    dest: 'public/css',
                    ext: '.css'
                }]
            }
        },
        cssmin: {
            src: {
                files: [{
                    expand: true,
                    cwd: 'public/css',
                    src: '**/*.css',
                    dest: 'public/css',
                    ext: '.min.css'
                }]
            }
        },
        'node-inspector': {
            options: {
                'save-live-edit': true
            }
        },
        watch: {
            all: {
                files: ['public/**/*', 'views/**', '!**/node_modules/**', '!public/vendor/**/*', '!**/*.min.*'],
                options: {
                    livereload: 35729
                }
            },
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: 'jshint:gruntfile'
            },
            scripts: {
                files: 'public/js/**/*.js',
                tasks: ['jshint:client', 'uglify']
            },
            server: {
                files: '<%= jshint.server %>',
                tasks: 'jshint:server'
            },
            scss: {
                files: ['public/sass/**/*.scss'],
                tasks: ['sass', 'cssmin', 'concat:css']
            }
        },
        concurrent: {
            tasks: ['node-inspector', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    };

    grunt.initConfig(config);

    // Load the tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.registerTask('default', ['sass', 'cssmin', 'concat:css', 'concurrent']);
    grunt.registerTask('dev', ['concurrent']);
};
