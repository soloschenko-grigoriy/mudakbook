module.exports = function(grunt) {

  'use strict';

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  require('time-grunt')(grunt);

  grunt.initConfig({
    appConfig: {
      app: './public',
      dist: './build',
      server: './server'
    },
    requirejs: {
      compile: {
        options: {
          dir: '<%= appConfig.dist %>/scripts',
          mainConfigFile : '<%= appConfig.app %>/scripts/init.js',
          optimize: 'uglify2',
          preserveLicenseComments: false,
          findNestedDependencies: true,
          useStrict: true,
          removeCombined: true,
          modules: [{
            name: 'init',
            exclude: ['infrastructure']
          },{
            name: 'infrastructure'
          }],
          pragmasOnSave: {
            excludeHbsParser : true,
            excludeHbs: true,
            excludeAfterBuild: true
          }
        }
      }
    },

    useminPrepare: {
      // html: '<%= appConfig.app %>/index.html',
      options: {
        dest: '<%= appConfig.dist %>'
      }
    },

    usemin: {
      html: ['<%= appConfig.dist %>/{,*/}*.html'],
      css: ['<%= appConfig.dist %>/assets/css/{,*/}*.css'],
      options: {
        dirs: ['<%= appConfig.dist %>']
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= appConfig.app %>/assets/img',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= appConfig.dist %>/assets/img'
        }]
      }
    },

    cssmin: {
      dist: {
        files: {
          '<%= appConfig.dist %>/assets/css/mudakbook.css': [
            '<%= appConfig.app %>/scripts/vendor/bootstrap/dist/css/bootstrap.min.css',
            '<%= appConfig.app %>/scripts/vendor/bootstrap-select/dist/css/bootstrap-select.min.css',
            '.tmp/styles/{,*/}*.css',
            '<%= appConfig.app %>/assets/css/{,*/}*.css'
          ]
        }
      }
    },

    htmlmin: {
      dist: {
        options: {},
        files: [{
          expand: true,
          cwd: '<%= appConfig.app %>',
          src: '*.html',
          dest: '<%= appConfig.dist %>'
        }]
      }
    },

    uglify: {
      my_target: {
        files: {
          '<%= appConfig.app %>/scripts/vendor/underscore/underscore.min.js': ['<%= appConfig.app %>/scripts/vendor/underscore/underscore.js'],
          '<%= appConfig.app %>/scripts/vendor/backbone/backbone.min.js': ['<%= appConfig.app %>/scripts/vendor/backbone/backbone.js'],
          '<%= appConfig.app %>/scripts/vendor/backbone-relational/backbone-relational.min.js': ['<%= appConfig.app %>/scripts/vendor/backbone-relational/backbone-relational.js'],
          '<%= appConfig.app %>/scripts/vendor/require-handlebars-plugin/Handlebars.min.js': ['<%= appConfig.app %>/scripts/vendor/require-handlebars-plugin/Handlebars.js'],
          '<%= appConfig.app %>/scripts/vendor/require-handlebars-plugin/hbs/i18nprecompile.min.js': ['<%= appConfig.app %>/scripts/vendor/require-handlebars-plugin/hbs/i18nprecompile.js'],
          '<%= appConfig.app %>/scripts/vendor/require-handlebars-plugin/hbs/json2.min.js': ['<%= appConfig.app %>/scripts/vendor/require-handlebars-plugin/hbs/json2.js'],
          '<%= appConfig.app %>/scripts/vendor/require-handlebars-plugin/hbs.min.js': ['<%= appConfig.app %>/scripts/vendor/require-handlebars-plugin/hbs.js'],
          '<%= appConfig.app %>/scripts/vendor/requirejs-text/text.min.js': ['<%= appConfig.app %>/scripts/vendor/requirejs-text/text.js'],
          '<%= appConfig.app %>/scripts/vendor/requirejs/require.min.js': ['<%= appConfig.app %>/scripts/vendor/requirejs/require.js'],
        }
      }
    },

    copy: {
      after: {
        files: [
        {
          expand: true,
          dot: true,
          cwd: '<%= appConfig.app %>',
          dest: '<%= appConfig.dist %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'assets/img/{,*/}*.{webp,gif,ico}',
            'assets/fonts/{,*/}*.{eot,svg,woff,woff2,ttf}',
            'scripts/vendor/requirejs/require.min.js',
            'scripts/vendor/bootstrap/dist/fonts/{,*/}*.{eot,svg,woff,ttf}',
          ]
        },
        {
          expand: true,
          dot: true,
          cwd: '<%= appConfig.app %>/scripts/vendor/bootstrap/dist',
          dest: '<%= appConfig.dist %>/assets/',
          src: [
            'fonts/{,*/}*.{eot,svg,woff,woff2,ttf}',
          ]
        }
        ]
      },
    },

    remove: {
      main:{
        fileList: [
          '<%= appConfig.dist %>/scripts/build.txt'
        ],
        dirList: [
          '<%= appConfig.dist %>/scripts/collections',
          '<%= appConfig.dist %>/scripts/controllers',
          '<%= appConfig.dist %>/scripts/models',
          '<%= appConfig.dist %>/scripts/plugins',
          '<%= appConfig.dist %>/scripts/vendor',
          '<%= appConfig.dist %>/scripts/tmpl',
          '<%= appConfig.dist %>/scripts/views',
          '<%= appConfig.dist %>/scripts/translations',
        ]
      },
      prepare:{
        fileList: [],
        dirList: []
      },
      beforeBuild:{
        fileList: [],
        dirList: [
          '<%= appConfig.dist %>'
        ]
      },
      afterBuild:{
        fileList: [],
        dirList: [
          '<%= appConfig.dist %>',
        ]
      },
      options: {
        trace: true
      },
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        '<%= appConfig.app %>/scripts/{,*/}*.js',
        '<%= appConfig.server %>/{,*/}*.js',
        '!<%= appConfig.app %>/scripts/vendor/*',
        '!<%= appConfig.app %>/scripts/plugins/*',
        'test/specs/{,*/}*.js'
      ]
    },
    jasmine: {
      pivotal: {
        src: [
          '/public/scripts/app.js',
          '/public/scripts/collections/*.js',
          '/public/scripts/controllers/*.js',
          '/public/scripts/models/*.js',
          '/public/scripts/regions/*.js',
          '/public/scripts/views/*.js'
        ],
        options: {
          outfile: '<%= appConfig.app %>/test/specRunner.html',
          specs: ['<%= appConfig.app %>/test/specs/*.js', '<%= appConfig.app %>/test/specs/*/*.js', '<%= appConfig.app %>/test/specs/*/*/*.js'],
          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            requireConfigFile: '<%= appConfig.app %>/scripts/init.js',
            requireConfig: {
              baseUrl: '../scripts/'
            }
          }
        }
      }
    },
    jasmine_node: {
      options: {
        forceExit: false,
        match: '.',
        matchall: false,
        extensions: 'js',
        specNameMatcher: ''
      },
      all: ['./server/test/spec']
    },
    'bower-install-simple': {
      options: {
        color:       true,
        production:  false,
        directory:   'public/scripts/vendor'
      }
    }
  });

  grunt.registerTask('prepare', [
    'remove:prepare',
    'bower-install-simple',
    'uglify'
  ]);
  grunt.registerTask('test', [
    'jshint',
    'jasmine',
    'jasmine_node'
  ]);
  grunt.registerTask('default', [
    'jshint',
    'jasmine',
    'jasmine_node'
  ]);
  grunt.registerTask('test:server', [
    'jasmine_node'
  ]);
  grunt.registerTask('test:client', [
    'jasmine'
  ]);
  grunt.registerTask('build', [
    'remove:beforeBuild',
    'useminPrepare',
    'requirejs',
    'imagemin',
    'cssmin',
    'usemin',
    'remove:main',
    'copy:after',
  ]);
};

