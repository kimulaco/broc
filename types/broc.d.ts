declare type MarkdownItOption = any;
interface Option {
    markdownIt?: MarkdownItOption;
}
export declare const parse: (dir: string, option?: Option) => void;
export {};
