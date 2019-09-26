# broc

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Coverage Status](https://coveralls.io/repos/github/kimulaco/broc/badge.svg)](https://coveralls.io/github/kimulaco/broc)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![CI Status](https://circleci.com/gh/kimulaco/broc.svg?style=svg)](https://circleci.com/gh/kimulaco/broc)

The library to help you create a blog with Markdown.

## Use

### CLI

```shell
# generate
npx broc ./resources -o dist

# watch
npx broc ./resources -o dist -w
```

### API

```js
import { generate } from './broc'

generate('./resources').then((blog) => {
  console.log(blog)
  /**
   * {
   *   posts: {
   *     meta: {
   *       id: 'test-01',
   *       title: 'test-01 title',
   *       title: 'test-01 description.',
   *       category: 'code',
   *       tags: ['Tag 1', 'Tag 2', 'Tag 3'],
   *       created_at: '2019/10/02'
   *       updated_at: '2019/10/03'
   *     },
   *     body: {
   *       md: 'test-01',
   *       html: '# test-01',
   *       text: '<h1>test-01</h1>'
   *     }
   *   },
   *   tags: ['Tag 1', 'Tag 2', 'Tag 3']
   * }
   */
})
```

./resources/test-01/index.md

```md
---
id: test-01
title: test-01 title
description: test-01 description.
category: code
tags:
    - Tag 1
    - Tag 2
    - Tag 3
created_at: "2019/10/02"
updated_at: "2019/10/03"
---
# test-01
```

## License

[MIT License](LICENSE)
