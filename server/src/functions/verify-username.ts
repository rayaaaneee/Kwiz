const MAX_USERNAME_LENGTH: number = process.env.MAX_USERNAME_LENGTH ? parseInt(process.env.MAX_USERNAME_LENGTH) : 100;

export const verifyUsername = (username: string): {
    message: string,
    success: boolean
} => {

    if (!username) {
        return {
            message: 'Username missing !',
            success: false
        };
    } else if (username.length > MAX_USERNAME_LENGTH) {
        return {
            message: 'Username too long !',
            success: false
        };
    } else {
        return {
            message: 'Your username was successfully changed !',
            success: true
        }
    }
}