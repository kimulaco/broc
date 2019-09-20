import { Posts, Post, Tag, Tags } from '../types'

export const sortPosts = (
  posts: Posts,
  updatedAt: string,
  createdAt: string
): Posts => {
  return posts.sort((a: Post, b: Post): number => {
    const aDate: string = a.meta[updatedAt] || a.meta[createdAt]
    const bDate: string = b.meta[updatedAt] || b.meta[createdAt]
    return aDate < bDate ? 1 : -1
  })
}

export const sortTags = (tags: Tags): Tags => {
  const uniqueTags: Tags = Array.from(new Set(tags))
  return uniqueTags.sort((a: Tag, b: Tag): number => {
    return a < b ? 1 : -1
  })
}
