import path from 'path'
import fs from 'fs'
import glob from 'fast-glob'
import MarkdownIt from 'markdown-it'
import removeMd from 'remove-markdown'

/* eslint-disable @typescript-eslint/no-var-requires */
const meta = require('markdown-it-meta')
/* eslint-enable @typescript-eslint/no-var-requires */

type MarkdownItOption = any
type Tag = string

interface Option {
  markdownIt?: MarkdownItOption
}

interface Post {
  path: string
  fullpath: string
  meta: any
  body: {
    text: string
    md: string
    html: string
  }
}

interface Blog {
  posts: Post[]
  tags: Tag[]
}

const defaultOption: Option = {
  markdownIt: {
    html: true
  }
}

const createParser = (mditOption: MarkdownItOption): any => {
  const mdParser: MarkdownIt = new MarkdownIt(mditOption)
  mdParser.use(meta)
  return mdParser
}

const removeMeta = (text: string): string => {
  return text.replace(/---[\s\S]*---/gm, '')
}

const importPost = async (
  filePath: string,
  mditOption: MarkdownItOption
): Promise<Post> => {
  const parser = createParser(mditOption)
  const md: string = fs.readFileSync(filePath).toString()
  const html: string = parser.render(md)

  return {
    path: filePath,
    fullpath: path.join(process.cwd(), filePath),
    meta: parser.meta,
    body: {
      text: removeMd(removeMeta(md)),
      md: removeMeta(md),
      html
    }
  }
}

export const parse = async (dir: string, option?: Option): Promise<Blog> => {
  option = Object.assign(defaultOption, option || {})
  const posts = await glob(path.join(dir, '**/*.md'))
  const blog: Blog = {
    posts: [],
    tags: []
  }
  let postPath: string

  for (postPath of posts) {
    const post = await importPost(postPath, option.markdownIt)
    blog.posts.push(post)
  }

  return blog
}
