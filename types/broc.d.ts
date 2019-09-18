declare type MarkdownItOption = any;
interface Option {
    markdownIt?: MarkdownItOption;
}
declare class Broc {
    private option;
    private createParser;
    private removeMeta;
    private importPost;
    parse(dir: string, option?: Option): Promise<any>;
}
declare const broc: Broc;
export default broc;
