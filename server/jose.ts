import 'dotenv/config';
import * as jose from 'jose';

const sessSecret = process.env.SESSION_SECRET;

console.log('Sess secret:', sessSecret);

const joseTest = async () => {
  const token = await new jose.SignJWT({ id: 1 })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(Buffer.from(sessSecret as string));

  console.log('Signed token: ', token);

  const { payload } = await jose.jwtVerify(
    token,
    Buffer.from(sessSecret as string),
  );

  console.log('Verified token: ', payload);
};

joseTest();
