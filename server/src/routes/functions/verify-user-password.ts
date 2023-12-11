import * as bcrypt from 'bcrypt';

export const verifyUserPassword = (password: string, encryptedPassword: string): boolean => {

    return bcrypt.compareSync(password, encryptedPassword);
}