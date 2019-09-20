import MarkdownIt from 'markdown-it';
export declare type MdItOption = any;
export declare type Tag = string;
export declare type Tags = Tag[];
export declare type Posts = Post[];
export interface Post {
    meta: any;
    body: {
        text: string;
        md: string;
        html: string;
    };
}
export interface Blog {
    posts: Posts;
    tags: Tags;
}
export interface Option {
    tags: string;
    createdAt: string;
    updatedAt: string;
    markdownIt?: MdItOption;
}
export interface MdIt extends MarkdownIt {
    meta?: any;
}
