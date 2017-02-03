var fs = require('fs');
var npmRun = require('npm-run');
var path = require('path');
var exec, config;

module.exports = function watch(cwd) {
    exec = path.resolve(__dirname, '../../../../@inversion-of-control/client-project/node_modules/.bin/webpack-dev-server');
    config = path.resolve(__dirname, '../../lib/development.config.js'); 
    npmRun.exec(exec + ' --watch --config ' + config, {cwd: cwd}, onWatch); 
};

function onWatch(err, stdout, stderr) {
    err === null && console.log("complete");  
    err !== null && console.log("error: " + err.toString());
}