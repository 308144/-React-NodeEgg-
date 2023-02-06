import React, { createContext, useContext } from 'react';
function createStore(store) {
    const ModelContext = {};
    function useModel(key) {
        return useContext(ModelContext[key]);
    }
    let currentStore;
    let prevStore;
    function StoreProvider(props) {
        currentStore = store();
        if (prevStore) {
            for (const key in prevStore) {
                if (Shallow(prevStore[key], currentStore[key])) {
                    currentStore[key] = prevStore[key];
                }
            }
        }
        prevStore = currentStore;
        let keys = Object.keys(currentStore);
        let i = 0;
        const length = keys.length;
        function getContext(key, val, children) {
            const Context = ModelContext[key] || (ModelContext[key] = createContext(val[key]));
            const currentIndex = ++i;
            return React.createElement(Context.Provider, {
                value: val[key],
            }, currentIndex < length ? getContext(keys[currentIndex], val, children) : children);
        }
        return getContext(keys[i], currentStore, props.children);
    }
    function getModel(key) {
        return currentStore[key];
    }
    function connectModel(key, selector) {
        return function (WarpComponent) {
            const Connect = (props) => {
                const val = useModel(key);
                const state = selector(val);
                return React.createElement(WarpComponent, {
                    ...props,
                    ...state,
                });
            };
            return Connect;
        };
    }
    return {
        useModel,
        connectModel,
        StoreProvider,
        getModel,
    };
}
export default createStore;
function Shallow(obj1, obj2) {
    if (obj1 === obj2)
        return true;
    if (Object.keys(obj1).length !== Object.keys(obj2).length)
        return false;
    for (const key in obj1) {
        if (obj1[key] !== obj2[key])
            return false;
    }
    return true;
}
//# sourceMappingURL=createStore.js.map