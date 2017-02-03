/**
 * ============
 * client-project COMMAND [watch]
 * ============
**/

const fs = require('fs')
const npmRun = require('npm-run')
const path = require('path')
let webpack, config, command, values

module.exports = (cwd) => {
    command = path.resolve(cwd, 'node_modules/@inversion-of-control/client-project/node_modules/.bin/webpack-dev-server')
    config = path.resolve(cwd, 'node_modules/@inversion-of-control/client-project/lib/development.config.js')
    values = ['--config', config, '--watch', '--colors', '--client-log-level', 'error' ]

    webpack = npmRun.spawn(command, values, {cwd})
    webpack.stdout.on('data', (data) => {process.stdout.write(data)})
    webpack.stderr.on('data', (data) => {process.stderr.write(data)})
}