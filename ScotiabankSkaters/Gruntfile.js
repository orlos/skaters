// Sample project configuration.
module.exports = function(grunt) {

    grunt.initConfig({
        concat: {
            dist: {
                src: [
                    'www/js/src/vendor/**/*.js',
                    'www/js/src/app/**/*.js',
                    'www/js/src/components/**/*.js'
                ],
                dest: 'www/js/app.min.js'
            }
        },
        uglify: {
            my_target : {
                options : {
                    sourceMap : false,
                    sourceMapName : 'sourceMap.map'
                },
                // We'll be using a common JS for all the sites
                files : {
                    'www/js/app.min.js' : [
                        'www/js/app.min.js'
                    ]
                }
            }
        },
        compass: {
            dev: {
                dist: {
                    options: {
                        sassDir: 'www/css/scss',
                        cssDir: 'www/css',
                        outputStyle: 'expanded'
                    }
                }
            },
            prod: {
                dist: {
                    options: {
                        sassDir: 'www/css/scss',
                        cssDir: 'www/css',
                        outputStyle: 'expanded'
                    }
                }
            }
        },
        watch: {
            watch_js_files: {
                files : ['www/js/src/**/*.js'],
                tasks : ['concat', 'majestic_updateversions:js']
            },
            watch_css_files: {
                files : ['www/css/scss/**/*.scss'],
                tasks : ['compass:dev', 'sasslint', 'majestic_updateversions:css']
            }
        },
        majestic_updateversions: { css: {}, js: {} },
        sasslint: {
            options: {
                configFile: '.sass-lint.yml',
                formatter: 'stylish',
            },
            target: [
                'www/css/scss/app/**/*.scss',
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-majestic-updateversions');
    grunt.loadNpmTasks('grunt-sass-lint');

    // SASS lint
    grunt.registerTask('sass', ['sasslint']); // First we compile and concat JS and then we watch

    // Default, to be used on development environments
    grunt.registerTask('default', ['compass:dev', 'concat', 'sasslint', 'watch']); // First we compile and concat JS and then we watch

    // Post Commit, to be executed after commit
    grunt.registerTask('deploy', ['concat', 'uglify', 'compass:prod', 'majestic_updateversions:js', 'majestic_updateversions:css']);

};