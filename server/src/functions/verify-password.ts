const MAX_PASSWORD_LENGTH: number = process.env.MAX_PASSWORD_LENGTH ? parseInt(process.env.MAX_PASSWORD_LENGTH) : 100;
const MIN_PASSWORD_LENGTH: number = process.env.MIN_PASSWORD_LENGTH ? parseInt(process.env.MIN_PASSWORD_LENGTH) : 100;

export const verifyPassword = (password: string): {
    message: string,
    success: boolean
} => {
    if (!password) {
        return {
            message: 'Username or password missing !',
            success: false
        };
    } else if (password.length < MIN_PASSWORD_LENGTH) {
        return {
            message: 'Password too short !',
            success: false
        }
    } else if (password.length > MAX_PASSWORD_LENGTH) {
        return {
            message: 'Password too long !',
            success: false
        };
    } else {
        return {
            message: 'Your password was successfully changed !',
            success: true
        }
    }
}