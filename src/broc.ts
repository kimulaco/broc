import MarkdownIt from 'markdown-it'

/* eslint-disable @typescript-eslint/no-var-requires */
const meta = require('markdown-it-meta')
/* eslint-enable @typescript-eslint/no-var-requires */

type MarkdownItOption = any

interface Option {
  markdownIt?: MarkdownItOption
}

const defaultOption: Option = {
  markdownIt: {
    html: true
  }
}

const createParser = (mditOption: MarkdownItOption): MarkdownIt => {
  const mdParser: MarkdownIt = new MarkdownIt(mditOption)
  mdParser.use(meta)
  return mdParser
}

export const parse = (dir: string, option: Option = {}): void => {
  option = Object.assign(defaultOption, option)
  const parser = createParser(option.markdownIt)
}
