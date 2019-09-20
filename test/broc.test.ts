import { parse } from '../src/broc'
import { hasOwnProperties } from './utils/utils'

describe('parse', (): void => {
  let blog: any

  beforeAll(async () => {
    blog = await parse('./test/resources')
    console.log(JSON.stringify(blog, null, '  '))
  })

  test('posts length', () => {
    expect(blog.posts.length).toBe(2)
  })

  test('has meta', () => {
    const post = blog.posts[0]
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
    expect(blog.tags.length).toBe(5)
  })
})