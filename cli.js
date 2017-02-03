#!/usr/bin/env node

/**
 * ============
 * client-project CLI
 * ============
**/

const prc = require('yargs')
const cmd = require('./cmd')
const cwd = process.cwd()

prc.usage('$0 <cmd> [args]')
   .command('watch', 'watch development', () => {cmd.watch(cwd)})
   .command('compile', 'compile production', () => {cmd.compile(cwd)})                
   .help()
   .argv