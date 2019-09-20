import MarkdownIt from 'markdown-it'
import removeMd from 'remove-markdown'
import { MdIt, MdItOption, Post } from '../types'

/* eslint-disable @typescript-eslint/no-var-requires */
const meta = require('markdown-it-meta')
/* eslint-enable @typescript-eslint/no-var-requires */

const createParser = (mditOption: MdItOption): MdIt => {
  const mdParser: MdIt = new MarkdownIt(mditOption)
  mdParser.use(meta)
  return mdParser
}

const removeMdMeta = (text: string): string => {
  return text.replace(/---[\s\S]*---/gm, '')
}

export const parse = async (
  md: string,
  mditOption: MdItOption
): Promise<Post> => {
  const parser: MdIt = createParser(mditOption)
  const html: string = parser.render(md)

  return {
    meta: parser.meta,
    body: {
      text: removeMd(removeMdMeta(md)),
      md: removeMdMeta(md),
      html
    }
  }
}
