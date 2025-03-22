import BaseStoreManager from './BaseStoreManager.ts'

class LocalStoreManager extends BaseStoreManager {
    setUser<T>(value: T) {
        return this.set(this.KEYS.USER, value);
    }
    getUser() {
        return this.get(this.KEYS.USER);
    }
    removeUser() {
        return this.remove(this.KEYS.USER);
    }
}

export default LocalStoreManager;
