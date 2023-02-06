export const localStorageKey = 'com.drpanda.distribute.';
export class SessionStorage {
    key;
    defaultValue;
    constructor(key, defaultValue) {
        this.key = localStorageKey + key;
        this.defaultValue = defaultValue;
    }
    setItem(value) {
        sessionStorage.setItem(this.key, window.btoa(encodeURIComponent(JSON.stringify(value))));
    }
    getItem() {
        const value = sessionStorage[this.key] && decodeURIComponent(window.atob(sessionStorage.getItem(this.key)));
        if (value === undefined)
            return this.defaultValue;
        try {
            return value && value !== 'null' && value !== 'undefined'
                ? JSON.parse(value)
                : this.defaultValue;
        }
        catch (error) {
            return value && value !== 'null' && value !== 'undefined'
                ? value
                : this.defaultValue;
        }
    }
    removeItem() {
        sessionStorage.removeItem(this.key);
    }
}
export const tokenStorage = new SessionStorage('authToken', '');
export const clearSessionStorage = () => {
    for (const key in sessionStorage) {
        if (key.includes(localStorageKey)) {
            sessionStorage.removeItem(key);
        }
    }
};
//# sourceMappingURL=storage.js.map