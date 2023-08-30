import * as bcrypt from 'bcrypt';

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
  return `${file?.destination}/${file.filename}`;
};
