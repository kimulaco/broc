declare type MarkdownItOption = any;
declare type Tag = string;
interface Option {
    markdownIt?: MarkdownItOption;
}
interface Post {
    path: string;
    fullpath: string;
    meta: any;
    body: {
        text: string;
        md: string;
        html: string;
    };
}
interface Blog {
    posts: Post[];
    tags: Tag[];
}
export declare const parse: (dir: string, option?: Option | undefined) => Promise<Blog>;
export declare const hoge: () => Date;
export {};
