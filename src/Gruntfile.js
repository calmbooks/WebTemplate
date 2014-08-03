
module.exports = function(grunt) {

	var proc = require("child_process");

    var pkg = grunt.file.readJSON("package.json");

    var scripts_sp = grunt.file.readJSON("scripts_sp.json");
    var scripts_pc = grunt.file.readJSON("scripts_pc.json");
    var scripts_lib = grunt.file.readJSON("scripts_lib.json");

	var configs = {

		watch : {

			sass : {
				files : ["sass/**/*.scss"],
				tasks : "compass"
            },

			sp : {
				files : scripts_sp,
				tasks : ["sp"]
            },

			pc : {
				files : scripts_pc,
				tasks : ["pc"]
            }
        },

		compass : {

			dev : {

				options : { 
					config : "config.rb",
					environment : "development"
				}
			}
        },

		license_collection : {

			lib : { 
				src  : scripts_lib,
				dest : "tmp/js/licence.js"
            }
        },

		concat : {

			sp : {
				src  : scripts_sp,
				dest : "tmp/js/concat/sp.js"
            },

			pc : {
				src  : scripts_pc,
				dest : "tmp/js/concat/pc.js"
            },

			lib : {
				src  : scripts_lib,
				dest : "tmp/js/concat/lib.js"
            },

			licence : { 
				src : ["tmp/js/licence.js", "tmp/js/minified/lib.js"],
				dest : "tmp/js/minified/lib.js"
            }
        },

		uglify : {

			sp : {
				src  : "tmp/js/concat/sp.js",
				dest : "tmp/js/minified/sp.js"
            },

			pc : {
				src  : "tmp/js/concat/pc.js",
				dest : "tmp/js/minified/pc.js"
            },

			lib : {
				src  : "tmp/js/concat/lib.js",
				dest : "tmp/js/minified/lib.js"
            }
        },

        copy : {

            sp : {

                files : [{

                    expand: true,
                    flatten : true,
                    src : "tmp/js/concat/sp.js",
                    dest : "../public/js/",
                    filter : "isFile"
                }]
            },

            pc : {

                files : [{

                    expand: true,
                    flatten : true,
                    src : "tmp/js/concat/pc.js",
                    dest : "../public/js/",
                    filter : "isFile"
                }]
            },

            lib : {

                files : [{

                    expand: true,
                    flatten : true,
                    src : "tmp/js/minified/lib.js",
                    dest : "../public/js/",
                    filter : "isFile"
                }]
            }
        }
    };

    grunt.initConfig(configs);

    for(var task_name in pkg.devDependencies) {

        if(task_name.substring(0, 6) == "grunt-") {

            grunt.loadNpmTasks(task_name);
        }
    }

	grunt.registerTask("sp", [ "concat:sp", "uglify:sp", "copy:sp" ]);
	grunt.registerTask("pc", [ "concat:pc", "uglify:pc", "copy:pc" ]);
	grunt.registerTask("lib", [ "concat:lib", "uglify:lib", "license_collection:lib", "concat:licence", "copy:lib" ]);

	grunt.registerTask("default", [ "sp", "pc", "compass", "watch" ]); 
}
