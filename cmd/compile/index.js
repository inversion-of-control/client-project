var fs = require('fs');
var npmRun = require('npm-run');
var path = require('path');
var config;

module.exports = function compile(cwd, mode) {
    config = path.resolve(__dirname, '../../lib/production.config.js'); 
    npmRun.exec('set NODE_ENV=production && webpack --progress --display-error-details --color --config ' + config, {cwd: cwd}, onCompile); 
};

function onCompile(err, stdout, stderr) {
    err === null && console.log("complete");  
    err !== null && console.log("error: " + err.toString());
}