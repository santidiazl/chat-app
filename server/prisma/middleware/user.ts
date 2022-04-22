import crypto from 'crypto';

const createSalt = () => crypto.randomBytes(16).toString('base64');
export const encryptPassword = (unencrypted: string, salt: string) =>
  crypto
    .createHash('RSA-SHA256')
    .update(unencrypted)
    .update(salt)
    .digest('hex');

export const setSaltAndPassword = async (params: any, next: any) => {
  if (
    (String(params.model) === 'User' && params.action === 'create') ||
    params.action === 'update'
  ) {
    params.args.data.salt = createSalt();
    params.args.data.password = encryptPassword(
      params.args.data.password,
      params.args.data.salt,
    );
  }
  return await next(params);
};
