export interface CookieInterface {
    value: any,
    set: (newValue: any, options?: object) => void,
    delete: () => void
}