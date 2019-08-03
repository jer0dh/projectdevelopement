const { watch, series, parallel} = require('gulp');

const {config} = require('./config/');

const {styles} = require('./tasks/styles');
const {clean} = require('./tasks/clean');
const {deploy} = require('./tasks/deploy');
const {php} = require('./tasks/php');
const {patch} = require('./tasks/version');
const {filesCopy} = require('./tasks/files');
const {javascript} = require('./tasks/javascript');

function watchTasks() {
    watch( [config.srcFolder + '/**/*.scss'], series(patch, styles, deploy));
    watch( [config.srcFolder + '/**/*.php'], series(patch, php, deploy));

}

exports.patch = patch;
exports.default = series(clean, patch, filesCopy, parallel( styles, php, javascript), deploy);
