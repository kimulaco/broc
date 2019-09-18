import broc from '../src/broc'

describe('parse', (): void => {
  let blog: any

  beforeAll(async () => {
    blog = await broc.parse('./test/resources')
  })

  test('posts length', () => {
    expect(blog.posts.length).toBe(2)
  })
})