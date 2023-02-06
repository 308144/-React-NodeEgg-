import { useCallback, useEffect, useRef, useState } from 'react';
function useSafeState(initialState) {
    const unmountedRef = useRef(false);
    const [state, setState] = useState(initialState);
    const setCurrentState = useCallback(currentState => {
        if (unmountedRef.current)
            return;
        setState(currentState);
    }, []);
    useEffect(() => {
        unmountedRef.current = false;
        return () => {
            unmountedRef.current = true;
        };
    }, []);
    return [state, setCurrentState];
}
export default useSafeState;
//# sourceMappingURL=useSafeState.js.map