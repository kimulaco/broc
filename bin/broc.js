#!/usr/bin/env node

const fs = require('fs')
const cac = require('cac')
const chalk = require('chalk')
const cli = cac()
const broc = require('../dist/broc')
const pkg = require('../package.json')

const build = async (inputDir, outputFile) => {
  const blog = await broc.generate(inputDir)
  fs.writeFileSync(outputFile, JSON.stringify(blog, null, '  '))
}

cli
  .command('[dir]', 'Build posts')
  .option('-o, --output <output>', 'Output file path.', {
    default: './posts.json'
  })
  .action(async (dir, option) => {
    await build(dir, option.output)
    console.log(chalk.green('\nComplated broc build.\n'))
    console.log(`${dir} > ${option.output}\n`)
  })

cli.help()
cli.version(pkg.version)
cli.parse()
