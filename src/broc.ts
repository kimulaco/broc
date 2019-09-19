import path from 'path'
import fs from 'fs'
import glob from 'fast-glob'
import MarkdownIt from 'markdown-it'
import removeMd from 'remove-markdown'

/* eslint-disable @typescript-eslint/no-var-requires */
const meta = require('markdown-it-meta')
/* eslint-enable @typescript-eslint/no-var-requires */

type MarkdownItOption = any

interface Option {
  markdownIt?: MarkdownItOption
}

class Broc {
  private option: Option = {
    markdownIt: {
      html: true
    }
  }

  private createParser(markdownItOption: MarkdownItOption): any {
    const mdParser: MarkdownIt = new MarkdownIt(markdownItOption)
    mdParser.use(meta)
    return mdParser
  }

  private removeMeta(body: string): string {
    return body.replace(/---[\s\S]*---/gm, '')
  }

  private async importPost(filePath: string) {
    const parser = this.createParser(this.option.markdownIt)
    const md: string = fs.readFileSync(filePath).toString()
    const html: string = parser.render(md)
    const text: string = removeMd(this.removeMeta(md))

    return {
      path: filePath,
      fullpath: path.join(process.cwd(), filePath),
      meta: parser.meta,
      body: {
        md: this.removeMeta(md),
        html,
        text
      }
    }
  }

  async parse(dir: string, option: Option = {}) {
    this.option = Object.assign(this.option, option)
    const posts = await glob(path.join(dir, '**/*.md'))
    const blog: any = {
      posts: [],
      tags: []
    }
    let postPath: string

    for (postPath of posts) {
      const post = await this.importPost(postPath)
      blog.posts.push(post)
    }

    return blog
  }
}

const broc = new Broc()

export default broc
