import { useEffect, useRef } from 'react';
import { useMemoizedFn } from '.';
function useDebounce(fn, delay) {
    const { current } = useRef({ fn, timer: null });
    useEffect(() => {
        current.fn = fn;
    }, [fn]);
    return useMemoizedFn((...args) => {
        if (current.timer) {
            clearTimeout(current.timer);
        }
        current.timer = setTimeout(() => {
            current.fn.call(null, ...args);
        }, delay);
    });
}
export default useDebounce;
//# sourceMappingURL=useDebounce.js.map