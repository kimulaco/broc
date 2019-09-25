#!/usr/bin/env node

const cac = require('cac')
const cli = cac()
const brocCli = require('../dist/broc-cli')
const pkg = require('../package.json')

cli
  .command('[dir]', 'Build posts')
  .option('-o, --output <output>', 'Output file path.', {
    default: './posts.json'
  })
  .option('-w, --watch', 'Watch mode')
  .action(async (dir, option) => {
    if (option.watch) {
      brocCli.watch(dir, option.output)
    } else {
      brocCli.generate(dir, option.output)
    }
  })

cli.help()
cli.version(pkg.version)
cli.parse()
