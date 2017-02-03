var fs = require('fs');
var npmRun = require('npm-run');
var path = require('path');
var config;

module.exports = function watch(cwd) {
    config = path.resolve(__dirname, '../../lib/development.config.js'); 
    npmRun.exec('webpack-dev-server --watch --config ' + config, {cwd: cwd}, onWatch); 
};

function onWatch(err, stdout, stderr) {
    err === null && console.log("complete");  
    err !== null && console.log("error: " + err.toString());
}