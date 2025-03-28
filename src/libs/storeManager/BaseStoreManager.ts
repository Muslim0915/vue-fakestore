type TKey = 'USER';
type TKeyValue = Lowercase<TKey>;

class BaseStoreManager {
    protected KEYS: Record<TKey, TKeyValue> = {
        USER: 'user'
    }

    protected set<T = any>(key: TKeyValue, item: T) {
        try {
            localStorage.setItem(key, JSON.stringify(item));
            return true;
        } catch {
            return false
        }
    }

    protected get<T = any>(key: TKeyValue) {
        try {
            const rawItem = localStorage.getItem(key);
            if (rawItem !== null) {
                return JSON.parse(rawItem) as T;
            }
        } catch {
            return null;
        }
    }

    protected remove(key: TKeyValue) {
        localStorage.removeItem(key);
        return true;
    }
}

export default BaseStoreManager;
