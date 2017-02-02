#!/usr/bin/env node

/**
 * ============
 * client-project CLI
 * ============
**/

var prc = require('yargs');
var cmd = require('./cmd');
var cwd = process.cwd();

prc.usage('$0 <cmd> [args]')
       .command('watch', 
                'watch development', 
                function () {cmd.watch(cwd);})
       .command('compile', 
                'compile project and generate file cache', 
                function () {cmd.compile(cwd);})                
        .help()
        .argv;