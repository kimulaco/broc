import fs from 'fs'
import { generate, watch } from '../src/broc-cli'
import { Blog, Post, Tags } from '../src/types'
import { hasOwnProperties } from './utils/utils'

describe('generate', (): void => {
  let blog: Blog

  beforeAll(async (done) => {
    await generate('./test/resources', './test/cli/blog.json')
    blog = JSON.parse(fs.readFileSync('./test/cli/blog.json').toString())
    done()
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

describe('watch', (): void => {
  let blog: Blog

  beforeAll(async (done) => {
    await watch('./test/resources', './test/cli/blog.json')
    blog = JSON.parse(fs.readFileSync('./test/cli/blog.json').toString())
    done()
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