import { Guid } from 'guid-typescript';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerOptions = {
  storage: diskStorage({
    destination: 'public/uploads',
    filename: (req, file, cb) => {
      cb(null, `${Guid.create().toString()}${extname(file.originalname)}`);
    },
  }),
};
