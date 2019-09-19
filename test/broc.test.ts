import { parse } from '../src/broc'

describe('parse', (): void => {
  let blog: any

  beforeAll(async () => {
    blog = await parse('./test/resources')
  })

  test('posts length', () => {
    expect(blog.posts.length).toBe(2)
  })

  test('has meta', () => {
    const post = blog.posts[0]
    expect(
      post.meta.hasOwnProperty('id') &&
      post.meta.hasOwnProperty('title') &&
      post.meta.hasOwnProperty('description') &&
      post.meta.hasOwnProperty('category') &&
      post.meta.hasOwnProperty('tags') &&
      post.meta.hasOwnProperty('status') &&
      post.meta.hasOwnProperty('created_at') &&
      post.meta.hasOwnProperty('updated_at')
    ).toBeTruthy()
  })

  test('has html body', () => {
    const post = blog.posts[0]
    expect(post.body.html).toBe('<h1>test-01</h1>\n')
  })

  test('has md body', () => {
    const post = blog.posts[0]
    expect(post.body.md).toBe('\n# test-01')
  })

  test('has text body', () => {
    const post = blog.posts[0]
    expect(post.body.text).toBe('\ntest-01')
  })

  test('tags length', () => {
    expect(blog.tags.length).toBe(0)
  })
})