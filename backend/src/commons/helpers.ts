import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import { BufferedFile } from 'src/interfaces/file.interface';

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const comparePassword = async (password: string, hashword: string) => {
  const resp = await bcrypt?.compare(password, hashword);
  return resp;
};

export const generateFilePath = (file) => {
  return `${file?.destination}/${file?.filename}`;
};

export const sleep = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const uploadFile = (path: string, bufferedFile: BufferedFile) => {
  const fullpath = `${path}/${new Date().getTime()}-${
    bufferedFile.originalname
  }`;
  try {
    fs.writeFileSync(fullpath, bufferedFile.buffer);
    return {
      success: true,
      path: fullpath,
    };
  } catch (e) {
    return {
      success: false,
      error: e.message,
    };
  }
};
