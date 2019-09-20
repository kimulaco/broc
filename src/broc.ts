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
  tags: string
  createdAt: string
  updatedAt: string
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
  tags: 'tags',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
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

const sortPosts = (
  posts: Post[],
  updatedAt: string,
  createdAt: string
): Post[] => {
  return posts.sort((a: Post, b: Post) => {
    const aDate: string = a.meta[updatedAt] || a.meta[createdAt]
    const bDate: string = b.meta[updatedAt] || b.meta[createdAt]
    return aDate < bDate ? 1 : -1
  })
}

const sortTags = (tags: Tag[]): Tag[] => {
  const uniqueTags = Array.from(new Set(tags))
  return uniqueTags.sort((a: string, b: string) => {
    return a < b ? 1 : -1
  })
}

export const parse = async (dir: string, option?: Option): Promise<Blog> => {
  option = Object.assign(defaultOption, option || {})
  const postFiles = await glob(path.join(dir, '**/*.md'))
  const posts: Post[] = []
  const tags: Tag[] = []
  let postPath: string

  for (postPath of postFiles) {
    const post = await importPost(postPath, option.markdownIt)
    posts.push(post)
    tags.push(...post.meta[option.tags])
  }

  return {
    posts: sortPosts(posts, option.updatedAt, option.createdAt),
    tags: sortTags(tags)
  }
}
