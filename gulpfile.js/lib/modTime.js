const through2 = require('through2');

const modTime = through2.obj( function( file, enc, cb ) {
    let date = new Date();
    file.stat.atime = date;
    file.stat.mtime = date;
    cb( null, file );
});

exports.modTime = modTime;
