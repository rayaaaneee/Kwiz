import { useMemo } from "react";
import useCookie from "../hook/use-cookie";
import { CookieInterface } from "../interface/cookie-interface";

export class CookieContextManager {
    contextValues: Record<string, CookieInterface>;

    constructor() {
        this.contextValues = {};
    }

    push(name: string, value: CookieInterface): void {
        this.contextValues[name] = value;
    }

    get(name: string): CookieInterface {
        return this.contextValues[name];
    }

    delete(name: string): void {
        delete this.contextValues[name];
    }

    getValues(): Record<string, CookieInterface> {
        return this.contextValues;
    }

    setValues(values: Record<string, CookieInterface>): void {
        this.contextValues = values;
    }
}