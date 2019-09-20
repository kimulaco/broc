import MarkdownIt from 'markdown-it'

export type MdItOption = any
export type Tag = string
export type Tags = Tag[]
export type Posts = Post[]

export interface Post {
  meta: any
  body: {
    text: string
    md: string
    html: string
  }
}

export interface Blog {
  posts: Posts
  tags: Tags
}

export interface Option {
  tags: string
  createdAt: string
  updatedAt: string
  markdownIt?: MdItOption
}

export interface MdIt extends MarkdownIt {
  meta?: any
}