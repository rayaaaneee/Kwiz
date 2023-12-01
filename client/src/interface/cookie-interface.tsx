export interface CookieInterface {
    get: () => any,
    set: (newValue: any, options?: object) => void,
    delete: () => void
}