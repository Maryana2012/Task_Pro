import multer from "multer";
import path from 'path';

const tempPath = path.resolve('tmp');

const config = multer.diskStorage({tempPath});

export const upload = multer({storage: config});