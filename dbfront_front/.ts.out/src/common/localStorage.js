export const localStorageKey = 'com.dbfront';
export class LocalStorage {
    key;
    defaultValue;
    constructor(key, defaultValue) {
        this.key = localStorageKey + key;
        this.defaultValue = defaultValue;
    }
    setItem(value) {
        localStorage.setItem(this.key, window.btoa(encodeURIComponent(JSON.stringify(value))));
    }
    removeItem() {
        localStorage.removeItem(this.key);
    }
    getItem() {
        const value = localStorage[this.key] && decodeURIComponent(window.atob(localStorage.getItem(this.key)));
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
}
export const tokenStorage = new LocalStorage('Token', '');
export const userStorage = new LocalStorage('User', '');
export const clearLocalStorage = () => {
    for (const key in localStorage) {
        if (key.includes(localStorageKey)) {
            localStorage.removeItem(key);
        }
    }
};
//# sourceMappingURL=localStorage.js.map