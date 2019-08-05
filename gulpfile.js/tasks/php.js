const { series, src, dest } = require('gulp');
const phplint = require('gulp-phplint');
const template = require('gulp-template');
const {config} = require('../config/');
const {getPackageJson} = require('../lib/getPackageJson');
const newer = require('gulp-newer');
const through2 = require('through2');

console.log( 'npm i -g phplint to install phplint globally');


function phpLint() {
    return src( [config.srcFolder + '/**/*.php'])
        .pipe( phplint() )
        .pipe(phplint.reporter(function(file){
            let report = file.phplintReport || {};
            if (report.error) {
                console.error(report.message+' on line '+report.line+' of '+report.filename);
            }
        }));
}

function phpTemplateCopy() {
    return src([config.srcFolder + '/**/*.php'])
        .pipe(template({pkg: getPackageJson(), production: config.production }))
        .pipe(newer( config.destFolder ))
        .pipe(through2.obj( function( file, enc, cb ) {
            let date = new Date();
            file.stat.atime = date;
            file.stat.mtime = date;
            cb( null, file );
        }))
        .pipe(dest( config.destFolder ));
}

exports.php = series( phpLint, phpTemplateCopy );
