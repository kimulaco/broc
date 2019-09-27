# broc

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Coverage Status](https://coveralls.io/repos/github/kimulaco/broc/badge.svg)](https://coveralls.io/github/kimulaco/broc)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![CI Status](https://circleci.com/gh/kimulaco/broc.svg?style=svg)](https://circleci.com/gh/kimulaco/broc)

The library to help you create a blog with Markdown.

You can easily output a JSON file from a directory with multiple Markdown.

## Install

You can install using npm or yarn.

```shell
npm i -D broc
```

## Use

For example, Create a blog article in this Markdown format.

```md
<!-- ./src/test-01/index.md -->
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

This is body content.
```

Let's look at the points.

- The area of yaml surrounded by `---` is treated as meta information of the article.
    - The meta-information can be freely specified the information you want to specify.
- The part excluding meta-information is treated as the body of the blog post.
    - The body is output in three types: HTML, Markdown, and Plane text.

### CLI

You can generate easily with CLI.

If you watch the blog article file, you can write efficiently.

```shell
# Generate
npx broc ./src -o dist/brog.json

# Watch mode
npx broc ./src -o dist/brog.json -w
```

Details of the CLI can be checked with the `--help` command.

```
Usage:
  $ broc [dir]

Commands:
  [dir]  Build posts

For more info, run any command with the `--help` flag:
  $ broc --help

Options:
  -o, --output <output>  Output file path. (default: ./posts.json)
  -w, --watch            Watch mode
  -h, --help             Display this message
  -v, --version          Display version number
```

### API

If you want to use with objects instead of output a JSON file, you can use the broc API.

```js
import { generate } from 'broc'

generate('./src').then((blog) => {
  console.log(blog)
  /**
   * {
   *   posts: {
   *     meta: {
   *       id: 'test-01',
   *       title: 'test-01 title',
   *       description: 'test-01 description.',
   *       category: 'code',
   *       tags: ['Tag 1', 'Tag 2', 'Tag 3'],
   *       created_at: '2019/10/02'
   *       updated_at: '2019/10/03'
   *     },
   *     body: {
   *       text: 'test-01\n\nThis is body content.',
   *       md: '# test-01\n\nThis is body content.',
   *       html: '<h1>test-01</h1>\n<p>This is body content.</p>\n'
   *     }
   *   },
   *   tags: ['Tag 1', 'Tag 2', 'Tag 3']
   * }
   */
})
```

## Contributing

Please create an Issue or Pull requests if you have any improvements!

### Development

- Use yarn.
- broc is created with TypeScript.
- When you update the functions, update the test.

```shell
# Install packages
yarn

# Build TypeScript to JavaScript
yarn dev
yarn build

# Test
yarn test
```

## License

[MIT License](LICENSE)
