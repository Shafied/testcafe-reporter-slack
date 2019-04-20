import fs from 'fs';
import { resolve } from 'path';

export const resolvePath = (path) => resolve(process.cwd(), path);

export const isFileExists = (path) => fs.existsSync(path);

export const readFile = (filePath) => fs.readFileSync(filePath);
