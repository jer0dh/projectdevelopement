const {config} = require('../config/');
const deployRemote = require('../lib/deployRemote');


function deploy(){
    return deployRemote( config.destFolder + '/**', '/');
}

exports.deploy = deploy;
