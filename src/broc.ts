import path from 'path'
import fs from 'fs'
import glob from 'fast-glob'
import { parse } from './lib/parser'
import { sortPosts, sortTags } from './lib/sorter'
import { Option, Blog, Posts, Post, Tags } from './types'

const defaultOption: Option = {
  tags: 'tags',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  markdownIt: {
    html: true
  }
}

export const generate = async (dir: string, option?: Option): Promise<Blog> => {
  option = Object.assign(defaultOption, option || {})
  const postFiles: string[] = await glob(path.join(dir, '**/*.md'))
  const posts: Posts = []
  const tags: Tags = []
  let postPath: string

  for (postPath of postFiles) {
    const md: string = fs.readFileSync(postPath).toString()
    const post: Post = await parse(md, option.markdownIt)
    posts.push(post)
    tags.push(...post.meta[option.tags])
  }

  return {
    posts: sortPosts(posts, option.updatedAt, option.createdAt),
    tags: sortTags(tags)
  }
}
