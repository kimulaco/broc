import { Blog } from './types';
export declare const generate: (inputDir: string, outputFile: string) => Promise<Blog>;
export declare const watch: (inputDir: string, outputFile: string) => Promise<void>;
