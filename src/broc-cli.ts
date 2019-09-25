import fs from 'fs'
import chalk from 'chalk'
import * as broc from './broc'
import { Blog } from './types'

export const generate = async (
  inputDir: string,
  outputFile: string
): Promise<Blog> => {
  const blog: Blog = await broc.generate(inputDir)
  fs.writeFileSync(outputFile, JSON.stringify(blog, null, '  '))
  console.log(chalk.green('\nComplated broc build.\n'))
  console.log(`${inputDir} > ${outputFile}\n`)
  return blog
}

export const watch = async (
  inputDir: string,
  outputFile: string
): Promise<void> => {
  await generate(inputDir, outputFile)

  fs.watch(inputDir, async (eventType: string, filePath: string) => {
    if (!filePath) return
    console.log(`${eventType} - ${filePath}`)
    await generate(inputDir, outputFile)
  })
}
