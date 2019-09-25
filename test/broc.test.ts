import { generate } from '../src/broc'
import { Blog, Post, Tags } from '../src/types'
import { hasOwnProperties } from './utils/utils'

describe('generate', (): void => {
  let blog: Blog

  beforeAll(async () => {
    blog = await generate('./test/resources')
    console.log(JSON.stringify(blog, null, '  '))
  })

  test('posts length', () => {
    expect(blog.posts.length).toBe(2)
  })

  test('has meta', () => {
    const post: Post = blog.posts[0]
    expect(hasOwnProperties(post.meta, [
      'id',
      'title',
      'description',
      'category',
      'tags',
      'status',
      'created_at',
      'updated_at'
    ])).toBeTruthy()
  })

  test('has html body', () => {
    const post: Post = blog.posts[0]
    expect(post.body.html).toBe('<h1>test-02</h1>\n')
  })

  test('has md body', () => {
    const post: Post = blog.posts[0]
    expect(post.body.md).toBe('\n# test-02')
  })

  test('has text body', () => {
    const post: Post = blog.posts[0]
    expect(post.body.text).toBe('\ntest-02')
  })

  test('tags length', () => {
    const tags: Tags = blog.tags
    expect(tags.length).toBe(6)
  })
})