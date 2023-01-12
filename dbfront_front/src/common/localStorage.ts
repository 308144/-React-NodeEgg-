export const localStorageKey = 'com.dbfront'

interface ILocalStorage<T> {
  key: string
  defaultValue: T
}

export class LocalStorage<T> implements ILocalStorage<T> {
  key: string
  defaultValue: T

  constructor(key, defaultValue) {
    this.key = localStorageKey + key
    this.defaultValue = defaultValue
  }

  setItem(value: T) {
    localStorage.setItem(this.key, window.btoa(encodeURIComponent(JSON.stringify(value))))
  }

  removeItem() {
    localStorage.removeItem(this.key)
  }

  getItem(): T {
    const value =
      localStorage[this.key] && decodeURIComponent(window.atob(localStorage.getItem(this.key)))
    if (value === undefined) return this.defaultValue
    try {
      return value && value !== 'null' && value !== 'undefined'
        ? (JSON.parse(value) as T)
        : this.defaultValue
    } catch (error) {
      return value && value !== 'null' && value !== 'undefined'
        ? (value as unknown as T)
        : this.defaultValue
    }
  }
}

export const tokenStorage = new LocalStorage<string>('Token', '')
// 清除当前项目的本地存储
export const clearLocalStorage = () => {
  for (const key in localStorage) {
    if (key.includes(localStorageKey)) {
      localStorage.removeItem(key)
    }
  }
}
